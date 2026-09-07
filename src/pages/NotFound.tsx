import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { site } from '../lib/site'

export default function NotFound() {
  useEffect(() => {
    document.title = `Halaman tidak ditemukan — ${site.brand}`
  }, [])

  return (
    <div className="wrap notfound">
      <div>
        <h1>Halaman tidak ditemukan</h1>
        <p>Tautan mungkin salah, atau unit sudah tidak ditayangkan lagi.</p>
        <Link className="btn btn--primary btn--lg" to="/#properti">
          Kembali ke listing
        </Link>
      </div>
    </div>
  )
}
