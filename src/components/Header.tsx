import { useCallback, useState, type MouseEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { site, waLink } from '../lib/site'

const SECTIONS = [
  { id: 'properti', label: 'Properti' },
  { id: 'faq', label: 'FAQ' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  /**
   * Di beranda: gulir langsung, lalu samakan URL lewat router agar tetap
   * satu sumber kebenaran (dan klik berulang tetap menggulir kembali).
   * Di halaman detail: biarkan <Link> pindah ke /#id, <ScrollManager> yang
   * menuntaskan gulirannya.
   */
  const goToSection = useCallback(
    (id: string) => (e: MouseEvent<HTMLAnchorElement>) => {
      setOpen(false)
      if (pathname !== '/') return
      e.preventDefault()
      document.getElementById(id)?.scrollIntoView({ block: 'start' })
      navigate(`/#${id}`, { replace: true })
    },
    [pathname, navigate],
  )

  return (
    <header className="header">
      <div className="wrap header__inner">
        <Link to="/" className="logo" aria-label={`${site.brand} — beranda`}>
          <img
            src="/logo-bml.png"
            alt={`${site.brand} — ${site.legalName}`}
            width={85}
            height={30}
            fetchPriority="high"
            decoding="async"
          />
        </Link>

        <button
          className="nav-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="main-nav"
          aria-label={open ? 'Tutup menu' : 'Buka menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>

        <nav id="main-nav" className={`nav${open ? ' is-open' : ''}`}>
          {SECTIONS.map((s) => (
            <Link
              key={s.id}
              to={`/#${s.id}`}
              className="nav__link"
              onClick={goToSection(s.id)}
            >
              {s.label}
            </Link>
          ))}
          <a
            className="btn btn--primary btn--header-mobile"
            href={waLink(
              `Halo ${site.agent.name}, saya ingin konsultasi properti di Manado.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
          >
            Konsultasi
          </a>
        </nav>

        <a
          className="btn btn--primary btn--header-desktop"
          href={waLink(
            `Halo ${site.agent.name}, saya ingin konsultasi properti di Manado.`,
          )}
          target="_blank"
          rel="noopener noreferrer"
        >
          Konsultasi
        </a>
      </div>
    </header>
  )
}
