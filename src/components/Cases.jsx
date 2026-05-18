import { useI18n } from '../i18n.jsx'

export default function Cases() {
  const { t } = useI18n()
  const c = t.cases
  return (
    <section className="section" id="cases" data-screen-label="04 Cases">
      <div className="sec-head">
        <div>
          <div className="eyebrow"><span className="bullet" />{c.eyebrow}</div>
          <h2>
            {c.h2a}<span className="serif-it">{c.h2b}</span>{c.h2c}<br />{c.h2d}<span className="dot" />
          </h2>
        </div>
        <p className="right">{c.right}</p>
      </div>

      <div className="cases">
        <div className="case-phone">
          <div className="phone-notch" />
          <div className="phone-screen">
            <div className="head">
              <span className="brand">Фермер</span>
              <span className="ph-tag">[ AD_PREVIEW ]</span>
            </div>
            <div className="ribbon">−40%</div>
            <div className="big-title">
              App<br />Winter<br /><span className="o">Sale</span>
            </div>
            <div className="chart">
              <div className="row"><span>ROAS / D30</span><b>×4.2</b></div>
              <div className="bars">
                <div style={{ height: '30%' }} />
                <div style={{ height: '45%' }} />
                <div style={{ height: '38%' }} />
                <div style={{ height: '62%' }} />
                <div style={{ height: '55%' }} />
                <div style={{ height: '78%' }} />
                <div style={{ height: '94%' }} />
              </div>
              <div className="row"><span>CPA Δ</span><b style={{ color: 'var(--accent)' }}>−38%</b></div>
            </div>
          </div>
        </div>

        <div className="case-info">
          <div>
            <div className="row-top">
              <span className="mono">{c.counter}</span>
              <div className="switch">
                <button aria-label="prev">←</button>
                <button className="active" aria-label="next">→</button>
              </div>
            </div>
            <h3>{c.title1}<br /><span className="serif-it">{c.title2}</span><span className="dot" /></h3>
            <div className="body">
              <p>{c.body1.split('тричі потрапляв під блокування акаунтів').length > 1
                ? <>{c.body1.split('тричі потрапляв під блокування акаунтів')[0]}<u>тричі потрапляв під блокування акаунтів</u>{c.body1.split('тричі потрапляв під блокування акаунтів')[1]}</>
                : c.body1}</p>
              <p>{c.body2}</p>
            </div>
          </div>
          <div className="stats">
            {c.stats.map((s, i) => (
              <div className="stat" key={i}>
                <div className="num">{s.num}{s.accent && <span className="o">{s.accent}</span>}</div>
                <div className="lab">{s.lab}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="cases-foot">
        <span>{c.foot1}</span>
        <span>{c.foot2}</span>
      </div>
    </section>
  )
}
