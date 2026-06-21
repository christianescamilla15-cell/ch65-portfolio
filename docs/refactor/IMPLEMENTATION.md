# Portfolio Refactor — Plan de implementación con Claude Code

**Proyecto:** `ch65-portfolio` (React 18 + Vite 5 + framer-motion + LangContext)
**Objetivo:** Migrar del layout "documento técnico denso" al lenguaje Apple keynote (full-bleed, 6–7 tiles, scroll-driven animations, container queries, WCAG 2.2, Core Web Vitals 2026).
**Referencia visual:** `portfolio-v2.html` (prototipo self-contained en `/outputs/`).

---

## Cómo usar este documento

Este documento está diseñado para ejecutarse con Claude Code en el repo del portafolio. Cada fase tiene un **prompt listo para pegar** en Claude Code. Ejecuta las fases en orden; al final de cada una hay un checkpoint de verificación.

Flujo recomendado:

1. Abre tu repo en la terminal: `cd ch65-portfolio && claude`
2. Empieza con la Fase 0 (preparación del repo)
3. Ejecuta cada fase pegando el prompt correspondiente
4. Verifica el checkpoint antes de avanzar
5. Al finalizar la Fase 7, haz commit final y deploy

---

## Fase 0 — Preparación

### 0.1 Branch y backup

```bash
git checkout -b refactor/apple-language
git push -u origin refactor/apple-language
```

### 0.2 Dependencias

No se requieren paquetes nuevos. Vamos a **eliminar** DM Sans y Syne (están cargadas pero sin uso).

### 0.3 Prompt para Claude Code (Fase 0)

```
Contexto: estoy haciendo un refactor visual del portafolio hacia el lenguaje
de diseño de Apple (full-bleed, tipografía SF Pro, scroll-driven animations).
La referencia es /outputs/portfolio-v2.html (HTML self-contained).

Tareas para esta fase:
1. Lee /outputs/portfolio-v2.html completo para entender el destino.
2. Lee src/App.jsx y los componentes principales para mapear la estructura actual.
3. Identifica y lista en un archivo MIGRATION_NOTES.md:
   - Componentes actuales que se conservan (Navbar, Footer, etc.)
   - Componentes que se reemplazan (SystemDiagramCard, ProofBar, etc.)
   - Componentes que se eliminan (FloatingSectionsMenu, EngineeringPrinciples)
   - Secciones que se fusionan
4. Quita las imports de Google Fonts (DM Sans + Syne) de index.html y de
   cualquier <link> en el código, ya que no se usan.
5. No hagas cambios en componentes todavía. Solo diagnóstico.

Reporta en menos de 200 palabras el estado actual y propón el orden de migración.
```

**Checkpoint Fase 0:** existe `MIGRATION_NOTES.md` con inventario, Google Fonts removidas, branch creado.

---

## Fase 1 — Design tokens y CSS base

Migramos la paleta, tipografía y radios al sistema Apple-inspired. Todos los componentes posteriores dependen de esto.

### 1.1 Tokens destino

Reemplazar el bloque de tokens en `src/styles/global.css`:

