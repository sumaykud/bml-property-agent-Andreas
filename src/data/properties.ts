export type PropertyType = 'rumah' | 'apartemen'

export interface Property {
  slug: string
  title: string
  area: string
  type: PropertyType
  status: string
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
  nearby: { label: string; distance: string }[]
  photoCount: number
  tone: number
}

/**
 * Sumber data listing. Ganti isi file ini (atau tarik dari CMS/API) tanpa
 * menyentuh komponen mana pun — seluruh halaman membaca dari sini.
 */
export const properties: Property[] = [
  {
    slug: 'maple-street-hillcrest',
    title: '100 Maple Street, Hillcrest',
    area: 'Malalayang, Manado',
    type: 'rumah',
    status: 'For sale',
    price: 1_850_000_000,
    landArea: 120,
    buildingArea: 96,
    bedrooms: 2,
    bathrooms: 1,
    certificate: 'SHM',
    yearBuilt: 2021,
    electricity: '2.200 VA',
    carport: 1,
    description: [
      'Rumah dua lantai di kompleks Hillcrest dengan orientasi menghadap timur, sehingga ruang keluarga mendapat cahaya matahari pagi tanpa panas berlebih di sore hari.',
      'Struktur beton bertulang, atap baja ringan, dan kusen aluminium. Sanitasi air bersih dan air buangan sudah terpisah, sehingga unit siap huni tanpa renovasi.',
      'Lingkungan perumahan tertutup dengan satu akses masuk dan penjagaan 24 jam. Legalitas SHM atas nama pemilik, PBB lunas sampai tahun berjalan.',
    ],
    nearby: [
      { label: 'SD & SMP Negeri', distance: '600 m' },
      { label: 'Pasar Bahu', distance: '1,4 km' },
      { label: 'RS Siloam', distance: '2,1 km' },
      { label: 'Manado Town Square', distance: '3,5 km' },
    ],
    photoCount: 9,
    tone: 0,
  },
  {
    slug: 'griya-winangun-residence',
    title: 'Griya Winangun Residence',
    area: 'Winangun, Manado',
    type: 'rumah',
    status: 'For sale',
    price: 1_240_000_000,
    landArea: 105,
    buildingArea: 78,
    bedrooms: 3,
    bathrooms: 2,
    certificate: 'SHM',
    yearBuilt: 2022,
    electricity: '1.300 VA',
    carport: 1,
    description: [
      'Rumah baru di dataran tinggi Winangun dengan suhu udara rata-rata beberapa derajat lebih sejuk dibanding pusat kota, cocok untuk keluarga muda.',
      'Tiga kamar tidur dengan kamar utama menghadap taman belakang. Dapur sudah terpasang kitchen set beserta instalasi air panas.',
      'Akses jalan cor beton selebar enam meter, dua mobil dapat berpapasan. Bebas banjir sepanjang catatan sepuluh tahun terakhir.',
    ],
    nearby: [
      { label: 'Sekolah Eben Haezar', distance: '900 m' },
      { label: 'Pasar Winangun', distance: '750 m' },
      { label: 'Klinik Pratama', distance: '1,1 km' },
      { label: 'Ring Road I', distance: '2,8 km' },
    ],
    photoCount: 7,
    tone: 1,
  },
  {
    slug: 'apartemen-bahu-tower-b',
    title: 'Apartemen Bahu Mall Tower B',
    area: 'Bahu, Manado',
    type: 'apartemen',
    status: 'For sale',
    price: 890_000_000,
    landArea: 0,
    buildingArea: 54,
    bedrooms: 2,
    bathrooms: 1,
    certificate: 'SHMSRS',
    yearBuilt: 2019,
    electricity: '2.200 VA',
    carport: 1,
    description: [
      'Unit lantai 12 menghadap laut dengan pemandangan Pulau Manado Tua yang tidak terhalang bangunan lain.',
      'Kondisi full furnished: AC di dua kamar, kitchen set, lemari built-in, dan perabot ruang tamu. Bisa langsung ditempati atau disewakan.',
      'Terhubung langsung ke pusat perbelanjaan melalui koridor lantai dasar. Biaya pengelolaan sudah mencakup keamanan, kebersihan, dan pemeliharaan lift.',
    ],
    nearby: [
      { label: 'Bahu Mall', distance: 'terhubung' },
      { label: 'Universitas Sam Ratulangi', distance: '1,2 km' },
      { label: 'RS Prof. Kandou', distance: '2,4 km' },
      { label: 'Boulevard', distance: '1,9 km' },
    ],
    photoCount: 8,
    tone: 2,
  },
  {
    slug: 'kawanua-hill-cluster',
    title: 'Kawanua Hill Cluster Tipe 45',
    area: 'Paal Dua, Manado',
    type: 'rumah',
    status: 'For sale',
    price: 685_000_000,
    landArea: 90,
    buildingArea: 45,
    bedrooms: 2,
    bathrooms: 1,
    certificate: 'SHM',
    yearBuilt: 2023,
    electricity: '1.300 VA',
    carport: 1,
    description: [
      'Rumah tapak baru dalam cluster 42 unit. Serah terima kunci maksimal 30 hari setelah akad — unit sudah berdiri dan selesai finishing.',
      'Denah tipe 45 dengan ruang tamu menyatu dengan ruang makan, memberi kesan lapang meski luas bangunan terukur.',
      'Cocok untuk pembeli rumah pertama. Harga masih masuk plafon KPR bunga tetap dari beberapa bank rekanan.',
    ],
    nearby: [
      { label: 'SDN Paal Dua', distance: '450 m' },
      { label: 'Pasar Paal Dua', distance: '1,0 km' },
      { label: 'Puskesmas', distance: '800 m' },
      { label: 'Terminal Paal Dua', distance: '1,6 km' },
    ],
    photoCount: 6,
    tone: 3,
  },
  {
    slug: 'malalayang-sea-view',
    title: 'Rumah Sea View Malalayang',
    area: 'Malalayang Dua, Manado',
    type: 'rumah',
    status: 'For sale',
    price: 3_100_000_000,
    landArea: 240,
    buildingArea: 185,
    bedrooms: 4,
    bathrooms: 3,
    certificate: 'SHM',
    yearBuilt: 2020,
    electricity: '4.400 VA',
    carport: 2,
    description: [
      'Rumah dua lantai di lereng Malalayang dengan teras atas menghadap Teluk Manado. Garis pandang ke laut terjaga karena berada di baris terdepan kavling.',
      'Empat kamar tidur, dua di antaranya dengan kamar mandi dalam. Ruang kerja terpisah di lantai dua dengan jendela penuh ke arah laut.',
      'Sudah terpasang panel surya 3 kWp dan tandon air 2.000 liter. Halaman belakang cukup untuk kolam renang tanpa mengurangi area taman.',
    ],
    nearby: [
      { label: 'Pantai Malalayang', distance: '700 m' },
      { label: 'Sekolah Don Bosco', distance: '2,2 km' },
      { label: 'RS Siloam', distance: '3,0 km' },
      { label: 'Bandara Sam Ratulangi', distance: '14 km' },
    ],
    photoCount: 12,
    tone: 4,
  },
  {
    slug: 'apartemen-boulevard-studio',
    title: 'Studio Boulevard Manado',
    area: 'Wenang, Manado',
    type: 'apartemen',
    status: 'For sale',
    price: 545_000_000,
    landArea: 0,
    buildingArea: 32,
    bedrooms: 1,
    bathrooms: 1,
    certificate: 'SHMSRS',
    yearBuilt: 2021,
    electricity: '1.300 VA',
    carport: 1,
    description: [
      'Unit studio di kawasan Boulevard, area dengan tingkat hunian sewa tertinggi di Manado. Cocok sebagai properti investasi.',
      'Tata ruang efisien dengan area tidur dipisahkan partisi rendah, sehingga tetap terasa lega. Balkon menghadap ke arah kota.',
      'Rata-rata sewa bulanan di gedung yang sama berada pada kisaran yang menutup cicilan KPA dengan tenor 15 tahun.',
    ],
    nearby: [
      { label: 'Mega Mall', distance: '600 m' },
      { label: 'Kantor Gubernur', distance: '1,3 km' },
      { label: 'Pelabuhan Manado', distance: '1,8 km' },
      { label: 'Pasar 45', distance: '900 m' },
    ],
    photoCount: 6,
    tone: 5,
  },
]

export const propertyBySlug = (slug: string | undefined): Property | undefined =>
  properties.find((p) => p.slug === slug)

export const similarTo = (property: Property, count = 3): Property[] =>
  properties
    .filter((p) => p.slug !== property.slug)
    .sort((a, b) => {
      const typeRank = (p: Property) => (p.type === property.type ? 0 : 1)
      const byType = typeRank(a) - typeRank(b)
      if (byType !== 0) return byType
      return Math.abs(a.price - property.price) - Math.abs(b.price - property.price)
    })
    .slice(0, count)
