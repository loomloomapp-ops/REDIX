import { useState } from 'react'
import { useI18n } from '../i18n.jsx'
import { sendLeadToTelegram } from '../lib/telegram.js'

const initial = { name: '', contact: '', niche: '', budget: '', comment: '', policy: true }

function validate(values, t) {
  const e = {}
  if (!values.name.trim()) e.name = t.form.errors.required
  const c = values.contact.trim()
  if (!c) e.contact = t.form.errors.required
  else {
    const phone = /^[+()\d\s-]{7,}$/.test(c)
    const tg = /^@?[a-zA-Z0-9_]{4,}$/.test(c)
    if (!phone && !tg) e.contact = t.form.errors.contact
  }
  if (!values.policy) e.policy = t.form.errors.policy
  return e
}

export default function LeadForm({ source = 'inline' }) {
  const { t, lang } = useI18n()
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const set = (k, v) => {
    setValues((s) => ({ ...s, [k]: v }))
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }))
  }

  async function submit(ev) {
    ev.preventDefault()
    const e = validate(values, t)
    setErrors(e)
    if (Object.keys(e).length) return
    setStatus('sending')
    try {
      await sendLeadToTelegram({
        source,
        lang,
        name: values.name.trim(),
        contact: values.contact.trim(),
        niche: values.niche,
        budget: values.budget,
        comment: values.comment.trim(),
        timestamp: new Date().toISOString(),
      })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="audit-form">
        <div className="ok">● {t.form.ok}</div>
        <div style={{ color: '#fff', fontFamily: 'Bricolage Grotesque', fontSize: 22, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
          {t.form.okSub}
        </div>
        <button
          type="button"
          className="btn light"
          onClick={() => { setValues(initial); setStatus('idle') }}
        >
          {t.form.again} <span className="arr" />
        </button>
      </div>
    )
  }

  return (
    <form className="audit-form" onSubmit={submit} noValidate data-source={source}>
      <div className="field">
        <label>{t.form.name}</label>
        <input
          type="text"
          placeholder={t.form.namePh}
          value={values.name}
          onChange={(e) => set('name', e.target.value)}
        />
        {errors.name && <span className="err">{errors.name}</span>}
      </div>
      <div className="row2">
        <div className="field">
          <label>{t.form.contact}</label>
          <input
            type="text"
            placeholder={t.form.contactPh}
            value={values.contact}
            onChange={(e) => set('contact', e.target.value)}
          />
          {errors.contact && <span className="err">{errors.contact}</span>}
        </div>
        <div className="field">
          <label>{t.form.niche}</label>
          <select value={values.niche} onChange={(e) => set('niche', e.target.value)}>
            <option value="">{t.form.nichePh}</option>
            {t.form.niches.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
      </div>
      <div className="field">
        <label>{t.form.budget}</label>
        <select value={values.budget} onChange={(e) => set('budget', e.target.value)}>
          <option value="">{t.form.budgetPh}</option>
          {t.form.budgets.map((b) => <option key={b} value={b}>{b}</option>)}
        </select>
      </div>
      <div className="field">
        <label>{t.form.comment}</label>
        <textarea
          rows={2}
          placeholder={t.form.commentPh}
          value={values.comment}
          onChange={(e) => set('comment', e.target.value)}
        />
      </div>
      <label className="check">
        <input
          type="checkbox"
          checked={values.policy}
          onChange={(e) => set('policy', e.target.checked)}
        />
        {t.form.policy}
      </label>
      {errors.policy && <span className="err">{errors.policy}</span>}
      <button className="btn" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? t.form.sending : t.form.submit} <span className="arr" />
      </button>
      {status === 'error' && <span className="err">{t.form.errors.generic}</span>}
    </form>
  )
}