```css
:root {
  /* Tipografía */
  --font-sans: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Segoe UI', Roboto, sans-serif;
  --tracking-tight: -0.02em;
  --tracking-hero: -0.015em;
  --leading-hero: 1.05;
  --leading-body: 1.47;

  /* Paleta clara */
  --bg: #FFFFFF;
  --bg-alt: #F5F5F7;
  --bg-inverse: #000000;
  --text: #1D1D1F;
  --text-secondary: #6E6E73;
  --text-muted: #86868B;
  --text-inverse: #F5F5F7;
  --accent: #0071E3;
  --accent-hover: #0077ED;
  --border: #E5E7EB;
  --chip-bg: #F3F4F6;

  /* Radios */
  --r-pill: 980px;
  --r-tile: 22px;
  --r-card: 18px;
  --r-chip: 100px;
  --r-input: 12px;

  /* Spacing (multiplos de 8) */
  --s-1: 8px;  --s-2: 16px; --s-3: 24px; --s-4: 32px;
  --s-5: 48px; --s-6: 64px; --s-7: 80px; --s-8: 120px;

  /* Motion */
  --ease: cubic-bezier(0.4, 0, 0.2, 1);
  --t-fast: 200ms var(--ease);
  --t-base: 300ms var(--ease);
  --t-slow: 500ms var(--ease);

  /* Navbar */
  --nav-h: 48px;
  --nav-bg: rgba(255, 255, 255, 0.72);
  --nav-border: rgba(0, 0, 0, 0.08);

  /* Safe-area */
  --safe-top: env(safe-area-inset-top, 0px);
  --safe-bottom: env(safe-area-inset-bottom, 0px);
  --safe-left: env(safe-area-inset-left, 0px);
  --safe-right: env(safe-area-inset-right, 0px);
}

[data-theme="dark"] {
  --bg: #000000;
  --bg-alt: #0A0A0B;
  --bg-inverse: #FFFFFF;
  --text: #F5F5F7;
  --text-secondary: #A1A1A6;
  --text-muted: #6E6E73;
  --text-inverse: #1D1D1F;
  --border: rgba(255, 255, 255, 0.1);
  --chip-bg: rgba(255, 255, 255, 0.06);
  --nav-bg: rgba(0, 0, 0, 0.72);
  --nav-border: rgba(255, 255, 255, 0.08);
}

@media (prefers-contrast: more) {
  :root { --text-secondary: #1D1D1F; --text-muted: #1D1D1F; --border: #000; }
  [data-theme="dark"] { --text-secondary: #FFF; --text-muted: #FFF; --border: #FFF; }
}
```

### 1.2 Eliminar selectores frágiles

El modo oscuro actual usa `[style*="#hex"]` — eliminar todos esos selectores y confiar únicamente en variables CSS + `[data-theme="dark"]`.

### 1.3 Prompt Claude Code (Fase 1)

```
Refactor Fase 1 — Design tokens.

1. Abre src/styles/global.css y:
   - Reemplaza el bloque :root actual por el del documento IMPLEMENTATION.md §1.1.
   - Añade la sección [data-theme="dark"] con los tokens invertidos.
   - Añade la sección @media (prefers-contrast: more).
2. Busca y elimina TODOS los selectores frágiles del tipo [style*="#111827"],
   [style*="#FFFFFF"], etc. Identificalos con grep y reemplaza el mecanismo
   por uso directo de las variables CSS (var(--bg), var(--text), etc).
3. Busca en todo src/ cualquier color hardcodeado en estilos inline
   (ej: style={{ color: '#111827' }}) y reemplázalo por var(--text).
4. Asegúrate de que el body usa var(--font-sans), var(--bg), var(--text).
5. NO toques aún los componentes individuales — solo el sistema base.
6. Ejecuta `npm run dev` y verifica que el sitio sigue visible sin romperse.

Muéstrame un diff de los archivos modificados antes de terminar.
```

**Checkpoint Fase 1:** `npm run dev` corre sin errores, el sitio mantiene apariencia general, el toggle light/dark sigue funcionando via `data-theme`.

---

## Fase 2 — Reemplazar componentes: Navbar + Hero

Dos componentes de alto impacto visual.

### 2.1 Navbar — ajustes

Mantener la estructura (ya está glass + blur, muy Apple). Cambios:

- Reducir altura a `48px` (era `~56px`)
- CTA navbar: cambiar de negro `#111827` a pill azul `#0071E3`, `border-radius: 980px`
- Links con `padding: 8px 10px`, `min-height: 32px` (WCAG 2.5.8)
- Lang toggle: pill segmentado con `aria-pressed`
- Añadir `aria-current="page"` al link activo (scrollspy via IntersectionObserver)
- Padding-top: `env(safe-area-inset-top)` para iPhone con Dynamic Island

### 2.2 Hero — reescribir

