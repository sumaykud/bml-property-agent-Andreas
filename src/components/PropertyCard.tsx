import { Link } from 'react-router-dom'
import { unitType, type Property } from '../data/properties'
import { formatIDR } from '../lib/format'
import PropertyImage from './PropertyImage'

export default function PropertyCard({ property }: { property: Property }) {
  const { slug, title, area, category, price, bedrooms, bathrooms } = property
  const tipe = unitType(property)

  return (
    <Link to={`/properti/${slug}`} className="card">
      <div className="card__media">
        <PropertyImage
          property={property}
          index={0}
          sizes="(max-width: 760px) 100vw, (max-width: 1000px) 50vw, 350px"
        />
        {/* Menampilkan kawasan, bukan bentuk bangunan: seluruh unit bertipe
            rumah, jadi label "Rumah" tidak membedakan apa pun. */}
        <span className="card__tag">{category}</span>
      </div>

      <div className="card__body">
        <p className={price > 0 ? 'card__price' : 'card__price card__price--tba'}>
          {price > 0 ? formatIDR(price) : 'Harga menyusul'}
        </p>
        <h3 className="card__title">{title}</h3>
        <p className="card__area">{area}</p>

        <p className="card__meta">
          {tipe && (
            <>
              <span>Tipe {tipe}</span>
              <i aria-hidden="true">·</i>
            </>
          )}
          {bedrooms > 0 ? (
            <>
              <span>{bedrooms} kamar</span>
              <i aria-hidden="true">·</i>
              <span>{bathrooms} kamar mandi</span>
            </>
          ) : (
            <span>Detail menyusul</span>
          )}
        </p>
      </div>
    </Link>
  )
}
