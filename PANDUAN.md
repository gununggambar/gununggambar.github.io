# Panduan Situs Gunung Gambar Coffee

Situs ini **statis**: hanya file HTML, CSS, dan JS. Tidak perlu server, database, atau biaya bulanan.
Bisa dihosting gratis di GitHub Pages, Netlify, atau Cloudflare Pages.

## Isi folder
| File | Fungsi |
|---|---|
| `index.html` | Halaman utama: cerita, kebun, kopi, cara seduh, kunjungi |
| `produk.html` | Halaman tujuan QR di kemasan (detail tiap kemasan) |
| `data/produk.js` | **Data produk.** Ubah di sini untuk harga, proses, tanggal sangrai, dll. |
| `assets/style.css` | Warna dan tampilan |
| `assets/app.js` | Skrip kecil untuk halaman produk |
| `sw.js` | Menyimpan halaman agar bisa dibuka tanpa sinyal |

## Mengubah data produk
1. Buka `data/produk.js`.
2. Ganti teks di antara tanda kutip, misalnya `harga: "[HARGA]"` menjadi `harga: "Rp25.000"`.
3. Teks yang masih diawali `[` akan tampil sebagai kotak bergaris (tanda belum diisi).
4. Simpan dan unggah ulang.

## Menambah kemasan / batch baru
1. Di `data/produk.js`, salin satu blok `{ ... }`, tempel di bawahnya, beri koma di antaranya.
2. Ganti `id` (huruf kecil, pakai tanda `-`), misalnya `robusta-100g-2027`.
3. Alamat halamannya menjadi `produk.html#robusta-100g-2027`.

**Penting:** jangan mengganti `id` yang sudah tercetak di QR kemasan.

## QR code
QR di kemasan mengarah ke alamat tetap: `https://[DOMAIN]/produk.html#<id>`.
Domain dan cara pembuatan QR akan dilengkapi setelah domain dipilih.

## Setelah memperbarui isi
Buka `sw.js` dan ganti `VERSI` (misalnya `gg-v1` menjadi `gg-v2`) supaya ponsel pengunjung memuat isi terbaru.
