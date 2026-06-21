import { useLang } from '../../hooks/useLanguage'
import SupportingGrid from './SupportingGrid'

const i18n = {
  callforge: {
    eyebrow: { es: 'Voice + LLM · Multi-agent', en: 'Voice + LLM · Multi-agent' },
    text: {
      es: 'Plataforma de soporte con Whisper STT (0.9s) + Kokoro TTS (CPU RTF 0.34) + 6 agentes especializados. Cadena de fallback LLM (Groq → Ollama → Mock) para operación offline a costo cero. Clean Architecture, multi-tenant.',
      en: 'Customer support platform with Whisper STT (0.9s) + Kokoro TTS (CPU RTF 0.34) + 6 specialized agents. LLM fallback chain (Groq → Ollama → Mock) for zero-cost offline operation. Clean Architecture, multi-tenant.',
    },
    link: { es: 'Ver pitch + código', en: 'View pitch + code' },
  },
  agentguard: {
    eyebrow: { es: 'Open source · Zero deps', en: 'Open source · Zero deps' },
    text: {
      es: 'Librería Python standalone: guardrails de seguridad para agentes autónomos. 8 reglas hard (kill_switch, circuit_breaker, allowlist, rate_limit, spend_budget…) + estado crash-safe vía snapshot/restore. 11 tests pasando.',
      en: 'Standalone Python library: safety guardrails for autonomous agents. 8 hard rules (kill_switch, circuit_breaker, allowlist, rate_limit, spend_budget…) + crash-safe state via snapshot/restore. 11 tests passing.',
    },
    link: { es: 'Ver código', en: 'View code' },
  },
  verificarro: {
    eyebrow: { es: 'Producción · MVP', en: 'Production · MVP' },
    text: {
      es: 'Verificador de autos usados MX. Claude Sonnet 4.6 Vision para detección de anomalías en fotos. REPUVE scraper con bypass de reCaptcha v2 (2Captcha + Whisper local). VIN decoder (ISO 3779 + NHTSA vPIC). Mercado Pago. 491 tests.',
      en: 'MX used-car verification MVP. Claude Sonnet 4.6 Vision for photo anomaly detection. REPUVE scraper with reCaptcha v2 bypass (2Captcha + local Whisper). VIN decoder (ISO 3779 + NHTSA vPIC). Mercado Pago. 491 tests.',
    },
    link: { es: 'Demo en vivo', en: 'Live demo' },
  },
  aios: {
    eyebrow: { es: 'Open source · MCP server', en: 'Open source · MCP server' },
    text: {
      es: 'OS de ingeniería AI spec-driven. Multi-strategy security scanner (72 detectores) con convergence loop. MCP server exponiendo aios init/task/analyze/release. Mapping CWE → compliance (LFPDPPP/PCI-DSS/SOX/OWASP). 132 módulos, 428 tests.',
      en: 'Spec-driven AI engineering OS. Multi-strategy security scanner (72 detectors) with convergence loop. MCP server exposing aios init/task/analyze/release. CWE → compliance mapping (LFPDPPP/PCI-DSS/SOX/OWASP). 132 modules, 428 tests.',
    },
    link: { es: 'Ver código', en: 'View code' },
  },
}

export default function SupportingProjects() {
  const lang = useLang()

  const items = [
    {
      title: 'CallForge',
      eyebrow: i18n.callforge.eyebrow[lang],
      text: i18n.callforge.text[lang],
      href: 'https://github.com/christianescamilla15-cell/callforge#what-this-proves',
      linkLabel: i18n.callforge.link[lang],
      external: true,
    },
    {
      title: 'agentguard',
      eyebrow: i18n.agentguard.eyebrow[lang],
      text: i18n.agentguard.text[lang],
      href: 'https://github.com/christianescamilla15-cell/agentguard#30-second-example',
      linkLabel: i18n.agentguard.link[lang],
      external: true,
    },
    {
      title: 'Verificarro',
      eyebrow: i18n.verificarro.eyebrow[lang],
      text: i18n.verificarro.text[lang],
      href: 'https://verificarro.vercel.app',
      linkLabel: i18n.verificarro.link[lang],
      external: true,
    },
    {
      title: 'AIOS Framework',
      eyebrow: i18n.aios.eyebrow[lang],
      text: i18n.aios.text[lang],
      href: 'https://github.com/christianescamilla15-cell/aios-framework',
      linkLabel: i18n.aios.link[lang],
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
