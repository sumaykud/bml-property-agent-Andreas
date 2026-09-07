import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import PropertyDetail from './pages/PropertyDetail'

/**
 * Satu-satunya pengatur posisi gulir aplikasi:
 * - ada hash  → gulir ke seksi tujuan (mis. /#properti dari halaman detail)
 * - tanpa hash → mulai dari atas halaman
 *
 * Pemulihan gulir bawaan browser dimatikan agar tidak beradu dengan logika ini.
 */
function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }

    const id = hash.slice(1)
    let timer = 0
    let attempts = 0

    const tryScroll = () => {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ block: 'start' })
        return
      }
      // Sengaja memakai timer, bukan requestAnimationFrame: rAF berhenti total
      // di tab yang tidak terlihat, sehingga tautan yang dibuka di tab latar
      // tidak akan pernah tergulir.
      if (++attempts < 8) timer = window.setTimeout(tryScroll, 60)
    }

    // DOM sudah ter-commit saat efek berjalan, jadi percobaan pertama ini
    // hampir selalu langsung berhasil; percobaan ulang hanya jaring pengaman.
    tryScroll()
    return () => window.clearTimeout(timer)
  }, [pathname, hash])

  return null
}

/**
 * Seluruh rute di-bundel jadi satu. Halaman detail hanya ~2,3 kB (gzip);
 * memuatnya malas justru menambah satu perjalanan jaringan pada tautan
 * properti yang paling sering dibagikan — jadi tidak sepadan.
 */
export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Lewati ke konten utama
      </a>

      <Header />
      <ScrollManager />

      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properti/:slug" element={<PropertyDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </>
  )
}
