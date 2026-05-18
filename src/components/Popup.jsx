import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useI18n } from '../i18n.jsx'
import LeadForm from './LeadForm.jsx'

export default function Popup({ open, onClose }) {
  const { t } = useI18n()

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div className="popup-overlay" role="dialog" aria-modal="true" aria-labelledby="popup-title" onClick={onClose}>
      <div className="popup-card" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="close" aria-label={t.popup.close} onClick={onClose}>
          <svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 5l10 10M5 15L15 5" />
          </svg>
        </button>
        <div className="eyebrow" style={{ color: '#EFEAE2' }}>
          <span className="bullet" />Radix · Audit
        </div>
        <h3 id="popup-title">{t.popup.title}<span className="dot" /></h3>
        <p className="sub">{t.popup.sub}</p>
        <div className="form-wrap">
          <LeadForm source="popup" />
        </div>
      </div>
    </div>,
    document.body,
  )
}
