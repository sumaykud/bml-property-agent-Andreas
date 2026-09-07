import { site, waLink } from '../lib/site'
import Reveal from './Reveal'

export default function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero__grid">
        <div>
          <Reveal as="p" className="eyebrow">
            {site.legalName}
          </Reveal>

          <Reveal as="h1" delay={70}>
            {site.agent.name}, siap bantu Anda <em>agen properti terpercaya</em>
          </Reveal>

          <Reveal as="p" className="hero__lead" delay={140}>
            Listing rumah dan apartemen di Manado yang sudah dicek legalitas dan
            kondisi fisiknya. Anda dapat simulasi KPR, jadwal survei, dan
            pendampingan sampai akad — tanpa biaya tambahan dari sisi pembeli.
          </Reveal>

          <Reveal className="hero__actions" delay={200}>
            <a
              className="btn btn--primary btn--lg"
              href={waLink(
                `Halo ${site.agent.name}, saya ingin konsultasi properti di Manado.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              Konsultasi sekarang
            </a>
            <a className="btn btn--ghost btn--lg" href="#properti">
              Lihat listing
            </a>
          </Reveal>

          <Reveal className="proof" delay={250}>
            <div className="avatars" aria-hidden="true">
              <span>RW</span>
              <span>JT</span>
              <span>MS</span>
              <span>AL</span>
            </div>
            <p className="proof__text">
              <span className="stars" aria-hidden="true">
                ★★★★★
              </span>{' '}
              <strong>{site.clientsServed} klien</strong> terbantu sejak 2021
            </p>
          </Reveal>
        </div>

        <Reveal className="hero__portrait" delay={120}>
          <svg
            viewBox="0 0 320 400"
            role="img"
            aria-label={`Foto ${site.agent.name}, ${site.agent.role}`}
            style={{ width: '100%', height: '100%' }}
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="agentSilhouette" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#0b5cff" stopOpacity="0.30" />
                <stop offset="1" stopColor="#0b5cff" stopOpacity="0.14" />
              </linearGradient>
            </defs>
            {/*
              Siluet kepala & bahu sebagai pengganti sementara foto agen.
              Kepala berakhir di y=160 dan bahu mulai di y=176: jarak 16 unit
              supaya terbaca sebagai satu sosok, bukan dua bentuk terpisah.
              Bahu berhenti di y=280, jadi tidak tertimpa kartu nama di bawah.
            */}
            <g fill="url(#agentSilhouette)">
              <circle cx="160" cy="112" r="48" />
              <path d="M160 176c-54 0-98 44-98 98v6h196v-6c0-54-44-98-98-98z" />
            </g>
          </svg>
          <div className="hero__badge">
            <strong>{site.agent.name}</strong>
            <span>{site.agent.role} · Manado</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
