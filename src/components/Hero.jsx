import { useI18n } from '../i18n.jsx'

export default function Hero({ onOpenPopup }) {
  const { t } = useI18n()
  const h = t.hero
  return (
    <section className="hero reveal-fade" data-screen-label="02 Hero">
      <div className="hero-grid">
        <div className="card dark hero-left">
          <div className="head">
            <span className="badge"><span className="pulse" />{h.badge}</span>
            <span className="mono" style={{ color: '#9D9485' }}>{h.tag}</span>
          </div>
          <h1 className="reveal-l">
            {h.h1a}<br />
            <span className="serif-it">{h.h1b}</span><br />
            {h.h1c}<br />
            {h.h1d}<span className="dot" />
          </h1>
          <div className="hero-meta">
            <div className="geo">
              {h.geo}&nbsp; <b>UA</b> · <b>EU</b> · <b>USA</b> · <b>CANADA</b> · <b>UAE</b>
            </div>
            <div className="hero-actions">
              <button className="btn" onClick={onOpenPopup}>
                {t.cta.book} <span className="arr" />
              </button>
              <a className="btn light" href="#niches">
                {t.cta.look} <span className="arr" />
              </a>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-img">
            <div className="tag">
              <span className="mono" style={{ color: 'rgba(255,255,255,0.9)' }}>{h.previewTag}</span>
              <span className="rec"><span className="d" />● {h.live}</span>
            </div>
            <div className="video-frame" role="button" aria-label={h.meta}>
              <div className="scanline" />
              <span className="corner-tl" /><span className="corner-tr" />
              <span className="corner-bl" /><span className="corner-br" />
              <div className="play" aria-hidden="true" />
              <span className="meta"><span className="ic" />{h.meta}</span>
              <span className="dur">00 : 48</span>
            </div>
            <div className="corner" />
            <h3>{h.preview}</h3>
          </div>
          <div className="hero-stat">
            {h.stats.map((s, i) => (
              <div className="stat" key={i}>
                <div className="num">{s.num}</div>
                <div className="lab">{s.lab}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
