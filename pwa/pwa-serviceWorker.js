const CACHE = 'cache-v1';
const OFFLINE = 'pwa-offline.html';

// Ao instalar o service worker, adicionar a página offline ao cache
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.add(OFFLINE)));
});

// Ao requisitar uma página, se estiver offline, servimos a página offline
self.addEventListener('fetch', (event) => {
  let request = event.request;
  if (event.request.mode === "navigate") {
    async function responder() {
      try {
        return await fetch(request, {
          cache: 'reload'
        });
      } catch (e) {
        const cache = await caches.open(CACHE);
        const offline = await cache.match(OFFLINE);
        return new Response(offline.body, {
          headers: offline.headers,
          status: offline.status,
          statusText: offline.statusText
        });
      }
    }
    event.respondWith(responder());
  }
});