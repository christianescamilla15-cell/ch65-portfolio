import { useState } from 'react'
import { useLang } from '../../hooks/useLanguage'

const sectionLinks = [
  { label: { es: 'Inicio', en: 'Home' }, href: '#hero' },
  { label: { es: 'Sobre mí', en: 'About' }, href: '#about' },
  { label: { es: 'Arquitectura', en: 'Architecture' }, href: '#architecture' },
  { label: { es: 'Proyectos destacados', en: 'Featured Projects' }, href: '#featured-projects' },
  { label: { es: 'Casos de estudio', en: 'Case Studies' }, href: '#case-studies' },
  { label: { es: 'Stack tecnológico', en: 'Tech Stack' }, href: '#stack' },
  { label: { es: 'Notas técnicas', en: 'Technical Notes' }, href: '#blog' },
  { label: { es: 'Contacto', en: 'Contact' }, href: '#contact' },
]

export default function FloatingSectionsMenu() {
  const [open, setOpen] = useState(false)
  const lang = useLang()

  const scrollToHash = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div
      className="floating-sections-menu"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      style={{
        position: 'fixed',
        top: 28,
        left: 24,
        zIndex: 60,
      }}
    >
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={lang === 'es' ? 'Menú de secciones' : 'Sections menu'}
        style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: 44, height: 44, borderRadius: 14,
          background: 'rgba(255,255,255,0.9)',
          border: '1px solid #E5E7EB',
          color: '#374151', cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
          backdropFilter: 'blur(12px) saturate(180%)',
          WebkitBackdropFilter: 'blur(12px) saturate(180%)',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = '#D1D5DB'; e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.1)' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.06)' }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="17" x2="20" y2="17" />
        </svg>
      </button>

      <div
        role="menu"
        style={{
          position: 'absolute',
          top: 0,
          left: 'calc(100% + 10px)',
          minWidth: 240,
          padding: 8,
          background: 'rgba(255,255,255,0.95)',
          border: '1px solid #E5E7EB',
          borderRadius: 14,
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          opacity: open ? 1 : 0,
          transform: open ? 'translateX(0)' : 'translateX(-6px)',
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.18s ease, transform 0.18s ease',
        }}
      >
        {sectionLinks.map(s => (
          <a
            key={s.href}
            href={s.href}
            onClick={(e) => {
              e.preventDefault()
              setOpen(false)
              scrollToHash(s.href)
            }}
            role="menuitem"
            style={{
              display: 'block', padding: '10px 14px', borderRadius: 10,
              fontSize: 14, fontWeight: 500, color: '#374151',
              textDecoration: 'none', transition: 'background 0.15s ease',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#F3F4F6'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            {s.label[lang]}
          </a>
        ))}
      </div>
    </div>
  )
}
