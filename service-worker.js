const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/page2/index.html',
    '/page3/index.html',
    '/page4/index.html',
    '/404.html',
    '/about/index.html',
    '/resume/index.html',
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

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                // Cache hit - return response
                if (response) {
                    return response;
                }

                // IMPORTANT: Clone the request. A request is a stream and
                // can only be consumed once. Since we are consuming this
                // once by cache and once by the browser for fetch, we need
                // to clone the response.
                var fetchRequest = event.request.clone();

                return fetch(fetchRequest).then(
                    function (response) {
                        // Check if we received a valid response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // IMPORTANT: Clone the response. A response is a stream
                        // and because we want the browser to consume the response
                        // as well as the cache consuming the response, we need
                        // to clone it so we have two streams.
                        var responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then(function (cache) {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                );
            })
    );
});