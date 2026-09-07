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
  whatsapp: '6281234567890', // ← ganti dengan nomor asli, format internasional tanpa "+"
  email: 'andreas@bmlproperty.co.id',
}
```

> ⚠️ Nomor WhatsApp saat ini masih **placeholder**. Semua tombol CTA mengarah ke
> `wa.me/<nomor>`, jadi ganti nilai ini sebelum situs dipakai.

**`src/data/properties.ts`** — daftar listing. Tambah/ubah objek pada array `properties`;
`slug` menjadi URL halaman detail. Bisa diganti sumbernya ke CMS/API tanpa mengubah komponen.

### Mengganti foto

Foto properti dan foto agen saat ini memakai placeholder SVG inline
(`src/components/PhotoPlaceholder.tsx` dan siluet di `src/components/Hero.tsx`) —
nol permintaan jaringan dan nol *layout shift*.

Untuk memakai foto asli, ganti komponen placeholder dengan `<img>`:

```tsx
<img src={property.photo} alt={property.title} loading="lazy" decoding="async" />
```

Rasio gambar sudah dikunci lewat CSS (`aspect-ratio` pada `.card__media` dan `.gallery`),
jadi tata letak tidak akan bergeser saat gambar dimuat.

---

## Catatan performa

Total muatan seluruh situs **± 94 kB (gzip)** — sudah termasuk React, router, CSS, dan logo.

Yang dilakukan untuk menjaga kecepatan:

- **Tanpa font eksternal.** Memakai *system font stack*, sehingga tidak ada permintaan
  ke Google Fonts dan tidak ada FOUT/FOIT.
- **Tanpa framework CSS.** Satu file CSS (± 4,3 kB gzip); tidak ada kelas tak terpakai.
- **Tanpa pustaka chart.** Grafik pokok vs bunga digambar dengan CSS biasa.
- **Gambar nol byte jaringan.** Placeholder berupa SVG inline; satu-satunya file gambar
  adalah logo (7 kB, sudah dikuantisasi ke palet dari 62 kB).
- **Semua rute dalam satu bundel.** Halaman detail hanya ± 2,3 kB gzip — memuatnya malas
  justru menambah satu perjalanan jaringan pada tautan properti yang paling sering dibagikan.
- **React dan router dipisah ke chunk sendiri** agar bisa di-*cache* panjang dan tidak
  ikut kedaluwarsa saat konten situs berubah.
- **Animasi seminimal mungkin.** Hanya teks yang beranimasi (*fade* + naik 10 px sekali
  saat masuk viewport) memakai `IntersectionObserver` yang langsung dilepas setelah terpicu.
  Otomatis nonaktif bila pengguna memilih `prefers-reduced-motion`.

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
brand/             logo sumber resolusi penuh (tidak ikut di-build)
src/
  components/      Header, Hero, Listings, PropertyCard, Faq, Footer,
                   MortgageCalculator, PhotoPlaceholder, Reveal
  pages/           Home, PropertyDetail, NotFound
  data/            properties.ts   ← sumber data listing
  lib/             site.ts (kontak), format.ts (Rupiah + anuitas KPR)
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
