var doCache = true; // Set this to true for production

var CACHE_NAME = "my-pwa-cache-v1";

self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) => {
          if (!cacheWhitelist.includes(key)) {
            console.log("Deleting cache: " + key);
            return caches.delete(key);
          }
        })
      )
    )
  );
});

self.addEventListener("install", function (event) {
  if (doCache) {
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        cache.addAll([
          "/",
          "/index.html",
          "/manifest.json",
          "/static/js/bundle.js",
          // Add other assets as needed
        ]);
      })
    );
  }
});

self.addEventListener("fetch", function (event) {
  if (doCache) {
    event.respondWith(
      caches.match(event.request).then(function (response) {
        return response || fetch(event.request);
      })
    );
  }
});
