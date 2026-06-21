export default function LinkChevron({
  href,
  children,
  target,
  rel,
  onClick,
  className = '',
  ariaLabel,
}) {
  const isExternal = target === '_blank'
  return (
    <a
      href={href}
      target={target}
      rel={rel || (isExternal ? 'noopener noreferrer' : undefined)}
      onClick={onClick}
      aria-label={ariaLabel}
      className={`link-chevron ${className}`.trim()}
    >
      {children}
    </a>
  )
}
