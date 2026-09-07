import { useMemo, useState } from 'react'
import { properties } from '../data/properties'
import PropertyCard from './PropertyCard'
import Reveal from './Reveal'

const SEMUA = 'Semua'

/**
 * Tombol saring dibuat dari data, bukan didaftar manual di sini.
 *
 * Menambah tab = memberi nilai `category` baru pada sebuah unit di
 * src/data/properties.ts. Tidak ada yang perlu diubah di berkas ini.
 * Set menjaga tiap kategori muncul sekali saja, sehingga tidak mungkin
 * ada dua tombol kembar yang menyala bersamaan.
 */
const FILTERS = [SEMUA, ...new Set(properties.map((p) => p.category))]

export default function Listings() {
  const [filter, setFilter] = useState<string>(SEMUA)

  const visible = useMemo(
    () =>
      filter === SEMUA ? properties : properties.filter((p) => p.category === filter),
    [filter],
  )

  return (
    <section id="properti" className="section">
      <div className="wrap">
        <div className="section__head">
          <Reveal>
            <h2 className="section__title">Properti Pilihan</h2>
            <p className="section__sub">
              Pilihan lengkap properti siap huni dan pesan bangun di Manado. Legalitas lahan,
              sertifikat, dan IMB/PBG terjamin aman.
            </p>
          </Reveal>

          <Reveal className="filters" delay={80}>
            {FILTERS.map((label) => (
              <button
                key={label}
                type="button"
                className="chip"
                aria-pressed={filter === label}
                onClick={() => setFilter(label)}
              >
                {label}
              </button>
            ))}
          </Reveal>
        </div>

        {visible.length > 0 ? (
          <div className="grid-cards">
            {visible.map((p, i) => (
              <Reveal key={p.slug} delay={Math.min(i, 3) * 60}>
                <PropertyCard property={p} />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="empty">Belum ada unit pada kategori ini.</p>
        )}
      </div>
    </section>
  )
}
