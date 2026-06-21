import { useLang } from '../../hooks/useLanguage'
import LinkChevron from '../ui/LinkChevron'

const nav = [
  { id: 'featured-projects', label: { es: 'Proyectos', en: 'Work' } },
  { id: 'about',             label: { es: 'Sobre mí', en: 'About' } },
  { id: 'supporting',        label: { es: 'Stack', en: 'Stack' } },
  { id: 'contact',           label: { es: 'Contacto', en: 'Contact' } },
]

const links = [
  { label: 'GitHub',   href: 'https://github.com/christianescamilla15-cell', external: true },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/christianescamilla15-cell', external: true },
  { label: { es: 'Correo', en: 'Email' }, href: 'mailto:christianescamilla15@gmail.com' },
  { label: { es: 'Descargar CV', en: 'Download CV' }, href: '/CV_Christian_Hernandez.pdf' },
]

const coreStack = ['Python', 'FastAPI', 'React', 'Claude API', 'pgvector']

export default function Footer() {
  const lang = useLang()
  const getLabel = (l) => (typeof l.label === 'string' ? l.label : l.label[lang] || l.label.en)

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__grid">
        <div className="footer__col">
          <h4>Christian Hernandez</h4>
          <p>
            {lang === 'es'
              ? 'AI Engineer · Sistemas multi-agente y pipelines LLM.'
              : 'AI Engineer · Multi-agent systems and LLM pipelines.'}
          </p>
          <div className="footer__stack">
            {coreStack.map((t) => (
              <span key={t} className="chip">{t}</span>
            ))}
          </div>
        </div>

        <div className="footer__col">
          <h4>{lang === 'es' ? 'Navegación' : 'Navigation'}</h4>
          <ul>
            {nav.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById(n.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }}
                >
                  {getLabel(n)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4>{lang === 'es' ? 'Enlaces' : 'Links'}</h4>
          <ul>
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target={l.external ? '_blank' : undefined}
                  rel={l.external ? 'noopener noreferrer' : undefined}
                >
                  {getLabel(l)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <span>
          © {new Date().getFullYear()} Christian Hernandez.{' '}
          {lang === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}
        </span>
        <LinkChevron href="https://github.com/christianescamilla15-cell" target="_blank">
          {lang === 'es' ? 'Ver en GitHub' : 'View on GitHub'}
        </LinkChevron>
      </div>
    </footer>
  )
}
