# MIGRATION_NOTES — Refactor Apple Language

Branch: `refactor/apple-language`
Fecha de inicio: 2026-04-18
Referencia visual: `docs/refactor/portfolio-v2.html`
Guía: `docs/refactor/IMPLEMENTATION.md`

---

## Estado actual del código

Repo padre: `portafolio-completo/` (monorepo, remote `Portafolio-Chris.git`).
Scope del refactor: **solo** `portfolio-web/`. No tocar carpetas hermanas (`proyectos/*`, etc.).

Stack: React 18.3 + Vite 5.4 + framer-motion 12 + LangContext (ES/EN).

---

## Inventario de componentes — Mapa de migración

### A conservar (refactorizar estilo, mantener función)

| Componente | Ruta | Acción Fase |
|---|---|---|
| Navbar | `src/components/layout/Navbar.jsx` | Fase 2 — reducir altura 48px, CTA azul pill, scrollspy, WCAG targets |
| Footer | `src/components/layout/Footer.jsx` | Fase 3 — simplificar a 3 cols del prototipo, mover TechStack aquí |
| Hero | `src/components/hero/Hero.jsx` | Fase 2 — h1 80px, dual link-chevron, headshot 88px |
| ProofBar | `src/components/ProofBar.jsx` | Fase 3 — métricas clamp(40,4.5vw,64) sin iconos |
| AboutNew | `src/components/about/AboutNew.jsx` | Fase 3 — 1 párrafo, 2 link-chevron (CV, LinkedIn) |
| Contact | `src/components/contact/Contact.jsx` | Fase 3 — fusionar con CTASection, headline clamp(36,4.5vw,56) |

### A reescribir (reemplazar implementación)

| Componente | Reemplazo | Fase |
|---|---|---|
| `SystemDiagramCard.jsx` | `<FeaturedTile dark={bool} media={...}>` nuevo | 4 |
| `FeaturedProjects.jsx` | Dos `<FeaturedTile>` (NexusForge dark, Spacetime light) | 4 |
| `SupportingProjects.jsx` | `<SupportingGrid items={...}>` con container queries | 4 |

### Nuevos componentes

| Componente | Ruta | Fase |
|---|---|---|
| `LinkChevron.jsx` | `src/components/ui/LinkChevron.jsx` | 2 |
| `FeaturedTile.jsx` | `src/components/projects/FeaturedTile.jsx` | 4 |
| `SupportingGrid.jsx` | `src/components/projects/SupportingGrid.jsx` | 4 |
| `useRevealFallback.js` | `src/hooks/useRevealFallback.js` | 5 |
| `useMagneticHover.js` | `src/hooks/useMagneticHover.js` | 6 |

### A eliminar del render (App.jsx)

| Componente | Razón |
|---|---|
| Systems overview chips inline | Redundante con chips del hero |
| `ArchitectureSection` | Mover a página-detalle futura; no en home |
| `CaseStudies` | Consolidar en card del proyecto |
| `EngineeringPrinciples` | Apple muestra, no explica |
| `TechStack` | Mover chips al footer |
| `OtherProjects` | Mover a `/other` o eliminar |
| `Blog` | Mover a `/blog` con react-router (futuro) o eliminar del home |
| `CTASection` | Fusionar con Contact |
| `FloatingSectionsMenu` | Ruido visual; Apple confía en scroll puro |
| `HowIBuild` | Importado pero ya no se renderizaba |

### Feature-flagged (no renderizar por defecto)

| Componente | Flag |
|---|---|
| `PortfolioChatbot` | `VITE_CHATBOT=true` (default off) |

### Muertos (no renderizados en App.jsx actual — eliminar si la build pasa)

| Archivo | Notas |
|---|---|
| `src/components/skills/Skills.jsx` | Usa Syne/DM Sans; no renderizado |
| `src/components/skills/SkillMatcher.jsx` | No renderizado |
| `src/components/about/About.jsx` (viejo) | Reemplazado por AboutNew |
| `src/components/testimonials/Testimonials.jsx` | No renderizado |
| `src/components/journey/Journey.jsx` | No renderizado |
| `src/components/projects/Projects.jsx` (viejo) | Reemplazado por FeaturedProjects |
| `src/components/projects/ProjectCardNew.jsx` | Verificar uso |
| `src/components/projects/ProjectSection.jsx` | Verificar uso |
| `src/ui/CountUp.jsx` | No renderizado |
| `src/ui/TimeToHire.jsx` | No renderizado |
| `src/ui/CodingActivity.jsx` | No renderizado |
| `src/ui/ScrollRevealText.jsx` | Verificar uso |
| `src/ui/SpotlightCard.jsx` | Verificar uso |

---

## Orden final en App.jsx (destino Fase 3)

```jsx
<Navbar />
<main id="main">
  <Hero />
  <ProofBar />
  <FeaturedProjects />    {/* 2× FeaturedTile alternando dark/light */}
  <SupportingProjects />  {/* SupportingGrid 2-up, 4 items */}
  <AboutNew />
  <Contact />             {/* fusionado con CTASection */}
</main>
<Footer />
{/* PortfolioChatbot solo si VITE_CHATBOT=true */}
```

7 secciones totales (hoy: 15).

---

## Decisiones preliminares

- **Google Fonts (DM Sans + Syne)**: removidas de `index.html` en Fase 0. Uso residual en componentes no renderizados (dead code) o en PortfolioChatbot; fallback a system sans es aceptable. Limpiar `fontFamily` hardcoded en Fase 3 al eliminar dead components.
- **framer-motion**: se evalúa en Fase 5. Si tras migrar reveals a CSS nativo no queda ningún uso crítico, se desinstala.
- **i18n**: preservar `LangContext` y `useLanguage` hook; todos los strings nuevos pasan por ahí.
- **Dark mode**: el sistema actual con selectores `[style*="#hex"]` se elimina en Fase 1 y se reemplaza por `[data-theme="dark"]` + variables CSS puras.
- **Tests**: `vitest` + Testing Library ya instalados. Ejecutar `npm test` al final de cada fase. Algunos tests referencian componentes que se eliminarán — se ajustan en Fase 3/8.
- **Deploy**: NO hacer push ni deploy hasta que el usuario lo apruebe explícitamente (Fase 8).

---

## Riesgos / watchpoints

1. `PortfolioChatbot` usa DM Sans; con la font removida caerá a system sans — aceptable visualmente si el flag lo deja off por default.
2. El dark mode actual usa selectores frágiles `[style*="#111827"]` — al eliminarlos (Fase 1) sin haber migrado todos los inline styles, el modo oscuro puede romperse momentáneamente hasta terminar Fase 2/3.
3. Tests que referencian `ArchitectureSection`, `EngineeringPrinciples`, `TechStack`, `OtherProjects`, `Blog`, `FloatingSectionsMenu`, `CaseStudies` se romperán en Fase 3. Estrategia: remover/skipear esos tests junto con el render.
4. El repo padre (`portafolio-completo/`) tiene 15 commits sin push y modificaciones en proyectos hermanos. **No incluir esos cambios en commits del refactor.** Usar `git add portfolio-web/` explícito.
