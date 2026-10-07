import { readFile, writeFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { createHash } from 'node:crypto';

const root = fileURLToPath(new URL('../', import.meta.url));
const site = JSON.parse(await readFile(path.join(root, 'site.json'), 'utf8'));
// Empty link URLs are editable slots and are hidden until filled in.
const profileLinks = site.links.filter(item => typeof item.url === 'string' && item.url.trim());
const escape = (value = '') => String(value).replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
})[char]);
function safeUrl(value) {
  if (typeof value !== 'string' || !value.trim()) throw new Error('A link needs a URL.');
  const url = value.trim();
  if (url.startsWith('//') || /[\x00-\x20\\]/.test(url)) throw new Error(`Invalid URL: ${url}`);
  if (/^[a-z][a-z\d+.-]*:/i.test(url) && !/^(https?:|mailto:)/i.test(url)) {
    throw new Error(`Unsupported URL scheme: ${url}`);
  }
  return escape(url);
}
const link = ({ label, url }) => `<a href="${safeUrl(url)}">${escape(label)}</a>`;
const baseUrl = new URL(site.url);
if (baseUrl.protocol !== 'https:') throw new Error('Use an HTTPS site URL.');
if (!site.name) throw new Error('Add your name to site.json.');
const pageTitle = site.seo?.title || `${site.name} | Academic Homepage`;
await access(path.join(root, site.photo));
// Refresh browser caches when the photo changes, while retaining its public file path.
const photoVersion = createHash('sha256').update(await readFile(path.join(root, site.photo))).digest('hex').slice(0, 12);
const photoSource = `${site.photo}?v=${photoVersion}`;
const styleVersion = createHash('sha256').update(await readFile(path.join(root, 'assets/style.css'))).digest('hex').slice(0, 12);
const styleSource = `assets/style.css?v=${styleVersion}`;

const papers = [...site.publications].sort((a, b) => Number(b.year) - Number(a.year));
const paperId = paper => `publication-${paper.year}-${createHash('sha256').update(paper.title).digest('hex').slice(0, 12)}`;
const paperHtml = papers.map(paper => {
  if (!paper.title || !paper.year || !Array.isArray(paper.authors)) {
    throw new Error('Each publication needs a title, year, and authors array.');
  }
  const title = paper.url ? link({ label: paper.title, url: paper.url }) : escape(paper.title);
  const authors = paper.authors.map(author => {
    const name = author.name === site.name ? `<strong>${escape(author.name)}</strong>` : escape(author.name);
    return author.url ? `<a href="${safeUrl(author.url)}">${name}</a>` : name;
  }).join(', ');
  const image = paper.image ? `<img class="publication-image" src="${safeUrl(paper.image)}" alt="${escape(paper.imageAlt || `Overview of ${paper.title}`)}" loading="lazy" width="160" height="120">` : '';
  return `<article id="${paperId(paper)}" class="publication${paper.image ? '' : ' without-image'}${paper.selected ? ' selected' : ''}">
          ${image}
          <div>
            <h3>${title}</h3>
            <p>${authors}</p>
            <p class="venue">${escape(paper.venue || 'Preprint')}, ${escape(paper.year)}${paper.award ? ` <span class="award">(${escape(paper.award)})</span>` : ''}</p>
            ${(paper.links || []).length ? `<div class="paper-links">${paper.links.map(link).join('\n')}</div>` : ''}
            ${paper.summary ? `<p class="paper-summary">${escape(paper.summary)}</p>` : ''}
            ${paper.bibtex ? `<details><summary>BibTeX</summary><pre><code>${escape(paper.bibtex)}</code></pre></details>` : ''}
          </div>
        </article>`;
}).join('\n        ');
const newsHtml = site.news.length ? `<section id="news" aria-labelledby="news-heading">
      <h2 id="news-heading">News</h2>
      <ul class="news">${site.news.map(item => `<li><time>${escape(item.date)}</time><span>${escape(item.text)}</span></li>`).join('\n')}</ul>
    </section>` : '';
const photoUrl = new URL(site.photo, `${baseUrl.href.replace(/\/$/, '')}/`).href;
const personId = `${baseUrl.href}#person`;
const websiteId = `${baseUrl.href}#website`;
const profileId = `${baseUrl.href}#profile`;
const publicationSchema = papers.map(paper => ({
  '@type': 'ScholarlyArticle',
  '@id': `${baseUrl.href}#${paperId(paper)}`,
  name: paper.title,
  ...(paper.url ? { url: new URL(paper.url, baseUrl).href } : {}),
  ...(paper.summary ? { description: paper.summary } : {}),
  datePublished: String(paper.year),
  author: paper.authors.map(author => author.name === site.name
    ? { '@id': personId }
    : { '@type': 'Person', name: author.name, ...(author.url ? { url: new URL(author.url, baseUrl).href } : {}) }),
  sameAs: (paper.links || []).filter(item => /^https?:\/\//.test(item.url)).map(item => item.url)
}));
const schema = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite', '@id': websiteId, name: site.name,
      url: baseUrl.href, inLanguage: 'en', publisher: { '@id': personId }
    },
    {
      '@type': 'ProfilePage', '@id': profileId, name: pageTitle,
      url: baseUrl.href, description: site.description, inLanguage: 'en',
      isPartOf: { '@id': websiteId }, mainEntity: { '@id': personId },
      hasPart: publicationSchema.map(paper => ({ '@id': paper['@id'] }))
    },
    {
      '@type': 'Person', '@id': personId, name: site.name,
      url: baseUrl.href, image: photoUrl, description: site.bio[0] || site.description,
      mainEntityOfPage: { '@id': profileId },
      sameAs: profileLinks.filter(item => /^https?:\/\//.test(item.url)).map(item => item.url)
    },
    ...publicationSchema
  ]
}).replace(/</g, '\\u003c');

