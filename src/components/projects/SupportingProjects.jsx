import { useLang } from '../../hooks/useLanguage'
import SupportingGrid from './SupportingGrid'

const i18n = {
  aios: {
    eyebrow: { es: 'Open source · PyPI', en: 'Open source · PyPI' },
    text: {
      es: 'Runtime ligero para agentes con tool-use y memoria persistente.',
      en: 'Lightweight runtime for agents with tool-use and persistent memory.',
    },
    link: { es: 'pip install aios', en: 'pip install aios' },
  },
  context: {
    eyebrow: { es: 'RAG · pgvector', en: 'RAG · pgvector' },
    text: {
      es: 'Búsqueda semántica híbrida con re-ranking y citations automáticas.',
      en: 'Hybrid semantic search with re-ranking and automatic citations.',
    },
    link: { es: 'Ver proyecto', en: 'View project' },
  },
  pocket: {
    eyebrow: { es: 'Mobile · Flutter', en: 'Mobile · Flutter' },
    text: {
      es: 'Cliente móvil para conversar con agentes privados desde el teléfono.',
      en: 'Mobile client to chat with private agents from your phone.',
    },
    link: { es: 'Ver proyecto', en: 'View project' },
  },
  studio: {
    eyebrow: { es: 'DevEx · CLI', en: 'DevEx · CLI' },
    text: {
      es: 'CLI para iterar prompts con diffs, evals y replay de conversaciones.',
      en: 'CLI to iterate on prompts with diffs, evals, and conversation replay.',
    },
    link: { es: 'Ver proyecto', en: 'View project' },
  },
}

export default function SupportingProjects() {
  const lang = useLang()

  const items = [
    {
      title: 'AIOS',
      eyebrow: i18n.aios.eyebrow[lang],
      text: i18n.aios.text[lang],
      href: 'https://pypi.org/project/aios/',
      linkLabel: i18n.aios.link[lang],
      external: true,
    },
    {
      title: 'Context Engine',
      eyebrow: i18n.context.eyebrow[lang],
      text: i18n.context.text[lang],
      href: 'https://github.com/christianescamilla15-cell',
      linkLabel: i18n.context.link[lang],
      external: true,
    },
    {
      title: 'Pocket Agent',
      eyebrow: i18n.pocket.eyebrow[lang],
      text: i18n.pocket.text[lang],
      href: 'https://github.com/christianescamilla15-cell',
      linkLabel: i18n.pocket.link[lang],
      external: true,
    },
    {
      title: 'Prompt Studio',
      eyebrow: i18n.studio.eyebrow[lang],
      text: i18n.studio.text[lang],
      href: 'https://github.com/christianescamilla15-cell',
      linkLabel: i18n.studio.link[lang],
      external: true,
    },
  ]

  return (
    <section id="supporting" className="section section--alt snap" aria-label="Proyectos adicionales">
      <div className="container">
        <SupportingGrid items={items} />
      </div>
    </section>
  )
}
