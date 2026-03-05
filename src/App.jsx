import { useMemo, useState } from "react";
import "./styles.css";

const DATA = {
  en: {
    nav: { about: "About", skills: "Skills", experience: "Experience", projects: "Projects", contact: "Contact" },
    heroRole: "Frontend Web Developer | React | JavaScript | UX/UI",
    heroTagline:
      "Frontend-focused developer building responsive interfaces, scalable architecture, and user-centered experiences.",
    ctaPrimary: "View Projects",
    ctaSecondary: "Download CV (PDF)",
    aboutTitle: "About",
    aboutBody:
      "I build responsive, accessible interfaces and translate UX/UI concepts into clean, maintainable code. I enjoy component-based architecture, performance optimization, and shipping reliable features in Agile environments.",
    skillsTitle: "Technical Skills",
    skills: {
      frontend: ["HTML5", "CSS3", "JavaScript", "Responsive Web Design", "Cross-Browser Compatibility"],
      frameworks: ["React (basic/intermediate)", "Flutter UI Development"],
      architecture: ["Frontend Architecture", "Component-Based Architecture", "Clean Architecture", "MVVM"],
      web: ["Web Performance Optimization", "SEO Technical Basics", "REST API Integration"],
      tools: ["Git", "GitHub", "Figma", "Postman", "Jira", "ClickUp"],
      languages: ["JavaScript", "Dart", "Java", "Python"],
    },
    experienceTitle: "Experience",
    experience: [
      {
        title: "Frontend / Mobile Developer",
        company: "Muhami Consulting",
        location: "Mexico City",
        dates: "2022 – 2024",
        bullets: [
          "Developed responsive user interfaces with modular, reusable components.",
          "Integrated REST APIs and optimized data flow and UI performance.",
          "Applied Clean Architecture and MVVM principles to improve maintainability.",
          "Worked in Agile teams delivering sprint-based releases with clear deliverables.",
        ],
      },
      {
        title: "Application Developer",
        company: "Remotasks AI",
        location: "Remote",
        dates: "2024 – 2025",
        bullets: [
          "Contributed to internal apps focused on productivity and workflow optimization.",
          "Built reusable interface components and improved UX interaction patterns.",
          "Supported feature iteration, debugging, and performance refinement in Agile cycles.",
        ],
      },
    ],
    projectsTitle: "Projects",
    projectsNote:
      "These projects are aligned with the role: responsive UI, architecture, performance, and UX/UI sensitivity.",
    projects: [
      {
        name: "Support Chat (Ticket-Based)",
        desc:
          "Real-time support chat with ticket structure. WebSocket messaging + REST API integration. Focused on modular UI and scalability.",
        tags: ["React UI", "WebSocket", "REST", "Architecture"],
        links: { live: "#", code: "#" },
      },
      {
        name: "E-commerce / Inventory Dashboard",
        desc:
          "Responsive dashboard for inventory and product tracking. Component-based UI and optimized data rendering for fast interactions.",
        tags: ["Responsive", "Component UI", "Performance", "REST"],
        links: { live: "#", code: "#" },
      },
    ],
    contactTitle: "Contact",
    contactBody: "Open to freelance projects. Available for coordination between 9:00 am and 5:00 pm (CDMX).",
    contactCta: "Email me",
    footer: "Built with React • Optimized for ATS-aligned portfolio keywords",
  },
  es: {
    nav: { about: "Perfil", skills: "Habilidades", experience: "Experiencia", projects: "Proyectos", contact: "Contacto" },
    heroRole: "Frontend Web Developer | React | JavaScript | UX/UI",
    heroTagline:
      "Desarrollador enfocado en frontend: interfaces responsivas, arquitectura escalable y experiencias centradas en el usuario.",
    ctaPrimary: "Ver Proyectos",
    ctaSecondary: "Descargar CV (PDF)",
    aboutTitle: "Perfil",
    aboutBody:
      "Construyo interfaces responsivas y accesibles, y convierto conceptos UX/UI en código limpio y mantenible. Me gusta la arquitectura por componentes, optimización de performance y entregar features confiables en entornos ágiles.",
    skillsTitle: "Habilidades Técnicas",
    skills: {
      frontend: ["HTML5", "CSS3", "JavaScript", "Diseño Web Responsivo", "Compatibilidad Cross-Browser"],
      frameworks: ["React (básico/intermedio)", "Flutter UI Development"],
      architecture: ["Arquitectura Frontend", "Arquitectura por Componentes", "Clean Architecture", "MVVM"],
      web: ["Optimización de Performance", "SEO Técnico Básico", "Integración de APIs REST"],
      tools: ["Git", "GitHub", "Figma", "Postman", "Jira", "ClickUp"],
      languages: ["JavaScript", "Dart", "Java", "Python"],
    },
    experienceTitle: "Experiencia",
    experience: [
      {
        title: "Frontend / Mobile Developer",
        company: "Muhami Consulting",
        location: "CDMX",
        dates: "2022 – 2024",
        bullets: [
          "Desarrollé interfaces responsivas con componentes modulares y reutilizables.",
          "Integré APIs REST y optimicé flujo de datos y performance de UI.",
          "Apliqué Clean Architecture y MVVM para mejorar mantenibilidad.",
          "Trabajo en equipos ágiles con entregas por sprint y entregables claros.",
        ],
      },
      {
        title: "Application Developer",
        company: "Remotasks AI",
        location: "Remoto",
        dates: "2024 – 2025",
        bullets: [
          "Contribuí a apps internas enfocadas en productividad y optimización de workflows.",
          "Construí componentes de interfaz reutilizables y mejoré patrones UX.",
          "Soporte en iteración de features, debugging y performance en ciclos ágiles.",
        ],
      },
    ],
    projectsTitle: "Proyectos",
    projectsNote:
      "Proyectos alineados a la vacante: UI responsiva, arquitectura, performance y sensibilidad UX/UI.",
    projects: [
      {
        name: "Support Chat (Ticket-Based)",
        desc:
          "Chat en tiempo real con estructura por tickets. Mensajería WebSocket + integración REST. UI modular y escalable.",
        tags: ["React UI", "WebSocket", "REST", "Arquitectura"],
        links: { live: "#", code: "#" },
      },
      {
        name: "Dashboard E-commerce / Inventarios",
        desc:
          "Dashboard responsivo para inventarios y productos. UI por componentes y render eficiente para interacción rápida.",
        tags: ["Responsive", "Componentes", "Performance", "REST"],
        links: { live: "#", code: "#" },
      },
    ],
    contactTitle: "Contacto",
    contactBody: "Disponible para proyectos freelance. Coordinación de 9:00 am a 5:00 pm (hora CDMX).",
    contactCta: "Envíame un correo",
    footer: "Hecho con React • Optimizado para keywords ATS",
  },
};

