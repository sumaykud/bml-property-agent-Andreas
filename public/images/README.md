# Direktori Aset Gambar

Semua foto properti ada di sini. **Ganti foto = timpa berkasnya.** Tidak ada kode
yang perlu diubah selama nama berkas dan jumlahnya tetap sama.

---

## Ukuran yang dipakai

| | |
| --- | --- |
| **Dimensi** | **1600 × 1200 piksel** (rasio 4:3, mendatar/landscape) |
| **Format** | JPG (`.jpg`) |
| **Ukuran berkas** | usahakan **di bawah 300 kB** per foto |
| **Orientasi** | mendatar — foto tegak akan terpotong banyak |

Setiap berkas placeholder yang ada sekarang sudah berukuran persis 1600 × 1200 dan
menampilkan tulisan ukurannya di tengah gambar, jadi bisa dipakai sebagai acuan.

### Kenapa 4:3

Foto yang sama dipakai di tiga tempat dengan bentuk berbeda, dan dipotong otomatis
(`object-fit: cover`) dari **bagian tengah** gambar:

| Tempat | Bentuk tampil |
| --- | --- |
| Kartu di halaman depan | 4:3 (utuh, tidak terpotong) |
| Foto utama di halaman detail | agak persegi — sisi kiri/kanan sedikit terpotong |
| Thumbnail kecil di halaman detail | melebar — atas/bawah terpotong cukup banyak |
| Penampil layar penuh | utuh, tidak terpotong |

**Karena itu: letakkan obyek utama di tengah foto.** Jangan taruh bagian penting
(nomor rumah, wajah, papan nama) terlalu mepet ke tepi.

---

## Susunan folder

```
public/images/properties/<slug-properti>/
    01.jpg   ← dipakai sebagai foto utama & gambar kartu di halaman depan
    02.jpg
    03.jpg
    ...
```

`<slug-properti>` sama persis dengan nilai `slug` di
[`src/data/properties.ts`](../../src/data/properties.ts).

Folder yang tersedia sekarang — **masing-masing 6 foto** (`01.jpg` … `06.jpg`):

**Griya Sea Lestari 5**

| Cluster | Folder |
| --- | --- |
| Beverly Hills 2 | `beverly-hills-2` |
| Sea Forest | `sea-forest` |
| The Forest | `the-forest` |
| Snowy Owl | `snowy-owl` |
| Redwing 23 (KLT) | `redwing-23` |
| The Peak | `the-peak` |

**Griya Mapanget Lestari**

| Cluster | Folder |
| --- | --- |
| Stream Valley | `stream-valley` |
| Green Valley | `green-valley` |
| Heart Forest | `heart-forest` |

**The Pasific Bay**

| Cluster | Folder |
| --- | --- |
| Beach Front | `beach-front` |
| Coastal Bay | `coastal-bay` |
| Coastal Hill | `coastal-hill` |
| Oceanic | `oceanic` |

**Pre-owned**

| Cluster | Folder |
| --- | --- |
| Ruko Sea | `ruko-sea` |
| Royale Terrace | `royale-terrace` |
| Diamond Hill | `diamond-hill` |

Penomoran **harus** dua digit berurutan mulai `01` (`01`, `02`, … `10`, `11`).
`1.jpg` atau `foto-1.jpg` tidak akan terbaca.

---

## Cara mengganti

1. Siapkan foto: ubah ukuran ke 1600 × 1200, simpan sebagai JPG.
2. Beri nama `01.jpg`, `02.jpg`, dan seterusnya.
3. Timpa berkas di folder slug yang sesuai.
4. Selesai — muat ulang halaman.

`01.jpg` adalah foto yang paling sering dilihat (muncul di kartu halaman depan
**dan** sebagai foto utama halaman detail), jadi pilih foto terbaik untuk nomor ini.

### Mengubah jumlah foto

Jumlah foto dibaca dari `photoCount` di `src/data/properties.ts`, bukan dari isi
folder. Kalau menambah atau mengurangi foto, sesuaikan `photoCount` properti itu —
kalau tidak, foto tambahan tidak akan muncul, atau ada nomor yang dicari tapi tidak ada.

### Kalau berkasnya belum ada

Tidak error dan tidak ada ikon gambar rusak: aplikasi otomatis menampilkan gambar
pengganti berupa SVG, dan tata letaknya tetap sama. Di penampil layar penuh akan
tertulis foto ke berapa yang belum ada beserta path berkas yang dicari.

---

## Membuat ulang placeholder

Kalau menambah properti baru di `src/data/properties.ts`:

```bash
npm run placeholders
```

Perintah ini membuat berkas placeholder untuk **semua** properti sesuai `photoCount`
masing-masing. Perlu `ffmpeg` terpasang. **Hati-hati: perintah ini menimpa berkas
yang sudah ada di folder ini**, termasuk foto asli yang sudah dipasang.

---

---

## Foto agen

```
public/images/agent/andreas.jpg
```

Dipakai di bagian hero halaman depan. Timpa berkasnya untuk mengganti.

| | |
| --- | --- |
| **Dimensi sekarang** | 716 × 698 (nyaris persegi) |
| **Rasio yang disarankan** | **mendekati 1:1** — jangan dipotong tegak atau mendatar |
| **Ukuran berkas** | usahakan di bawah 150 kB |

**Kenapa harus mendekati persegi:** bingkainya berubah bentuk mengikuti layar —
**tegak 4:5 di desktop**, tapi **mendatar 5:4 di ponsel**. Foto yang sudah dipotong
ke salah satu rasio akan terpotong berlebihan di rasio satunya. Foto persegi aman
di keduanya.

Posisi pemotongan diatur `object-position: center 22%` di `src/styles.css`
(dijaga ke arah atas karena wajah ada di paruh atas foto). Sesuaikan angka itu
bila komposisi foto penggantinya berbeda.

---

## Berkas lain di sini

| Berkas | Keterangan |
| --- | --- |
| `../logo-bml.png` | Logo BML di header & footer (340 × 120) |
| `../favicon.png` | Ikon tab, diambil dari monogram BML (180 × 180) |
| `../../brand/logo-bml-source.png` | Logo asli resolusi penuh, tidak ikut di-build |
