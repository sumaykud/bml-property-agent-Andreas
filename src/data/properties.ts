export type PropertyType = 'rumah' | 'apartemen'

export interface Property {
  slug: string
  title: string
  /** Nama cluster/blok. */
  cluster: string
  area: string
  /** Bentuk bangunan. Dipakai sebagai label kecil di kartu dan halaman detail. */
  type: PropertyType
  /**
   * Kelompok yang dipakai tombol saring di beranda.
   *
   * Daftar tombolnya dibuat OTOMATIS dari nilai-nilai di sini — tidak ada
   * daftar terpisah yang perlu diubah. Menulis kategori baru pada satu unit
   * sudah cukup untuk memunculkan tombolnya; menghapusnya dari unit terakhir
   * membuat tombolnya hilang sendiri. Urutan tombol mengikuti urutan
   * kemunculan pertama di array `properties` di bawah.
   */
  category: string
  status: string
  /** Harga jual. Isi 0 bila harga belum ada — situs menulis "Harga menyusul". */
  price: number
  landArea: number
  buildingArea: number
  bedrooms: number
  bathrooms: number
  certificate: string
  yearBuilt: number
  electricity: string
  carport: number
  description: string[]
  /** Boleh dikosongkan; blok "Lokasi" otomatis tidak tampil bila kosong. */
  nearby: { label: string; distance: string }[]
  photoCount: number
  tone: number
}

/** Tipe rumah dalam format Indonesia: luas bangunan / luas tanah. */
export const unitType = (p: Property) =>
  p.buildingArea && p.landArea ? `${p.buildingArea}/${p.landArea}` : null

/**
 * Sumber data listing. Ganti isi file ini (atau tarik dari CMS/API) tanpa
 * menyentuh komponen mana pun — seluruh halaman membaca dari sini.
 *
 * Harga, uang muka, diskon, dan angsuran diambil dari price list resmi
 * BML Property Group. Unit yang price list-nya belum diterima ditandai
 * `price: 0` dan diberi komentar TODO.
 */
