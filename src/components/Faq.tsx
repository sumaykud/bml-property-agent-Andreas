import { useId, useState } from 'react'
import { site } from '../lib/site'
import Reveal from './Reveal'

const ITEMS = [
  {
    q: 'Apa yang membuat listing BML berbeda?',
    a: 'Setiap unit diverifikasi lebih dulu: sertifikat dicek keasliannya di BPN, status IMB/PBG dikonfirmasi, dan kondisi fisik difoto langsung saat kunjungan. Unit yang tidak lolos pengecekan tidak ditayangkan, sehingga harga yang Anda lihat adalah harga yang benar-benar bisa ditransaksikan.',
  },
  {
    q: 'Bagaimana proses verifikasi properti?',
    a: 'Tiga tahap: pengecekan dokumen (sertifikat, PBB, IMB/PBG), pengecekan lapangan (kondisi bangunan, akses jalan, riwayat banjir), lalu pengecekan harga terhadap transaksi pembanding di radius satu kilometer. Hasilnya kami rangkum dan bisa Anda minta sebelum menyerahkan uang tanda jadi.',
  },
  {
    q: 'Perlu survei sendiri ke lokasi?',
    a: 'Sangat disarankan, dan kami temani. Jadwal survei bisa diatur di hari kerja maupun akhir pekan. Bila Anda sedang di luar kota, kami bisa melakukan video call langsung dari lokasi sambil menunjukkan bagian yang ingin Anda periksa.',
  },
  {
    q: 'Bagaimana cara menghubungi agen?',
    a: `Cara tercepat lewat WhatsApp ke ${site.agent.name} — biasanya dibalas di bawah satu jam pada jam kerja. Anda juga bisa mengirim hasil simulasi RPC langsung dari halaman detail properti, sehingga kami sudah tahu unit dan kemampuan cicilan yang Anda maksud.`,
  },
  {
    q: 'Bisa beli dari luar kota?',
    a: 'Bisa. Kami rutin menangani pembeli dari Jakarta, Surabaya, dan luar negeri. Survei dilakukan lewat video call, dokumen dikirim digital untuk ditinjau, dan penandatanganan akad dapat diwakilkan dengan surat kuasa notaris bila Anda berhalangan hadir.',
  },
]

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  const uid = useId()

  return (
    <section id="faq" className="section section--surface">
      <div className="wrap faq">
        <Reveal className="faq__head">
          <p className="faq__eyebrow">Pertanyaan yang sering ditanyakan</p>
          <h2 className="section__title">FAQ</h2>
        </Reveal>

        <div>
          {ITEMS.map((item, i) => {
            const isOpen = open === i
            const panelId = `${uid}-panel-${i}`
            const buttonId = `${uid}-button-${i}`

            return (
              <Reveal className="faq__item" key={item.q} delay={Math.min(i, 4) * 45}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    className="faq__q"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    {item.q}
                    <svg
                      className="faq__icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                </h3>

                <div
                  className="faq__a"
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  data-open={isOpen}
                >
                  <div>
                    <p>{item.a}</p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
