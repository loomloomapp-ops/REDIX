export function smoothScrollTo(id) {
  const el = document.getElementById(id)
  if (!el) return
  const header = document.querySelector('[data-radix-header]')
  const offset = header ? header.getBoundingClientRect().height + 12 : 12
  const top = el.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top, behavior: 'smooth' })
}
