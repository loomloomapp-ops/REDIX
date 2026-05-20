import { useI18n } from '../i18n.jsx'
import CountUp from '../lib/CountUp.jsx'

export default function AISection() {
  const { t } = useI18n()
  const a = t.ai
  return (
    <section className="section reveal-fade" data-screen-label="07 AI">
      <div className="ai">
        <div className="ai-left">
          <div>
            <div className="eyebrow"><span className="bullet" />{a.eyebrow}</div>
            <h3 className="reveal-l">{a.h3a}{a.h3b}{a.h3c}<span className="dot" /></h3>
          </div>
          <p className="desc">{a.desc}</p>
        </div>
        <div className="ai-stats reveal-stagger">
          <div className="ai-stat orange">
            <div className="num"><CountUp value={a.stat1.num} /></div>
            <div>
              <div className="sub">{a.stat1.sub}</div>
              <div className="lab">{a.stat1.lab}</div>
            </div>
          </div>
          <div className="ai-stat">
            <div className="num"><CountUp value={a.stat2.num} /></div>
            <div>
              <div className="sub">{a.stat2.sub}</div>
              <div className="lab">{a.stat2.lab}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