- `<section class="hero">` con `min-height: calc(100dvh - var(--nav-h) - var(--safe-top))`
- H1: `clamp(44px, 6vw, 80px)`, `font-weight: 600`, `letter-spacing: -0.015em`, `line-height: 1.05`
- Dual CTA: **link-chevron azul** (no botón), formato `Ver proyectos ›`
- Subir el peso visual del headline, simplificar subhead
- Chips de stack: ya existen, mantener

### 2.3 Prompt Claude Code (Fase 2)

```
Refactor Fase 2 — Navbar + Hero.

Referencia: /outputs/portfolio-v2.html — componentes `.nav` y `.hero`.
Documento guía: IMPLEMENTATION.md §2.

NAVBAR (src/components/layout/Navbar.jsx):
1. Reduce altura interna a 48px (--nav-h).
2. Cambia el CTA principal del nav de fondo negro (#111827) a pill azul
   con background var(--accent) (#0071E3) y border-radius 980px.
3. Añade un efecto scrollspy con IntersectionObserver que pone
   aria-current="page" al link de la sección visible.
4. Añade aria-pressed al toggle de idioma ES/EN.
5. Padding-top del header: env(safe-area-inset-top, 0px).
6. Todos los botones/links con min-height 32px para WCAG 2.2.

HERO (src/components/hero/Hero.jsx):
1. Cambia min-height: 100vh por calc(100dvh - var(--nav-h) - var(--safe-top)).
2. Headline: clamp(44px, 6vw, 80px), font-weight 600,
   letter-spacing -0.015em, line-height 1.05.
3. Reemplaza los dos botones CTA actuales por dos link-chevron:
   - "Ver proyectos ›" (color var(--accent))
   - "GitHub ›"
   Crea el componente `<LinkChevron>` reutilizable en src/components/ui/LinkChevron.jsx.
4. Headshot 88x88 en vez de 96x96.
5. Eyebrow uppercase 13px/600 azul, tracking 0.08em.

i18n: usa el LangContext existente para todos los strings.

No pongas estilos inline de color — todo debe salir de var(--*).
Ejecuta el sitio y dame un screenshot o describe qué cambió.
```

**Checkpoint Fase 2:** navbar con CTA azul pill, hero con h1 grande y dual link-chevron, todo responsive.

---

## Fase 3 — Fusionar ProofBar + Systems overview + secciones innecesarias

Reducimos de 15 secciones a 7 tiles.

### 3.1 Mapa de consolidación

| Sección actual | Acción |
|---|---|
| ProofBar | **Mantener** (4 métricas grandes, `clamp(40px, 4.5vw, 64px)`) |
| Systems overview chips | **Eliminar** (redundante con chips del hero) |
| AboutNew | **Mantener** (simplificar copy) |
| ArchitectureSection | **Mover** a página-detalle del flagship |
| FeaturedProjects | **Reescribir** (Fase 4) |
| SupportingProjects | **Reescribir** como grid 2-up (Fase 4) |
| CaseStudies | **Fusionar** en la página-detalle de cada proyecto |
| EngineeringPrinciples | **Eliminar** (Apple muestra, no explica) |
| TechStack | **Eliminar** de página principal, mover a footer |
| OtherProjects | **Eliminar** o mover a página `/other` |
| Blog | **Mover** a página `/blog` |
| Contact | **Mantener** (simplificar) |
| CTASection | **Fusionar** con Contact |

Orden final en `App.jsx`: `Hero → ProofBar → NexusForge (dark) → Spacetime Lab (light) → Grid 2-up supporting → About → Contact → Footer`.

### 3.2 Eliminar FloatingSectionsMenu y PortfolioChatbot

- **FloatingSectionsMenu**: eliminar (ruido visual, Apple confía en scroll puro).
- **PortfolioChatbot**: decisión tuya. Si lo mantienes, rediseñalo con los nuevos tokens. Si lo eliminas, lo puedes preservar detrás de un feature flag.

### 3.3 Prompt Claude Code (Fase 3)

