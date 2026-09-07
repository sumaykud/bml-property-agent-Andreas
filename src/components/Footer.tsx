import { Link } from 'react-router-dom'
import { site, waLink } from '../lib/site'

const COLUMNS = [
  {
    title: 'Properti',
    links: [
      { label: 'Jual', to: '/#properti' },
      { label: 'Beli', to: '/#properti' },
      { label: 'Sewa', to: '/#properti' },
    ],
  },
  {
    title: 'Akun',
    links: [
      { label: 'Masuk', to: '/#properti' },
      { label: 'Buat akun', to: '/#properti' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'FAQ', to: '/#faq' },
      { label: 'Privacy', to: '/#faq' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__grid">
          <div>
            <Link to="/" className="footer__logo" aria-label={`${site.brand} — beranda`}>
              <img
                src="/logo-bml.png"
                alt={`${site.brand} — ${site.legalName}`}
                width={97}
                height={34}
                loading="lazy"
                decoding="async"
              />
            </Link>
            <p className="footer__about">
              {site.legalName}. Pendampingan jual, beli, dan sewa properti di Manado
              bersama {site.agent.name} — dari pencarian sampai serah terima kunci.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div className="footer__col" key={col.title}>
              <h4>{col.title}</h4>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer__bottom">
          <span>
            © {site.year} {site.legalName}. Seluruh hak cipta dilindungi.
          </span>
          <a
            href={waLink(`Halo ${site.agent.name}, saya ingin bertanya soal properti.`)}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp {site.agent.name}
          </a>
        </div>
      </div>
    </footer>
  )
}
