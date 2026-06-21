import { useLang } from '../../hooks/useLanguage'
import LinkChevron from '../ui/LinkChevron'

const chips = ['Python', 'FastAPI', 'React', 'PostgreSQL', 'pgvector', 'Flutter', 'Docker', 'Claude API']

const i18n = {
  eyebrow: {
    es: 'Portafolio · AI Engineer',
    en: 'Portfolio · AI Engineer',
  },
  headline: {
    es: 'IA que corre en producción.',
    en: 'AI that ships to production.',
  },
  sub: {
    es: 'Sistemas multi-agente, pipelines LLM y productos inteligentes. Del prototipo al deploy.',
    en: 'Multi-agent systems, LLM pipelines, and intelligent products. From prototype to deploy.',
  },
  cta1: { es: 'Ver proyectos', en: 'See work' },
  cta2: { es: 'GitHub', en: 'GitHub' },
}

export default function Hero() {
  const lang = useLang()

  const scrollToProjects = (e) => {
    e.preventDefault()
    document.getElementById('featured-projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="hero" className="hero snap section--hero-adjacent" aria-label="Hero">
      <div className="hero__inner reveal">
        <div className="eyebrow">{i18n.eyebrow[lang]}</div>

        <h1 className="hero__headline">{i18n.headline[lang]}</h1>

        <p className="hero__sub">{i18n.sub[lang]}</p>

        <div className="hero__ctas">
          <LinkChevron href="#featured-projects" onClick={scrollToProjects}>
            {i18n.cta1[lang]}
          </LinkChevron>
          <LinkChevron href="https://github.com/christianescamilla15-cell" target="_blank">
            {i18n.cta2[lang]}
          </LinkChevron>
        </div>

        <div className="hero__stack" aria-label="Stack principal">
          {chips.map((chip) => (
            <span key={chip} className="chip">{chip}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
