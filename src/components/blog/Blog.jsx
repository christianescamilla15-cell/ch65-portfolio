import { useLang } from '../../hooks/useLanguage'

const headline = { es: 'Notas Técnicas', en: 'Technical Notes' }
const subhead = {
  es: 'Aprendizajes y arquitecturas de los sistemas que construyo.',
  en: 'Learnings and architectures from the systems I build.',
}

const posts = [
  {
    date: '2026-04-12',
    tag: 'Holography',
    title: {
      es: 'Spacetime Lab v2.0 — QES, replica wormholes y la curva de Page',
      en: 'Spacetime Lab v2.0 — QES, replica wormholes, and the Page curve',
    },
    excerpt: {
      es: 'Tres caminos independientes a la curva de Page coinciden bit-exactamente. 634 tests, todos pasan.',
      en: 'Three independent paths to the Page curve match bit-exactly. 634 tests, all green.',
    },
    href: 'https://github.com/christianescamilla15-cell/spacetime-lab',
  },
  {
    date: '2026-04-13',
    tag: 'Agentic Infra',
    title: {
      es: 'Dispatch teléfono → PC: zero-cloud con GitHub Actions self-hosted',
      en: 'Phone → PC dispatch: zero-cloud with GitHub Actions self-hosted',
    },
    excerpt: {
      es: 'Arquitectura para lanzar trabajos de Claude Code desde el celular sin pagar tokens. End-to-end en 36s.',
      en: 'Architecture to launch Claude Code jobs from my phone with no token cost. End-to-end in 36s.',
    },
    href: 'https://github.com/christianescamilla15-cell',
  },
  {
    date: '2026-04-15',
    tag: 'MCP',
    title: {
      es: 'Bridge MCP propio con Caddy + WireGuard sobre dominio personal',
      en: 'Self-hosted MCP bridge with Caddy + WireGuard on a personal domain',
    },
    excerpt: {
      es: 'URL-secret auth, header injection a nivel proxy, conector custom en claude.ai. Todo bajo mi control.',
      en: 'URL-secret auth, proxy-level header injection, custom connector in claude.ai. Fully self-owned.',
    },
    href: 'https://mcp.chernandez.dev',
  },
  {
    date: '2026-04-13',
    tag: 'NexusForge',
    title: {
      es: 'Pipeline corpus → engine: 5 fases, 767 tests verdes',
      en: 'Corpus → engine pipeline: 5 phases, 767 tests green',
    },
    excerpt: {
      es: 'Discovery loader, métricas de ecosistema y calibración baseline integradas en un solo flujo reproducible.',
      en: 'Discovery loader, ecosystem metrics, and baseline calibration in a single reproducible flow.',
    },
    href: 'https://github.com/christianescamilla15-cell',
  },
]

export default function Blog() {
  const lang = useLang()

  return (
    <section id="blog" className="reveal" style={{
      padding: '80px 24px',
      maxWidth: 1000,
      margin: '0 auto',
    }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <h2 style={{
          fontSize: 32,
          fontWeight: 700,
          color: '#111827',
          margin: '0 0 12px',
        }}>
          {headline[lang]}
        </h2>
        <p style={{
          fontSize: 16,
          color: '#6B7280',
          margin: 0,
          maxWidth: 520,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          {subhead[lang]}
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 16,
      }}>
        {posts.map((p, i) => (
          <a
            key={i}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              background: '#FFFFFF',
              border: '1px solid #E5E7EB',
              borderRadius: 16,
              padding: 24,
              textDecoration: 'none',
              color: 'inherit',
              transition: 'border-color 0.2s ease, transform 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#2563EB'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = '#E5E7EB'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 12,
              color: '#9CA3AF',
              marginBottom: 12,
            }}>
              <span>{p.date}</span>
              <span>·</span>
              <span style={{
                background: '#EFF6FF',
                color: '#2563EB',
                padding: '2px 8px',
                borderRadius: 100,
                fontWeight: 600,
              }}>{p.tag}</span>
            </div>
            <h3 style={{
              fontSize: 17,
              fontWeight: 600,
              color: '#111827',
              margin: '0 0 8px',
              lineHeight: 1.35,
            }}>
              {p.title[lang]}
            </h3>
            <p style={{
              fontSize: 14,
              color: '#4B5563',
              lineHeight: 1.55,
              margin: 0,
            }}>
              {p.excerpt[lang]}
            </p>
          </a>
        ))}
      </div>
    </section>
  )
}
