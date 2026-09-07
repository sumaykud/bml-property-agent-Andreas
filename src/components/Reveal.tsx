import {
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from 'react'

interface Props {
  children: ReactNode
  /** Jeda mulai animasi, dalam milidetik. */
  delay?: number
  as?: ElementType
  className?: string
}

/**
 * Animasi teks tipis: fade + naik 10px sekali saat elemen masuk viewport.
 * Satu IntersectionObserver per elemen, langsung dilepas setelah terpicu,
 * sehingga tidak ada pekerjaan tersisa saat pengguna menggulir.
 * Dinonaktifkan otomatis lewat CSS bila pengguna memilih reduced motion.
 */
export default function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  className = '',
}: Props) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Tanpa IntersectionObserver (atau saat prerender): tampilkan langsung.
    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-in')
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-in')
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`.trim()}
      style={delay ? ({ '--d': `${delay}ms` } as CSSProperties) : undefined}
    >
      {children}
    </Tag>
  )
}
