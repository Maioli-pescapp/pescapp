// sw.js - Service Worker para PescApp
const CACHE_NAME = 'pescapp-v2-' + new Date().getTime();
const urlsToCache = [
  './',
  './index.html',
  './js/app.js',
  './js/lunar-phase.js',
  './css/style.css'
];

// Instalar
self.addEventListener('install', event => {
  console.log('🔄 Instalando PescApp v2');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

// Ativar e limpar caches antigos
self.addEventListener('activate', event => {
  console.log('✅ PescApp v2 ativo');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Removendo cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Interceptar requisições
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});