import { useMemo, useState } from "react";
import "./styles.css";

const DATA = {
  en: {
    nav: { about: "About", skills: "Skills", experience: "Experience", projects: "Projects", contact: "Contact" },
    heroRole: "AI Engineer · Multi-Agent Orchestration · Agent Safety · Voice + LLM Systems",
    heroTagline:
      "I build multi-agent platforms, voice + LLM systems, and safety architectures for autonomous agents. Production-grade Python on FastAPI, MCP via Claude Agent SDK, RAG, voice I/O at sub-2s latency.",
    ctaPrimary: "View Projects",
    ctaSecondary: "Download CV (PDF)",
    aboutTitle: "About",
    aboutBody:
      "3+ years full-time in AI Engineering / 5+ in software total. I ship end-to-end systems: 24-agent orchestration with MCP, voice + LLM customer support, safety guardrails for agentic AI, RAG over pgvector. 8 publicly auditable projects, 3,000+ tests. RLHF training at Scale AI for Claude (Anthropic) and GPT-4o (OpenAI). Open to remote Senior GenAI / AI Engineer roles.",
    skillsTitle: "Technical Skills",
    skills: {
      ai: ["Claude API (Opus 4.7 / Sonnet 4.6 / Haiku 4.5)", "Claude Agent SDK", "MCP (client + server)", "LangChain", "Groq", "Ollama", "RAG (pgvector + Voyage AI + FAISS)", "Prompt caching", "RLHF", "QLoRA + Unsloth", "Whisper · Kokoro · Chatterbox (voice)"],
      backend: ["Python 3.12 (async)", "FastAPI", "Pydantic v2", "SQLAlchemy 2 async", "PostgreSQL + pgvector", "Redis", "MongoDB", "Node.js", "Laravel 11"],
      frontend: ["React 18/19", "Next.js", "TypeScript", "Vue.js 3", "Flutter", "Tailwind CSS", "Vite"],
      devops: ["Docker · Docker Compose", "GitHub Actions CI/CD", "Vercel · Render", "OpenTelemetry · Sentry", "pytest · Vitest · Playwright", "gitleaks"],
    },
    experienceTitle: "Experience",
    experience: [
      {
        title: "Independent AI Engineer",
        company: "Freelance + Personal R&D",
        location: "Remote",
        dates: "2025 – Present",
        bullets: [
          "Built and deployed an 8-project portfolio: NexusForge AI (24 agents + MCP + RAG + 780+ tests), TreasuryForge (4-layer agent safety + crash-safe state + Hypothesis fuzzing), CallForge (voice-first multi-agent + LLM fallback chain), Verificarro (Claude Vision + Mercado Pago MVP), AIOS Framework (MCP server + 72-detector security scanner).",
          "Published agentguard — standalone Python library generalizing agent policy enforcement (8 hard rules, crash-safe latched state, zero dependencies, 11 tests).",
          "Multi-tenant SaaS patterns, prompt caching at 90% savings, per-agent LLM routing (gemma/qwen/claude based on task), self-healing with 5 recovery strategies.",
          "Stack: Python 3.12 async, FastAPI, Claude Agent SDK, pgvector + Voyage AI, Docker, Vercel + Render.",
        ],
      },
      {
        title: "AI Data Specialist (RLHF)",
        company: "Scale AI / Remotasks",
        location: "Remote",
        dates: "2023 – Present",
        bullets: [
          "RLHF training for Claude (Anthropic) and GPT-4o (OpenAI): evaluation, ranking, code correction.",
          "Advanced prompt engineering: Chain-of-Thought, few-shot, XML-structured prompts.",
          "Code evaluation across Python, JavaScript, SQL, Java against quality and security criteria (OWASP, CWE patterns).",
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
    ],
    projectsTitle: "Projects",
    projectsNote:
      "All projects below are public on GitHub with full source, tests, and (where applicable) live demos. Pick any to audit the code.",
    projects: [
      {
        name: "NexusForge AI",
        desc:
          "24-agent orchestration platform with 6 swarm topologies, DAG engine, 5-tier memory (working/episodic/semantic/regressive/predictive), MCP via Claude Agent SDK, RAG over pgvector + Voyage AI. Self-healing with 5 recovery strategies. 780+ tests. 74,959 LOC Python.",
        tags: ["Multi-Agent", "MCP", "RAG", "Python", "FastAPI", "pgvector", "Docker"],
        links: { live: "https://07-nexusforge-ai.vercel.app", code: "https://github.com/christianescamilla15-cell/nexusforge-ai" },
      },
      {
        name: "TreasuryForge — Agent Safety Architecture",
        desc:
          "4-layer pattern (Agent → Policy → Executor → Wallet) where the policy NEVER trusts the agent. WAL + atomic checkpoint survives SIGKILL. HMAC-SHA256 tamper-evident audit chain. Deflated Sharpe Ratio + purged K-fold CV for honest validation. Hypothesis property-based fuzzing. 77 test suites, 17,700 LOC.",
        tags: ["Agent Safety", "Crash-Safe State", "HMAC Audit", "Hypothesis", "Python"],
        links: { live: "https://github.com/christianescamilla15-cell/treasuryforge#what-this-proves-for-hiring-managers-reading-the-code", code: "https://github.com/christianescamilla15-cell/treasuryforge" },
      },
      {
        name: "agentguard",
        desc:
          "Standalone Python library: safety guardrails for autonomous agents. 8 hard rules (kill_switch, circuit_breaker, staleness, allowlist, per_call_cap, rate_limit, spend_budget, solvency) + crash-safe latched state via snapshot/restore. Zero dependencies. 11 tests passing.",
        tags: ["Library", "Agent Safety", "Zero Deps", "Python", "MIT"],
        links: { live: "https://github.com/christianescamilla15-cell/agentguard#30-second-example", code: "https://github.com/christianescamilla15-cell/agentguard" },
      },
      {
        name: "CallForge — Voice + LLM Customer Support",
        desc:
          "Multi-agent voice platform: Whisper STT (0.9s) + Kokoro ONNX TTS (CPU RTF 0.34) + Chatterbox voice cloning. 6 specialized agents. LLM provider fallback (Groq → Ollama → Mock) for zero-cost offline operation. Hybrid RAG. Multi-tenant. Clean Architecture. 15 test suites (100% offline).",
        tags: ["Voice I/O", "Multi-Agent", "LLM Fallback", "Clean Architecture", "Python"],
        links: { live: "https://github.com/christianescamilla15-cell/callforge#what-this-proves", code: "https://github.com/christianescamilla15-cell/callforge" },
      },
      {
        name: "Verificarro — Auto Verification MX (MVP)",
        desc:
          "Production MVP for used-car verification in Mexico. Claude Sonnet 4.6 Vision for photo anomaly detection. REPUVE scraper with reCaptcha v2 bypass (2Captcha + local Whisper audio solver). VIN decoder (ISO 3779 + NHTSA vPIC). Mercado Pago integration. Encrypted PII (Fernet). Chrome MV3 extension. 491 tests.",
        tags: ["Claude Vision", "Production MVP", "Mercado Pago", "Playwright", "React"],
        links: { live: "https://github.com/christianescamilla15-cell/verificarro", code: "https://github.com/christianescamilla15-cell/verificarro" },
      },
      {
        name: "AIOS Framework — Spec-Driven Engineering OS",
        desc:
          "Multi-strategy security scanner (72 detectors) with convergence loop: regex + ensemble OSS (semgrep / bandit / trivy / checkov / gitleaks) + LLM deep-review + cross-file taint flow. MCP server exposing aios init/task/analyze/release. CWE → compliance mapping (LFPDPPP / PCI-DSS / SOX / OWASP). 132 Python modules, 428 tests.",
        tags: ["MCP Server", "Security Scanner", "Compliance Mapping", "Python"],
        links: { live: "https://github.com/christianescamilla15-cell/aios-framework", code: "https://github.com/christianescamilla15-cell/aios-framework" },
      },
    ],
    contactTitle: "Contact",
    contactBody: "Open to remote Senior GenAI / AI Engineer roles. Based in CDMX, available immediately.",
    contactCta: "Email me",
    footer: "Built with React + Vite • Updated 2026-06 — AI Engineer portfolio",
  },
  es: {
    nav: { about: "Perfil", skills: "Habilidades", experience: "Experiencia", projects: "Proyectos", contact: "Contacto" },
    heroRole: "AI Engineer · Orquestación Multi-Agente · Agent Safety · Sistemas Voz + LLM",
    heroTagline:
      "Construyo plataformas multi-agente, sistemas de voz + LLM, y arquitecturas de seguridad para agentes autónomos. Python production-grade en FastAPI, MCP vía Claude Agent SDK, RAG, I/O de voz con latencia <2s.",
    ctaPrimary: "Ver Proyectos",
    ctaSecondary: "Descargar CV (PDF)",
    aboutTitle: "Perfil",
    aboutBody:
      "3+ años full-time en AI Engineering / 5+ totales en software. Entrego sistemas end-to-end: orquestación con 24 agentes y MCP, soporte al cliente con voz + LLM, guardrails de seguridad para AI agentic, RAG sobre pgvector. 8 proyectos públicos auditables, 3,000+ tests. Entrenamiento RLHF en Scale AI evaluando Claude (Anthropic) y GPT-4o (OpenAI). Abierto a posiciones remote de Senior GenAI / AI Engineer.",
    skillsTitle: "Habilidades Técnicas",
    skills: {
      ai: ["Claude API (Opus 4.7 / Sonnet 4.6 / Haiku 4.5)", "Claude Agent SDK", "MCP (cliente + servidor)", "LangChain", "Groq", "Ollama", "RAG (pgvector + Voyage AI + FAISS)", "Prompt caching", "RLHF", "QLoRA + Unsloth", "Whisper · Kokoro · Chatterbox (voz)"],
      backend: ["Python 3.12 (async)", "FastAPI", "Pydantic v2", "SQLAlchemy 2 async", "PostgreSQL + pgvector", "Redis", "MongoDB", "Node.js", "Laravel 11"],
      frontend: ["React 18/19", "Next.js", "TypeScript", "Vue.js 3", "Flutter", "Tailwind CSS", "Vite"],
      devops: ["Docker · Docker Compose", "GitHub Actions CI/CD", "Vercel · Render", "OpenTelemetry · Sentry", "pytest · Vitest · Playwright", "gitleaks"],
    },
    experienceTitle: "Experiencia",
    experience: [
      {
        title: "AI Engineer Independiente",
        company: "Freelance + R&D Personal",
        location: "Remoto",
        dates: "2025 – Presente",
        bullets: [
          "Construí y desplegué un portafolio de 8 proyectos: NexusForge AI (24 agentes + MCP + RAG + 780+ tests), TreasuryForge (4 capas de seguridad para agentes + estado crash-safe + Hypothesis fuzzing), CallForge (multi-agente voz-first + cadena de fallback LLM), Verificarro (Claude Vision + Mercado Pago MVP), AIOS Framework (MCP server + scanner de seguridad con 72 detectores).",
          "Publiqué agentguard — librería Python standalone que generaliza la enforcement de policy en agentes (8 reglas hard, estado crash-safe, cero dependencias, 11 tests).",
          "Patrones multi-tenant SaaS, prompt caching al 90% de ahorro, ruteo de LLM por agente (gemma/qwen/claude según tarea), self-healing con 5 estrategias de recuperación.",
          "Stack: Python 3.12 async, FastAPI, Claude Agent SDK, pgvector + Voyage AI, Docker, Vercel + Render.",
        ],
      },
      {
        title: "AI Data Specialist (RLHF)",
        company: "Scale AI / Remotasks",
        location: "Remoto",
        dates: "2023 – Presente",
        bullets: [
          "Entrenamiento RLHF para Claude (Anthropic) y GPT-4o (OpenAI): evaluación, ranking, corrección de código.",
          "Prompt engineering avanzado: Chain-of-Thought, few-shot, prompts estructurados en XML.",
          "Evaluación de código en Python, JavaScript, SQL y Java contra criterios de calidad y seguridad (OWASP, patrones CWE).",
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
    ],
    projectsTitle: "Proyectos",
    projectsNote:
      "Todos los proyectos abajo son públicos en GitHub con código fuente, tests, y (cuando aplica) demos en vivo. Audita el que quieras.",
    projects: [
      {
        name: "NexusForge AI",
        desc:
          "Plataforma de orquestación con 24 agentes, 6 topologías de swarm, DAG engine, memoria de 5 capas (working/episodic/semantic/regressive/predictive), MCP vía Claude Agent SDK, RAG sobre pgvector + Voyage AI. Self-healing con 5 estrategias de recuperación. 780+ tests. 74,959 LOC Python.",
        tags: ["Multi-Agente", "MCP", "RAG", "Python", "FastAPI", "pgvector", "Docker"],
        links: { live: "https://07-nexusforge-ai.vercel.app", code: "https://github.com/christianescamilla15-cell/nexusforge-ai" },
      },
      {
        name: "TreasuryForge — Safety Architecture",
        desc:
          "Patrón de 4 capas (Agent → Policy → Executor → Wallet) donde la policy NUNCA confía en el agente. WAL + checkpoint atómico sobreviven SIGKILL. Cadena HMAC-SHA256 tamper-evident. Deflated Sharpe Ratio + purged K-fold CV para validación honesta. Property-based fuzzing con Hypothesis. 77 test suites, 17,700 LOC.",
        tags: ["Agent Safety", "Crash-Safe", "HMAC Audit", "Hypothesis", "Python"],
        links: { live: "https://github.com/christianescamilla15-cell/treasuryforge#what-this-proves-for-hiring-managers-reading-the-code", code: "https://github.com/christianescamilla15-cell/treasuryforge" },
      },
      {
        name: "agentguard",
        desc:
          "Librería Python standalone: guardrails de seguridad para agentes autónomos. 8 reglas hard (kill_switch, circuit_breaker, staleness, allowlist, per_call_cap, rate_limit, spend_budget, solvency) + estado crash-safe vía snapshot/restore. Cero dependencias. 11 tests pasando.",
        tags: ["Librería", "Agent Safety", "Zero Deps", "Python", "MIT"],
        links: { live: "https://github.com/christianescamilla15-cell/agentguard#30-second-example", code: "https://github.com/christianescamilla15-cell/agentguard" },
      },
      {
        name: "CallForge — Voz + LLM",
        desc:
          "Plataforma multi-agente con voz: Whisper STT (0.9s) + Kokoro ONNX TTS (CPU RTF 0.34) + Chatterbox voice cloning. 6 agentes especializados. Cadena de fallback LLM (Groq → Ollama → Mock) para operación offline a costo cero. Hybrid RAG. Multi-tenant. Clean Architecture. 15 test suites (100% offline).",
        tags: ["Voz", "Multi-Agente", "LLM Fallback", "Clean Architecture", "Python"],
        links: { live: "https://github.com/christianescamilla15-cell/callforge#what-this-proves", code: "https://github.com/christianescamilla15-cell/callforge" },
      },
      {
        name: "Verificarro — Verificación de Autos MX (MVP)",
        desc:
          "MVP en producción para verificación de autos usados en México. Claude Sonnet 4.6 Vision para detección de anomalías en fotos. Scraper REPUVE con bypass de reCaptcha v2 (2Captcha + Whisper local). Decodificador VIN (ISO 3779 + NHTSA vPIC). Mercado Pago. PII encriptada (Fernet). Extensión Chrome MV3. 491 tests.",
        tags: ["Claude Vision", "MVP Producción", "Mercado Pago", "Playwright", "React"],
        links: { live: "https://github.com/christianescamilla15-cell/verificarro", code: "https://github.com/christianescamilla15-cell/verificarro" },
      },
      {
        name: "AIOS Framework — Spec-Driven OS",
        desc:
          "Scanner de seguridad multi-estrategia (72 detectores) con loop de convergencia: regex + ensemble OSS (semgrep / bandit / trivy / checkov / gitleaks) + LLM deep-review + taint flow cross-file. MCP server exponiendo aios init/task/analyze/release. Mapping CWE → compliance (LFPDPPP / PCI-DSS / SOX / OWASP). 132 módulos Python, 428 tests.",
        tags: ["MCP Server", "Security Scanner", "Compliance", "Python"],
        links: { live: "https://github.com/christianescamilla15-cell/aios-framework", code: "https://github.com/christianescamilla15-cell/aios-framework" },
      },
    ],
    contactTitle: "Contacto",
    contactBody: "Abierto a posiciones remote de Senior GenAI / AI Engineer. Basado en CDMX, disponible inmediato.",
    contactCta: "Envíame un correo",
    footer: "Hecho con React + Vite • Actualizado 2026-06 — Portafolio AI Engineer",
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

  const CV_PDF_URL = "/cv.pdf";
  const EMAIL = "christianescamilla15@gmail.com";

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
              <span>Mexico City, MX · Remote OK</span>
              <span className="sep">•</span>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </div>
          </div>

          <div className="heroRight">
            <div className="card">
              <p className="cardTitle">ATS Match Keywords</p>
              <div className="badgeGrid">
                {[
                  "AI Engineer",
                  "LLM",
                  "Multi-Agent",
                  "MCP",
                  "RAG",
                  "Claude",
                  "Python",
                  "FastAPI",
                  "Agent Safety",
                  "Voice + LLM",
                  "pgvector",
                  "Docker",
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
              <h3 className="h3">AI &amp; LLMs</h3>
              <ul className="list">
                {t.skills.ai.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>

            <div className="panel">
              <h3 className="h3">Backend</h3>
              <ul className="list">
                {t.skills.backend.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>

            <div className="panel">
              <h3 className="h3">Frontend</h3>
              <ul className="list">
                {t.skills.frontend.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>

            <div className="panel">
              <h3 className="h3">DevOps &amp; Testing</h3>
              <ul className="list">
                {t.skills.devops.map((x) => (
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
          <a className="btnPrimary" href={`mailto:${EMAIL}?subject=AI%20Engineer%20Opportunity`}>
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
