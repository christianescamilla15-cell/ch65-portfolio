import LinkChevron from '../ui/LinkChevron'

export default function FeaturedTile({
  id,
  eyebrow,
  title,
  subtitle,
  demoHref,
  codeHref,
  demoLabel = 'Demo en vivo',
  codeLabel = 'Ver código',
  media,
  dark = false,
}) {
  return (
    <section
      id={id}
      className={`section snap ${dark ? 'section--dark' : ''}`.trim()}
      aria-label={title}
    >
      <div className="container reveal">
        <div className="tile">
          {eyebrow && <div className="tile__eyebrow">{eyebrow}</div>}
          <h2 className="tile__headline">{title}</h2>
          {subtitle && <p className="tile__sub">{subtitle}</p>}

          {(demoHref || codeHref) && (
            <div className="tile__links">
              {demoHref && (
                <LinkChevron href={demoHref} target="_blank">
                  {demoLabel}
                </LinkChevron>
              )}
              {codeHref && (
                <LinkChevron href={codeHref} target="_blank">
                  {codeLabel}
                </LinkChevron>
              )}
            </div>
          )}

          <div className="tile__visual" role="img" aria-label={`${title} preview`}>
            {media || <span>[ screenshot · video loop ]</span>}
          </div>
        </div>
      </div>
    </section>
  )
}
