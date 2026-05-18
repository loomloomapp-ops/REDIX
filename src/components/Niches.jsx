import { useI18n } from '../i18n.jsx'

export default function Niches() {
  const { t } = useI18n()
  const n = t.niches
  return (
    <section className="section reveal" id="niches" data-screen-label="03 Niches">
      <div className="sec-head">
        <div>
          <div className="eyebrow"><span className="bullet" />{n.eyebrow}</div>
          <h2>
            {n.h2a}<br />{n.h2b}<span className="serif-it">{n.h2c}</span><span className="dot" />
          </h2>
        </div>
        <p className="right">{n.right}</p>
      </div>

      <div className="niches">
        <div className="niches-left">
          <div className="top">
            <h3>
              {n.leftTitle1}<span style={{ color: 'var(--accent)' }}>+</span>{n.leftTitle2}<span className="serif-it">{n.leftTitle3}</span>
            </h3>
            <p>{n.leftText}</p>
          </div>
          <span className="pill"><span className="b" />{n.pill}</span>
        </div>
        <div className="niches-right">
          {n.rows.map(([num, name, meta]) => (
            <div className="niche-row" key={num}>
              <span className="n">— {num}</span>
              <span className="name">{name}</span>
              <span className="meta">{meta}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
