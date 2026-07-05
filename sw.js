const CACHE_NAME = 'video-app-v1';
const urlsToCache = ['/','index.html','manifest.json'];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  // 视频文件不缓存
  if (event.request.url.match(/\.(mp4|mov|avi|mkv|m3u8)/i)) {
    return;
  }
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});