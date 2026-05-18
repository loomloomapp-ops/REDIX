import { useI18n } from '../i18n.jsx'
import LeadForm from './LeadForm.jsx'

export default function AuditForm() {
  const { t } = useI18n()
  const a = t.audit
  return (
    <section className="section reveal-fade" id="audit" data-screen-label="05 Audit">
      <div className="audit-block">
        <div>
          <div className="eyebrow"><span className="bullet" />{a.eyebrow}</div>
          <h3 className="reveal-l">
            {a.h3a}<br /><span className="serif-it">{a.h3b}</span>{a.h3c}<span className="dot" />
          </h3>
          <p className="desc">
            {a.desc1}<u>{a.descU}</u>{a.desc2}
          </p>
          <div className="info-rows">
            {a.info.map(([k, v]) => (
              <div className="ir" key={k}><span>{k}</span><b>{v}</b></div>
            ))}
          </div>
        </div>
        <LeadForm source="audit-section" />
      </div>
    </section>
  )
}
