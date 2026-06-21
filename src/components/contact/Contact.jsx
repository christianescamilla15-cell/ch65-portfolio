import { useLang } from '../../hooks/useLanguage'

const i18n = {
  eyebrow: { es: 'Trabajemos juntos', en: "Let's work together" },
  headline: { es: '¿Construyamos algo?', en: 'Build something?' },
  sub: {
    es: 'Disponible para roles de AI Engineer, freelance y proyectos de alto impacto.',
    en: 'Open to AI Engineer roles, freelance, and high-impact projects.',
  },
  email: { es: 'Escribir correo', en: 'Send email' },
  location: { es: 'CDMX, México', en: 'Mexico City, Mexico' },
}

export default function Contact() {
  const lang = useLang()

  return (
    <section id="contact" className="section section--dark snap" aria-label="Contacto">
      <div className="container reveal">
        <div className="contact">
          <div className="tile__eyebrow">{i18n.eyebrow[lang]}</div>
          <h2 className="contact__headline">{i18n.headline[lang]}</h2>
          <p className="contact__sub">{i18n.sub[lang]}</p>
          <div className="contact__actions">
            <a
              href="mailto:christianescamilla15@gmail.com"
              className="cta cta--lg magnetic"
            >
              {i18n.email[lang]}
            </a>
            <a
              href="https://github.com/christianescamilla15-cell"
              target="_blank"
              rel="noopener noreferrer"
              className="cta cta--ghost cta--lg magnetic"
              style={{ color: '#F5F5F7', borderColor: 'rgba(255,255,255,0.25)' }}
            >
              GitHub
            </a>
          </div>
          <p style={{
            marginTop: 'var(--s-4)',
            fontSize: 13,
            color: 'var(--text-muted)',
          }}>
            {i18n.location[lang]}
          </p>
        </div>
      </div>
    </section>
  )
}
