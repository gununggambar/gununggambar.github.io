/* Gunung Gambar Coffee — skrip kecil, tanpa library */
(function () {
  "use strict";

  // Simpan halaman untuk dibuka tanpa sinyal (hanya di situs asli, bukan pratinjau)
  try {
    if ("serviceWorker" in navigator && location.protocol === "https:") {
      navigator.serviceWorker.register("sw.js").catch(function () {});
    }
  } catch (e) {}

  // ---------- Halaman produk ----------
  var wadah = document.getElementById("p-fakta");
  if (!wadah || !window.PRODUK) return;

  var BARIS = [
    ["asal", "Asal"], ["kebun", "Kebun"], ["petani", "Petani"], ["varietas", "Varietas"],
    ["ketinggian", "Ketinggian"], ["proses", "Proses"], ["sangrai", "Tingkat sangrai"],
    ["tanggal_panen", "Panen"], ["tanggal_sangrai", "Tanggal sangrai"], ["rasa", "Catatan rasa"]
  ];

  function teks(el, isi) {
    // Teks berkurung [ ... ] = belum diisi, tampil sebagai kotak isian
    el.textContent = "";
    if (typeof isi === "string" && isi.charAt(0) === "[") {
      var s = document.createElement("span");
      s.className = "isian";
      s.textContent = isi;
      el.appendChild(s);
    } else {
      el.textContent = isi || "-";
    }
  }

  function tampilkan() {
    var id = decodeURIComponent((location.hash || "").replace("#", ""));
    var p = null;
    for (var i = 0; i < window.PRODUK.length; i++) {
      if (window.PRODUK[i].id === id) p = window.PRODUK[i];
    }
    if (!p) p = window.PRODUK[0];

    document.title = p.nama + " " + p.berat + " — Gunung Gambar Coffee";
    teks(document.getElementById("p-nama"), p.nama);
    teks(document.getElementById("p-berat"), p.berat);
    teks(document.getElementById("p-bentuk"), p.bentuk);
    teks(document.getElementById("p-cerita"), p.cerita);
    teks(document.getElementById("p-kontak"), p.kontak);
    teks(document.getElementById("p-harga"), p.harga);

    var tbody = document.getElementById("p-fakta");
    tbody.textContent = "";
    BARIS.forEach(function (b) {
      var tr = document.createElement("tr");
      var th = document.createElement("th"); th.scope = "row"; th.textContent = b[1];
      var td = document.createElement("td"); teks(td, p[b[0]]);
      tr.appendChild(th); tr.appendChild(td); tbody.appendChild(tr);
    });

    var pilih = document.getElementById("p-pilih");
    pilih.textContent = "";
    window.PRODUK.forEach(function (q) {
      var a = document.createElement("a");
      a.href = "#" + q.id;
      a.textContent = q.nama + " " + q.berat;
      if (q.id === p.id) a.setAttribute("aria-current", "true");
      pilih.appendChild(a);
    });
  }

  window.addEventListener("hashchange", tampilkan);
  tampilkan();
})();
