import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import RpcCalculator from '../components/RpcCalculator'
import PhotoPlaceholder from '../components/PhotoPlaceholder'
import PropertyCard from '../components/PropertyCard'
import Reveal from '../components/Reveal'
import { propertyBySlug, similarTo } from '../data/properties'
import { formatIDR } from '../lib/format'
import { site, waLink } from '../lib/site'

export default function PropertyDetail() {
  const { slug } = useParams()
  const property = propertyBySlug(slug)

  useEffect(() => {
    if (property) document.title = `${property.title} — ${site.brand}`
  }, [property])

  if (!property) return <Navigate to="/404" replace />

  const specs = [
    { label: 'Luas tanah', value: property.landArea ? `${property.landArea} m²` : '—' },
    { label: 'Luas bangunan', value: `${property.buildingArea} m²` },
    { label: 'Sertifikat', value: property.certificate },
    { label: 'Tahun dibangun', value: String(property.yearBuilt) },
    { label: 'Listrik', value: property.electricity },
    { label: 'Carport', value: `${property.carport} mobil` },
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
          <div className="gallery__main">
            <PhotoPlaceholder tone={property.tone} type={property.type} />
          </div>
          <div className="gallery__side">
            <PhotoPlaceholder tone={property.tone + 1} type={property.type} />
          </div>
          <div className="gallery__side">
            <PhotoPlaceholder tone={property.tone + 2} type={property.type} />
          </div>
          <div className="gallery__side">
            <PhotoPlaceholder tone={property.tone + 3} type={property.type} />
            <div className="gallery__more">+{property.photoCount - 3} foto</div>
          </div>
        </div>

        <div className="detail">
          <div>
            <Reveal>
              <div className="badges">
                <span className="badge badge--accent">{property.status}</span>
                <span className="badge">{property.type}</span>
              </div>

              <h1>{property.title}</h1>
              <p className="detail__price">{formatIDR(property.price)}</p>
              <p className="detail__quick">
                {property.area} · {property.buildingArea} m² · {property.bedrooms} kamar ·{' '}
                {property.bathrooms} kamar mandi
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
          </div>

          <aside className="aside">
            <RpcCalculator property={property} />

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
    </>
  )
}
