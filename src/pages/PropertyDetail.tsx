import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Lightbox from '../components/Lightbox'
import MortgageCalculator from '../components/MortgageCalculator'
import PropertyCard from '../components/PropertyCard'
import PropertyImage from '../components/PropertyImage'
import Reveal from '../components/Reveal'
import { propertyBySlug, similarTo, unitType } from '../data/properties'
import { formatIDR } from '../lib/format'
import { site, waLink } from '../lib/site'

export default function PropertyDetail() {
  const { slug } = useParams()
  const property = propertyBySlug(slug)

  /** Indeks foto yang sedang dibuka di penampil layar penuh; null = tertutup. */
  const [viewerAt, setViewerAt] = useState<number | null>(null)

  useEffect(() => {
    if (property) document.title = `${property.title} — ${site.brand}`
  }, [property])

  // Tutup penampil bila pengguna berpindah ke unit lain.
  useEffect(() => setViewerAt(null), [slug])

  if (!property) return <Navigate to="/404" replace />

  const tipe = unitType(property)

  // Nilai 0 berarti datanya belum diterima, bukan benar-benar nol.
  const specs = [
    { label: 'Tipe', value: tipe ?? '—' },
    { label: 'Luas tanah', value: property.landArea ? `${property.landArea} m²` : '—' },
    {
      label: 'Luas bangunan',
      value: property.buildingArea ? `${property.buildingArea} m²` : '—',
    },
    { label: 'Sertifikat', value: property.certificate },
    { label: 'Tahun dibangun', value: property.yearBuilt ? String(property.yearBuilt) : '—' },
    { label: 'Listrik', value: property.electricity },
  ]

  const similar = similarTo(property)

  return (
    <>
      <div className="wrap">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/#properti">← Listing</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{property.title}</span>
        </nav>

        <div className="gallery">
          {[0, 1, 2, 3].map((slot) => {
            const isMain = slot === 0
            const isLast = slot === 3
            const hidden = property.photoCount - 4

            return (
              <button
                key={slot}
                type="button"
                className={isMain ? 'gallery__main' : 'gallery__side'}
                onClick={() => setViewerAt(slot)}
                aria-label={
                  isLast && hidden > 0
                    ? `Lihat semua ${property.photoCount} foto`
                    : `Buka foto ${slot + 1} ukuran penuh`
                }
              >
                {/* Keempat slot ada di paruh atas halaman, jadi tidak ada
                    yang di-lazy; hanya foto utama yang berprioritas tinggi. */}
                <PropertyImage
                  property={property}
                  index={slot}
                  priority={isMain}
                  eager={!isMain}
                  sizes={isMain ? '(max-width: 760px) 100vw, 540px' : '270px'}
                />
                {isLast && hidden > 0 && (
                  <span className="gallery__more" aria-hidden="true">
                    +{hidden} foto
                  </span>
                )}
              </button>
            )
          })}
        </div>

        <div className="detail">
          <div>
            <Reveal>
              <div className="badges">
                <span className="badge badge--accent">{property.status}</span>
                <span className="badge">{property.category}</span>
              </div>

              <h1>{property.title}</h1>
              <p className="detail__price">
                {property.price > 0 ? formatIDR(property.price) : 'Harga menyusul'}
              </p>
              <p className="detail__quick">
                {[
                  property.area,
                  tipe && `Tipe ${tipe}`,
                  property.bedrooms > 0 && `${property.bedrooms} kamar`,
                  property.bathrooms > 0 && `${property.bathrooms} kamar mandi`,
                ]
                  .filter(Boolean)
                  .join(' · ')}
              </p>
            </Reveal>

            <Reveal className="block" delay={60}>
              <h2>Spesifikasi</h2>
              <dl className="specs">
                {specs.map((s) => (
                  <div className="spec" key={s.label}>
                    <dt>{s.label}</dt>
                    <dd>{s.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal className="block" delay={60}>
              <h2>Deskripsi</h2>
              {property.description.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </Reveal>

            {/* Blok ini hanya tampil bila data jaraknya sudah diisi. */}
            {property.nearby.length > 0 && (
              <Reveal className="block" delay={60}>
                <h2>Lokasi</h2>
                <p style={{ marginBottom: 16 }}>
                  Jarak tempuh berkendara dari {property.area} ke fasilitas terdekat:
                </p>
                <ul className="nearby">
                  {property.nearby.map((n) => (
                    <li key={n.label}>
                      <span>{n.label}</span>
                      <b>{n.distance}</b>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>

          <aside className="aside">
            {/* Tanpa harga, simulasinya hanya akan menampilkan Rp 0. */}
            {property.price > 0 && <MortgageCalculator property={property} />}

            <div className="panel">
              <div className="agent">
                <div className="agent__avatar" aria-hidden="true">
                  {site.agent.name.charAt(0)}
                </div>
                <div>
                  <p className="agent__name">{site.agent.name}</p>
                  <p className="agent__role">{site.agent.role}</p>
                </div>
              </div>

              <div className="panel__actions">
                <a
                  className="btn btn--primary btn--block"
                  href={waLink(
                    `Halo ${site.agent.name}, saya ingin tanya soal ${property.title}.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Hubungi agen
                </a>
                <a
                  className="btn btn--ghost btn--block"
                  href={waLink(
                    `Halo ${site.agent.name}, saya ingin jadwalkan survei untuk ${property.title}.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Jadwalkan survei
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <section className="section section--surface">
        <div className="wrap">
          <div className="section__head">
            <Reveal>
              <h2 className="section__title">Properti serupa</h2>
            </Reveal>
          </div>
          <div className="grid-cards">
            {similar.map((p, i) => (
              <Reveal key={p.slug} delay={i * 60}>
                <PropertyCard property={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {viewerAt !== null && (
        <Lightbox
          property={property}
          startIndex={viewerAt}
          onClose={() => setViewerAt(null)}
        />
      )}
    </>
  )
}
