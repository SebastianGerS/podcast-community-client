/* eslint-disable no-console, no-restricted-globals */
const doCache = true;

const CACHE_NAME = 'thru-the-ether';

self.addEventListener('activate', (event) => {
  console.log('activating service-worker');

  const cacheWhiteList = [CACHE_NAME];

  event.waitUntil(
    caches.keys()
      .then(keyList => Promise.all(keyList.map((key) => {
        let res;
        if (!cacheWhiteList.includes(key)) {
          console.log(`Deleting cacheKey: ${key}`);
          res = caches.delete(key);
        }

        return res;
      }))),
  );
});

self.addEventListener('install', (event) => {
  console.log('installing service-worker');

  if (doCache) {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then((cache) => {
          fetch('asset-manifest.json')
            .then(response => response.json())
            .then((assets) => {
              const keys = Object.keys(assets);
              const cachesToAdd = keys.map((key) => {
                let asset;
                if (key !== 'service-worker-custom') {
                  asset = assets[key];
                }
                return asset;
              });

              cache.addAll(cachesToAdd);
            });
        }),
    );
  }
});


self.addEventListener('fetch', (event) => {
  console.log('fetching resourse');
  if (doCache) {
    event.waitUntil(
      event.respondWith(
        caches.match(event.request)
          .then(response => response || fetch(event.request)).catch(error => error),
      ),

    );
  }
});
