const CACHE = 'training-20261103234526';
// Core files: the app can't run without these, so install fails if they can't be cached.
const CORE = ['./', './index.html', './manifest.json'];
// CDN extras: cached best-effort, so a CDN hiccup can't block the whole install.
// Versions are pinned — "@latest" could pull a future release that renames icons.
const EXTRAS = [
  'https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.19.0/dist/tabler-icons.min.css',
  'https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.19.0/dist/fonts/tabler-icons.woff2'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(async c => {
    // cache:'reload' bypasses the browser HTTP cache, so we never precache a stale index.html.
    await c.addAll(CORE.map(u => new Request(u, {cache: 'reload'})));
    await Promise.all(EXTRAS.map(u =>
      fetch(new Request(u, {cache: 'reload'})).then(r => r.ok ? c.put(u, r) : null).catch(() => null)
    ));
  }).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request).then(cached => {
    if (cached) return cached;
    return fetch(e.request).then(res => {
      if (res && res.status === 200 && res.type !== 'opaque') {
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
      }
      return res;
    }).catch(() => {
      if (e.request.mode === 'navigate') return caches.match('./index.html');
      return new Response('', {status: 503, statusText: 'Offline'});
    });
  }));
});
