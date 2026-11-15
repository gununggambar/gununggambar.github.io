/* Simpan halaman agar tetap terbuka tanpa sinyal.
   Ubah VERSI setiap kali isi situs diperbarui. */
var VERSI = "gg-v1";
var FILE = ["./", "index.html", "produk.html", "assets/style.css", "assets/app.js", "data/produk.js", "manifest.webmanifest"];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(VERSI).then(function (c) { return c.addAll(FILE); }));
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== VERSI; }).map(function (k) { return caches.delete(k); }));
  }));
  self.clients.claim();
});

/* Coba jaringan dulu (isi terbaru), kalau gagal pakai simpanan */
self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request).then(function (res) {
      var salinan = res.clone();
      caches.open(VERSI).then(function (c) { c.put(e.request, salinan); });
      return res;
    }).catch(function () {
      return caches.match(e.request, { ignoreSearch: true }).then(function (r) { return r || caches.match("index.html"); });
    })
  );
});
