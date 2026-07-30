import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { X, ChevronRight } from 'lucide-react'

interface Door {
  id: string
  number: string
  name: string
  description: string
  image: string
}

interface ProductOverlayProps {
  door: Door | null
  onClose: () => void
}

const FINISHES = [
  { id: 'f1', name: 'Thunder Black Glaze', hex: '#1C1C1C' },
  { id: 'f2', name: 'Rustic Alder', hex: '#C89A62' },
  { id: 'f3', name: 'Matte White', hex: '#F0F0F0' },
  { id: 'f4', name: 'Stone Grey', hex: '#8B8C89' },
]

const GALLERY_IMAGES = [
  '/images/luxury_kitchen_hero_1785351624417.png',
  '/images/luxury_wardrobe_1785351636494.png',
  '/images/luxury_bathroom_1785351647878.png'
]

export function ProductOverlay({ door, onClose }: ProductOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [activeFinish, setActiveFinish] = useState(FINISHES[0])

  useEffect(() => {
    if (door) {
      document.body.style.overflow = 'hidden'
      
      const ctx = gsap.context(() => {
        gsap.fromTo(overlayRef.current, 
          { clipPath: 'circle(0% at 50% 50%)', backgroundColor: 'rgba(0,0,0,0)' },
          { 
            clipPath: 'circle(150% at 50% 50%)', 
            backgroundColor: 'rgba(0,0,0,0.9)', 
            duration: 0.8, 
            ease: 'power3.inOut' 
          }
        )

        gsap.fromTo(contentRef.current,
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, delay: 0.4, ease: 'power3.out' }
        )
      })

      return () => {
        document.body.style.overflow = 'auto'
        ctx.revert()
      }
    }
  }, [door])

  const handleClose = () => {
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.inOut',
      onComplete: onClose
    })
  }

  if (!door) return null

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-[100] overflow-y-auto custom-scrollbar"
      style={{ backgroundColor: activeFinish.hex }} // Ambient background changes based on finish
    >
      
      {/* Background Vignette */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] z-0" />
      <div className="fixed inset-0 pointer-events-none bg-black/40 z-0 backdrop-blur-2xl" />

      {/* Close Button */}
      <button 
        onClick={handleClose}
        className="fixed top-8 right-8 z-50 p-4 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-colors border border-white/20 group"
      >
        <X className="w-6 h-6 text-white transform group-hover:rotate-90 transition-transform duration-300" />
      </button>

      {/* Main Content Container */}
      <div ref={contentRef} className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-32 min-h-screen">
        
        {/* Top Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center mb-32">
          
          {/* Left: Huge Door Render */}
          <div className="relative h-[60vh] md:h-[80vh] flex items-center justify-center">
            <div className="absolute inset-0 bg-white/5 rounded-full filter blur-[100px] pointer-events-none" />
            <img 
              src={door.image} 
              alt={door.name}
              className="relative z-10 w-full h-full object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
            />
          </div>

          {/* Right: Product Details & Config */}
          <div className="flex flex-col gap-12 text-white">
            <div>
              <div className="font-mono text-sm tracking-widest text-white/50 mb-6 uppercase flex items-center gap-4">
                <span>The Collection</span>
                <span className="w-8 h-[1px] bg-white/30" />
                <span>{door.number}</span>
              </div>
              <h1 className="font-heading text-4xl md:text-7xl mb-6">{door.name}</h1>
              <p className="font-body font-light text-xl text-white/70 leading-relaxed max-w-lg">
                {door.description}
              </p>
            </div>

            {/* Finish Selector */}
            <div className="border-t border-white/10 pt-12">
              <h3 className="font-mono text-sm tracking-widest text-white/50 uppercase mb-6">
                Available Finishes: {activeFinish.name}
              </h3>
              <div className="flex flex-wrap gap-4">
                {FINISHES.map((finish) => (
                  <button
                    key={finish.id}
                    onClick={() => setActiveFinish(finish)}
                    className={`w-14 h-14 rounded-full transition-all duration-300 relative ${
                      activeFinish.id === finish.id ? 'scale-110' : 'hover:scale-110 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <div 
                      className="absolute inset-0 rounded-full shadow-inner"
                      style={{ backgroundColor: finish.hex }}
                    />
                    {activeFinish.id === finish.id && (
                      <div className="absolute inset-[-6px] rounded-full border border-white/40" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Premium CTA */}
            <div className="pt-8">
              <button className="group relative overflow-hidden bg-white text-brand-dark px-12 py-6 rounded-none w-full md:w-auto">
                <span className="relative z-10 font-button tracking-widest text-sm uppercase flex items-center justify-center gap-4">
                  Request a Quote
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-brand-stone transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />
              </button>
            </div>

          </div>
        </div>

        {/* Bottom Section: See In Real Space */}
        <div className="border-t border-white/10 pt-32">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl text-white mb-4">See in Real Space</h2>
            <p className="font-body font-light text-white/50">Explore how {door.name} elevates luxury interiors.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {GALLERY_IMAGES.map((img, idx) => (
              <div key={idx} className="group relative overflow-hidden h-[40vh] md:h-[50vh] cursor-pointer" data-cursor="view">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img 
                  src={img} 
                  alt={`Installation ${idx + 1}`}
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-1000"
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
