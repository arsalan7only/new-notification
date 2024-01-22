const PRECACHE = "precache-v1";
const RUNTIME = "runtime";

const PRECACHE_URLS = [
  "/index.html",
  "/js/main.js",
  "https://fonts.googleapis.com/css?family=Roboto:300400&display=swap",
  "/manifest.json",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(PRECACHE)
      .then((cache) => {
        return cache.addAll(PRECACHE_URLS);
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) => {
      for (let name of names) {
        caches.delete(name);
      }
    })
  );
});

// The `push` event is triggered by a call to `registration.pushManager.
// subscribe()` by the user's script.
self.addEventListener("fetch", (event) => {
  if (event.request.url.startWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return caches.open(RUNTIME).then((cache) => {
          return fetch(event.request).then((response) => {
            // Put a copy of the response in the runtime cache.
            // Return the original response since that’s what your web app
            // needs to show the page.
            return cache.put(event.request, response.clone()).then(() => {
              return response;
            });
          });
        });
      })
    );
  }
});
