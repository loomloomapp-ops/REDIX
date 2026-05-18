import { useState } from 'react'
import { useI18n } from '../i18n.jsx'

export default function Header({ onOpenPopup }) {
  const { t, lang, setLang } = useI18n()
  const [mobileOpen, setMobileOpen] = useState(false)

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
    <header className="topbar">
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
            <button className="mobile-nav-btn" aria-label={t.popup.close}>
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 5l10 10M5 15L15 5" /></svg>
            </button>
          </div>
          {navItems.map(([href, label]) => (
            <a key={href} href={href}>{label}</a>
          ))}
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
