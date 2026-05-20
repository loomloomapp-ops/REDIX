import { useState } from 'react'
import { useI18n } from '../i18n.jsx'

function Video({ id, label }) {
  const [active, setActive] = useState(false)
  const [thumbSrc, setThumbSrc] = useState(`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`)
  const handleError = () => setThumbSrc(`https://i.ytimg.com/vi/${id}/sddefault.jpg`)
  if (active) {
    return (
      <div className="vcard vcard-playing">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1&controls=1`}
          title={label}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <span className="vcard-titlemask" aria-hidden="true" />
      </div>
    )
  }
  return (
    <button type="button" className="vcard" onClick={() => setActive(true)} aria-label={label}>
      <img src={thumbSrc} alt={label} loading="lazy" onError={handleError} />
      <span className="vcard-shade" />
      <span className="vcard-play" aria-hidden="true" />
      <span className="vcard-label">{label}</span>
    </button>
  )
}

export default function Testimonials() {
  const { t } = useI18n()
  const r = t.testi
  return (
    <section className="section reveal-fade" id="testi" data-screen-label="08 Testimonials">
      <div className="sec-head">
        <div>
          <div className="eyebrow"><span className="bullet" />{r.eyebrow}</div>
          <h2 className="reveal-l">{r.h2a}{r.h2b}<span className="dot" /></h2>
        </div>
        <p className="right">{r.right}</p>
      </div>
      <div className="testi-videos reveal-stagger">
        {r.videos.map((v) => (
          <Video key={v.id} id={v.id} label={v.label} />
        ))}
      </div>
    </section>
  )
}
