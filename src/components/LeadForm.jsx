import { useState } from 'react'
import { motion } from 'framer-motion'
import { useI18n } from '../i18n.jsx'
import { directions } from '../data.js'
import { sendLeadToTelegram } from '../lib/telegram.js'

const initial = { name: '', niche: '', nicheOther: '', budget: '', contact: '', policy: false }

function validate(values, t) {
  const e = {}
  if (!values.name.trim()) e.name = t.form.errors.required
  if (!values.niche) e.niche = t.form.errors.required
  if (values.niche === '__other' && !values.nicheOther.trim()) e.nicheOther = t.form.errors.required
  if (!values.budget) e.budget = t.form.errors.required

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

export default function LeadForm({ source = 'inline', compact = false, dark = false }) {
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
        niche: values.niche === '__other' ? values.nicheOther.trim() : values.niche,
        budget: values.budget,
        contact: values.contact.trim(),
        timestamp: new Date().toISOString(),
      })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const fieldClass = dark ? 'field-dark' : 'field'
  const labelMuted = dark ? 'text-ivory/55' : 'text-graphite/55'
  const helperMuted = dark ? 'text-ivory/55' : 'text-graphite/55'
  const textColor = dark ? 'text-ivory' : 'text-graphite'
  const subColor = dark ? 'text-ivory/75' : 'text-graphite/75'

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className={
          compact
            ? ''
            : dark
              ? 'liquid-glass px-6 py-10 md:px-10 md:py-14'
              : 'border border-sage rounded-3xl bg-ivory px-6 py-10 md:px-10 md:py-14'
        }
      >
        <div className="font-mono text-xs uppercase tracking-[0.22em] text-orange">●</div>
        <h3 className={`mt-3 font-display font-extrabold uppercase tracking-[-0.02em] text-3xl md:text-4xl ${textColor}`}>
          {t.form.successTitle}
        </h3>
        <p className={`mt-4 max-w-[44ch] leading-relaxed text-[15px] ${subColor}`}>{t.form.successText}</p>
        <button
          type="button"
          onClick={() => { setValues(initial); setStatus('idle') }}
          className={`mt-6 inline-flex text-sm underline underline-offset-4 decoration-orange/70 ${dark ? 'text-ivory/85 hover:text-ivory' : 'text-graphite/75 hover:text-graphite'}`}
        >
          {t.form.successAgain}
        </button>
      </motion.div>
    )
  }

  const list = directions[lang]

  return (
    <form
      noValidate
      onSubmit={submit}
      data-event="form"
      data-source={source}
      className={
        compact
          ? ''
          : dark
            ? 'liquid-glass p-6 md:p-10'
            : 'border border-sage rounded-3xl bg-ivory p-6 md:p-10'
      }
    >
      <div className="grid grid-cols-12 gap-4 md:gap-5">
        <Field dark={dark} label={t.form.name} error={errors.name} className="col-span-12 md:col-span-6">
          <input
            type="text"
            value={values.name}
            onChange={(e) => set('name', e.target.value)}
            autoComplete="given-name"
            className={fieldClass}
          />
        </Field>

        <Field dark={dark} label={t.form.budget} error={errors.budget} className="col-span-12 md:col-span-6">
          <select
            value={values.budget}
            onChange={(e) => set('budget', e.target.value)}
            className={fieldClass}
          >
            <option value="">{t.form.budgetPlaceholder}</option>
            {t.form.budgets.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </Field>

        <Field dark={dark} label={t.form.niche} error={errors.niche || errors.nicheOther} className="col-span-12">
          <select
            value={values.niche}
            onChange={(e) => set('niche', e.target.value)}
            className={fieldClass}
          >
            <option value="">{t.form.nichePlaceholder}</option>
            {list.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
            <option value="__other">{t.form.nicheOther}</option>
          </select>
          {values.niche === '__other' && (
            <input
              type="text"
              value={values.nicheOther}
              onChange={(e) => set('nicheOther', e.target.value)}
              placeholder={t.form.nicheOtherPlaceholder}
              className={`${fieldClass} mt-3`}
            />
          )}
        </Field>

        <Field dark={dark} label={t.form.contact} hint={t.form.contactHint} error={errors.contact} className="col-span-12">
          <input
            type="text"
            inputMode="tel"
            autoComplete="tel"
            value={values.contact}
            onChange={(e) => set('contact', e.target.value)}
            className={fieldClass}
          />
        </Field>

        <div className="col-span-12">
          <label className={`flex items-start gap-3 text-sm cursor-pointer select-none ${dark ? 'text-ivory/80' : 'text-graphite/80'}`}>
            <input
              type="checkbox"
              checked={values.policy}
              onChange={(e) => set('policy', e.target.checked)}
              className={`mt-1 h-4 w-4 rounded shrink-0 accent-green ${dark ? 'border-ivory/30' : 'border-graphite/30'}`}
            />
            <span>
              {t.form.policy}
              <a href="/privacy" className={`underline underline-offset-2 ${dark ? 'hover:text-ivory' : 'hover:text-graphite'}`}>{t.form.policyLink}</a>
            </span>
          </label>
          {errors.policy && <div className="mt-1.5 text-xs text-orange">{errors.policy}</div>}
        </div>

        <div className="col-span-12">
          <button
            type="submit"
            disabled={status === 'sending'}
            className={`inline-flex items-center justify-center gap-2 rounded-full font-display font-bold uppercase tracking-[0.06em] px-7 py-4 text-sm transition disabled:opacity-60 disabled:cursor-not-allowed w-full md:w-auto ${
              dark ? 'bg-green text-ivory hover:bg-green-glow' : 'bg-green text-ivory hover:bg-green-dark'
            }`}
          >
            {status === 'sending' ? t.form.sending : t.form.submit}
            {status !== 'sending' && (
              <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M4 10h12M11 5l5 5-5 5"/></svg>
            )}
          </button>
          {status === 'error' && <div className="mt-3 text-sm text-orange">{t.form.errors.generic}</div>}
        </div>
      </div>
    </form>
  )
}

function Field({ label, hint, error, children, className, dark }) {
  return (
    <div className={className}>
      <label className={`block font-mono text-[10px] uppercase tracking-[0.2em] mb-2 ${dark ? 'text-ivory/55' : 'text-graphite/55'}`}>
        {label}
      </label>
      {children}
      {hint && !error && <div className={`mt-1.5 text-xs ${dark ? 'text-ivory/55' : 'text-graphite/55'}`}>{hint}</div>}
      {error && <div className="mt-1.5 text-xs text-orange">{error}</div>}
    </div>
  )
}
