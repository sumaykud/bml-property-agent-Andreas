import { useState } from 'react'
import type { Property } from '../data/properties'
import { PHOTO_HEIGHT, PHOTO_WIDTH, photoAlt, photoUrl } from '../lib/photos'
import PhotoPlaceholder from './PhotoPlaceholder'

interface Props {
  property: Property
  index: number
  /** Foto terpenting di paruh atas: dimuat lebih awal, prioritas tinggi. */
  priority?: boolean
  /**
   * Ikut terlihat tanpa menggulir, tapi bukan yang utama: tidak di-lazy
   * (agar tidak tertunda) namun prioritasnya dibiarkan normal supaya tidak
   * berebut bandwidth dengan foto utama.
   */
  eager?: boolean
  sizes?: string
  className?: string
}

/**
 * Menampilkan foto properti dari public/images/properties/<slug>/.
 * Bila berkasnya belum ada atau gagal dimuat, gambar diganti placeholder SVG
 * inline sehingga tata letak tetap utuh dan tidak ada ikon gambar rusak.
 */
export default function PropertyImage({
  property,
  index,
  priority = false,
  eager = false,
  sizes,
  className,
}: Props) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return <PhotoPlaceholder tone={property.tone + index} type={property.type} />
  }

  return (
    <img
      className={className}
      src={photoUrl(property.slug, index)}
      alt={photoAlt(property, index)}
      width={PHOTO_WIDTH}
      height={PHOTO_HEIGHT}
      sizes={sizes}
      loading={priority || eager ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      onError={() => setFailed(true)}
    />
  )
}
