import type { PropertyType } from '../data/properties'

const HUES = [214, 196, 226, 176, 206, 240]

interface Props {
  tone: number
  type: PropertyType
  className?: string
}

/**
 * Placeholder foto berbasis SVG inline: nol permintaan jaringan, nol layout
 * shift. Ganti dengan <img> saat foto asli tersedia — rasio sudah dikunci
 * lewat CSS induknya.
 */
export default function PhotoPlaceholder({ tone, type, className }: Props) {
  const h = HUES[tone % HUES.length]
  const top = `hsl(${h} 62% 96%)`
  const bottom = `hsl(${h + 8} 46% 90%)`
  const stroke = `hsl(${h} 34% 62%)`
  const id = `pp${tone}${type}`

  return (
    <svg
      className={className}
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={type === 'apartemen' ? 'Foto unit apartemen' : 'Foto rumah'}
      style={{ width: '100%', height: '100%' }}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0" stopColor={top} />
          <stop offset="1" stopColor={bottom} />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#${id})`} />
      <g
        fill="none"
        stroke={stroke}
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity="0.55"
      >
        {type === 'apartemen' ? (
          <>
            <path d="M132 226V108l58-26 58 26v118" />
            <path d="M248 226V146h44v80" />
            <path d="M88 226v-58h44" />
            <path d="M158 132h26M158 158h26M158 184h26M212 132h18M212 158h18M212 184h18" />
            <path d="M262 168h18M262 194h18M104 190h16" />
            <path d="M64 226h272" strokeWidth="2.6" />
          </>
        ) : (
          <>
            <path d="M92 226V140l108-62 108 62v86" />
            <path d="M74 148 200 74l126 74" strokeWidth="2.6" />
            <path d="M168 226v-56h64v56" />
            <path d="M124 156h34v34h-34zM242 156h34v34h-34z" />
            <path d="M64 226h272" strokeWidth="2.6" />
          </>
        )}
      </g>
    </svg>
  )
}
