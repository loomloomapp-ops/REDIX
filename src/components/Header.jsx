import { useEffect, useRef, useState } from 'react'
import { useI18n } from '../i18n.jsx'

export default function Header({ onOpenPopup }) {
  const { t, lang, setLang } = useI18n()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const delta = y - lastY.current
      if (y < 80) setHidden(false)
      else if (delta > 6) setHidden(true)
      else if (delta < -6) setHidden(false)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navItems = [
    ['#niches', t.nav.directions],
    ['#cases', t.nav.cases],
    ['#audit', t.nav.audit],
    ['#results', t.nav.benefits],
    ['#testi', t.nav.reviews],
    ['#faq', t.nav.faq],
    ['#contact', t.nav.contacts],
  ]

  return (
    <header className={`topbar sticky${hidden ? ' hide' : ''}`}>
      <a href="#" className="logo"><span className="d" />RADIX</a>
      <nav className="nav">
        {navItems.map(([href, label]) => (
          <a key={href} href={href}>{label}</a>
        ))}
      </nav>
      <div className="topbar-right">
        <span className="lang">
          <button onClick={() => setLang('uk')} aria-pressed={lang === 'uk'}>
            {lang === 'uk' ? <b>UA</b> : 'UA'}
          </button>
          /
          <button onClick={() => setLang('ru')} aria-pressed={lang === 'ru'}>
            {lang === 'ru' ? <b>RU</b> : 'RU'}
          </button>
        </span>
        <button className="btn" onClick={onOpenPopup}>
          {t.cta.book} <span className="arr" />
        </button>
        <button className="mobile-nav-btn" onClick={() => setMobileOpen(true)} aria-label="Menu">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h14M3 10h14M3 14h14" /></svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="mobile-nav-panel" onClick={() => setMobileOpen(false)}>
          <div className="top">
            <a href="#" className="logo"><span className="d" />RADIX</a>
            <button className="mobile-nav-btn" aria-label={t.popup.close} style={{ display: 'inline-flex' }}>
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 5l10 10M5 15L15 5" /></svg>
            </button>
          </div>
          {navItems.map(([href, label]) => (
            <a key={href} href={href}>{label}</a>
          ))}
          <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
            <button
              onClick={(e) => { e.stopPropagation(); setLang('uk') }}
              className="btn ghost"
              style={{ color: lang === 'uk' ? '#fff' : 'rgba(255,255,255,0.5)', borderColor: 'rgba(255,255,255,0.25)', background: 'transparent' }}
            >UA</button>
            <button
              onClick={(e) => { e.stopPropagation(); setLang('ru') }}
              className="btn ghost"
              style={{ color: lang === 'ru' ? '#fff' : 'rgba(255,255,255,0.5)', borderColor: 'rgba(255,255,255,0.25)', background: 'transparent' }}
            >RU</button>
          </div>
          <button
            className="btn"
            style={{ marginTop: 16, alignSelf: 'flex-start' }}
            onClick={(e) => { e.stopPropagation(); setMobileOpen(false); onOpenPopup() }}
          >
            {t.cta.book} <span className="arr" />
          </button>
        </div>
      )}
    </header>
  )
}
