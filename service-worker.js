// service-worker.js - VERSÃO NUCLEAR v2.0

// Versão atualizada para passar todos os testes
const CACHE_NAME = 'pescapp-final-v3.0';
const OFFLINE_URL = '/index.html';
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/css/style.css',
  '/js/app.js',
  '/js/api-integrations.js',
  '/js/data/database-es.js',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

//const CACHE_NAME = 'pescapp-NUKE-v2.0';
//const OFFLINE_URL = '/index.html';

// Instalação FORÇADA
self.addEventListener('install', event => {
  console.log('[SW] 💥 INSTALAÇÃO NUCLEAR - v2.0');
  self.skipWaiting();
  
  // Deleta TODOS os caches antigos
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          console.log(`[SW] 💣 Destruindo cache: ${cache}`);
          return caches.delete(cache);
        })
      );
    }).then(() => {
      console.log('[SW] ✅ Todos os caches destruídos');
      return caches.open(CACHE_NAME);
    }).then(cache => {
      console.log('[SW] 📦 Cache limpo criado');
      return cache.addAll([
        OFFLINE_URL,
        '/',
        '/manifest.json',
        '/service-worker.js'
      ]);
    })
  );
});

// Ativação IMEDIATA
self.addEventListener('activate', event => {
  console.log('[SW] ⚡ ATIVAÇÃO IMEDIATA');
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cache => {
            if (cache !== CACHE_NAME) {
              console.log(`[SW] 🗑️ Removendo cache antigo: ${cache}`);
              return caches.delete(cache);
            }
          })
        );
      })
    ])
  );
});

// Estratégia SIMPLES e INFALÍVEL
self.addEventListener('fetch', event => {
  // Ignora requisições não-GET
  if (event.request.method !== 'GET') return;
  
  // Para navegação (PWA instalado)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          console.log('[SW] 🔌 Offline - servindo página principal');
          return caches.match(OFFLINE_URL);
        })
        .then(response => {
          return response || caches.match(OFFLINE_URL);
        })
    );
    return;
  }
  
  // Para outros recursos
  event.respondWith(
    caches.match(event.request)
      .then(cached => {
        // Retorna do cache se tem
        if (cached) {
          console.log(`[SW] 📦 Cache: ${event.request.url}`);
          return cached;
        }
        
        // Se não tem, busca na rede
        return fetch(event.request)
          .then(networkResponse => {
            // Guarda no cache para próxima vez
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME)
              .then(cache => cache.put(event.request, responseClone));
            return networkResponse;
          })
          .catch(error => {
            console.log(`[SW] ❌ Erro: ${event.request.url}`, error);
            // Se for CSS/JS, retorna vazio
            if (event.request.url.includes('.css')) {
              return new Response('', { headers: { 'Content-Type': 'text/css' } });
            }
            if (event.request.url.includes('.js')) {
              return new Response('// Offline', { headers: { 'Content-Type': 'application/javascript' } });
            }
            throw error;
          });
      })
  );
});

console.log('[SW] 🚀 Service Worker NUCLEAR carregado!');