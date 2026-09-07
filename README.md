# BML Property — Landing Page Agen Andreas

Landing page satu halaman untuk **Andreas**, agen properti **PT Bangun Minanga Lestari (BML)**,
lengkap dengan halaman detail per properti dan simulasi KPR.

Dibangun dengan **React 19 + Vite + TypeScript**, tema terang & bersih, siap deploy ke Vercel.

---

## Menjalankan secara lokal

```bash
npm install
```

```bash
npm run dev
```

| Perintah            | Fungsi                                        |
| ------------------- | --------------------------------------------- |
| `npm run dev`       | Server pengembangan (hot reload)              |
| `npm run build`     | Type-check + build produksi ke `dist/`        |
| `npm run preview`   | Menjalankan hasil build produksi secara lokal |
| `npm run typecheck` | Hanya pemeriksaan TypeScript                  |
| `npm run placeholders` | Membuat ulang foto placeholder (butuh ffmpeg) |

---

## Struktur halaman

Mengikuti wireframe, beranda hanya terdiri dari tiga bagian:

| Bagian     | Anchor       | Isi                                                            |
| ---------- | ------------ | -------------------------------------------------------------- |
| Header     | —            | Logo BML, menu anchor, tombol Konsultasi (WhatsApp)             |
| Hero       | —            | Judul, ringkasan, CTA, bukti sosial, foto agen                  |
| Listing    | `#properti`  | Filter Semua / Rumah / Apartemen, grid kartu properti           |
| FAQ        | `#faq`       | Akordeon lima pertanyaan                                        |
| Footer     | —            | Logo BML, kolom Properti / Akun / Support                       |

Menu header adalah **anchor ke section** (`/#properti`, `/#faq`) dan tetap bekerja
dari halaman detail — navigasi berpindah ke beranda lalu menggulir ke bagian yang dituju.

Kartu properti mengarah ke halaman detail `/properti/:slug` yang berisi galeri,
spesifikasi, deskripsi, lokasi, **simulasi KPR sticky**, kartu agen, dan properti serupa.

---

## Mengganti konten

Semua konten yang perlu diubah terkumpul di dua file — tidak perlu menyentuh komponen.

**`src/lib/site.ts`** — identitas & kontak:

```ts
agent: {
  name: 'Andreas',
  whatsapp: '628134759648', // +62 813-4759-648 — internasional, tanpa "+"
  email: 'andreas@bmlproperty.co.id',
}
```

Nomor WhatsApp sudah berisi nomor asli Andreas dan dipakai oleh **seluruh tombol CTA**
(Konsultasi, Ajukan KPR, Kirim simulasi ke WA, Hubungi agen, Jadwalkan survei, dan
tautan di footer). Cukup ubah satu baris ini bila nomornya berganti.

> ⚠️ Alamat email masih **placeholder** — belum dipakai di antarmuka mana pun, tapi
> ganti bila nanti ditampilkan.

**`src/data/properties.ts`** — daftar listing. Tambah/ubah objek pada array `properties`;
`slug` menjadi URL halaman detail. Bisa diganti sumbernya ke CMS/API tanpa mengubah komponen.

### Mengganti foto

Foto dibaca dari `public/images/properties/<slug>/01.jpg`, `02.jpg`, dan seterusnya.
**Mengganti foto cukup dengan menimpa berkasnya** — tidak ada kode yang perlu disentuh.

| | |
| --- | --- |
| Dimensi | **1600 × 1200 px** (4:3, mendatar) |
| Format | JPG |
| Ukuran berkas | usahakan < 300 kB per foto |

Panduan lengkap ada di **[`public/images/README.md`](public/images/README.md)** —
termasuk daftar slug, cara pemotongan gambar di tiap tempat, dan cara menambah foto.

Berkas placeholder yang ada sekarang sudah berukuran persis 1600 × 1200 dan menuliskan
ukurannya di tengah gambar, jadi bisa langsung dipakai sebagai acuan. Bila sebuah berkas
belum ada, aplikasi otomatis menampilkan gambar pengganti SVG — tidak ada ikon gambar
rusak dan tata letak tetap utuh.

Membuat ulang placeholder setelah menambah properti baru (butuh `ffmpeg`):

```bash
npm run placeholders
```

> ⚠️ Perintah di atas **menimpa** seluruh isi `public/images/properties/`,
> termasuk foto asli yang sudah dipasang.

**Foto agen** ada di `public/images/agent/andreas.jpg` (716 × 698, nyaris persegi).
Timpa berkas itu untuk menggantinya. Rasionya sengaja dibiarkan hampir persegi:
bingkainya tegak 4:5 di desktop tapi mendatar 5:4 di layar sempit, jadi foto yang
sudah dipotong ke salah satu rasio akan rusak di rasio yang lain.

### Galeri & penampil foto

Keempat kotak foto di halaman detail bisa diklik dan membuka penampil layar penuh:

- geser maju/mundur lewat tombol panah atau tombol **←** / **→** di papan ketik
- kotak terakhir memuat label **"+N foto"** dan membuka seluruh koleksi
- tutup lewat tombol **✕**, tombol **Esc**, atau klik area gelap di luar foto
- gulir halaman latar dikunci selama penampil terbuka, dan fokus papan ketik
  dikembalikan ke kotak foto yang tadi diklik saat penampil ditutup

