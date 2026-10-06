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
await access(path.join(root, site.photo));
// Refresh browser caches when the photo changes, while retaining its public file path.
const photoVersion = createHash('sha256').update(await readFile(path.join(root, site.photo))).digest('hex').slice(0, 12);
const photoSource = `${site.photo}?v=${photoVersion}`;

const papers = [...site.publications].sort((a, b) => Number(b.year) - Number(a.year));
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
  return `<article class="publication${paper.image ? '' : ' without-image'}${paper.selected ? ' selected' : ''}">
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
const schema = JSON.stringify({
  '@context': 'https://schema.org', '@type': 'Person', name: site.name,
  url: baseUrl.href, image: photoUrl,
  sameAs: profileLinks.filter(item => /^https?:\/\//.test(item.url)).map(item => item.url)
}).replace(/</g, '\\u003c');

const html = `<!doctype html>
<!-- Generated from site.json by scripts/build.mjs. Edit site.json, then run node scripts/build.mjs. -->
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escape(site.name)}</title>
  <meta name="description" content="${escape(site.description)}">
  <link rel="canonical" href="${escape(baseUrl.href)}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${escape(site.name)}">
  <meta property="og:description" content="${escape(site.description)}">
  <meta property="og:url" content="${escape(baseUrl.href)}">
  <meta property="og:image" content="${escape(photoUrl)}">
  <meta property="og:image:alt" content="${escape(site.name)}">
  <link rel="stylesheet" href="assets/style.css">
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
    <footer>${escape(site.name)}. Layout inspired by <a href="https://jonbarron.info/">Jon Barron</a>.</footer>
  </div>
</body>
</html>
`;

await writeFile(path.join(root, 'index.html'), html.replace(/^[ \t]+$/gm, ''));
await writeFile(path.join(root, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${new URL('sitemap.xml', `${baseUrl.href.replace(/\/$/, '')}/`).href}\n`);
await writeFile(path.join(root, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${escape(baseUrl.href)}</loc></url></urlset>\n`);
console.log(`Built ${site.name}'s homepage with ${papers.length} publications.`);
