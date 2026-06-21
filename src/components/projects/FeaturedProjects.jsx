import { useLang } from '../../hooks/useLanguage'
import FeaturedTile from './FeaturedTile'

const i18n = {
  nexusforge: {
    eyebrow: { es: 'Flagship · Multi-agent + MCP', en: 'Flagship · Multi-agent + MCP' },
    sub: {
      es: '24 agentes orquestados con DAG, memoria de 5 capas, MCP vía Claude Agent SDK, RAG sobre pgvector + Voyage AI. Self-healing con 5 estrategias. 780+ tests, 74K LOC Python en producción.',
      en: '24 agents orchestrated with DAG, 5-tier memory, MCP via Claude Agent SDK, RAG over pgvector + Voyage AI. Self-healing with 5 recovery strategies. 780+ tests, 74K LOC Python in production.',
    },
    demo: { es: 'Demo en vivo', en: 'Live demo' },
    code: { es: 'Ver código', en: 'View code' },
  },
  treasuryforge: {
    eyebrow: { es: 'Flagship · Agent Safety Architecture', en: 'Flagship · Agent Safety Architecture' },
    sub: {
      es: 'Arquitectura de 4 capas (Agent → Policy → Executor → Wallet) donde la policy NUNCA confía en el agente. WAL + checkpoint que sobreviven SIGKILL. Audit chain HMAC tamper-evident. Hypothesis property-based fuzzing. 77 test suites, 17K LOC.',
      en: '4-layer architecture (Agent → Policy → Executor → Wallet) where the policy NEVER trusts the agent. WAL + checkpoint surviving SIGKILL. HMAC tamper-evident audit chain. Hypothesis property-based fuzzing. 77 test suites, 17K LOC.',
    },
    demo: { es: 'Ver pitch', en: 'View pitch' },
    code: { es: 'Ver código', en: 'View code' },
  },
}

export default function FeaturedProjects() {
  const lang = useLang()
  const nf = i18n.nexusforge
  const tf = i18n.treasuryforge

  return (
    <div id="featured-projects">
      <FeaturedTile
        dark
        eyebrow={nf.eyebrow[lang]}
        title="NexusForge AI"
        subtitle={nf.sub[lang]}
        demoHref="https://07-nexusforge-ai.vercel.app"
        codeHref="https://github.com/christianescamilla15-cell/nexusforge-ai"
        demoLabel={nf.demo[lang]}
        codeLabel={nf.code[lang]}
      />
      <FeaturedTile
        eyebrow={tf.eyebrow[lang]}
        title="TreasuryForge"
        subtitle={tf.sub[lang]}
        demoHref="https://github.com/christianescamilla15-cell/treasuryforge#what-this-proves-for-hiring-managers-reading-the-code"
        codeHref="https://github.com/christianescamilla15-cell/treasuryforge"
        demoLabel={tf.demo[lang]}
        codeLabel={tf.code[lang]}
      />
    </div>
  )
}
