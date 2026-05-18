import { useCallback, useState } from 'react'
import { I18nProvider } from './i18n.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import Niches from './components/Niches.jsx'
import Cases from './components/Cases.jsx'
import AuditForm from './components/AuditForm.jsx'
import Results from './components/Results.jsx'
import AISection from './components/AISection.jsx'
import Testimonials from './components/Testimonials.jsx'
import FAQ from './components/FAQ.jsx'
import FinalCTA from './components/FinalCTA.jsx'
import Footer from './components/Footer.jsx'
import Popup from './components/Popup.jsx'

export default function App() {
  const [popupOpen, setPopupOpen] = useState(false)
  const openPopup = useCallback(() => setPopupOpen(true), [])
  const closePopup = useCallback(() => setPopupOpen(false), [])

  return (
    <I18nProvider>
      <div className="wrap">
        <Header onOpenPopup={openPopup} />
        <Hero onOpenPopup={openPopup} />
        <Marquee />
        <Niches />
        <Cases />
        <AuditForm />
        <Results />
        <AISection />
        <Testimonials />
        <FAQ />
        <FinalCTA onOpenPopup={openPopup} />
        <Footer />
        <div className="botbar">
          <span>© 2025 Radix Agency · All rights reserved</span>
          <span>[ White Traffic — for those who count money ]</span>
          <span>UA / RU</span>
        </div>
      </div>
      <Popup open={popupOpen} onClose={closePopup} />
    </I18nProvider>
  )
}
