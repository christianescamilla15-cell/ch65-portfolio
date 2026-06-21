import { useLang } from '../../hooks/useLanguage'
import LinkChevron from '../ui/LinkChevron'

const i18n = {
  eyebrow: { es: 'Sobre mí', en: 'About' },
  headline: { es: 'Del prototipo al deploy.', en: 'From prototype to deploy.' },
  body: {
    es: 'Ingeniero enfocado en construir sistemas de IA que resuelven problemas reales. Diseño pipelines LLM, orquesto agentes, y cuido cada detalle del flujo hasta producción.',
    en: 'Engineer focused on building AI systems that solve real problems. I design LLM pipelines, orchestrate agents, and care about every detail all the way to production.',
  },
  cv: { es: 'Descargar CV', en: 'Download CV' },
}

export default function AboutNew() {
  const lang = useLang()

  return (
    <section id="about" className="section snap" aria-label="Sobre mí">
      <div className="container reveal" style={{ maxWidth: 760 }}>
        <div className="tile" style={{ textAlign: 'left' }}>
          <div className="tile__eyebrow">{i18n.eyebrow[lang]}</div>
          <h2 className="tile__headline">{i18n.headline[lang]}</h2>
          <p className="tile__sub" style={{ marginLeft: 0, marginRight: 0, textAlign: 'left' }}>
            {i18n.body[lang]}
          </p>
          <div className="tile__links" style={{ justifyContent: 'flex-start' }}>
            <LinkChevron href="/CV_Christian_Hernandez.pdf">
              {i18n.cv[lang]}
            </LinkChevron>
            <LinkChevron href="https://linkedin.com/in/christianescamilla15-cell" target="_blank">
              LinkedIn
            </LinkChevron>
          </div>
        </div>
      </div>
    </section>
  )
}