function Badge({ children }) {
  return <span className="badge">{children}</span>;
}

function Section({ id, title, children }) {
  return (
    <section id={id} className="section">
      <h2 className="h2">{title}</h2>
      {children}
    </section>
  );
}

export default function App() {
  const [lang, setLang] = useState("en");
  const t = useMemo(() => DATA[lang], [lang]);

  // TODO: put your real CV link here when you host it (e.g., Google Drive / personal domain)
  const CV_PDF_URL = "#";
  const EMAIL = "chris_231011@hotmail.com";

  return (
    <div className="page">
      <header className="header">
        <div className="container headerInner">
          <a className="logo" href="#top">
            CH<span className="dot">•</span>Portfolio
          </a>

          <nav className="nav">
            <a href="#about">{t.nav.about}</a>
            <a href="#skills">{t.nav.skills}</a>
            <a href="#experience">{t.nav.experience}</a>
            <a href="#projects">{t.nav.projects}</a>
            <a href="#contact">{t.nav.contact}</a>
          </nav>

          <div className="lang">
            <button
              className={lang === "en" ? "btnSmall active" : "btnSmall"}
              onClick={() => setLang("en")}
              aria-label="Switch to English"
            >
              EN
            </button>
            <button
              className={lang === "es" ? "btnSmall active" : "btnSmall"}
              onClick={() => setLang("es")}
              aria-label="Cambiar a Español"
            >
              ES
            </button>
          </div>
        </div>
      </header>

      <main id="top" className="container">
        {/* HERO */}
        <section className="hero">
          <div className="heroLeft">
            <h1 className="h1">Christian Hernández Escamilla</h1>
            <p className="role">{t.heroRole}</p>
            <p className="tagline">{t.heroTagline}</p>

            <div className="ctaRow">
              <a className="btnPrimary" href="#projects">
                {t.ctaPrimary}
              </a>
              <a className="btnSecondary" href={CV_PDF_URL} target="_blank" rel="noreferrer">
                {t.ctaSecondary}
              </a>
            </div>

            <div className="meta">
              <span>Mexico City, MX</span>
              <span className="sep">•</span>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </div>
          </div>

          <div className="heroRight">
            <div className="card">
              <p className="cardTitle">ATS Match Keywords</p>
              <div className="badgeGrid">
                {[
                  "HTML5",
                  "CSS3",
                  "JavaScript",
                  "React",
                  "UX/UI",
                  "Responsive Design",
                  "Frontend Architecture",
                  "SEO",
                  "Git",
                  "REST APIs",
                ].map((k) => (
                  <Badge key={k}>{k}</Badge>
                ))}
              </div>
              <p className="cardNote">
                This page is intentionally structured with recruiter + ATS-friendly sections and keywords.
              </p>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <Section id="about" title={t.aboutTitle}>
          <p className="p">{t.aboutBody}</p>
        </Section>

        {/* SKILLS */}
        <Section id="skills" title={t.skillsTitle}>
          <div className="grid2">
            <div className="panel">
              <h3 className="h3">Frontend</h3>
              <ul className="list">
                {t.skills.frontend.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>

            <div className="panel">
              <h3 className="h3">Frameworks</h3>
              <ul className="list">
                {t.skills.frameworks.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>

            <div className="panel">
              <h3 className="h3">Architecture</h3>
              <ul className="list">
                {t.skills.architecture.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>

            <div className="panel">
              <h3 className="h3">Web + Tools</h3>
              <ul className="list">
                {[...t.skills.web, ...t.skills.tools].map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* EXPERIENCE */}
        <Section id="experience" title={t.experienceTitle}>
          <div className="stack">
            {t.experience.map((job) => (
              <div className="panel" key={`${job.company}-${job.dates}`}>
                <div className="jobTop">
                  <div>
                    <h3 className="h3">{job.title}</h3>
                    <p className="muted">
                      {job.company} • {job.location}
                    </p>
                  </div>
                  <span className="chip">{job.dates}</span>
                </div>
                <ul className="list">
                  {job.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {/* PROJECTS */}
        <Section id="projects" title={t.projectsTitle}>
          <p className="muted">{t.projectsNote}</p>
          <div className="grid2">
            {t.projects.map((p) => (
              <div className="panel" key={p.name}>
                <div className="projTop">
                  <h3 className="h3">{p.name}</h3>
                  <div className="badgeRow">
                    {p.tags.map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>
                </div>
                <p className="p">{p.desc}</p>
                <div className="linkRow">
                  <a className="link" href={p.links.live} target="_blank" rel="noreferrer">
                    Live
                  </a>
                  <a className="link" href={p.links.code} target="_blank" rel="noreferrer">
                    Code
                  </a>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* CONTACT */}
        <Section id="contact" title={t.contactTitle}>
          <p className="p">{t.contactBody}</p>
          <a className="btnPrimary" href={`mailto:${EMAIL}?subject=Wexpand%20Freelance%20Web%20Project`}>
            {t.contactCta}
          </a>
        </Section>

        <footer className="footer">
          <p className="muted">{t.footer}</p>
        </footer>
      </main>
    </div>
  );
}
