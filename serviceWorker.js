// -------- SW from Weather PWA

const CACHE_NAME = "version-1";
const urlsToCache = [ 'index.html', '/Offline/index.js' ];

const self = this;

// Install SW
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');

                return cache.addAll(urlsToCache);
            })
    )
});

// Listen for requests
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(() => {
                return fetch(event.request)
                    .catch(() => caches.match('/Offline/index.js'))
            })
    )
});

// Activate the SW
self.addEventListener('activate', (event) => {
    const cacheWhiteList = [];
    cachWhiteList.push(CACHE_NAME);

    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if(!cacheWhiteList.includes(cacheName)) {
                    return caches.delete(cacheName);
                }
            })
        ))
    )
});


//-------- SW from NetNinja
// const staticCacheName = "site-static-v1";
// const dynamicCacheName = "site-dynamic-v1";
// const assets = [
//   "/",
//   "index.html",
//   "offline.html",
//   // "/src/components/App/index.js",
//   // "/src/components/Navigation/index.js",
//   // "/src/components/Landing/index.js",
//   // "welcome.svg",
//   "/src/index.css",
// ];

// // cache size limit function
// const limitCacheSize = (name, size) => {
//   caches.open(name).then(cache => {
//     cache.keys().then(keys => {
//       if(keys.length > size) {
//         cache.delete(keys[0]).then(limitCacheSize(name, size))
//       }
//     })
//   })
// };

// // install event
// self.addEventListener('install', evt => {
//   //console.log('service worker installed');
//   evt.waitUntil(
//     caches.open(staticCacheName).then((cache) => {
//       console.log('caching shell assets');
//       cache.addAll(assets);
//     })
//   );
// });

// // activate event
// self.addEventListener('activate', evt => {
//   //console.log('service worker activated');
//   evt.waitUntil(
//     caches.keys().then(keys => {
//       //console.log(keys);
//       return Promise.all(keys
//         .filter(key => key !== staticCacheName && key !== dynamicCacheName)
//         .map(key => caches.delete(key))
//       );
//     })
//   );
// });

// // fetch event
// self.addEventListener('fetch', evt => {
//   //console.log('fetch event', evt);
//   evt.respondWith(
//     caches.match(evt.request).then(cacheRes => {
//       return cacheRes || fetch(evt.request).then(fetchRes => {
//         return caches.open(dynamicCacheName).then(cache => {
//           cache.put(evt.request.url, fetchRes.clone());
//           limitCacheSize(dynamicCacheName, 5);
//           return fetchRes;
//         })
//       });
//     }).catch(() => {
//       if(evt.request.url.indexOf('.html') > -1){
//         return caches.match('offline.html');
//       } 
//     })
//   );
// });