```
Refactor Fase 3 — Consolidación estructural.

1. Abre src/App.jsx. Reordena las secciones a este orden exacto:
   Hero → ProofBar → FeaturedProjects → SupportingProjects →
   About → Contact → Footer

2. Elimina del render:
   - Systems overview chips (el emoji pill line)
   - ArchitectureSection
   - CaseStudies (a menos que tenga copy único; en ese caso
     consolídalo en la card del proyecto correspondiente)
   - EngineeringPrinciples
   - TechStack (mueve los chips al Footer)
   - OtherProjects
   - Blog (muévelo a una ruta /blog con react-router si aún no existe)
   - CTASection (fusiónalo con Contact)
   - FloatingSectionsMenu

3. PortfolioChatbot: añade una feature flag via env var VITE_CHATBOT=true.
   Por defecto, no se renderiza.

4. Simplifica ProofBar: 4 métricas centradas con números
   clamp(40px, 4.5vw, 64px) font-weight 600, labels 13px uppercase
   color var(--text-secondary), sin iconos.

5. Simplifica AboutNew: 1 párrafo, 2 link-chevron (Descargar CV, LinkedIn).
   Quita cualquier bullet list o lista de credenciales.

Asegúrate de que los imports y tests no se rompan.
Ejecuta npm test si existe, sino npm run build para validar.
```

**Checkpoint Fase 3:** `App.jsx` tiene 7 secciones, el build pasa, el sitio se ve coherente (aunque todavía sin estilo Apple pleno en las cards).

---

## Fase 4 — FeaturedProjects y SupportingProjects (tiles + grid 2-up)

Aquí está el mayor cambio visual. Reemplazamos `SystemDiagramCard` por dos componentes nuevos.

### 4.1 Nuevo componente `<FeaturedTile dark={bool} />`

Full-bleed (`width: 100%`, sin max-width en el contenedor externo), fondo alternante. Contenido:

- `tile__eyebrow` (uppercase 14px)
- `tile__headline` (`clamp(36px, 4.5vw, 56px)`)
- `tile__sub` (21px, max-width 680px)
- Dos link-chevron (Demo + Código)
- `tile__visual` aspect-ratio 16:9, placeholder inicial (reemplazar con `<video>` o `<img>`)

Props:

```jsx
<FeaturedTile
  eyebrow="Flagship · Multi-agent"
  title="NexusForge"
  subtitle="Orquestación de 24 agentes autónomos..."
  demoHref="https://..."
  codeHref="https://github.com/..."
  media={<video autoPlay muted loop playsInline src="/media/nexusforge.mp4" />}
  dark
/>
```

### 4.2 Nuevo componente `<SupportingGrid />` con container queries

CSS:

```css
.grid-2 { container-type: inline-size; container-name: grid2; display: grid; gap: 16px; }
@container grid2 (min-width: 760px) { .grid-2 { grid-template-columns: 1fr 1fr; } }

.card { container-type: inline-size; container-name: card; }
.card__title { font-size: clamp(22px, 6cqi, 32px); }
@container card (min-width: 420px) { .card { padding: 64px 48px; } }
```

### 4.3 Parallax scroll-driven en el tile visual

```css
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .tile__visual {
      animation: parallax-rise linear both;
      animation-timeline: view();
      animation-range: entry 0% exit 100%;
    }
    @keyframes parallax-rise {
      from { transform: translateY(40px) scale(0.98); }
      to   { transform: translateY(-40px) scale(1); }
    }
  }
}
```

### 4.4 Prompt Claude Code (Fase 4)

