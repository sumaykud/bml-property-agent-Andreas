import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { Property } from '../data/properties'
import { photoAlt, photoUrl } from '../lib/photos'

interface Props {
  property: Property
  startIndex: number
  onClose: () => void
}

/**
 * Penampil foto layar penuh dengan navigasi maju/mundur.
 *
 * Ditempel ke <body> lewat portal supaya tidak terpengaruh stacking context
 * atau transform milik induknya (kartu sticky dan elemen beranimasi).
 * Tutup dengan tombol X, tombol Esc, atau klik area gelap di luar foto.
 */
export default function Lightbox({ property, startIndex, onClose }: Props) {
  const total = property.photoCount
  const [index, setIndex] = useState(startIndex)
  const [failed, setFailed] = useState<Record<number, boolean>>({})
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  const go = useCallback(
    (delta: number) => setIndex((i) => (i + delta + total) % total),
    [total],
  )

  // Kembalikan fokus ke elemen pemicu setelah ditutup.
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    return () => opener?.focus?.()
  }, [])

  // Kunci gulir latar selama penampil terbuka.
  useEffect(() => {
    const { overflow, paddingRight } = document.body.style
    const gap = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    if (gap > 0) document.body.style.paddingRight = `${gap}px`
    return () => {
      document.body.style.overflow = overflow
      document.body.style.paddingRight = paddingRight
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        go(1)
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        go(-1)
      } else if (e.key === 'Tab') {
        // Jaga fokus tetap di dalam dialog.
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled])',
        )
        if (!focusable || focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [go, onClose])

  // Siapkan foto tetangga agar perpindahan terasa instan.
  useEffect(() => {
    if (total < 2) return
    for (const i of [(index + 1) % total, (index - 1 + total) % total]) {
      const img = new Image()
      img.src = photoUrl(property.slug, i)
    }
  }, [index, property.slug, total])

  return createPortal(
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`Galeri foto ${property.title}`}
      ref={dialogRef}
      onClick={(e) => {
        // Klik pada area gelap (bukan foto atau tombol) menutup penampil.
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="lightbox__bar">
        <span className="lightbox__counter" aria-live="polite">
          {index + 1} / {total}
        </span>
        <button
          type="button"
          className="lightbox__close"
          onClick={onClose}
          aria-label="Tutup galeri"
          ref={closeRef}
        >
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      <figure className="lightbox__stage" onClick={(e) => e.stopPropagation()}>
        {failed[index] ? (
          <p className="lightbox__missing">
            Foto {index + 1} belum tersedia.
            <br />
            <code>public/images/properties/{property.slug}/
              {String(index + 1).padStart(2, '0')}.jpg</code>
          </p>
        ) : (
          <img
            key={index}
            src={photoUrl(property.slug, index)}
            alt={photoAlt(property, index)}
            onError={() => setFailed((f) => ({ ...f, [index]: true }))}
            decoding="async"
          />
        )}
        <figcaption className="lightbox__caption">
          {property.title} · {property.area}
        </figcaption>
      </figure>

      {total > 1 && (
        <>
          <button
            type="button"
            className="lightbox__nav lightbox__nav--prev"
            onClick={() => go(-1)}
            aria-label="Foto sebelumnya"
          >
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
          <button
            type="button"
            className="lightbox__nav lightbox__nav--next"
            onClick={() => go(1)}
            aria-label="Foto berikutnya"
          >
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
    </div>,
    document.body,
  )
}
