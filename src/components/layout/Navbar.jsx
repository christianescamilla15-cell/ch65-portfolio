import { useState, useEffect, useRef } from 'react'
import { useLang } from '../../hooks/useLanguage'
import { useTheme } from '../../hooks/useTheme'

const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
)

const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
)

const MenuIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
)

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const navLinks = [
  { id: 'featured-projects', label: { es: 'Proyectos', en: 'Work' } },
  { id: 'about',             label: { es: 'Sobre mí', en: 'About' } },
  { id: 'supporting',        label: { es: 'Stack', en: 'Stack' } },
  { id: 'contact',           label: { es: 'Contacto', en: 'Contact' } },
]

export default function Navbar({ lang, setLang }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeId, setActiveId] = useState(null)
  const currentLang = useLang()
  const { theme, toggle: toggleTheme } = useTheme()
  const themeBtnRef = useRef(null)

  // Scrollspy — marca el link visible con aria-current="page"
  useEffect(() => {
    const ids = navLinks.map(l => l.id)
    const sections = ids.map(id => document.getElementById(id)).filter(Boolean)
    if (!sections.length || !('IntersectionObserver' in window)) return

    const spy = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setActiveId(e.target.id)
      })
    }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 })

    sections.forEach(s => spy.observe(s))
    return () => spy.disconnect()
  }, [])

  // Cierra menu móvil al redimensionar
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 861) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const getLabel = link => link.label[currentLang] || link.label.en

  const smoothTo = (id) => (e) => {
    e.preventDefault()
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // Theme toggle con View Transitions (Fase 6) — soporte con fallback
  const handleThemeToggle = () => {
    const btn = themeBtnRef.current
    if (btn) {
      const rect = btn.getBoundingClientRect()
      document.documentElement.style.setProperty('--vt-x', `${rect.left + rect.width / 2}px`)
      document.documentElement.style.setProperty('--vt-y', `${rect.top + rect.height / 2}px`)
    }
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (document.startViewTransition && !reduceMotion) {
      document.startViewTransition(() => toggleTheme())
    } else {
      toggleTheme()
    }
  }

  return (
    <header className="nav" role="banner">
      <div className="nav__inner">
        <a href="#hero" className="brand" aria-label="Inicio" onClick={smoothTo('hero')}>
          <span className="brand__mark" aria-hidden="true">CH</span>
          <span className="brand__text">
            <span className="brand__name">Christian Hernandez</span>
            <span className="brand__role">AI Engineer</span>
          </span>
        </a>

        <nav className="nav__links" aria-label="Principal">
          {navLinks.map(link => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={smoothTo(link.id)}
              aria-current={activeId === link.id ? 'page' : undefined}
            >
              {getLabel(link)}
            </a>
          ))}
        </nav>

        <div className="nav__tools">
          <button
            ref={themeBtnRef}
            className="icon-btn"
            onClick={handleThemeToggle}
            aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
            title="Tema"
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>

          <div className="lang" role="group" aria-label="Idioma">
            {['es', 'en'].map(l => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={lang === l ? 'is-active' : ''}
                aria-pressed={lang === l}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          <a
            href="#featured-projects"
            className="cta nav__cta"
            onClick={smoothTo('featured-projects')}
          >
            {currentLang === 'es' ? 'Ver Proyectos' : 'See Work'}
          </a>

          <button
            className="icon-btn hamburger"
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            aria-controls="nav-mobile"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <div id="nav-mobile" className={`nav__mobile ${menuOpen ? 'is-open' : ''}`}>
        <ul>
          {navLinks.map(link => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={smoothTo(link.id)}
                aria-current={activeId === link.id ? 'page' : undefined}
              >
                {getLabel(link)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
