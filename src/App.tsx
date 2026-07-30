import { useState, useEffect } from 'react'
import { SmoothScroll } from './components/layout/SmoothScroll'
import { CustomCursor } from './components/ui/CustomCursor'
import { Magnetic } from './components/ui/Magnetic'
import { MenuOverlay } from './components/layout/MenuOverlay'
import { Hero } from './components/sections/Hero'
import { AboutUs } from './components/sections/AboutUs'
import { UseCases } from './components/sections/UseCases'
import { ContactInfo } from './components/sections/ContactInfo'
import { ProductCollection } from './components/sections/ProductCollection'
import { ColourStudio } from './components/sections/ColourStudio'
import { Configurator } from './components/sections/Configurator'
import { Projects } from './components/sections/Projects'
import { Footer } from './components/layout/Footer'
import { Preloader } from './components/ui/Preloader'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <CustomCursor />
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <SmoothScroll>
      <div className="relative z-10 text-white">
        <nav 
          className={`fixed top-0 left-0 w-full px-8 md:px-12 z-50 flex justify-between items-center transition-all duration-500 pointer-events-none ${
            scrolled 
              ? 'py-6 bg-brand-bg/90 backdrop-blur-md text-brand-dark border-b border-brand-dark/10 shadow-sm' 
              : 'py-8 md:py-12 text-white'
          }`}
        >
          <div 
            className="font-heading text-xl md:text-2xl tracking-widest uppercase"
            style={{ textShadow: scrolled ? 'none' : '0 2px 10px rgba(0,0,0,0.5)' }}
          >
            Maple Leaf Doors
          </div>
          <Magnetic>
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="font-button text-sm uppercase tracking-wider pointer-events-auto hover:opacity-70 transition-opacity"
            >
              Menu
            </button>
          </Magnetic>
        </nav>

        <main>
          <div id="home"><Hero /></div>
          
          <div className="bg-brand-bg text-brand-dark relative z-20">
            <div id="about"><AboutUs /></div>
            <div id="collections"><ProductCollection /></div>
            <div id="applications"><UseCases /></div>
            <div id="colour-studio"><ColourStudio /></div>
            <div id="bespoke-options"><Configurator /></div>
            <div id="projects"><Projects /></div>
            <div id="contact"><ContactInfo /></div>
          </div>
        </main>
        <Footer />
      </div>
    </SmoothScroll>
    </>
  )
}

export default App
