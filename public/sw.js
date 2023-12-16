const cacheData = 'canteen-app';

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheData).then((cache) => {
            return cache.addAll([
                'static/js/bundle.js',
                '/index.html',
                '/',
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (event.request.url.endsWith("user/") && !navigator.onLine) {
                return cachedResponse;
            }

            if(event.request.url.endsWith('.png') || event.request.url.endsWith('.webp')) {
                if(cachedResponse) {
                    return cachedResponse
                } else {
                    return fetchAndCacheImage(event.request);
                }
            }

            if (event.request.url.endsWith("user/")) {
                return fetchAndCacheUser(event.request);
            }

            return fetch(event.request).catch((error) => {
                console.error('Fetch error:', error);
            });
        })
    );
});


const imageCache = 'images';

function fetchAndCacheImage(request) {
    return fetch(request).then((networkResponse) => {
        const clonedResponse = networkResponse.clone();

        caches.open(imageCache).then((cache) => {
            cache.put(request, clonedResponse);
        });

        return networkResponse;
    }).catch((error) => {
        console.error('Image fetch error:', error);
        return new Response('Image fetch error: Unable to fetch the resource.');
    });
}

const userCache = 'user-data';

function fetchAndCacheUser(request) {
    return fetch(request).then((networkResponse) => {
        const clonedResponse = networkResponse.clone();

        caches.open(userCache).then((cache) => {
            cache.put(request, clonedResponse);
        });

        return networkResponse;
    }).catch((error) => {
        console.error('User data fetch error:', error);
        return new Response('User data error: Unable to fetch the data.');
    });
}

const refreshInterval = 10 * 60 * 1000;

setInterval(() => {
    caches.delete(userCache);

    fetchAndCacheUser(new Request(getRequestWithHeaders()));
}, refreshInterval);

function getRequestWithHeaders() {
    const bearerToken = localStorage.getItem("token");

    const headers = new Headers({
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json',
    });
    return new Request('http://localhost:8000/api/v1/users/user/', {
        method: 'GET',
        headers: headers,
    });
}
