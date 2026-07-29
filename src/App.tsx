import { useState, useEffect } from 'react'
import { SmoothScroll } from './components/layout/SmoothScroll'
import { Preloader } from './components/layout/Preloader'
import { CustomCursor } from './components/ui/CustomCursor'
import { Magnetic } from './components/ui/Magnetic'
import { Hero } from './components/sections/Hero'
import { OurStory } from './components/sections/OurStory'
import { ProductCollection } from './components/sections/ProductCollection'
import { ColourStudio } from './components/sections/ColourStudio'
import { Configurator } from './components/sections/Configurator'
import { Projects } from './components/sections/Projects'
import { Footer } from './components/layout/Footer'

function App() {
  const [loading, setLoading] = useState(true)
  const [scrolled, setScrolled] = useState(false)

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
      {loading && <Preloader onComplete={() => setLoading(false)} />}
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
            <button className="font-button text-sm uppercase tracking-wider pointer-events-auto hover:opacity-70 transition-opacity">Menu</button>
          </Magnetic>
        </nav>

        <main>
          <Hero />
          
          <div className="bg-brand-bg text-brand-dark relative z-20">
            <OurStory />
            
            <ProductCollection />
            <ColourStudio />
            <Configurator />
            <Projects />
          </div>
        </main>
        <Footer />
      </div>
    </SmoothScroll>
    </>
  )
}

export default App
