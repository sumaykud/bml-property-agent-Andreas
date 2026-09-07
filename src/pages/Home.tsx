import { useEffect } from 'react'
import Faq from '../components/Faq'
import Hero from '../components/Hero'
import Listings from '../components/Listings'
import { site } from '../lib/site'

export default function Home() {
  useEffect(() => {
    document.title = `${site.brand} — ${site.agent.name}, Agen Properti Terpercaya`
  }, [])

  return (
    <>
      <Hero />
      <Listings />
      <Faq />
    </>
  )
}