```
Refactor Fase 4 — Featured tiles + Supporting grid.

Referencia: /outputs/portfolio-v2.html secciones .tile y .grid-2.
Documento guía: IMPLEMENTATION.md §4.

1. Crea src/components/projects/FeaturedTile.jsx con:
   - Props: eyebrow, title, subtitle, demoHref, codeHref, media (ReactNode), dark (bool)
   - Estructura según /outputs/portfolio-v2.html .tile
   - className dinámico según prop dark: "section section--dark" o "section"
   - Parallax en .tile__visual vía CSS (animation-timeline: view())
   - Respeta prefers-reduced-motion

2. Crea src/components/projects/SupportingGrid.jsx con:
   - Renderiza un array de cards (pasado como prop items)
   - Usa container queries: .grid-2 y .card con container-type: inline-size
   - card__title: clamp(22px, 6cqi, 32px)
   - card__text: clamp(15px, 3.5cqi, 17px)

3. Crea src/components/ui/LinkChevron.jsx (si no lo creaste en Fase 2):
   - Props: href, children, target (opcional)
   - Estilo con ::after chevron animado en hover
   - min-height 32px, padding 8px 4px

4. Reemplaza SystemDiagramCard (el componente denso con diagramas) en
   src/components/projects/FeaturedProjects.jsx por <FeaturedTile>.
   Datos iniciales:
   - NexusForge: dark=true, eyebrow="Flagship · Multi-agent", subtitle corto
   - Spacetime Lab: dark=false

5. Reemplaza SupportingProjects por <SupportingGrid> con 4 items iniciales
   (AIOS, Context Engine, Pocket Agent, Prompt Studio).

6. Mueve el CSS nuevo a src/styles/global.css (bloque .tile, .grid-2, .card,
   @container, @supports animation-timeline).

7. Elimina el componente SystemDiagramCard.jsx (o márcalo como deprecated).

Placeholder de `media`: por ahora un <div className="tile__visual">[ ... ]</div>
centrado. Los videos reales los añades después.

Ejecuta npm run build y confirma que no hay warnings de CSS.
```

**Checkpoint Fase 4:** tiles full-bleed alternando negro/blanco, grid 2-up con container queries, build pasa.

---

## Fase 5 — Scroll-driven animations (reemplazar IntersectionObserver)

Migración de JS a CSS puro.

### 5.1 Patrón

```css
@supports (animation-timeline: view()) {
  .reveal {
    animation: reveal-fade linear both;
    animation-timeline: view();
    animation-range: entry 0% cover 25%;
  }
  @keyframes reveal-fade {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
}

@supports not (animation-timeline: view()) {
  .reveal { opacity: 0; transform: translateY(24px);
            transition: opacity 600ms var(--ease), transform 600ms var(--ease); }
  .reveal.is-in { opacity: 1; transform: none; }
}

@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1 !important; transform: none !important;
            animation: none !important; transition: none !important; }
}
```

### 5.2 JS fallback (solo si no hay soporte nativo)

```js
if (!CSS.supports('animation-timeline: view()')) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveals = document.querySelectorAll('.reveal');
  if (!reduce) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-in'));
  }
}
```

### 5.3 Prompt Claude Code (Fase 5)

```
Refactor Fase 5 — Scroll-driven animations nativas.

1. En src/styles/global.css añade los bloques .reveal con @supports y el
   fallback + prefers-reduced-motion (ver IMPLEMENTATION.md §5.1).

2. Crea src/hooks/useRevealFallback.js con el código JS del §5.2. El hook
   corre una vez al montar y solo hace trabajo si CSS.supports retorna false.

3. Invócalo una vez en src/App.jsx con useEffect.

4. Busca en todo src/components/ el uso actual de framer-motion para reveals
   (motion.div con initial/whileInView/animate). Reemplaza por className="reveal"
   donde corresponda. Conserva framer-motion SOLO para animaciones complejas
   (transiciones de páginas, drag, etc.) si las hay; si no, desinstálalo
   con npm uninstall framer-motion.

5. Busca cualquier polyfill manual de IntersectionObserver y elimínalo —
   ya está en baseline todos los navegadores soportados.

6. Añade className="reveal" a los elementos que deban animar al scroll:
   hero inner, proof container, cada tile, cada card del grid 2-up, about,
   contact.

Ejecuta build y abre en Chrome/Safari para verificar que animan al scrollear.
En Firefox (sin soporte nativo) debería activar el fallback JS.
```

**Checkpoint Fase 5:** reveals funcionan en Chrome/Safari vía CSS puro, framer-motion reducido o removido, bundle más pequeño.

---

## Fase 6 — View Transitions + magnetic hover + scroll-snap

Los "wow moments" Apple-style.

