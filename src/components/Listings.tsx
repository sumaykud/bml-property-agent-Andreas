import { useMemo, useState } from 'react'
import { properties, type PropertyType } from '../data/properties'
import PropertyCard from './PropertyCard'
import Reveal from './Reveal'

type Filter = 'semua' | PropertyType

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'semua', label: 'Semua' },
  { value: 'rumah', label: 'Rumah' },
  { value: 'apartemen', label: 'Apartemen' },
]

export default function Listings() {
  const [filter, setFilter] = useState<Filter>('semua')

  const visible = useMemo(
    () => (filter === 'semua' ? properties : properties.filter((p) => p.type === filter)),
    [filter],
  )

  return (
    <section id="properti" className="section">
      <div className="wrap">
        <div className="section__head">
          <Reveal>
            <h2 className="section__title">Listing</h2>
            <p className="section__sub">
              Setiap unit sudah melalui pengecekan sertifikat, IMB/PBG, dan kunjungan
              lapangan sebelum ditayangkan di sini.
            </p>
          </Reveal>

          <Reveal className="filters" delay={80}>
            {FILTERS.map((f) => (
              <button
                key={f.value}
                type="button"
                className="chip"
                aria-pressed={filter === f.value}
                onClick={() => setFilter(f.value)}
              >
                {f.label}
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
