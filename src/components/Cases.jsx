import { useEffect, useRef, useState } from 'react'
import { useI18n } from '../i18n.jsx'
import CountUp from '../lib/CountUp.jsx'

function renderBody(text) {
  const parts = text.split(/\{u\}|\{\/u\}/g)
  return parts.map((p, i) => (i % 2 === 1 ? <u key={i}>{p}</u> : p))
}

const pad = (i) => String(i + 1).padStart(2, '0')

export default function Cases() {
  const { t } = useI18n()
  const c = t.cases
  const items = c.items
  const [idx, setIdx] = useState(0)
  const touchStartX = useRef(null)
  const cur = items[idx]
  const total = items.length

  const go = (delta) => setIdx((v) => (v + delta + total) % total)
  const prev = () => go(-1)
  const next = () => go(1)

  const wrapRef = useRef(null)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
    }
    const node = wrapRef.current
    if (!node) return
    node.addEventListener('keydown', onKey)
    return () => node.removeEventListener('keydown', onKey)
  }, [])

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd = (e) => {
    if (touchStartX.current == null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)()
    touchStartX.current = null
  }

  return (
    <section className="section reveal-fade" id="cases" data-screen-label="04 Cases">
      <div className="sec-head">
        <div>
          <div className="eyebrow"><span className="bullet" />{c.eyebrow}</div>
          <h2 className="reveal-l">
            {c.h2a}{c.h2b}{c.h2c}<br />{c.h2d}<span className="dot" />
          </h2>
        </div>
        <p className="right">{c.right}</p>
      </div>

      <div
        className="cases"
        ref={wrapRef}
        tabIndex={0}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        aria-roledescription="carousel"
        aria-label="Кейси"
      >
        <div className="case-media" key={`m-${idx}`}>
          <img src={cur.img} alt={cur.tag} loading="lazy" />
          <span className="case-tag">{cur.tag}</span>
          <span className="swipe-hint lg:hidden" aria-hidden="true">
            <span className="swipe-finger" />
            <span>{c.swipeHint}</span>
          </span>
        </div>

        <div className="case-info" key={`i-${idx}`}>
          <div>
            <div className="row-top">
              <span className="mono">Кейс {pad(idx)} / {pad(total - 1)}</span>
              <div className="switch">
                <button aria-label="Попередній кейс" onClick={prev}>←</button>
                <button aria-label="Наступний кейс" onClick={next}>→</button>
              </div>
            </div>
            <h3>{cur.title1}<br />{cur.title2}<span className="dot" /></h3>
            <div className="body">
              <p>{renderBody(cur.body1)}</p>
              <p>{renderBody(cur.body2)}</p>
            </div>
          </div>
          <div className="stats">
            {cur.stats.map((s, i) => (
              <div className="stat" key={i}>
                <div className="num">
                  {s.num && <CountUp value={s.num} />}
                  {s.accent && <span className="o">{s.accent}</span>}
                </div>
                <div className="lab">{s.lab}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="cases-foot">
        <span>{c.foot1}</span>
        <span>{c.foot2Tpl.replace('{i}', pad(idx)).replace('{n}', pad(total - 1))}</span>
      </div>
    </section>
  )
}
