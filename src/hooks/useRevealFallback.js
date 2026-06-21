import { useEffect } from 'react'

/**
 * useRevealFallback — IntersectionObserver shim para navegadores que NO soportan
 * `animation-timeline: view()`. Solo ejecuta trabajo si el CSS nativo no está disponible.
 *
 * Uso: invocar una vez en App.jsx dentro de un useEffect top-level.
 * Marca `.reveal.is-in` cuando el elemento entra al viewport, respetando
 * prefers-reduced-motion.
 */
export function useRevealFallback() {
  useEffect(() => {
    const supportsSDA = typeof CSS !== 'undefined'
      && typeof CSS.supports === 'function'
      && CSS.supports('animation-timeline: view()')
    if (supportsSDA) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-in'))
      return
    }

    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-in'))
      return
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in')
          io.unobserve(e.target)
        }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })

    const observeAll = () => {
      document.querySelectorAll('.reveal:not(.is-in)').forEach(el => io.observe(el))
    }
    observeAll()

    // Observa DOM changes — por si agregamos .reveal dinámicos (chatbot con flag, etc.)
    const mo = new MutationObserver(observeAll)
    mo.observe(document.body, { childList: true, subtree: true })

    return () => { io.disconnect(); mo.disconnect() }
  }, [])
}
