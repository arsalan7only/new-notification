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

self.addEventListener("push", (event) => {
  const notification = event.data.text();
  const convertParse = JSON.parse(notification);
  const options = {
    body: convertParse.body,
    icon: convertParse.icon,
    vibrate: [100, 50, 100],
    data: { url: convertParse.url },
    title: convertParse.title,
  };

  if (Object.keys(convertParse).length > 0) {
    event.waitUntil(
      self.registration.showNotification(
        convertParse.title,
        convertParse.notification
      )
    );
  }
});

self.addEventListener("push", (event) => {
  // Extract the unread count from the push message data.
  const message = event.data.json();
  const unreadCount = message.unreadCount;

  // Set or clear the badge.
  if (navigator.setAppBadge) {
    if (unreadCount && unreadCount > 0) {
      navigator.setAppBadge(unreadCount);
    } else {
      navigator.clearAppBadge();
    }
  }
});
