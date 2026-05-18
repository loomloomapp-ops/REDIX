import { useI18n } from '../i18n.jsx'

export default function Testimonials() {
  const { t } = useI18n()
  const r = t.testi
  return (
    <section className="section" id="testi" data-screen-label="08 Testimonials">
      <div className="sec-head">
        <div>
          <div className="eyebrow"><span className="bullet" />{r.eyebrow}</div>
          <h2>{r.h2a}<span className="serif-it">{r.h2b}</span><span className="dot" /></h2>
        </div>
        <p className="right">{r.right}</p>
      </div>
      <div className="testi">
        {r.items.map((it, i) => (
          <article key={i} className={`tcard${it.dark ? ' dark' : ''}${it.orange ? ' orange' : ''}`}>
            <div className="who">
              <div className="ava">{it.ava}</div>
              <div>
                <div className="nm">{it.nm}</div>
                <div className="rl">{it.rl}</div>
              </div>
            </div>
            <div className="bubble">{it.text}</div>
            <span className="time">{it.time}</span>
          </article>
        ))}
      </div>
    </section>
  )
}