let visitorMapHtml = '';
if (site.visitorMap?.enabled) {
  const { widgetKey, siteId } = site.visitorMap;
  if (typeof widgetKey !== 'string' || !/^[A-Za-z0-9_-]{20,100}$/.test(widgetKey)) {
    throw new Error('visitorMap.widgetKey must be the key from your MapMyVisitors embed code.');
  }
  if (typeof siteId !== 'string' || !/^[a-z0-9]+$/.test(siteId)) {
    throw new Error('visitorMap.siteId must be the ID from your MapMyVisitors statistics URL.');
  }
  const statisticsUrl = `https://mapmyvisitors.com/web/${siteId}`;
  visitorMapHtml = `<div class="visitor-map" aria-label="Visitor map">
        <p class="visitor-map-title">Visitors</p>
        <div class="visitor-map-widget">
          <script defer type="text/javascript" id="mapmyvisitors" src="https://mapmyvisitors.com/map.js?d=${widgetKey}&amp;cl=ffffff&amp;w=a"></script>
          <noscript><p>Enable JavaScript to view the visitor map.</p></noscript>
        </div>
        <p><a href="${statisticsUrl}">Visitor statistics</a> · <a href="https://mapmyvisitors.com/">MapMyVisitors</a></p>
      </div>`;
}

const html = `<!doctype html>
<!-- Generated from site.json by scripts/build.mjs. Edit site.json, then run node scripts/build.mjs. -->
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escape(pageTitle)}</title>
  <meta name="description" content="${escape(site.description)}">
  <meta name="robots" content="index, follow, max-image-preview:large">
  ${site.seo?.googleSiteVerification ? `<meta name="google-site-verification" content="${escape(site.seo.googleSiteVerification)}">` : ''}
  <link rel="canonical" href="${escape(baseUrl.href)}">
  <meta property="og:type" content="profile">
  <meta property="og:site_name" content="${escape(site.name)}">
  <meta property="og:title" content="${escape(pageTitle)}">
  <meta property="og:description" content="${escape(site.description)}">
  <meta property="og:url" content="${escape(baseUrl.href)}">
  <meta property="og:image" content="${escape(photoUrl)}">
  <meta property="og:image:alt" content="${escape(site.name)}">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="${escape(pageTitle)}">
  <meta name="twitter:description" content="${escape(site.description)}">
  <meta name="twitter:image" content="${escape(photoUrl)}">
  <meta name="twitter:image:alt" content="${escape(site.name)}">
  <link rel="stylesheet" href="${safeUrl(styleSource)}">
  <script type="application/ld+json">${schema}</script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <div class="page">
    <nav class="navigation" aria-label="Main navigation">
      <a href="#about">About</a>
      ${site.news.length ? '<a href="#news">News</a>' : ''}
      <a href="#publications">Publications</a>
    </nav>
    <main id="main">
      <header class="profile" id="about">
        <div>
          <h1>${escape(site.name)}</h1>
          ${site.affiliation ? `<p class="affiliation">${escape(site.affiliation)}</p>` : ''}
          ${site.bio.length ? site.bio.map(paragraph => `<p>${escape(paragraph)}</p>`).join('\n          ') : '<p class="empty">Biography coming soon.</p>'}
          ${profileLinks.length ? `<div class="profile-links" aria-label="Profile links">${profileLinks.map(link).join('\n')}</div>` : ''}
        </div>
        <a class="portrait-link" href="${safeUrl(site.photo)}" aria-label="View full-size portrait of ${escape(site.name)}">
          <img class="portrait" src="${safeUrl(photoSource)}" alt="${escape(site.name)}" width="210" height="210" fetchpriority="high">
        </a>
      </header>
      ${newsHtml}
      <section id="publications" aria-labelledby="publications-heading">
        <h2 id="publications-heading">Publications</h2>
        ${site.research ? `<p>${escape(site.research)}</p>` : ''}
        ${papers.length ? paperHtml : '<p class="empty">Publications will be added here.</p>'}
      </section>
    </main>
    <footer><div data-nosnippet>${escape(site.name)}. Layout inspired by <a href="https://jonbarron.info/">Jon Barron</a>.
      ${visitorMapHtml}
    </div></footer>
  </div>
</body>
</html>
`;

await writeFile(path.join(root, 'index.html'), html.replace(/^[ \t]+$/gm, ''));
await writeFile(path.join(root, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${new URL('sitemap.xml', `${baseUrl.href.replace(/\/$/, '')}/`).href}\n`);
await writeFile(path.join(root, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"><url><loc>${escape(baseUrl.href)}</loc><image:image><image:loc>${escape(photoUrl)}</image:loc></image:image></url></urlset>\n`);
console.log(`Built ${site.name}'s homepage with ${papers.length} publications.`);
