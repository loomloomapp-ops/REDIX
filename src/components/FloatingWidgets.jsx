import { useEffect, useState } from 'react'
import { useI18n } from '../i18n.jsx'

function ArrowUpIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function TelegramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M21.5 4.2L18.4 19.3c-.2 1-.9 1.3-1.7.8l-4.7-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.7 8.6-7.8c.4-.3-.1-.5-.6-.2L6.5 13.4 2 12c-1-.3-1-1 .2-1.5L20.2 3c.8-.3 1.5.2 1.3 1.2z" fill="currentColor" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" />
    </svg>
  )
}

function ContactIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 5.5C4 4.67 4.67 4 5.5 4h13c.83 0 1.5.67 1.5 1.5v9c0 .83-.67 1.5-1.5 1.5H9.4l-3.7 3.2c-.5.43-1.2.07-1.2-.58V5.5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="9" cy="10" r="1" fill="currentColor" />
      <circle cx="12" cy="10" r="1" fill="currentColor" />
      <circle cx="15" cy="10" r="1" fill="currentColor" />
    </svg>
  )
}

export default function FloatingWidgets({ onOpenPopup }) {
  const { t } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 500)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <>
      {/* Desktop right cluster */}
      <div
        className={`fw-right ${scrolled ? 'fw-show' : ''} ${open ? 'fw-open' : ''}`}
        aria-label="Швидкий контакт"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <div className={`fw-actions ${open ? 'fw-actions-open' : ''}`}>
          <a
            className="fw-mini fw-tg"
            href={t.social.telegram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram"
          >
            <TelegramIcon />
          </a>
          <a
            className="fw-mini fw-ig"
            href={t.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <InstagramIcon />
          </a>
          <button
            type="button"
            className="fw-mini fw-cta"
            onClick={() => { setOpen(false); onOpenPopup?.() }}
            aria-label="Записатись"
          >
            <ContactIcon />
          </button>
        </div>
        <button
          type="button"
          className="fw-main"
          aria-expanded={open}
          aria-label="Швидкий контакт"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="fw-ping" aria-hidden="true" />
          <ContactIcon />
        </button>
      </div>

      {/* Desktop left back-to-top */}
      <button
        type="button"
        className={`fw-left ${scrolled ? 'fw-show' : ''}`}
        onClick={toTop}
        aria-label="Нагору"
      >
        <ArrowUpIcon />
      </button>

      {/* Mobile bottom bar */}
      <div className={`mobile-bar ${scrolled ? 'mobile-bar-show' : ''}`}>
        <button type="button" className="btn mb-cta" onClick={() => onOpenPopup?.()}>
          {t.mobile.cta} <span className="arr" />
        </button>
        <a
          href={t.social.telegram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Telegram"
          className="mb-icon mb-tg"
        >
          <TelegramIcon />
        </a>
        <a
          href={t.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="mb-icon mb-ig"
        >
          <InstagramIcon />
        </a>
      </div>
    </>
  )
}
