const CACHE = 'cache-v1';
const OFFLINE = 'pwa-offline.html';

// Arquivos para adicionar ao cache
const arquivosCache = ['./', 'index.html', OFFLINE, 'pwa.css', 'pwa.js', 'pwa-192.png'];

// Ao instalar o service worker, adicionar os arquivos ao cache
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(arquivosCache)));
});

self.addEventListener('fetch', (event) => {
  let request = event.request;
  if (event.request.mode === "navigate") {
    async function responder() {
      try {
        const response = await fetch(request, {
          cache: "no-cache"
        });
        return response;
      } catch (e) {
        const cache = await caches.open(CACHE);
        const offline =  await cache.match(OFFLINE);
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