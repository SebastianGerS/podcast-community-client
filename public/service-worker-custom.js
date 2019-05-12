/* eslint-disable no-console, no-restricted-globals */

const CACHE_NAME = 'thru-the-ether';
const DO_NOT_CACHE = ['service-worker-custom', '/sock', '.js'];
self.addEventListener('activate', (event) => {
  console.log('activating service-worker');

  const cacheWhiteList = [CACHE_NAME];

  event.waitUntil(
    caches.keys()
      .then(keyList => Promise.all(keyList.map((name) => {
        let res;
        if (!cacheWhiteList.includes(name)) {
          console.log(`Deleting cache: ${name}`);
          res = caches.delete(name);
        }
        return res;
      }))),
  );
});

self.addEventListener('install', (event) => {
  console.log('installing service-worker');

  self.skipWaiting();

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
});


self.addEventListener('fetch', (event) => {
  console.log('fetching resourse');
  event.waitUntil(
    event.respondWith(fetch(event.request)
      .then(async (res) => {
        if (!res || res.status !== 200) {
          return res;
        }

        const shouldCache = DO_NOT_CACHE.map((
          key => !event.request.url.includes(key)
        )).reduce((prev, cur) => prev && cur, true);

        if (shouldCache) {
          await caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request.url, res.clone()).catch(error => console.log(error));
            }).catch(error => error);
        }

        return res;
      }).catch(() => caches.match(event.request))),
  );
});