---

## Catatan performa

Kode situs (HTML + CSS + JavaScript) berbobot **± 96 kB gzip**, sudah termasuk React,
router, dan logo. **Foto berada di luar angka itu** dan kini menjadi bagian terberat
halaman — lihat catatan di bawah.

Yang dilakukan untuk menjaga kecepatan:

- **Tanpa font eksternal.** Memakai *system font stack*, sehingga tidak ada permintaan
  ke Google Fonts dan tidak ada FOUT/FOIT.
- **Tanpa framework CSS.** Satu file CSS (± 4,7 kB gzip); tidak ada kelas tak terpakai.
- **Tanpa pustaka chart maupun pustaka galeri.** Grafik pokok vs bunga dan penampil foto
  layar penuh ditulis sendiri — nol dependensi tambahan.
- **Logo 7 kB**, dikuantisasi ke palet dari 62 kB.
- **Semua rute dalam satu bundel.** Halaman detail hanya ± 2,3 kB gzip — memuatnya malas
  justru menambah satu perjalanan jaringan pada tautan properti yang paling sering dibagikan.
- **React dan router dipisah ke chunk sendiri** agar bisa di-*cache* panjang dan tidak
  ikut kedaluwarsa saat konten situs berubah.
- **Animasi seminimal mungkin.** Hanya teks yang beranimasi (*fade* + naik 10 px sekali
  saat masuk viewport) memakai `IntersectionObserver` yang langsung dilepas setelah terpicu.
  Otomatis nonaktif bila pengguna memilih `prefers-reduced-motion`.

### Soal bobot foto

Sejak foto asli dipakai, gambar menjadi penyumbang bobot terbesar — sifat bawaan situs
properti. Yang sudah dilakukan:

- semua foto `loading="lazy"` kecuali foto utama halaman detail, yang dimuat lebih awal
  karena berada di paruh atas halaman;
- `width`/`height` dan `aspect-ratio` dipasang, jadi tidak ada pergeseran tata letak
  (*layout shift*) saat gambar masuk;
- foto di penampil layar penuh baru diminta saat penampil dibuka, dan foto tetangga
  disiapkan diam-diam agar perpindahan terasa instan;
- `sizes` diisi supaya browser tidak mengambil gambar lebih besar dari yang dibutuhkan.

**Yang masih bergantung pada Anda:** kompres foto sebelum menaruhnya di folder. Target
di bawah 300 kB per foto. Foto langsung dari kamera bisa 5–10 MB dan akan membuat
halaman terasa lambat meskipun kodenya ringan.

---

## Deploy ke Vercel

Repositori ini sudah siap deploy — `vercel.json` mengatur *framework preset*, SPA rewrite,
dan header cache.

1. Buka [vercel.com/new](https://vercel.com/new) → **Import Git Repository** → pilih repo ini.
2. Biarkan semua pengaturan apa adanya (terbaca otomatis dari `vercel.json`).
3. **Deploy.**

Tidak ada *environment variable* yang dibutuhkan.

Konfigurasi yang sudah disiapkan di `vercel.json`:

- **SPA rewrite** — semua rute diarahkan ke `index.html`, sehingga membuka
  `/properti/<slug>` langsung (atau me-refresh halaman detail) tidak menghasilkan 404.
- **Cache** — `assets/*` di-*cache* satu tahun (`immutable`, aman karena nama file ber-hash).
- **Header keamanan** — `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`.

### Setelah punya domain

Ganti URL `https://bml-property-agent-andreas.vercel.app` dengan domain final di:

- `index.html` → `<link rel="canonical">`
- `public/robots.txt` → baris `Sitemap:`
- `public/sitemap.xml` → seluruh `<loc>`

---

## Struktur berkas

```
public/            logo, favicon, robots.txt, sitemap.xml
  images/          foto properti & foto agen — lihat public/images/README.md
brand/             logo sumber resolusi penuh (tidak ikut di-build)
scripts/           generate-placeholders.mjs (pembuat foto placeholder)
src/
  components/      Header, Hero, Listings, PropertyCard, PropertyImage, Faq,
                   Footer, MortgageCalculator, Lightbox, PhotoPlaceholder, Reveal
  pages/           Home, PropertyDetail, NotFound
  data/            properties.ts   ← sumber data listing
  lib/             site.ts (kontak), format.ts (Rupiah + anuitas KPR),
                   photos.ts (path & ukuran foto)
  styles.css       seluruh gaya situs
```

## Catatan simulasi KPR

Perhitungan memakai skema **anuitas** standar:

```
M = P · i / (1 − (1 + i)⁻ⁿ)
```

dengan `P` pokok pinjaman, `i` bunga bulanan, dan `n` jumlah bulan (kasus bunga 0%
ditangani terpisah). Hasilnya hanya gambaran — angka final ditentukan bank penerbit,
termasuk biaya provisi, asuransi, dan appraisal. Kalimat penyangkalan ini sudah
ditampilkan di bawah kalkulator.
