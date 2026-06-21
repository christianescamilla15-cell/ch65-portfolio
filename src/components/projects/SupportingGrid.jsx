import LinkChevron from '../ui/LinkChevron'

export default function SupportingGrid({ items }) {
  return (
    <div className="grid-2">
      {items.map((item) => (
        <article key={item.title} className="card reveal">
          {item.eyebrow && <div className="card__eyebrow">{item.eyebrow}</div>}
          <h3 className="card__title">{item.title}</h3>
          {item.text && <p className="card__text">{item.text}</p>}
          {item.href && (
            <LinkChevron href={item.href} target={item.external ? '_blank' : undefined}>
              {item.linkLabel || 'Ver proyecto'}
            </LinkChevron>
          )}
        </article>
      ))}
    </div>
  )
}
