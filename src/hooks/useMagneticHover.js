import { useEffect } from 'react'

/**
 * useMagneticHover — efecto magnético sutil en CTAs.
 * Solo se activa en desktop con pointer fino y sin reduced-motion.
 * Usa requestAnimationFrame para mantener 60fps.
 *
 * Implementación alternativa: auto-attach via querySelectorAll('.magnetic').
 * Aquí se aplica global una vez al montar.
 */
export function useMagneticHover({ strength = 0.15, strengthY = 0.25, selector = '.magnetic' } = {}) {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (reduce || !fine) return

    const teardown = []

    const attach = (el) => {
      if (el.__magneticBound) return
      el.__magneticBound = true
      let raf = null

      const onMove = (e) => {
        if (raf) return
        raf = requestAnimationFrame(() => {
          const r = el.getBoundingClientRect()
          const x = e.clientX - r.left - r.width / 2
          const y = e.clientY - r.top - r.height / 2
          el.style.transform = `translate(${x * strength}px, ${y * strengthY}px)`
          raf = null
        })
      }
      const reset = () => {
        el.style.transform = ''
        if (raf) { cancelAnimationFrame(raf); raf = null }
      }

      el.addEventListener('mousemove', onMove)
      el.addEventListener('mouseleave', reset)
      el.addEventListener('blur', reset)

      teardown.push(() => {
        el.removeEventListener('mousemove', onMove)
        el.removeEventListener('mouseleave', reset)
        el.removeEventListener('blur', reset)
        el.__magneticBound = false
      })
    }

    const attachAll = () => document.querySelectorAll(selector).forEach(attach)
    attachAll()

    const mo = new MutationObserver(attachAll)
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      teardown.forEach(fn => fn())
      mo.disconnect()
    }
  }, [strength, strengthY, selector])
}
