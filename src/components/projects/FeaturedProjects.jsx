import { useLang } from '../../hooks/useLanguage'
import FeaturedTile from './FeaturedTile'

const i18n = {
  nexusforge: {
    eyebrow: { es: 'Flagship · Multi-agent', en: 'Flagship · Multi-agent' },
    sub: {
      es: 'Orquestación de 24 agentes autónomos con memoria compartida y routing inteligente.',
      en: '24 autonomous agents orchestrated with shared memory and smart routing.',
    },
    demo: { es: 'Demo en vivo', en: 'Live demo' },
    code: { es: 'Ver código', en: 'View code' },
  },
  spacetime: {
    eyebrow: { es: 'Flagship · Research platform', en: 'Flagship · Research platform' },
    sub: {
      es: 'Plataforma de experimentación para LLMs con versionado, evals y trazabilidad de prompts.',
      en: 'LLM experimentation platform with versioning, evals, and prompt traceability.',
    },
    demo: { es: 'Demo en vivo', en: 'Live demo' },
    code: { es: 'Ver código', en: 'View code' },
  },
}

export default function FeaturedProjects() {
  const lang = useLang()
  const nf = i18n.nexusforge
  const sl = i18n.spacetime

  return (
    <div id="featured-projects">
      <FeaturedTile
        dark
        eyebrow={nf.eyebrow[lang]}
        title="NexusForge"
        subtitle={nf.sub[lang]}
        demoHref="https://07-nexusforge-ai.vercel.app"
        codeHref="https://github.com/christianescamilla15-cell"
        demoLabel={nf.demo[lang]}
        codeLabel={nf.code[lang]}
      />
      <FeaturedTile
        eyebrow={sl.eyebrow[lang]}
        title="Spacetime Lab"
        subtitle={sl.sub[lang]}
        demoHref="https://spacetime-lab.vercel.app"
        codeHref="https://github.com/christianescamilla15-cell"
        demoLabel={sl.demo[lang]}
        codeLabel={sl.code[lang]}
      />
    </div>
  )
}
