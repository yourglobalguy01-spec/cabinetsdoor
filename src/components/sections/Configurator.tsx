import { useState, useRef, useLayoutEffect, useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { ProductOverlay } from './ProductOverlay'

gsap.registerPlugin(ScrollTrigger)

// Generate 26 mock styles matching the uploaded images
const STYLES = Array.from({ length: 26 }, (_, i) => ({
  id: `style-${i + 1}`,
  number: String(i + 1).padStart(2, '0'),
  name: `Profile ${String(i + 1).padStart(2, '0')}`,
  description: 'A masterpiece of precision milling. This profile highlights the natural characteristics of the material with a seamlessly integrated edge, bringing architectural elegance to any space.',
  image: `/doors/door-${i + 1}.png`
}))

const COLORS = [
  { id: 'c1', name: 'Smoked Oak', hex: '#2A2421' },
  { id: 'c2', name: 'Natural Walnut', hex: '#4A3B32' },
  { id: 'c3', name: 'Raw Ash', hex: '#D1C7BD' },
  { id: 'c4', name: 'Matte Black', hex: '#111111' },
  { id: 'c5', name: 'Brushed Brass', hex: '#B5A06A' },
  { id: 'c6', name: 'Carrara', hex: '#E8E8E8' },
]

export function Configurator() {
  const [activeColor, setActiveColor] = useState(COLORS[0])
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedDoor, setSelectedDoor] = useState<any>(null)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const slider = sliderRef.current
      if (!slider) return

      const totalScroll = slider.scrollWidth - window.innerWidth

      // Main horizontal scroll
      const scrollTween = gsap.to(slider, {
        x: -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${slider.scrollWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Calculate active index based on scroll progress
            const progress = self.progress
            const index = Math.min(
              Math.max(0, Math.round(progress * (STYLES.length - 1))),
              STYLES.length - 1
            )
            setActiveIndex(index)
          }
        }
      })

      // 3D Cover Flow Effect for each card
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        
        // Setup initial state for non-active cards
        gsap.set(card, { 
          scale: 0.6, 
          opacity: 0.3,
          rotationY: 25,
          z: -100
        })

        // Animate based on scroll position
        gsap.to(card, {
          scale: 1.1,
          opacity: 1,
          rotationY: 0,
          z: 0,
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: card,
            containerAnimation: scrollTween,
            start: 'left center', // When left edge of card hits center of screen
            end: 'right center', // When right edge hits center
            scrub: true,
            onEnter: () => gsap.to(card, { scale: 1.1, opacity: 1, rotationY: 0, duration: 0.5 }),
            onLeave: () => gsap.to(card, { scale: 0.6, opacity: 0.3, rotationY: -25, duration: 0.5 }),
            onEnterBack: () => gsap.to(card, { scale: 1.1, opacity: 1, rotationY: 0, duration: 0.5 }),
            onLeaveBack: () => gsap.to(card, { scale: 0.6, opacity: 0.3, rotationY: 25, duration: 0.5 }),
          }
        })
      })
    })

    return () => ctx.revert()
  }, [])

  // 3D Mouse Tilt effect for the active card
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const activeCard = cardsRef.current[activeIndex]
      if (!activeCard) return

      const rect = activeCard.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      
      const rotateX = ((y - centerY) / centerY) * -15 // max 15 deg
      const rotateY = ((x - centerX) / centerX) * 15

      gsap.to(activeCard.querySelector('.door-image'), {
        rotateX,
        rotateY,
        duration: 0.5,
        ease: 'power2.out',
        transformPerspective: 1000
      })
      
      // Dynamic glare
      gsap.to(activeCard.querySelector('.glare'), {
        x: (x / rect.width) * 100 - 50,
        y: (y / rect.height) * 100 - 50,
        opacity: 0.4,
        duration: 0.5
      })
    }

    const handleMouseLeave = () => {
      const activeCard = cardsRef.current[activeIndex]
      if (!activeCard) return
      
      gsap.to(activeCard.querySelector('.door-image'), {
        rotateX: 0,
        rotateY: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.3)'
      })
      
      gsap.to(activeCard.querySelector('.glare'), {
        opacity: 0,
        duration: 1
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [activeIndex])

  return (
    <section 
      ref={containerRef} 
      className="h-screen w-full overflow-hidden relative transition-colors duration-1000"
      style={{ backgroundColor: activeColor.hex }}
    >
      
      {/* Cinematic Lighting Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-black/40 pointer-events-none z-0" />

      {/* Header */}
      <div className="absolute top-0 left-0 w-full p-8 md:p-16 z-30 flex justify-between items-start pointer-events-none">
        <div>
          <h3 className="font-mono text-sm tracking-widest text-white/50 mb-4 uppercase">The Collection</h3>
          <h2 className="font-heading text-4xl md:text-5xl text-white">Bespoke Options</h2>
        </div>
        <div className="text-right hidden md:block">
          <p className="font-mono text-sm tracking-widest text-white/50 uppercase">Scroll to explore</p>
          <p className="font-mono text-xs text-white/30 mt-2">26 Unique Profiles</p>
        </div>
      </div>

      {/* Dynamic Centralized Info Panel (updates based on active index) */}
      <div className="absolute bottom-32 md:bottom-1/2 md:translate-y-1/2 left-8 md:left-16 z-30 pointer-events-none max-w-xs md:max-w-sm transition-all duration-500">
        <div className="overflow-hidden">
          <h1 className="font-heading text-6xl md:text-8xl text-white/10 leading-none mb-[-2rem] ml-[-0.5rem]">
            {STYLES[activeIndex].number}
          </h1>
        </div>
        <div className="backdrop-blur-md bg-white/5 border border-white/10 p-6 md:p-8 rounded-sm">
          <div className="w-12 h-[1px] bg-brand-stone mb-6" />
          <h4 className="font-heading text-2xl md:text-3xl text-white mb-4">
            {STYLES[activeIndex].name}
          </h4>
          <p className="font-body font-light text-white/70 text-sm leading-relaxed">
            {STYLES[activeIndex].description}
          </p>
        </div>
      </div>

      {/* Horizontal Slider containing the 3D Cards */}
      <div className="absolute top-0 left-0 h-full flex items-center z-10 perspective-1000 w-[100vw]">
        {/* We add massive padding to left and right so the first and last items can reach the center of the screen */}
        <div ref={sliderRef} className="flex gap-[15vw] px-[50vw] items-center h-full">
          {STYLES.map((style, i) => (
            <div 
              key={style.id}
              ref={el => cardsRef.current[i] = el}
              onClick={() => setSelectedDoor(style)}
              className="relative w-[30vh] md:w-[40vh] h-[60vh] md:h-[75vh] flex-shrink-0 flex items-center justify-center transform-style-3d cursor-none"
              data-cursor="view"
            >
              {/* Floor Shadow for realism */}
              <div className="absolute bottom-0 w-[80%] h-4 bg-black/60 blur-xl rounded-full transform translate-y-12" />

              {/* The Actual Door Image */}
              <div className="door-image relative w-full h-full transform-style-3d transition-transform duration-100">
                <img 
                  src={style.image} 
                  alt={style.name} 
                  className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative z-10" 
                />
                
                {/* Glare effect */}
                <div className="glare absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 opacity-0 z-20 pointer-events-none mix-blend-overlay rounded-sm" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fixed Bottom Color Palette */}
      <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 z-30 flex flex-col md:flex-row justify-end items-end gap-8">
        <div className="pointer-events-auto bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-full flex items-center gap-6">
          <span className="font-mono text-xs tracking-widest text-white/50 uppercase hidden md:block mr-4">Ambient Finish</span>
          <div className="flex gap-4">
            {COLORS.map((color) => (
              <button
                key={color.id}
                onClick={() => setActiveColor(color)}
                className={`w-10 h-10 rounded-full transition-all duration-500 relative flex items-center justify-center ${
                  activeColor.id === color.id ? 'scale-125 z-10' : 'hover:scale-110 opacity-50 hover:opacity-100'
                }`}
              >
                <div 
                  className="absolute inset-0 rounded-full shadow-inner"
                  style={{ backgroundColor: color.hex }}
                />
                {/* Active Ring */}
                {activeColor.id === color.id && (
                  <div className="absolute inset-[-6px] rounded-full border border-white/40" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <ProductOverlay door={selectedDoor} onClose={() => setSelectedDoor(null)} />
    </section>
  )
}
