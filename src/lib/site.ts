/** Satu tempat untuk semua data kontak & identitas. Ubah di sini saja. */
export const site = {
  brand: 'BML Property',
  legalName: 'PT Bangun Minanga Lestari',
  agent: {
    name: 'Andreas',
    role: 'Agen BML Property',
    /** Format internasional tanpa tanda plus — dipakai untuk tautan wa.me */
    whatsapp: '6281234567890',
    email: 'andreas@bmlproperty.co.id',
  },
  clientsServed: '50+',
  year: new Date().getFullYear(),
} as const

/** Membangun tautan wa.me dengan pesan yang sudah terisi. */
export function waLink(message: string): string {
  return `https://wa.me/${site.agent.whatsapp}?text=${encodeURIComponent(message)}`
}