export const properties: Property[] = [
  // ────────────────────────────── Griya Sea Lestari 5 ──────────────────────
  {
    slug: 'beverly-hills-2',
    title: 'Cluster Beverly Hills 2',
    cluster: 'Beverly Hills 2',
    area: 'Manado, Sulawesi Utara',
    type: 'rumah',
    category: 'Griya Sea Lestari 5',
    status: 'For sale',
    price: 550_000_000,
    landArea: 98,
    buildingArea: 50,
    bedrooms: 2,
    bathrooms: 1,
    certificate: 'SHM',
    yearBuilt: 2026,
    electricity: '1.300 VA',
    carport: 1,
    description: [
      'Rumah tipe 50 dengan luas tanah 98 m² di Cluster Beverly Hills 2, Griya Sea Lestari 5.',
      'Uang muka 5% sebesar Rp 27.500.000. Setelah diskon Rp 24.500.000, total yang dibayar di awal menjadi Rp 3.000.000.',
      'Angsuran 10 tahun: Rp 5.228.200 di tahun pertama, Rp 5.925.200 pada tahun 2–3, Rp 6.317.700 di tahun 4, lalu Rp 6.853.700 untuk tahun 5–10.',
      'Angsuran 15 tahun mulai Rp 3.799.800, dan angsuran 20 tahun mulai Rp 3.097.900 pada tahun pertama.',
    ],
    nearby: [],
    photoCount: 6,
    tone: 0,
  },
  {
    slug: 'sea-forest',
    title: 'Cluster Sea Forest No. 35',
    cluster: 'Sea Forest',
    area: 'Manado, Sulawesi Utara',
    type: 'rumah',
    category: 'Griya Sea Lestari 5',
    status: 'For sale',
    price: 664_000_000,
    landArea: 156,
    buildingArea: 58,
    bedrooms: 3,
    bathrooms: 2,
    certificate: 'SHM',
    yearBuilt: 2026,
    electricity: '2.200 VA',
    carport: 1,
    description: [
      'Rumah tipe 58 dengan luas tanah 156 m² — kavling terluas di antara cluster Griya Sea Lestari 5.',
      'Uang muka 5% sebesar Rp 33.200.000. Setelah diskon Rp 22.000.000, total yang dibayar di awal menjadi Rp 11.200.000.',
      'Angsuran 10 tahun: Rp 6.311.900 di tahun pertama, Rp 7.153.300 pada tahun 2–3, Rp 7.627.200 di tahun 4, lalu Rp 8.274.300 untuk tahun 5–10.',
      'Angsuran 15 tahun mulai Rp 4.587.400, dan angsuran 20 tahun mulai Rp 3.740.000 pada tahun pertama.',
    ],
    nearby: [],
    photoCount: 6,
    tone: 1,
  },
  {
    slug: 'the-forest',
    title: 'Cluster The Forest',
    cluster: 'The Forest',
    area: 'Manado, Sulawesi Utara',
    type: 'rumah',
    category: 'Griya Sea Lestari 5',
    status: 'For sale',
    price: 588_000_000,
    landArea: 105,
    buildingArea: 59,
    bedrooms: 3,
    bathrooms: 2,
    certificate: 'SHM',
    yearBuilt: 2026,
    electricity: '2.200 VA',
    carport: 1,
    description: [
      'Rumah tipe 59 dengan luas tanah 105 m² di Cluster The Forest. Skema KPR melalui BNI.',
      'Uang muka 5% sebesar Rp 29.400.000 dengan diskon Rp 26.400.000. Booking fee yang dibayar Rp 3.000.000.',
      'Angsuran 10 tahun: Rp 5.589.500 di tahun pertama, Rp 6.334.600 pada tahun 2–3, Rp 6.754.200 di tahun 4, lalu Rp 7.327.200 untuk tahun 5–10.',
      'Angsuran 15 tahun mulai Rp 4.062.300, dan angsuran 20 tahun mulai Rp 3.311.900 pada tahun pertama.',
    ],
    nearby: [],
    photoCount: 6,
    tone: 2,
  },
  {
    slug: 'snowy-owl',
    title: 'Cluster Snowy Owl',
    cluster: 'Snowy Owl',
    area: 'Manado, Sulawesi Utara',
    type: 'rumah',
    category: 'Griya Sea Lestari 5',
    status: 'For sale',
    // TODO: price list Snowy Owl belum diterima — isi harga, tipe, luas, angsuran.
    price: 0,
    landArea: 0,
    buildingArea: 0,
    bedrooms: 0,
    bathrooms: 0,
    certificate: 'SHM',
    yearBuilt: 2026,
    electricity: '—',
    carport: 1,
    description: [
      'Cluster Snowy Owl di kawasan Griya Sea Lestari 5. Rincian tipe, luas, harga, dan skema angsuran akan diperbarui begitu price list tersedia.',
      'Hubungi Andreas lewat WhatsApp untuk ketersediaan unit dan penawaran terbaru.',
    ],
    nearby: [],
    photoCount: 6,
    tone: 3,
  },
  {
    slug: 'redwing-23',
    title: 'Cluster Redwing 23 (KLT)',
    cluster: 'Redwing',
    area: 'Manado, Sulawesi Utara',
    type: 'rumah',
    category: 'Griya Sea Lestari 5',
    status: 'For sale',
    price: 475_800_000,
    landArea: 130,
    buildingArea: 46,
    bedrooms: 2,
    bathrooms: 1,
    certificate: 'SHM',
    yearBuilt: 2026,
    electricity: '1.300 VA',
    carport: 1,
    description: [
      'Rumah tipe 46 dengan luas tanah 130 m² di Cluster Redwing 23 (KLT) — harga terendah di Griya Sea Lestari 5 dengan kavling yang tetap lapang.',
      'Uang muka 5% sebesar Rp 23.790.000. Setelah diskon Rp 17.750.000, total yang dibayar di awal menjadi Rp 6.040.000.',
      'Angsuran 10 tahun: Rp 4.522.900 di tahun pertama, Rp 5.125.800 pada tahun 2–3, Rp 5.465.400 di tahun 4, lalu Rp 5.929.100 untuk tahun 5–10.',
      'Angsuran 15 tahun mulai Rp 3.287.200, dan angsuran 20 tahun mulai Rp 2.680.000 pada tahun pertama — cicilan paling ringan di seluruh listing.',
    ],
    nearby: [],
    photoCount: 6,
    tone: 4,
  },
  {
    slug: 'the-peak',
    title: 'Cluster The Peak',
    cluster: 'The Peak',
    area: 'Manado, Sulawesi Utara',
    type: 'rumah',
    category: 'Griya Sea Lestari 5',
    status: 'For sale',
    price: 650_000_000,
    landArea: 120,
    buildingArea: 60,
    bedrooms: 3,
    bathrooms: 2,
    certificate: 'SHM',
    yearBuilt: 2026,
    electricity: '2.200 VA',
    carport: 1,
    description: [
      'Rumah tipe 60 dengan luas tanah 120 m² di Cluster The Peak — tipe bangunan terbesar di Griya Sea Lestari 5.',
      'Uang muka 5% sebesar Rp 32.500.000. Setelah diskon Rp 29.500.000, total yang dibayar di awal menjadi Rp 3.000.000.',
      'Angsuran 10 tahun: Rp 6.178.800 di tahun pertama, Rp 7.002.500 pada tahun 2–3, Rp 7.466.400 di tahun 4, lalu Rp 8.099.800 untuk tahun 5–10.',
      'Angsuran 15 tahun mulai Rp 4.490.600, dan angsuran 20 tahun mulai Rp 3.661.100 pada tahun pertama.',
    ],
    nearby: [],
    photoCount: 6,
    tone: 5,
  },

  // ──────────────────────────── Griya Mapanget Lestari ─────────────────────
  {
    slug: 'stream-valley',
    title: 'Stream Valley Unit 20',
    cluster: 'Stream Valley',
    area: 'Mapanget, Manado',
    type: 'rumah',
    category: 'Griya Mapanget Lestari',
    status: 'For sale',
    price: 309_760_000,
    landArea: 132,
    buildingArea: 26,
    bedrooms: 2,
    bathrooms: 1,
    certificate: 'SHM',
    yearBuilt: 2026,
    electricity: '1.300 VA',
    carport: 1,
    description: [
      'Unit pojok nomor 20 di blok Stream Valley dengan luas tanah 132 m² — kavling terluas di daftar unit pojok Griya Mapanget Lestari.',
      'Uang muka 5% sebesar Rp 15.488.000. Setelah diskon uang muka Rp 4.340.000, uang muka yang dibayar menjadi Rp 11.148.000.',
      'Luas tanahnya jauh di atas luas bangunan, sehingga masih tersisa ruang lapang untuk pengembangan ke belakang maupun ke samping.',
    ],
    nearby: [],
    photoCount: 6,
    tone: 0,
  },
  {
    slug: 'green-valley',
    title: 'Green Valley',
    cluster: 'Green Valley',
    area: 'Mapanget, Manado',
    type: 'rumah',
    category: 'Griya Mapanget Lestari',
    status: 'For sale',
    price: 201_760_000,
    landArea: 84,
    buildingArea: 26,
    bedrooms: 2,
    bathrooms: 1,
    certificate: 'SHM',
    yearBuilt: 2026,
    electricity: '1.300 VA',
    carport: 1,
    description: [
      'Blok Green Valley di Griya Mapanget Lestari. Harga mulai Rp 201.760.000 untuk kavling 84 m² — pilihan paling terjangkau di seluruh listing.',
      'Tersedia beberapa unit pojok dengan luas tanah berbeda: 84 m² (unit 3A, 10, 11, 19), 123,4 m² (unit 1), dan 126 m² (unit 5), dengan harga sampai Rp 296.260.000.',
      'Uang muka 5% berkisar Rp 10.088.000 sampai Rp 14.813.000. Setelah diskon uang muka, yang dibayar mulai dari Rp 3.000.000.',
      'Hubungi Andreas untuk mengetahui nomor unit dan kavling yang masih tersedia.',
    ],
    nearby: [],
    photoCount: 6,
    tone: 1,
  },
  {
    slug: 'heart-forest',
    title: 'Heart Forest',
    cluster: 'Heart Forest',
    area: 'Mapanget, Manado',
    type: 'rumah',
    category: 'Griya Mapanget Lestari',
    status: 'For sale',
    // TODO: price list Heart Forest belum diterima — isi harga, tipe, luas, uang muka.
    price: 0,
    landArea: 0,
    buildingArea: 0,
    bedrooms: 0,
    bathrooms: 0,
    certificate: 'SHM',
    yearBuilt: 2026,
    electricity: '—',
    carport: 1,
    description: [
      'Blok Heart Forest di Griya Mapanget Lestari. Rincian tipe, luas, harga, dan skema uang muka akan diperbarui begitu price list tersedia.',
      'Hubungi Andreas lewat WhatsApp untuk ketersediaan unit dan penawaran terbaru.',
    ],
    nearby: [],
    photoCount: 6,
    tone: 2,
  },

  // ────────────────────────────── The Pasific Bay ──────────────────────────
  {
    slug: 'beach-front',
    title: 'Beach Front',
    cluster: 'Beach Front',
    area: 'Pantai Tateli, Sulawesi Utara',
    type: 'rumah',
    category: 'The Pasific Bay',
    status: 'For sale',
    price: 15_000_000_000,
    landArea: 500,
    buildingArea: 310,
    bedrooms: 5,
    bathrooms: 4,
    certificate: 'SHM',
    yearBuilt: 2026,
    electricity: '7.700 VA',
    carport: 2,
    description: [
      'Blok Beach Front — Seaside Luxury Living di Pantai Tateli. Bangunan 310 m² di atas kavling 500 m², berdiri di baris terdepan menghadap laut.',
      'Harga jual Rp 15.000.000.000 dengan uang tanda jadi Rp 100.000.000. Harga KPR Rp 13.500.000.000 dan uang muka 10% sebesar Rp 1.500.000.000.',
      'Tersedia juga unit 18 dengan kavling 678 m² seharga Rp 17.741.200.000, uang muka 10% Rp 1.774.120.000.',
    ],
    nearby: [],
    photoCount: 6,
    tone: 3,
  },
  {
    slug: 'coastal-bay',
    title: 'Coastal Bay',
    cluster: 'Coastal Bay',
    area: 'Pantai Tateli, Sulawesi Utara',
    type: 'rumah',
    category: 'The Pasific Bay',
    status: 'For sale',
    price: 6_167_230_000,
    landArea: 230,
    buildingArea: 135,
    bedrooms: 4,
    bathrooms: 3,
    certificate: 'SHM',
    yearBuilt: 2026,
    electricity: '5.500 VA',
    carport: 2,
    description: [
      'Blok Coastal Bay di Pantai Tateli. Bangunan 135 m² di atas kavling 230 m² (unit 128) atau 214 m² (unit 368).',
      'Harga jual Rp 6.167.230.000 dengan uang tanda jadi Rp 10.000.000.',
      'Harga KPR unit 128 Rp 5.722.515.000 dengan uang muka 10% Rp 635.835.000; unit 368 Rp 5.550.507.000 dengan uang muka Rp 616.723.000.',
    ],
    nearby: [],
    photoCount: 6,
    tone: 4,
  },
  {
    slug: 'coastal-hill',
    title: 'Coastal Hill',
    cluster: 'Coastal Hill',
    area: 'Pantai Tateli, Sulawesi Utara',
    type: 'rumah',
    category: 'The Pasific Bay',
    status: 'For sale',
    price: 7_611_200_000,
    landArea: 360,
    buildingArea: 186,
    bedrooms: 4,
    bathrooms: 3,
    certificate: 'SHM',
    yearBuilt: 2026,
    electricity: '5.500 VA',
    carport: 2,
    description: [
      'Blok Coastal Hill di Pantai Tateli. Bangunan 186 m² di atas kavling 360 m², berada di kontur lebih tinggi dengan pandangan lepas ke arah laut.',
      'Harga jual mulai Rp 7.611.200.000 (unit 1018) dengan uang tanda jadi Rp 10.000.000. Harga KPR Rp 6.850.080.000, uang muka 10% Rp 761.120.000.',
      'Tersedia juga unit 1008 dengan kavling 363 m² seharga Rp 7.647.035.000, dan unit 998 dengan kavling 369 m² seharga Rp 7.718.705.000.',
    ],
    nearby: [],
    photoCount: 6,
    tone: 5,
  },
  {
    slug: 'oceanic',
    title: 'Oceanic',
    cluster: 'Oceanic',
    area: 'Pantai Tateli, Sulawesi Utara',
    type: 'rumah',
    category: 'The Pasific Bay',
    status: 'For sale',
    price: 3_623_580_000,
    landArea: 180,
    buildingArea: 93,
    bedrooms: 3,
    bathrooms: 2,
    certificate: 'SHM',
    yearBuilt: 2026,
    electricity: '3.500 VA',
    carport: 1,
    description: [
      'Blok Oceanic di Pantai Tateli — pintu masuk paling terjangkau ke kawasan seaside luxury living ini.',
      'Bangunan 93 m² di atas kavling 180 m². Harga jual Rp 3.623.580.000 dengan uang tanda jadi Rp 7.500.000. Harga KPR Rp 3.442.401.000, uang muka 10% Rp 181.179.000.',
      'Tersedia juga unit pojok nomor 318 dengan kavling 236 m² seharga Rp 4.355.588.000, uang muka 10% Rp 360.279.400.',
    ],
    nearby: [],
    photoCount: 6,
    tone: 0,
  },

  // ───────────────────────────────── Pre-owned ─────────────────────────────
  {
    slug: 'ruko-sea',
    title: 'Ruko Sea',
    cluster: 'Ruko Sea',
    area: 'Manado, Sulawesi Utara',
    type: 'rumah',
    category: 'Pre-owned',
    status: 'For sale',
    // TODO: data Ruko Sea belum diterima — isi harga, tipe, luas, dan spesifikasi.
    price: 0,
    landArea: 0,
    buildingArea: 0,
    bedrooms: 0,
    bathrooms: 0,
    certificate: 'SHM',
    yearBuilt: 0,
    electricity: '—',
    carport: 1,
    description: [
      'Ruko Sea — unit pre-owned. Rincian harga, luas, dan kondisi bangunan akan diperbarui begitu datanya tersedia.',
      'Hubungi Andreas lewat WhatsApp untuk informasi dan jadwal survei.',
    ],
    nearby: [],
    photoCount: 6,
    tone: 1,
  },
  {
    slug: 'royale-terrace',
    title: 'Royale Terrace',
    cluster: 'Royale Terrace',
    area: 'Manado, Sulawesi Utara',
    type: 'rumah',
    category: 'Pre-owned',
    status: 'For sale',
    // TODO: data Royale Terrace belum diterima — isi harga, tipe, luas, dan spesifikasi.
    price: 0,
    landArea: 0,
    buildingArea: 0,
    bedrooms: 0,
    bathrooms: 0,
    certificate: 'SHM',
    yearBuilt: 0,
    electricity: '—',
    carport: 1,
    description: [
      'Royale Terrace — unit pre-owned. Rincian harga, luas, dan kondisi bangunan akan diperbarui begitu datanya tersedia.',
      'Hubungi Andreas lewat WhatsApp untuk informasi dan jadwal survei.',
    ],
    nearby: [],
    photoCount: 6,
    tone: 2,
  },
  {
    slug: 'diamond-hill',
    title: 'Diamond Hill',
    cluster: 'Diamond Hill',
    area: 'Manado, Sulawesi Utara',
    type: 'rumah',
    category: 'Pre-owned',
    status: 'For sale',
    // TODO: data Diamond Hill belum diterima — isi harga, tipe, luas, dan spesifikasi.
    price: 0,
    landArea: 0,
    buildingArea: 0,
    bedrooms: 0,
    bathrooms: 0,
    certificate: 'SHM',
    yearBuilt: 0,
    electricity: '—',
    carport: 1,
    description: [
      'Diamond Hill — unit pre-owned. Rincian harga, luas, dan kondisi bangunan akan diperbarui begitu datanya tersedia.',
      'Hubungi Andreas lewat WhatsApp untuk informasi dan jadwal survei.',
    ],
    nearby: [],
    photoCount: 6,
    tone: 3,
  },
]

export const propertyBySlug = (slug: string | undefined): Property | undefined =>
  properties.find((p) => p.slug === slug)

export const similarTo = (property: Property, count = 3): Property[] =>
  properties
    .filter((p) => p.slug !== property.slug)
    .sort((a, b) => {
      // Utamakan unit dari kawasan yang sama, lalu yang harganya paling dekat.
      const rank = (p: Property) => (p.category === property.category ? 0 : 1)
      const byCategory = rank(a) - rank(b)
      if (byCategory !== 0) return byCategory
      return Math.abs(a.price - property.price) - Math.abs(b.price - property.price)
    })
    .slice(0, count)