### 6.1 View Transitions en el theme toggle

```js
themeBtn.addEventListener('click', (e) => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  const rect = themeBtn.getBoundingClientRect();
  root.style.setProperty('--vt-x', `${rect.left + rect.width / 2}px`);
  root.style.setProperty('--vt-y', `${rect.top + rect.height / 2}px`);

  if (document.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.startViewTransition(() => { root.setAttribute('data-theme', next); });
  } else {
    root.setAttribute('data-theme', next);
  }
});
```

CSS:

```css
@supports (view-transition-name: root) {
  ::view-transition-old(root), ::view-transition-new(root) {
    animation-duration: 400ms; animation-timing-function: var(--ease);
  }
  ::view-transition-new(root) { animation-name: vt-circle-in; }
  ::view-transition-old(root) { animation: none; z-index: 1; }
  @keyframes vt-circle-in {
    from { clip-path: circle(0 at var(--vt-x, 100%) var(--vt-y, 0%)); }
    to   { clip-path: circle(150% at var(--vt-x, 100%) var(--vt-y, 0%)); }
  }
}
```

### 6.2 Magnetic hover en CTAs

```js
const canMagnet = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
               && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
if (canMagnet) {
  document.querySelectorAll('.magnetic').forEach((el) => {
    let raf = null;
    const onMove = (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.15}px, ${y * 0.25}px)`;
        raf = null;
      });
    };
    const reset = () => { el.style.transform = ''; if (raf) cancelAnimationFrame(raf); raf = null; };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', reset);
  });
}
```

Convertir en hook de React:

```js
// src/hooks/useMagneticHover.js
import { useEffect } from 'react';
export function useMagneticHover(ref, { strength = 0.15, strengthY = 0.25 } = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (reduce || !fine) return;
    let raf = null;
    const onMove = (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.transform = `translate(${(e.clientX - r.left - r.width/2) * strength}px, ${(e.clientY - r.top - r.height/2) * strengthY}px)`;
        raf = null;
      });
    };
    const reset = () => { el.style.transform = ''; if (raf) cancelAnimationFrame(raf); raf = null; };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', reset);
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', reset); };
  }, [ref, strength, strengthY]);
}
```

### 6.3 Scroll-snap proximity

```css
@media (min-width: 861px) and (prefers-reduced-motion: no-preference) {
  main { scroll-snap-type: y proximity; }
  .snap { scroll-snap-align: start; scroll-snap-stop: normal; }
}
```

### 6.4 Prompt Claude Code (Fase 6)

```
Refactor Fase 6 — View Transitions + magnetic hover + scroll-snap.

1. VIEW TRANSITIONS (theme toggle):
   - En src/components/layout/Navbar.jsx, modifica el handler de themeToggle
     para usar document.startViewTransition() con fallback.
   - Calcula las coordenadas del botón con getBoundingClientRect y pásalas
     como custom props --vt-x, --vt-y a documentElement.style.
   - Añade a src/styles/global.css el bloque @supports (view-transition-name)
     con keyframes vt-circle-in (ver IMPLEMENTATION.md §6.1).

2. MAGNETIC HOVER:
   - Crea src/hooks/useMagneticHover.js según §6.2.
   - Úsalo en los dos CTAs principales del Contact component:
     <a ref={emailRef} className="cta cta--lg"> y usa useMagneticHover(emailRef).
   - No lo apliques en touch devices ni con reduced-motion.

3. SCROLL-SNAP:
   - Añade a global.css el @media del §6.3.
   - Añade className="snap" a las secciones de primer nivel dentro de <main>
     (hero, proof, tile 1, tile 2, grid 2-up, about, contact).
   - Verifica que NO se aplica en mobile ni con reduced-motion.

4. Abre el sitio y verifica:
   - El toggle de tema hace un circle-wipe suave desde el botón
   - Los CTAs de contacto siguen sutilmente el cursor en desktop
   - Al hacer scroll en desktop, las secciones tienen un leve "snap"
     (NO debe bloquear scroll, solo guiar)
