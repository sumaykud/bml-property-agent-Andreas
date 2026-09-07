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
          {/*
            Foto dibiarkan pada rasio aslinya (nyaris persegi) dan dipotong oleh
            CSS: bingkainya tegak 4:5 di desktop tapi mendatar 5:4 di layar
            sempit, jadi memotong berkasnya lebih dulu ke salah satu rasio
            justru merusak tampilan di rasio yang lain.
          */}
          <img
            className="hero__photo"
            src="/images/agent/andreas.jpg"
            alt={`${site.agent.name}, ${site.agent.role}`}
            width={716}
            height={698}
            fetchPriority="high"
            decoding="async"
          />
          <div className="hero__badge">
            <strong>{site.agent.name}</strong>
            <span>{site.agent.role} · Manado</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
