import { Link } from 'react-router-dom'
import type { Property } from '../data/properties'
import { formatIDR } from '../lib/format'
import PropertyImage from './PropertyImage'

export default function PropertyCard({ property }: { property: Property }) {
  const { slug, title, area, type, price, buildingArea, bedrooms, bathrooms } = property

  return (
    <Link to={`/properti/${slug}`} className="card">
      <div className="card__media">
        <PropertyImage
          property={property}
          index={0}
          sizes="(max-width: 760px) 100vw, (max-width: 1000px) 50vw, 350px"
        />
        <span className="card__tag">{type}</span>
      </div>

      <div className="card__body">
        <p className="card__price">{formatIDR(price)}</p>
        <h3 className="card__title">{title}</h3>
        <p className="card__area">{area}</p>

        <p className="card__meta">
          <span>{buildingArea} m²</span>
          <i aria-hidden="true">·</i>
          <span>{bedrooms} kamar</span>
          <i aria-hidden="true">·</i>
          <span>{bathrooms} kamar mandi</span>
        </p>
      </div>
    </Link>
  )
}
