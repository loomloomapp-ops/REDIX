import { useI18n } from '../i18n.jsx'

export default function FinalCTA({ onOpenPopup }) {
  const { t } = useI18n()
  const f = t.final
  return (
    <section className="section reveal" id="contact" data-screen-label="10 Contact">
      <div className="final">
        <div className="ring" />
        <div className="ring r2" />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="eyebrow"><span className="bullet" />{f.eyebrow}</div>
          <h3>{f.h3a}<br />{f.h3b}<span className="serif-it">{f.h3c}</span><span className="dot" style={{ background: '#fff' }} /></h3>
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p>{f.desc}</p>
          <div className="ctas">
            <button className="btn" style={{ background: '#111', color: '#fff' }} onClick={onOpenPopup}>
              {t.cta.book} <span className="arr" />
            </button>
            <a className="btn light" href={`mailto:${f.email}`}>{f.email}</a>
          </div>
          <div className="links">
            {f.links.map(([k, v]) => (
              <div key={k}>● {k} <b>{v}</b></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