```

**Checkpoint Fase 6:** las tres interacciones se ven y respetan accesibilidad.

---

## Fase 7 — Performance y accesibilidad final

### 7.1 Performance (Core Web Vitals 2026)

1. **content-visibility** en todas las secciones bajo el fold:

```css
.section { content-visibility: auto; contain-intrinsic-size: 1px 800px; }
.section--hero-adjacent { content-visibility: visible; }
```

Aplica `.section--hero-adjacent` al Hero y ProofBar (evita FOUC en secciones inmediatas).

2. **Imágenes:**

```jsx
<img src="..." loading="lazy" decoding="async" width="1200" height="675" alt="..." />
<video autoPlay muted loop playsInline preload="metadata" ... />
```

Hero image: `fetchpriority="high"`, sin lazy.

3. **Preconnect:** revisa index.html y elimina preconnect a Google Fonts (ya no usas), mantén Supabase/Groq si los usas.

4. **Bundle:** `npm run build` + `npm run preview` + Lighthouse.

### 7.2 Accesibilidad WCAG 2.2

- `:focus-visible` global con outline 2px accent, offset 3px
- `aria-current="page"` en nav link activo (ya en Fase 2)
- `aria-pressed` en toggles (ya en Fase 2)
- `aria-label` en `.icon-btn`, `.nav`, `<nav>`
- Target size mínimo 24×24 en todo elemento interactivo (ya aplicado)
- Skip link: ya existe, verificar que funcione
- Heading order: h1 en hero, h2 en cada sección, h3 en cards — sin saltos

### 7.3 Prompt Claude Code (Fase 7)

```
Refactor Fase 7 — Performance + A11y final.

PERFORMANCE:
1. En global.css, añade a .section: content-visibility: auto y
   contain-intrinsic-size: 1px 800px. Crea .section--hero-adjacent
   con content-visibility: visible y aplícala al Hero y ProofBar.

2. Busca todos los <img> y añade loading="lazy" decoding="async" y
   dimensiones explícitas (width/height). Excepto imágenes del hero
   (fetchpriority="high" y sin lazy).

3. Si hay <video>, añade preload="metadata" playsInline muted.

4. Revisa index.html y elimina preconnect/dns-prefetch a fonts.googleapis.com
   y fonts.gstatic.com (ya no usamos Google Fonts).

5. Corre `npm run build && npm run preview` y ejecuta un Lighthouse desktop
   y mobile. Objetivos:
   - LCP < 2.0s
   - CLS < 0.08
   - INP < 200ms
   - Accessibility > 95
   Reporta los números.

ACCESIBILIDAD:
6. En global.css verifica/añade:
   :focus-visible { outline: 2px solid var(--accent); outline-offset: 3px;
                    border-radius: 6px; transition: outline-offset 120ms var(--ease); }

7. Audita los heading levels:
   - h1 solo en Hero
   - h2 en cada sección (FeaturedTile title, Contact headline, About)
   - h3 en cada card del SupportingGrid
   No debe haber saltos (h1 → h3).

8. Añade aria-label a:
   - <nav> principal: "Principal"
   - <nav> del footer si existe: "Pie"
   - .icon-btn del theme toggle: "Cambiar tema"
   - .icon-btn del hamburger: "Menú"

9. Verifica que el skip link (<a href="#main" class="sr-only">) funciona
   con Tab al cargar la página.

Reporta los Lighthouse scores y cualquier issue de a11y en un comentario.
```

**Checkpoint Fase 7:** Lighthouse > 95 en todas las categorías en mobile y desktop.

---

## Fase 8 — Integración de contenido real y deploy

### 8.1 Contenido a añadir

- Screenshots/videos de NexusForge y Spacetime Lab en `/public/media/`
- Foto de perfil real en `/public/headshot.webp` (ya debería estar)
- CV en `/public/cv-christian.pdf`
- URLs reales de GitHub/LinkedIn/correo
- Copy final en ES y EN (revisar y ajustar)

### 8.2 Prompt Claude Code (Fase 8)

```
Refactor Fase 8 — Contenido y deploy final.

