const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/page2/index.html',
    '/page3/index.html',
    '/page4/index.html',
    '/404.html',
    '/about/index.html',
    'resume/index.html',
    '/tags.html',
    '/assets/css/app.min.css',
    '/assets/css/github-markdown.css',
    '/assets/css/prism.css',
    '/assets/css/share.min.css',
    '/assets/js/index.min.js',
    '/assets/js/prism.js',
    '/images/bg.jpg',
    '/images/about.jpg',
    '/images/resume.jpg',
];

self.addEventListener('install', function (event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log(`success: ${urlsToCache.length}`);
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('activate', function (event) {
    console.log('Finally active. Ready to start serving content!');
});