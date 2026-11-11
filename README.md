# Nocturne — Parfum Halloween Webapp

Katalog dan pemesanan parfum sederhana bertema Halloween. Dibangun sepenuhnya dengan **HTML, CSS, dan JavaScript** tanpa database, backend, framework, maupun layanan cloud.

**Demo:** https://cleonkenward.github.io/Nocturne/

## Fitur

- Katalog parfum dengan tampilan bertema Halloween.
- Pencarian berdasarkan nama, kategori, dan deskripsi aroma.
- Filter kategori: Floral, Woody, Fresh, dan Sweet.
- Keranjang belanja dengan tambah, kurangi, dan hapus item.
- Subtotal dihitung otomatis.
- Keranjang tersimpan di `localStorage`, jadi tetap ada setelah halaman dimuat ulang.
- Checkout menyusun ringkasan pesanan dan membukanya di WhatsApp.
- Desain responsif untuk ponsel, tablet, dan desktop.
- Navigasi mobile, status keranjang, dan notifikasi interaksi.

## Menjalankan

Tidak perlu instalasi atau build. Buka `index.html` langsung di browser.

Jika ingin menjalankan melalui server lokal:

```bash
python -m http.server 8000
```

Lalu buka `http://localhost:8000`.

## Mengatur Nomor WhatsApp

Buka `js/app.js` dan isi konstanta berikut dengan nomor WhatsApp toko:

```js
const WHATSAPP_NUMBER = '6281234567890';
```

Gunakan format internasional tanpa tanda `+`, spasi, atau tanda hubung. Jika dibiarkan kosong, checkout tetap membuka WhatsApp dengan pesan pesanan yang sudah disiapkan, lalu pengguna memilih kontak tujuan secara manual.

## Mengubah Produk

Daftar produk berada di array `products` pada `js/app.js`. Setiap produk memiliki properti:

```js
{
  id: 'velvet-dusk',
  name: 'Velvet Dusk',
  category: 'Woody',
  size: '50 ml',
  price: 189000,
  description: 'Kayu cedar, amber hangat, dan sedikit misteri.',
  visual: 'amber',
  badge: 'Bestseller',
  number: '01'
}
```

- `price` diisi dalam rupiah tanpa pemisah ribuan.
- `visual` menentukan warna ilustrasi botol: `amber`, `violet`, `moss`, `rose`, `midnight`, atau `cream`.
- `badge` boleh dikosongkan.
- `id` harus unik karena digunakan untuk menyimpan item keranjang.

## Struktur File

```text
.
├── index.html
├── css/
│   └── style.css
├── js/
│   └── app.js
├── plan.md
└── README.md
```

## Catatan

- Semua data produk bersifat statis di dalam JavaScript.
- Keranjang hanya tersimpan di browser pengguna dan tidak dikirim ke server.
- Tidak ada pembayaran otomatis. Pesanan dikonfirmasi secara manual melalui WhatsApp.
- Gambar botol dibuat dengan CSS, sehingga tidak memerlukan aset atau koneksi internet.
- Tema warna dan tata letak dapat disesuaikan melalui variabel CSS di `css/style.css`.
