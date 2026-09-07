import { Link } from 'react-router-dom'
import type { Property } from '../data/properties'
import { formatIDR } from '../lib/format'
import PhotoPlaceholder from './PhotoPlaceholder'

export default function PropertyCard({ property }: { property: Property }) {
  const { slug, title, area, type, price, buildingArea, bedrooms, bathrooms, tone } =
    property

  return (
    <Link to={`/properti/${slug}`} className="card">
      <div className="card__media">
        <PhotoPlaceholder tone={tone} type={type} />
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
