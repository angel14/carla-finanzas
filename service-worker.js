// Nombre del caché
const CACHE_NAME = "carla-finanzas-v1";

// Archivos que se deben guardar para modo offline
const urlsToCache = [
  "/carla-finanzas/",
  "/carla-finanzas/index.html",
  "/carla-finanzas/icon-192.png",
  "/carla-finanzas/icon-512.png"
];

// Instalar el service worker y guardar en caché
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Interceptar peticiones y responder desde caché si es posible
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Devuelve la copia del caché o, si no existe, busca en la red
      return response || fetch(event.request);
    })
  );
});

// Actualizar el caché cuando cambies los archivos
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
