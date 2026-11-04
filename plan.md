# Plan Webapp Jualan Parfum Simpel — Tema Halloween

## 1. Tujuan
Membuat webapp katalog dan penjualan parfum sederhana dengan nuansa Halloween. Pengunjung dapat melihat produk, mencari atau memfilter parfum, menambahkan produk ke keranjang, lalu menyelesaikan pesanan melalui WhatsApp.

## 2. Batasan Teknologi
- **HTML** untuk struktur halaman.
- **CSS** untuk layout, responsivitas, animasi ringan, dan tema visual.
- **JavaScript murni (vanilla JS)** untuk interaksi dan pengelolaan keranjang.
- Tidak menggunakan database, backend, cloud, framework, maupun layanan eksternal.
- Data produk disimpan sebagai array di file JavaScript.
- Keranjang dapat disimpan di `localStorage` pada browser pengguna.
- Checkout menyiapkan pesan pesanan dan membuka WhatsApp; tidak ada pembayaran otomatis.

## 3. Konsep Visual
- Palet warna: hitam pekat, ungu gelap, oranye labu, dan putih tulang.
- Suasana: elegan, sedikit misterius, tetap mudah dibaca dan tidak terlalu ramai.
- Elemen dekoratif: bulan, bintang, kabut/gradient, siluet kelelawar atau labu dalam bentuk CSS/emoji.
- Font menggunakan font sistem agar tidak memerlukan layanan eksternal.
- Animasi kecil untuk hover tombol/kartu; hormati preferensi `prefers-reduced-motion`.

## 4. Struktur Halaman
1. **Header / navigasi**
   - Nama toko dan logo teks.
   - Tautan ke Beranda, Produk, Tentang, dan Kontak.
   - Tombol keranjang dengan jumlah item.
2. **Hero**
   - Judul promosi bertema Halloween.
   - Deskripsi singkat dan tombol “Jelajahi Parfum”.
3. **Katalog produk**
   - Kartu produk berisi gambar, nama, kategori/aroma, ukuran, harga, dan tombol tambah ke keranjang.
   - Pencarian berdasarkan nama.
   - Filter kategori sederhana (misalnya Floral, Woody, Fresh, Sweet).
4. **Tentang toko**
   - Deskripsi singkat toko dan keunggulan produk.
5. **Keranjang**
   - Panel/modal berisi item, harga, kontrol jumlah, subtotal, dan hapus item.
   - Tampilan kondisi keranjang kosong.
6. **Checkout / kontak**
   - Form nama dan alamat opsional.
   - Tombol checkout menyusun ringkasan pesanan menjadi tautan WhatsApp.
7. **Footer**
   - Kontak, catatan bahwa pemesanan diproses manual, dan hak cipta.

## 5. Struktur File
```text
parfum-halloween/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── app.js
└── assets/
    └── (gambar produk lokal, jika tersedia)
```

## 6. Data Produk
Buat array produk statis di `js/app.js`, dengan properti seperti:
`id`, `nama`, `kategori`, `ukuran`, `harga`, `deskripsi`, dan `gambar`.

Gunakan placeholder lokal atau gradient bila gambar belum tersedia. Hindari ketergantungan pada gambar dari layanan cloud.

## 7. Fitur dan Perilaku JavaScript
- Render kartu produk dari array statis.
- Pencarian dan filter kategori tanpa memuat ulang halaman.
- Tambah/hapus item serta ubah jumlah di keranjang.
- Hitung subtotal secara otomatis.
- Simpan dan pulihkan keranjang dari `localStorage`.
- Validasi input checkout dasar.
- Bentuk pesan WhatsApp berisi nama, daftar produk, jumlah, subtotal, dan alamat jika diisi.
- Nomor WhatsApp toko disimpan sebagai konstanta yang mudah diganti.

## 8. Aksesibilitas dan Responsivitas
- Layout mobile-first dan nyaman digunakan di ponsel maupun desktop.
- Gunakan elemen HTML semantik, label form, teks alternatif gambar, dan fokus keyboard yang terlihat.
- Pastikan kontras teks memadai meski memakai latar gelap.
- Tombol memiliki teks yang jelas; jangan mengandalkan warna saja untuk menyampaikan status.

## 9. Tahapan Pengerjaan
1. Siapkan folder dan file HTML, CSS, serta JavaScript.
2. Buat kerangka semantik halaman dan navigasi.
3. Terapkan tema Halloween serta layout responsif.
4. Tambahkan data contoh dan render katalog.
5. Implementasikan pencarian, filter, dan keranjang.
6. Implementasikan penyimpanan keranjang lokal dan checkout WhatsApp.
7. Uji alur di ponsel/desktop, termasuk keranjang kosong, jumlah item, dan input checkout.
8. Rapikan aksesibilitas, teks, dan detail visual.

## 10. Kriteria Selesai
- Halaman berfungsi dengan membuka `index.html` langsung di browser.
- Katalog, pencarian, filter, dan keranjang berjalan tanpa backend.
- Keranjang tetap tersimpan setelah halaman dimuat ulang pada browser yang sama.
- Checkout menghasilkan pesan WhatsApp yang benar setelah nomor toko diatur.
- Tampilan responsif, tema Halloween konsisten, dan tidak ada dependensi database/cloud/framework.
