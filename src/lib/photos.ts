import type { Property } from '../data/properties'

/**
 * Ukuran foto yang diharapkan. Nilai ini juga dipakai
 * scripts/generate-placeholders.mjs saat membuat berkas placeholder,
 * dan didokumentasikan di public/images/README.md.
 */
export const PHOTO_WIDTH = 1600
export const PHOTO_HEIGHT = 1200

/**
 * Letak berkas foto: public/images/properties/<slug>/01.jpg, 02.jpg, ...
 * Menimpa berkas di direktori itu sudah cukup — tidak ada kode yang
 * perlu diubah selama nama dan jumlahnya sama.
 */
export const photoUrl = (slug: string, index: number) =>
  `/images/properties/${slug}/${String(index + 1).padStart(2, '0')}.jpg`

export const photoUrls = (property: Property): string[] =>
  Array.from({ length: property.photoCount }, (_, i) => photoUrl(property.slug, i))

export const photoAlt = (property: Property, index: number) =>
  `${property.title} — foto ${index + 1} dari ${property.photoCount}`
