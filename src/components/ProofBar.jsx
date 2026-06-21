import { useLang } from '../hooks/useLanguage'

const metrics = [
  { num: '20+',    label: { es: 'Sistemas en producción', en: 'Systems in production' } },
  { num: '1,500+', label: { es: 'Tests automatizados',    en: 'Automated tests' } },
  { num: '24',     label: { es: 'Agentes orquestados',    en: 'Orchestrated agents' } },
  { num: '3+',     label: { es: 'Años con LLMs',          en: 'Years with LLMs' } },
]

export default function ProofBar() {
  const lang = useLang()

  return (
    <section
      id="proof"
      className="section section--alt section--tight snap section--hero-adjacent"
      aria-label="Métricas"
    >
      <div className="container reveal">
        <div className="proof">
          {metrics.map((m) => (
            <div key={m.num}>
              <div className="proof__num">{m.num}</div>
              <div className="proof__label">{m.label[lang]}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
