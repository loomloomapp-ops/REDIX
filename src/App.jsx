import { useCallback, useState } from 'react'
import { I18nProvider } from './i18n.jsx'
import Preloader from './components/Preloader.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import Directions from './components/Directions.jsx'
import Cases from './components/Cases.jsx'
import LeadFormSection from './components/LeadFormSection.jsx'
import Benefits from './components/Benefits.jsx'
import Reviews from './components/Reviews.jsx'
import FAQ from './components/FAQ.jsx'
import Footer from './components/Footer.jsx'
import Popup from './components/Popup.jsx'
import CTAOverlays from './components/CTAOverlays.jsx'

export default function App() {
  const [popup, setPopup] = useState(false)
  const [ready, setReady] = useState(false)
  const openPopup = () => setPopup(true)
  const closePopup = () => setPopup(false)
  const handleReady = useCallback(() => setReady(true), [])

  return (
    <I18nProvider>
      <Preloader onReady={handleReady} />
      <Header onOpenPopup={openPopup} />
      <main>
        <Hero ready={ready} />
        <Marquee />
        <Directions />
        <Cases />
        <LeadFormSection />
        <Benefits />
        <Reviews />
        <FAQ />
      </main>
      <Footer />
      <CTAOverlays onOpenPopup={openPopup} popupOpen={popup} />
      <Popup open={popup} onClose={closePopup} />
    </I18nProvider>
  )
}
