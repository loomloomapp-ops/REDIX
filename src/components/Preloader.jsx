import { useEffect, useState } from 'react'

export default function Preloader({ onReady, minShow = 1100 }) {
  const [exiting, setExiting] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let cleared = false
    const start = performance.now()
    const finish = () => {
      if (cleared) return
      const elapsed = performance.now() - start
      const wait = Math.max(0, minShow - elapsed)
      setTimeout(() => {
        if (cleared) return
        setExiting(true)
        // Fire onReady mid-curtain so Hero reveal starts as the viewport opens up
        setTimeout(() => { if (!cleared) onReady?.() }, 550)
        setTimeout(() => { if (!cleared) setHidden(true) }, 950)
      }, wait)
    }
    if (document.readyState === 'complete') finish()
    else window.addEventListener('load', finish, { once: true })
    return () => {
      cleared = true
      window.removeEventListener('load', finish)
    }
  }, [minShow, onReady])

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  if (hidden) return null

  return (
    <div className={`preloader${exiting ? ' exiting' : ''}`} aria-hidden="true">
      <div className="curtain top" />
      <div className="curtain bot" />
      <div className="stage">
        <div className="pl-eyebrow"><span className="dt" />Radix · 2025</div>
        <div className="pl-logo">
          <img src="/logo/radix-white.svg" alt="Radix" />
        </div>
        <div className="pl-bar" />
        <div className="pl-sub">System over chaos</div>
      </div>
    </div>
  )
}
