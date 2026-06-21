import { useState, useEffect } from 'react'
import { LangContext } from './hooks/useLanguage'
import { useRevealFallback } from './hooks/useRevealFallback'
import { useMagneticHover } from './hooks/useMagneticHover'

import Navbar from './components/layout/Navbar'
import Hero from './components/hero/Hero'
import ProofBar from './components/ProofBar'
import FeaturedProjects from './components/projects/FeaturedProjects'
import SupportingProjects from './components/projects/SupportingProjects'
import AboutNew from './components/about/AboutNew'
import Contact from './components/contact/Contact'
import Footer from './components/layout/Footer'
import PortfolioChatbot from './PortfolioChatbot'

const CHATBOT_ENABLED = import.meta.env.VITE_CHATBOT === 'true'

export default function App() {
  const [lang, setLang] = useState('es')

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  useRevealFallback()
  useMagneticHover()

  return (
    <LangContext.Provider value={lang}>
      <a href="#main" className="sr-only">
        {lang === 'es' ? 'Saltar al contenido' : 'Skip to content'}
      </a>

      <Navbar lang={lang} setLang={setLang} />

      <main id="main" role="main">
        <Hero />
        <ProofBar />
        <FeaturedProjects />
        <SupportingProjects />
        <AboutNew />
        <Contact />
      </main>

      <Footer />

      {CHATBOT_ENABLED && <PortfolioChatbot />}
    </LangContext.Provider>
  )
}
