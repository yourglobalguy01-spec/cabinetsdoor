import { useState, useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { Magnetic } from '../ui/Magnetic'

const COLORS = [
  { id: 'oak', name: 'Oak', hex: '#C89A62', image: '/images/luxury_kitchen_hero_1785351624417.png' },
  { id: 'walnut', name: 'Walnut', hex: '#6B4F3A', image: '/images/luxury_kitchen_hero_1785351624417.png' },
  { id: 'white', name: 'White', hex: '#FFFFFF', image: '/images/luxury_bathroom_1785351647878.png' },
  { id: 'black', name: 'Black', hex: '#1D1D1D', image: '/images/luxury_wardrobe_1785351636494.png' },
  { id: 'grey', name: 'Stone Grey', hex: '#B7B2A8', image: '/images/luxury_bathroom_1785351647878.png' },
  { id: 'green', name: 'Forest Green', hex: '#2C4C3B', image: '/images/luxury_wardrobe_1785351636494.png' }
]

export function ColourStudio() {
  const [activeColor, setActiveColor] = useState(COLORS[0])
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const prevColorRef = useRef(COLORS[0])

  useLayoutEffect(() => {
    if (activeColor.id !== prevColorRef.current.id) {
      const currentImg = document.querySelector(`.color-img-${activeColor.id}`)
      const prevImg = document.querySelector(`.color-img-${prevColorRef.current.id}`)

      const ctx = gsap.context(() => {
        gsap.set(currentImg, { zIndex: 10, clipPath: 'inset(100% 0% 0% 0%)' })
        gsap.set(prevImg, { zIndex: 1 })
        
        gsap.to(currentImg, {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.2,
          ease: 'power4.inOut',
          onComplete: () => {
            gsap.set(prevImg, { zIndex: 0 })
            prevColorRef.current = activeColor
          }
        })
      }, imageContainerRef)
      
      return () => ctx.revert()
    }
  }, [activeColor])

  return (
    <section className="min-h-screen bg-brand-bg py-32 px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
        
        <div className="w-full lg:w-1/3 flex flex-col z-20 relative">
          <h3 className="font-mono text-sm tracking-widest text-brand-stone mb-8 uppercase">Colour Studio</h3>
          <h2 className="font-heading text-5xl md:text-6xl leading-[1.1] mb-12 text-brand-dark">
            Find the perfect tone for your sanctuary.
          </h2>
          
          <div className="flex flex-col gap-6">
            {COLORS.map((color) => (
              <Magnetic key={color.id}>
                <button
                  onClick={() => setActiveColor(color)}
                  className={`flex items-center gap-6 group transition-all duration-300 ${activeColor.id === color.id ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`}
                >
                  <div 
                    className={`w-12 h-12 rounded-full border transition-all duration-500 group-hover:scale-110 ${activeColor.id === color.id ? 'border-brand-dark shadow-xl scale-110' : 'border-brand-stone/30'}`}
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="font-button text-lg tracking-wider uppercase text-brand-dark">{color.name}</span>
                </button>
              </Magnetic>
            ))}
          </div>
        </div>

        <div 
          className="w-full lg:w-2/3 h-[60vh] lg:h-[80vh] relative overflow-hidden bg-brand-stone/10" 
          ref={imageContainerRef}
          data-cursor="view"
        >
          {COLORS.map((color) => (
            <div
              key={color.id}
              className={`color-img-${color.id} absolute inset-0 w-full h-full ${activeColor.id === color.id ? 'z-1' : 'z-0 opacity-0'}`}
              style={{
                opacity: activeColor.id === color.id || prevColorRef.current.id === color.id ? 1 : 0
              }}
            >
              <img
                src={color.image}
                alt={`${color.name} Kitchen`}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-[10s] ease-out"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
