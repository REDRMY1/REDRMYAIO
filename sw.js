// Minimal Service Worker to support Add to Home Screen / PWA installability
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Let network handle requests directly
  event.respondWith(fetch(event.request).catch(() => new Response('Offline')));
});
