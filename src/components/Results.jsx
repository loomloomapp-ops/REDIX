import { useI18n } from '../i18n.jsx'

export default function Results() {
  const { t } = useI18n()
  const r = t.results
  return (
    <section className="section reveal-fade" id="results" data-screen-label="06 Results">
      <div className="sec-head">
        <div>
          <div className="eyebrow"><span className="bullet" />{r.eyebrow}</div>
          <h2 className="reveal-l">
            {r.h2a}<br />{r.h2b}{r.h2c}<span className="dot" />
          </h2>
        </div>
        <p className="right">{r.right}</p>
      </div>
      <div className="results-grid reveal-stagger">
        {r.items.map((it) => (
          <div
            key={it.tag}
            className={`result${it.dark ? ' dark' : ''}${it.orange ? ' orange' : ''}${it.green ? ' green' : ''}${it.span6 ? ' span6' : ''}`}
          >
            <div>
              <span className="idx">— {it.tag}</span>
              <h4>
                {it.titleA}{it.titleB}{it.titleC || ''}
              </h4>
            </div>
            <p>{it.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
