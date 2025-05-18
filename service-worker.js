const CACHE_NAME = 'bary-branik-v3';
const APP_SHELL = [
  '/',
  '/index.html',
  '/styles.css',
  '/manifest.json',
  '/icon-192x192.png',
  '/icon-512x512.png',
  '/app.js'
];

const DATA_CACHE_NAME = 'bary-data-v1';

// Instalace service workeru
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(APP_SHELL);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// Aktivace service workeru
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME, DATA_CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Zpracování požadavků - strategie Cache First s Network Fallback
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // Požadavky na API nebo dynamický obsah - použít Network First s Cache Fallback
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (!response || response.status !== 200) {
            return response;
          }
          
          const responseToCache = response.clone();
          caches.open(DATA_CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
          
          return response;
        })
        .catch(() => {
          return caches.match(event.request);
        })
    );
    return;
  }
  
  // Statický obsah - použít Cache First s Network Fallback
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        
        return fetch(event.request)
          .then(response => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          })
          .catch(() => {
            // Pokud požadavek selže a nemáme v cache, vracíme offline stránku
            if (event.request.mode === 'navigate') {
              return caches.match('/offline.html');
            }
            
            // Pro ostatní selhané požadavky
            return new Response('Offline', {
              status: 503,
              statusText: 'Service Unavailable'
            });
          });
      })
  );
});

// Synchronizace při obnovení připojení
self.addEventListener('sync', event => {
  if (event.tag === 'sync-invoices') {
    event.waitUntil(syncInvoices());
  }
});

// Funkce pro synchronizaci nevyřízených operací
async function syncInvoices() {
  const db = await openDatabase();
  const tx = db.transaction('pending-operations', 'readonly');
  const store = tx.objectStore('pending-operations');
  const operations = await store.getAll();
  
  for (const op of operations) {
    try {
      // Zde implementujte odeslání operace na server
      // ...
      
      // Po úspěšném odeslání odstraňte operaci z pending-operations
      const deleteTx = db.transaction('pending-operations', 'readwrite');
      const deleteStore = deleteTx.objectStore('pending-operations');
      await deleteStore.delete(op.id);
    } catch (error) {
      console.error('Synchronizace selhala:', error);
      // Ponecháme operaci v pending-operations pro další pokus
    }
  }
}

// Pomocná funkce pro otevření IndexedDB
function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('bary-offline-db', 1);
    
    request.onerror = (event) => {
      reject('Nepodařilo se otevřít databázi');
    };
    
    request.onsuccess = (event) => {
      resolve(event.target.result);
    };
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      
      // Uložiště pro nevyřízené operace
      if (!db.objectStoreNames.contains('pending-operations')) {
        db.createObjectStore('pending-operations', { keyPath: 'id' });
      }
    };
  });
}
