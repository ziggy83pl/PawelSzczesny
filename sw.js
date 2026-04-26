const CACHE_NAME = 'pawel-v6';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './portfolio-logos.js',
    './magnifier.js',
    './manifest.json',
    './logo/fivicon.ico',
    './logo/pawel.png',
    './logo/image1-optimized.jpg',
    './logo/image2-optimized.jpg',
    './logo/image3-optimized.jpg',
    './logo/image4-optimized.jpg',
    './logo/image5-optimized.jpg',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => Promise.allSettled(
                ASSETS_TO_CACHE.map((asset) => cache.add(asset))
            ))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                }
                return fetch(event.request).then((networkResponse) => {
                    if (!networkResponse || networkResponse.status !== 200 || !['basic', 'cors', 'opaque'].includes(networkResponse.type)) {
                        return networkResponse;
                    }
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        if (event.request.method === 'GET') {
                            cache.put(event.request, responseToCache);
                        }
                    });
                    return networkResponse;
                });
            })
    );
});
