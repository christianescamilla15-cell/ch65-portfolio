/**
 * Knowledge Base Endpoint & Data Store
 *
 * Serves the portfolio knowledge base used by chat and recommend middleware.
 * Supabase-first loading via kb-loader.js with hardcoded PORTFOLIO_KB fallback.
 * Contains all project details, skills, experience, contact info (bilingual EN/ES).
 *
 * See MIDDLEWARE.md for full architecture documentation.
 */
import { loadKB } from './_lib/kb-loader.js'
export async function getKB() {
  const db = await loadKB()
  return db || PORTFOLIO_KB
}

// Hardcoded fallback — used when Supabase is unavailable
export const PORTFOLIO_KB = {
  about: {
    en: `Christian Hernandez Escamilla is a Software Engineer from Mexico City (CDMX), Mexico. He specializes in AI systems, multi-agent orchestration, automation, and full-stack development. He has 3+ years of experience with LLMs — 2.5+ years at Scale AI training Claude and GPT-4o through RLHF, and has independently built 24+ production AI systems with 3,000+ tests across 24+ public GitHub repos (incl. TreasuryForge, CallForge, agentguard, Verificarro, AIOS Framework). He also ships AIOS (published on PyPI), runs a self-hosted MCP bridge at mcp.chernandez.dev, and built a zero-cloud phone-to-PC dispatch system with GitHub Actions self-hosted runners. Holds a Software Engineering degree from UVEG (2018-2022) and completed a Full Stack Java Developer Bootcamp at Generation Mexico (2026). Available immediately. Languages: Spanish (native), English (B1-B2 professional).`,
    es: `Christian Hernandez Escamilla es Ingeniero en Software de la Ciudad de México (CDMX). Se especializa en sistemas de IA, orquestación multi-agente, automatización, y desarrollo full-stack. Tiene 3+ años de experiencia con LLMs — 2.5+ años en Scale AI entrenando Claude y GPT-4o mediante RLHF, y ha construido independientemente 24+ sistemas de IA en producción con 3,000+ tests en 24+ repos públicos de GitHub (incl. TreasuryForge, CallForge, agentguard, Verificarro, AIOS Framework). Además publica AIOS en PyPI, opera un bridge MCP auto-hospedado en mcp.chernandez.dev, y construyó un sistema de dispatch zero-cloud teléfono→PC con GitHub Actions self-hosted runners. Ingeniería en Software de UVEG (2018-2022) y Bootcamp Full Stack Java Developer de Generation México (2026). Disponible de manera inmediata.`
  },

  projects: [
    {
      name: "TreasuryForge",
      description: {
        en: "Safety architecture for autonomous agents — 4-layer Agent → Policy → Executor → Wallet pattern where the policy NEVER trusts the agent. WAL + atomic checkpoint surviving SIGKILL. HMAC-SHA256 tamper-evident audit chain. Deflated Sharpe Ratio + purged K-fold CV. Hypothesis property-based fuzzing. 77 test suites, 17K LOC.",
        es: "Arquitectura de seguridad para agentes autónomos — patrón de 4 capas Agent → Policy → Executor → Wallet donde la policy NUNCA confía en el agente. WAL + checkpoint atómico sobreviven SIGKILL. Cadena de auditoría HMAC-SHA256 tamper-evident. Deflated Sharpe Ratio + purged K-fold CV. Property-based fuzzing con Hypothesis. 77 test suites, 17K LOC."
      },
      stack: "Python, Hypothesis, asyncio, stdlib-only crypto",
      tests: 77,
      demo: "https://github.com/christianescamilla15-cell/treasuryforge#what-this-proves-for-hiring-managers-reading-the-code",
      github: "https://github.com/christianescamilla15-cell/treasuryforge",
      keyMetric: "4-layer safety, 8 policy rules, 77 test suites"
    },
    {
      name: "CallForge",
      description: {
        en: "Multi-agent voice + LLM customer support platform. Whisper STT (0.9s) + Kokoro ONNX TTS (CPU RTF 0.34) + Chatterbox voice cloning. 6 specialized agents. LLM provider fallback chain (Groq → Ollama → Mock) for zero-cost offline operation. Hybrid RAG with keyword fallback. Multi-tenant. Clean Architecture. 15 test suites (100% offline).",
        es: "Plataforma multi-agente de soporte con voz + LLM. Whisper STT (0.9s) + Kokoro ONNX TTS (CPU RTF 0.34) + Chatterbox voice cloning. 6 agentes especializados. Cadena de fallback LLM (Groq → Ollama → Mock) para operación offline a costo cero. Hybrid RAG con keyword fallback. Multi-tenant. Clean Architecture. 15 test suites (100% offline)."
      },
      stack: "Python, FastAPI, Whisper, Kokoro ONNX, Chatterbox, Groq, Ollama",
      tests: 15,
      demo: "https://github.com/christianescamilla15-cell/callforge#what-this-proves",
      github: "https://github.com/christianescamilla15-cell/callforge",
      keyMetric: "6 agents, Whisper 0.9s STT, Kokoro RTF 0.34 CPU"
    },
    {
      name: "agentguard",
      description: {
        en: "Standalone Python library: safety guardrails for autonomous agents. 8 hard rules (kill_switch, circuit_breaker, staleness, allowlist, per_call_cap, rate_limit, spend_budget, solvency) + crash-safe latched state via snapshot/restore. Generalized from TreasuryForge. Zero dependencies. PyPI-ready. 11 tests passing.",
        es: "Librería Python standalone: guardrails de seguridad para agentes autónomos. 8 reglas hard (kill_switch, circuit_breaker, staleness, allowlist, per_call_cap, rate_limit, spend_budget, solvency) + estado crash-safe vía snapshot/restore. Generalizado desde TreasuryForge. Cero dependencias. PyPI-ready. 11 tests pasando."
      },
      stack: "Python 3.10+, pytest, stdlib only",
      tests: 11,
      demo: "https://github.com/christianescamilla15-cell/agentguard#30-second-example",
      github: "https://github.com/christianescamilla15-cell/agentguard",
      keyMetric: "8 hard rules, zero dependencies, 11 tests"
    },
    {
      name: "Verificarro",
      description: {
        en: "Production MVP: used-car verification marketplace for Mexico. Claude Sonnet 4.6 Vision for photo anomaly detection. REPUVE scraper with reCaptcha v2 bypass (2Captcha + local Whisper). VIN decoder (ISO 3779 + NHTSA vPIC). Mercado Pago integration. Encrypted PII (Fernet). Chrome MV3 extension. 491 tests.",
        es: "MVP en producción: marketplace de verificación de autos usados en México. Claude Sonnet 4.6 Vision para detección de anomalías en fotos. Scraper REPUVE con bypass de reCaptcha v2 (2Captcha + Whisper local). Decodificador VIN (ISO 3779 + NHTSA vPIC). Integración Mercado Pago. PII encriptada (Fernet). Extensión Chrome MV3. 491 tests."
      },
      stack: "Python, FastAPI, SQLAlchemy 2 async, Claude Vision, Playwright, React 18, Mercado Pago",
      tests: 491,
      demo: "https://verificarro.vercel.app",
      github: "https://github.com/christianescamilla15-cell/verificarro",
      keyMetric: "491 tests, $0.05 per report, 60s pipeline"
    },
    {
      name: "LangChain Pipeline",
      description: {
        en: "Document intelligence pipeline with 3 microservices (Document, Analysis, Report) communicating through an event bus. Uses LangChain chains + AgentExecutor with 5 tools, RAG with FAISS vector store, and full MLOps (prompt registry, A/B testing, guardrails, LLM observability). AWS Bedrock ModelRouter with 4-tier fallback. 144 tests, 86% coverage, GitHub Actions CI.",
        es: "Pipeline de inteligencia documental con 3 microservicios comunicados por event bus. LangChain chains + AgentExecutor con 5 tools, RAG con FAISS, MLOps completo (prompt registry, A/B testing, guardrails, observabilidad LLM). ModelRouter AWS Bedrock con fallback 4 niveles. 144 tests, 86% cobertura."
      },
      stack: "Python, LangChain, FastAPI, FAISS, Docker, GitHub Actions",
      tests: 144,
      demo: "https://langchain-pipeline.vercel.app",
      github: "https://github.com/christianescamilla15-cell/langchain-pipeline",
      keyMetric: "144 tests, 86% coverage"
    },
    {
      name: "Ad Analytics Pipeline",
      description: {
        en: "Marketing analytics platform with ETL from Meta Ads + Google Ads + GA4. OCR invoice parsing with confidence scoring, AWS S3/Lambda/Textract, anomaly detection (z-score), ROI calculator, budget pacing, alert system, multi-account management. 124 tests.",
        es: "Plataforma de analítica de marketing con ETL de Meta Ads + Google Ads + GA4. OCR de facturas, AWS S3/Lambda/Textract, detección de anomalías, calculadora ROI, pacing de presupuesto, alertas, multi-cuenta. 124 tests."
      },
      stack: "Python, FastAPI, Meta API, Google API, GA4, AWS S3, Lambda",
      tests: 124,
      demo: "https://ad-analytics-pipeline.vercel.app",
      github: "https://github.com/christianescamilla15-cell/ad-analytics-pipeline",
      keyMetric: "124 tests, 28 endpoints"
    },
    {
      name: "AI Playground",
      description: {
        en: "Interactive AI demo with 7 use cases: Chat, Document Analysis, RAG Q&A, Content Generation, Data Extraction, Translation, and side-by-side Model Comparison (Claude vs GPT-4o vs Gemini). Real-time cost tracking across all interactions. 98 tests.",
        es: "Demo interactiva con 7 casos de uso: Chat, Análisis de Documentos, Q&A con RAG, Generación de Contenido, Extracción de Datos, Traducción, y Comparación de Modelos lado a lado. Tracking de costos en tiempo real. 98 tests."
      },
      stack: "React, FastAPI, Multi-model (Claude/GPT/Gemini)",
      tests: 98,
      demo: "https://ai-playground-phi-three.vercel.app",
      github: "https://github.com/christianescamilla15-cell/ai-playground",
      keyMetric: "7 use cases, 3 models"
    },
    {
      name: "Synapse Multi-Agent Chatbot",
      description: {
        en: "Customer service chatbot with 5 specialized AI agents (Nova/Sales, Atlas/Support, Aria/Billing, Nexus/Escalation, Orion/General). Uses Claude Tool Use with 6 tools in an agentic loop. Conversational LLM-style responses with multi-intent detection, sentiment analysis, and automatic agent routing. FastAPI + Redis backend, 120 tests. Resolves ~80% of inquiries without human intervention.",
        es: "Chatbot de servicio al cliente con 5 agentes IA especializados. Claude Tool Use con 6 herramientas en loop agéntico. Respuestas conversacionales con detección multi-intento, análisis de sentimiento, y enrutamiento automático. FastAPI + Redis, 120 tests. Resuelve ~80% consultas sin intervención humana."
      },
      stack: "React, FastAPI, Claude API, Redis, pytest",
      tests: 120,
      demo: "https://chatbot-multiagente-ia.vercel.app",
      github: "https://github.com/christianescamilla15-cell/chatbot-multiagente-ia",
      keyMetric: "5 agents, 120 tests, 80% auto-resolution"
    },
    {
      name: "AI Document Pipeline",
      description: {
        en: "Document analysis with 4 CrewAI agents (Researcher, Analyzer, Writer, Reviewer) and 2 MCP servers (Filesystem + Database). 44 pytest tests.",
        es: "Análisis de documentos con 4 agentes CrewAI y 2 servidores MCP. 44 tests."
      },
      stack: "Python, CrewAI, MCP, FastAPI",
      tests: 44,
      demo: "https://ai-document-pipeline.vercel.app",
      github: "https://github.com/christianescamilla15-cell/ai-document-pipeline",
      keyMetric: "4 CrewAI agents, 2 MCP servers"
    },
    {
      name: "FinanceAI Dashboard",
      description: {
        en: "Financial analytics dashboard with statistical anomaly detection (z-score), cash flow forecasting (linear regression), 7 spending categories, CSV import, and AI chatbot with 5 Claude tools.",
        es: "Dashboard financiero con detección de anomalías (z-score), proyección de flujo de caja (regresión lineal), 7 categorías de gasto, importación CSV, y chatbot IA con 5 tools Claude."
      },
      stack: "React, Recharts, Claude API, Python",
      tests: 83,
      demo: "https://finance-ai-dashboard-omega.vercel.app",
      github: "https://github.com/christianescamilla15-cell/finance-ai-dashboard",
      keyMetric: "83 tests, voice AI, anomaly detection"
    },
    {
      name: "Invoice Manager",
      description: {
        en: "Full-stack invoicing system with Laravel 11 + Vue.js 3 + MySQL + Docker. SOLID architecture (Repository, Strategy, Factory patterns). 3 tax strategies (IVA 16%, IVA+ISR retention, Exempt). 68 PHPUnit tests (251 assertions). Dark/light mode.",
        es: "Sistema de facturación full-stack con Laravel 11 + Vue.js 3 + MySQL + Docker. Arquitectura SOLID. 3 estrategias fiscales. 68 tests PHPUnit (251 assertions). Modo oscuro/claro."
      },
      stack: "Laravel 11, Vue.js 3, MySQL, Docker, PHPUnit",
      tests: 68,
      demo: "",
      github: "https://github.com/christianescamilla15-cell/invoice-manager",
      keyMetric: "68 tests, SOLID architecture"
    },
    {
      name: "ContentStudio AI",
      description: {
        en: "Multi-channel content generator with 7-agent agentic pipeline (Brand Analyzer, Audience Profiler, Hook Generator, Viral Scorer, Creative Transformer, Positioning, Platform Optimizer). 5-tier generation: Claude API -> Cloudflare Workers AI (Llama 3.1) -> HuggingFace (Mistral 7B) -> Agentic local -> Templates. Supports Instagram, Twitter/X, LinkedIn, Facebook.",
        es: "Generador de contenido multicanal con pipeline de 7 agentes. 5 niveles de generación: Claude -> Cloudflare AI (Llama 3.1) -> HuggingFace (Mistral 7B) -> Agéntico local -> Templates. Soporta Instagram, Twitter/X, LinkedIn, Facebook."
      },
      stack: "React, Claude API, Cloudflare Workers AI, HuggingFace, Vercel",
      tests: 103,
      demo: "https://content-studio-ai-blush.vercel.app",
      github: "https://github.com/christianescamilla15-cell/content-studio-ai",
      keyMetric: "103 tests, 7-agent pipeline, 5-tier generation"
    },
    {
      name: "HRScout",
      description: {
        en: "AI resume screening with 4-agent agentic pipeline (Skill Extractor, Experience Evaluator, Job Fit Analyzer, Recommendation Engine). Claude Tool Use with 5 tools. PDF/TXT upload, 0-100 scoring with confidence indicators.",
        es: "Filtrado de CVs con IA con pipeline de 4 agentes. Claude Tool Use con 5 tools. Subida PDF/TXT, scoring 0-100 con indicadores de confianza."
      },
      stack: "React, Claude API, FastAPI",
      tests: 103,
      demo: "https://hr-scout-llm.vercel.app",
      github: "https://github.com/christianescamilla15-cell/hr-scout-llm",
      keyMetric: "103 tests, 4-agent pipeline, 0-100 scoring"
    },
    {
      name: "ClientHub",
      description: {
        en: "AI client portal with projects, invoices, tickets, documents. 6 Claude tools, notification center, real-time KPIs, AI assistant.",
        es: "Portal de clientes con IA. Proyectos, facturas, tickets, documentos. 6 tools Claude, notificaciones, KPIs en tiempo real, asistente IA."
      },
      stack: "React, Claude API, Airtable, Softr",
      tests: 113,
      demo: "https://client-hub-nocode.vercel.app",
      github: "https://github.com/christianescamilla15-cell/client-hub-nocode",
      keyMetric: "113 tests, 6 Claude tools, real-time KPIs"
    },
    {
      name: "MindScrolling",
      description: {
        en: "Anti doom-scrolling Flutter app with hybrid AI recommendation (pgvector + EMA). 13,000+ bilingual quotes, 14 CI/CD pipelines. Published on Google Play Store.",
        es: "App Flutter anti doom-scrolling con recomendación IA híbrida (pgvector + EMA). 13,000+ frases bilingües, 14 pipelines CI/CD. Publicada en Google Play Store."
      },
      stack: "Flutter, Node.js/Fastify, Supabase, pgvector",
      demo: "https://appetize.io/embed/b_ys32inbvsel2bx62mf2drptrfe",
      github: "https://github.com/christianescamilla15-cell/MindScrolling"
    },
    {
      name: "NexusForge AI",
      description: {
        en: "Enterprise SaaS agent orchestration platform with 24 AI agents, 6 swarm topologies, Google OAuth + Stripe billing, AI Chat with visible reasoning (deepseek-r1), 5 local LLMs (Ollama) + Groq + Claude fallback chain, 12 integrations (Email, Notion, Slack, Drive, Sheets, Gmail, Webhook, External API), drag-and-drop builder, orchestrator memory, DAG execution engine, self-healing with 5 strategies, RAG with pgvector, real-time WebSocket monitoring. 260 tests.",
        es: "Plataforma SaaS empresarial de orquestación con 24 agentes IA, 6 topologías, Google OAuth + Stripe billing, Chat IA con razonamiento visible (deepseek-r1), 5 LLMs locales (Ollama) + Groq + Claude, 12 integraciones (Email, Notion, Slack, Drive, Sheets, Gmail, Webhook, API externa), drag-and-drop builder, orchestrator memory, motor DAG, auto-reparación, RAG con pgvector, monitoreo WebSocket. 260 tests."
      },
      stack: "Python, FastAPI, React, PostgreSQL, pgvector, Redis, MongoDB, Docker, Ollama, Groq, Claude API, deepseek-r1, Stripe",
      tests: 260,
      demo: "https://07-nexusforge-ai.vercel.app",
      github: "https://github.com/christianescamilla15-cell/nexusforge-ai",
      keyMetric: "24 agents, 5 local LLMs, 12 integrations, 260 tests"
    },
    {
      name: "AIOS — AI Engineering OS",
      description: {
        en: "Spec-driven AI engineering framework published on PyPI. 30 CLI commands, persistent memory (months of context, 17KB/6mo, 2ms search), voice input (mic + WhatsApp via Groq Whisper), memory-aware task routing, auto-steering, MCP server, Kiro IDE Power integration, VS Code extension. Lets developers work across months of context without losing state.",
        es: "Framework de ingeniería IA spec-driven publicado en PyPI. 30 comandos CLI, memoria persistente (meses de contexto, 17KB/6mo, búsqueda en 2ms), input de voz (mic + WhatsApp vía Groq Whisper), routing memory-aware, auto-steering, MCP server, integración Kiro IDE Power, extensión VS Code. Permite trabajar con contexto que persiste durante meses."
      },
      stack: "Python, PyPI, MCP, Kiro, VS Code, Groq Whisper, Twilio",
      tests: 0,
      demo: "https://pypi.org/project/aios-kiro-master/",
      github: null,
      keyMetric: "30 CLI commands, PyPI package, months of persistent memory"
    },
    {
      name: "MultiAgente — Resident Support",
      description: {
        en: "8-agent AI support system for residential complexes. 8 specialized agents (Router, Sentinel, Nova, Atlas, Aria, Orion, Nexus, Closure) with WhatsApp OTP identity verification, real-time WebSocket dashboard, Groq Whisper audio input, serves 500 residents with 3,000 payments and 200 tickets tracked. Admin Panel (8 sections), Drive sync, Resend email, Kiro Powers (Stripe + Supabase + Snyk).",
        es: "Sistema multi-agente de soporte para complejos residenciales. 8 agentes especializados (Router, Sentinel, Nova, Atlas, Aria, Orion, Nexus, Closure) con verificación de identidad OTP por WhatsApp, dashboard WebSocket en tiempo real, input de audio con Groq Whisper. Sirve 500 residentes con 3,000 pagos y 200 tickets. Admin Panel (8 secciones), Drive sync, email via Resend, Kiro Powers."
      },
      stack: "React, FastAPI, PostgreSQL, Groq, Twilio, WebSocket, Kiro",
      tests: 120,
      demo: "https://chatbot-multiagente-ia.vercel.app",
      github: "https://github.com/christianescamilla15-cell/chatbot-multiagente-ia",
      keyMetric: "8 AI agents, 500 residents, WhatsApp OTP, real-time dashboard"
    },
    {
      name: "Multi-Agent Build System",
      description: {
        en: "6 autonomous agents that build complete projects in a pipeline: Architect → Planner → Coder → Tester → Reviewer → Deployer. Each agent uses Claude API with specialized prompts and tool use. Produces working projects end-to-end from a natural-language description.",
        es: "6 agentes autónomos que construyen proyectos completos en pipeline: Architect → Planner → Coder → Tester → Reviewer → Deployer. Cada agente usa Claude API con prompts especializados y tool use. Produce proyectos funcionales end-to-end desde una descripción en lenguaje natural."
      },
      stack: "Python, Claude API, Claude Code",
      tests: 0,
      demo: null,
      github: "https://github.com/christianescamilla15-cell/multi-agent-build-system",
      keyMetric: "6 autonomous agents, end-to-end project generation"
    },
    {
      name: "Spacetime Lab",
      description: {
        en: "Research-grade physics package (v2.1) covering the full arc from Schwarzschild to the resolution of the Hawking information paradox. 9 phases shipped: Schwarzschild/Kerr/BTZ metrics, symplectic integrators, Bardeen photon shadow, Schwarzschild/Kerr QNMs, holography (AdS/CFT, Ryu-Takayanagi, Strominger-Cardy), Island formula + Page curve. Three independent paths to the Page curve all bit-exact. 655 tests, 8 Bilby PRs.",
        es: "Paquete de física de nivel investigación (v2.1) que cubre todo el arco desde Schwarzschild hasta la resolución de la paradoja de información de Hawking. 9 fases entregadas: métricas Schwarzschild/Kerr/BTZ, integradores simplécticos, sombra de fotones Bardeen, QNMs Schwarzschild/Kerr, holografía (AdS/CFT, Ryu-Takayanagi, Strominger-Cardy), fórmula de islas + curva de Page. Tres rutas independientes a la curva de Page todas bit-exactas. 655 tests, 8 PRs a Bilby."
      },
      stack: "Python, NumPy, SciPy, qnm, quimb, EinsteinPy, pytest",
      tests: 655,
      demo: "https://spacetime-lab.vercel.app",
      github: "https://github.com/christianescamilla15-cell/spacetime-lab",
      keyMetric: "9 phases, 655 tests, 8 Bilby PRs, bit-exact Page curve"
    },
    {
      name: "WordForge",
      description: {
        en: "AI-powered writing assistant with 12 specialized tools: grammar correction, style adaptation (6 tones), readability analysis (Flesch-Kincaid), plagiarism detection, SEO optimization, translation (8 languages), summarization, paraphrasing, citation generator, keyword density, and sentiment analysis. Claude Tool Use with agentic loop. 205 Vitest tests.",
        es: "Asistente de escritura con IA y 12 herramientas especializadas: corrección gramatical, adaptación de estilo (6 tonos), análisis de legibilidad (Flesch-Kincaid), detección de plagio, optimización SEO, traducción (8 idiomas), resumen, paráfrasis, generador de citas, densidad de keywords, y análisis de sentimiento. Claude Tool Use con loop agéntico. 205 tests Vitest."
      },
      stack: "React, Claude API, Vitest",
      tests: 205,
      demo: "https://wordforge-ai.vercel.app",
      github: "https://github.com/christianescamilla15-cell/wordforge",
      keyMetric: "205 tests, 12 writing tools, 6 tones"
    },
    {
      name: "Playwright Automation",
      description: {
        en: "Automation suite with 3 real scrapers (GitHub repos, e-commerce prices, form submission), SQLite scheduler, CLI tool, and E2E tests for the portfolio. 54 pytest tests. Zero mocks — all scrapers hit real websites.",
        es: "Suite de automatización con 3 scrapers reales (repos GitHub, precios e-commerce, formularios), scheduler SQLite, CLI, y E2E tests para el portfolio. 54 tests pytest. Zero mocks — todos los scrapers consultan sitios reales."
      },
      stack: "Python, Playwright, SQLite, pytest, Docker",
      tests: 54,
      github: "https://github.com/christianescamilla15-cell/playwright-automation",
      keyMetric: "54 tests, 3 real scrapers, SQLite scheduler"
    },
    {
      name: "Fine-tuning Demo",
      description: {
        en: "DistilBERT multilingual fine-tuning for intent classification. 100 training samples across 5 intents (greeting, farewell, help, complaint, info). Full pipeline: data preparation → training → evaluation → inference. 27 pytest tests.",
        es: "Fine-tuning de DistilBERT multilingual para clasificación de intenciones. 100 muestras en 5 intenciones (saludo, despedida, ayuda, queja, info). Pipeline completo: preparación → entrenamiento → evaluación → inferencia. 27 tests pytest."
      },
      stack: "Python, PyTorch, HuggingFace Transformers, scikit-learn",
      tests: 27,
      github: "https://github.com/christianescamilla15-cell/fine-tuning-demo",
      keyMetric: "27 tests, DistilBERT multilingual, 5 intents"
    }
  ],

  skills: {
    en: "Languages: Python, JavaScript, TypeScript, Java, C, C++, SQL, PHP, Kotlin, Dart. AI & LLMs: Claude API, Claude Tool Use (32+ integrations), GPT-4o, Ollama (5 local LLMs), deepseek-r1, Groq, LangChain, CrewAI, MCP (self-hosted bridge at mcp.chernandez.dev), RAG (FAISS + pgvector), RLHF, Cloudflare Workers AI, HuggingFace, swarm topologies, DAG execution, self-healing agents, orchestrator memory. Backend: FastAPI, Node.js, Fastify, Flask, Laravel 11, Express, Pydantic v2, pytest (1,500+ tests), async/await. Frontend: React 18, Vue.js 3, Flutter, Vite, Tailwind, Stripe, FCM. Data: PostgreSQL, pgvector, MySQL, MongoDB, Redis, FAISS, SQLite, Supabase, Pandas. DevOps: Docker, Kubernetes, Terraform, GitHub Actions (self-hosted runners), Vercel, Render, AWS. Automation: n8n, Make.com, Zapier, Webhooks, 14+ CI/CD pipelines. Physics/Research: NumPy, SciPy, qnm, quimb, EinsteinPy, Bilby (8 merged PRs).",
    es: "Lenguajes: Python, JavaScript, TypeScript, Java, C, C++, SQL, PHP, Kotlin, Dart. IA & LLMs: Claude API, Claude Tool Use (32+ integraciones), GPT-4o, Ollama (5 LLMs locales), deepseek-r1, Groq, LangChain, CrewAI, MCP (bridge auto-hospedado en mcp.chernandez.dev), RAG (FAISS + pgvector), RLHF, Cloudflare Workers AI, HuggingFace, topologías de enjambre, ejecución DAG, agentes auto-reparables, orchestrator memory. Backend: FastAPI, Node.js, Fastify, Flask, Laravel 11, Express, Pydantic v2, pytest (1,500+ tests), async/await. Frontend: React 18, Vue.js 3, Flutter, Vite, Tailwind, Stripe, FCM. Datos: PostgreSQL, pgvector, MySQL, MongoDB, Redis, FAISS, SQLite, Supabase, Pandas. DevOps: Docker, Kubernetes, Terraform, GitHub Actions (self-hosted runners), Vercel, Render, AWS. Automatización: n8n, Make.com, Zapier, Webhooks, 14+ pipelines CI/CD. Física/Investigación: NumPy, SciPy, qnm, quimb, EinsteinPy, Bilby (8 PRs merged)."
  },

  experience: {
    en: "Scale AI / Remotasks (June 2023 - Present): AI Data Specialist — RLHF training for Claude and GPT-4o, prompt engineering (Chain-of-Thought, Few-shot, XML), code evaluation in Python/JavaScript/SQL/Java. Independent AI Builder (January 2025 - Present, updated April 2026): 20+ production systems with 1,500+ tests across 22+ GitHub repos, plus Spacetime Lab (physics research, 655 tests + 8 Bilby PRs), AIOS on PyPI, self-hosted MCP bridge, and phone-to-PC dispatch infrastructure. All portfolio projects have live demos.",
    es: "Scale AI / Remotasks (Junio 2023 - Presente): Especialista en Datos IA — Entrenamiento RLHF para Claude y GPT-4o, prompt engineering, evaluación de código en Python/JavaScript/SQL/Java. Constructor IA Independiente (Enero 2025 - Presente, actualizado Abril 2026): 20+ sistemas en producción con 1,500+ tests en 22+ repos GitHub, además Spacetime Lab (investigación de física, 655 tests + 8 PRs a Bilby), AIOS en PyPI, bridge MCP auto-hospedado, e infraestructura de dispatch teléfono→PC. Todos los proyectos del portafolio tienen demos en vivo."
  },

  contact: {
    en: "Email: christianescamilla15@gmail.com | Phone/WhatsApp: +52 55 7960 5324 | GitHub: github.com/christianescamilla15-cell | LinkedIn: linkedin.com/in/christianescamilla15-cell | Portfolio: ch65-portfolio.vercel.app | Location: Mexico City (CDMX), Mexico | Available immediately.",
    es: "Email: christianescamilla15@gmail.com | Teléfono/WhatsApp: +52 55 7960 5324 | GitHub: github.com/christianescamilla15-cell | LinkedIn: linkedin.com/in/christianescamilla15-cell | Portafolio: ch65-portfolio.vercel.app | Ubicación: CDMX, México | Disponible de manera inmediata."
  },

  availability: {
    en: "Available immediately for full-time or contract work. Open to remote, hybrid, and Mexico-City-based roles.",
    es: "Disponible de manera inmediata para tiempo completo o contrato. Abierto a roles remotos, híbridos y presenciales en CDMX."
  },

  metrics: {
    en: "20+ production systems, 1,500+ automated tests, 22+ GitHub repos, 86% coverage on best project, 32+ Claude Tool Use integrations, 14+ CI/CD pipelines, 24 AI agents in NexusForge with 5 dedicated local LLMs, 8 AI agents with WhatsApp OTP in MultiAgente (500 residents served), AIOS published on PyPI, Spacetime Lab with 655 physics tests + 8 merged PRs to Bilby, self-hosted MCP bridge at mcp.chernandez.dev.",
    es: "20+ sistemas en producción, 1,500+ tests automatizados, 22+ repos GitHub, 86% cobertura en mejor proyecto, 32+ integraciones Claude Tool Use, 14+ pipelines CI/CD, 24 agentes IA en NexusForge con 5 LLMs locales dedicados, 8 agentes IA con OTP WhatsApp en MultiAgente (500 residentes atendidos), AIOS publicado en PyPI, Spacetime Lab con 655 tests de física + 8 PRs merged a Bilby, bridge MCP auto-hospedado en mcp.chernandez.dev."
  }
}

// Quick actions for the chatbot
export const QUICK_ACTIONS = {
  en: [
    { label: "View all projects", query: "Show me all of Christian's projects with demos" },
    { label: "AI experience", query: "What AI and LLM experience does Christian have?" },
    { label: "Technical skills", query: "What programming languages and tools does Christian use?" },
    { label: "Contact info", query: "How can I contact Christian?" },
    { label: "Availability", query: "Is Christian available for hire?" },
    { label: "Best projects", query: "What are Christian's top 3 most impressive projects?" },
  ],
  es: [
    { label: "Ver proyectos", query: "Muéstrame todos los proyectos de Christian con demos" },
    { label: "Experiencia IA", query: "¿Qué experiencia tiene Christian en IA y LLMs?" },
    { label: "Skills técnicos", query: "¿Qué lenguajes y herramientas usa Christian?" },
    { label: "Contacto", query: "¿Cómo puedo contactar a Christian?" },
    { label: "Disponibilidad", query: "¿Está disponible Christian para contratación?" },
    { label: "Mejores proyectos", query: "¿Cuáles son los 3 proyectos más impresionantes de Christian?" },
  ]
}
