import { useState } from 'react'
import { useI18n } from '../i18n.jsx'

export default function FAQ() {
  const { t } = useI18n()
  const [open, setOpen] = useState(0)
  const f = t.faq
  return (
    <section className="section reveal-fade" id="faq" data-screen-label="09 FAQ">
      <div className="faq">
        <div>
          <div className="eyebrow"><span className="bullet" />{f.eyebrow}</div>
          <h3 className="reveal-l">{f.h3a}{f.h3b}<span className="dot" /></h3>
          <p className="desc">{f.desc}</p>
        </div>
        <div className="faq-list reveal-stagger">
          {f.items.map((it, i) => (
            <button
              key={i}
              type="button"
              className={`faq-item${open === i ? ' open' : ''}`}
              onClick={() => setOpen(open === i ? -1 : i)}
              aria-expanded={open === i}
            >
              <h5>{it.q}</h5>
              <span className="plus" />
              <div className="ans">{it.a}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