1. Actualiza src/i18n/ (o wherever están las traducciones del LangContext)
   con los strings definitivos en ES y EN. Usa los del prototipo
   /outputs/portfolio-v2.html como base, pero ajusta al tono real del
   portafolio (menciona AIOS, PyPI, los proyectos reales).

2. Reemplaza los placeholders [ screenshot · video loop ] en FeaturedTile
   por:
   - NexusForge: <video> loop muted autoplay en /media/nexusforge.mp4
     (o un <img> de /media/nexusforge.webp si aún no hay video)
   - Spacetime Lab: lo mismo con su asset

3. Actualiza los hrefs reales (GitHub, LinkedIn, email, CV PDF).

4. Corre el test suite completo: npm test. Arregla cualquier test roto
   por el refactor.

5. Actualiza README.md con las nuevas capacidades:
   - Apple-inspired design system
   - Scroll-driven animations + View Transitions
   - Container queries + fluid typography
   - WCAG 2.2 compliant

6. Haz commit y push:
   git add -A
   git commit -m "feat: refactor to Apple-inspired design language"
   git push

7. Verifica el deploy en Vercel. Si hay preview URL, compártemela.
```

**Checkpoint Fase 8:** deploy en Vercel exitoso, URL preview verificada, commit hecho.

---

## Criterios de aceptación globales

Al terminar, el portafolio debe cumplir:

**Visual**

El hero ocupa aproximadamente una pantalla (100dvh menos nav) con headline de 80px. Las secciones alternan full-bleed blanco/negro. Los featured projects son tiles simples con un solo asset visual grande. El grid 2-up tiene 4 cards que escalan por container. El footer conserva 3 columnas.

**Motion**

Los reveals al scroll funcionan en CSS puro (sin librerías) en Chrome/Safari. Los tile visuals tienen parallax sutil. El theme toggle hace circle-wipe. Los CTAs principales tienen magnetic hover. Todo se desactiva con prefers-reduced-motion.

**Responsive**

Desde 320px hasta 4K se ve correcto. iPhone con notch respeta safe-area. En móvil el menú hamburguesa funciona. Las cards usan container queries, no breakpoints de viewport.

**Performance (Lighthouse)**

LCP < 2.0s. CLS < 0.08. INP < 200ms. Bundle JS total < 80KB. Sin Google Fonts cargadas.

**Accesibilidad**

Lighthouse a11y > 95. Focus visible claro. Target size ≥ 24px. aria-current/aria-pressed correctos. Heading hierarchy sin saltos. Skip link funcional.

**i18n**

ES/EN completos vía LangContext. Tuteo en español. Strings consistentes con el tono Apple (imperativo aspiracional, beneficio > spec).

---

## Rollback

Si algo sale mal en cualquier fase:

```bash
git checkout main
git branch -D refactor/apple-language
```

O por commit específico:

```bash
git log --oneline
git reset --hard <sha-previo>
```

---

## Referencias

- Prototipo HTML: `/outputs/portfolio-v2.html`
- Scroll-driven animations: https://webkit.org/blog/17101/a-guide-to-scroll-driven-animations-with-just-css/
- Container queries: https://moderncss.dev/container-query-units-and-fluid-typography/
- View Transitions: https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API
- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- Core Web Vitals 2026: INP < 200ms reemplaza FID

---

## Estimación de tiempo

| Fase | Tiempo estimado |
|---|---|
| 0 — Preparación | 15 min |
| 1 — Design tokens | 30 min |
| 2 — Navbar + Hero | 45 min |
| 3 — Consolidación estructural | 30 min |
| 4 — Tiles + Grid 2-up | 60 min |
| 5 — Scroll-driven animations | 30 min |
| 6 — View Transitions + magnetic + snap | 45 min |
| 7 — Performance + A11y | 45 min |
| 8 — Contenido + deploy | 60 min |
| **Total** | **~6 horas** |

Estimación asume experiencia con React + trabajo con Claude Code. Puede ser más rápido si las prompts funcionan limpio al primer intento.
