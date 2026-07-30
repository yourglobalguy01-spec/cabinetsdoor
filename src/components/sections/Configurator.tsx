import { useState, useRef, useLayoutEffect, useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { ProductOverlay } from './ProductOverlay'

gsap.registerPlugin(ScrollTrigger)

const STYLES = [
  { id: 'style-1', number: '01', name: 'Classic Shaker', description: 'Timeless and versatile. The classic shaker profile features a recessed center panel with clean, square edges.', image: '/doors/door-1.png' },
  { id: 'style-2', number: '02', name: 'Slim Shaker', description: 'A modern take on the classic. Ultra-thin stiles and rails provide a sleek, minimalist aesthetic while retaining depth.', image: '/doors/door-2.png' },
  { id: 'style-3', number: '03', name: 'Bevel Edge', description: 'Subtle elegance. A gentle bevel transitions from the frame to the center panel, softening the overall look.', image: '/doors/door-3.png' },
  { id: 'style-4', number: '04', name: 'Stepped Profile', description: 'Architectural detail. Multiple steps create rich shadow lines and a highly sophisticated, dimensional appearance.', image: '/doors/door-4.png' },
  { id: 'style-5', number: '05', name: 'V-Groove', description: 'Rustic charm meets modern precision. Vertical grooves emulate traditional plank doors with flawless consistency.', image: '/doors/door-5.png' },
  { id: 'style-6', number: '06', name: 'Raised Panel', description: 'Traditional craftsmanship. A raised center panel adds formality and depth, perfect for classic and transitional spaces.', image: '/doors/door-6.png' },
  { id: 'style-7', number: '07', name: 'Beadboard', description: 'Coastal and cozy. Fine vertical beaded lines give a textured, cottage-inspired feel to the cabinetry.', image: '/doors/door-7.png' },
  { id: 'style-8', number: '08', name: 'Slab Minimal', description: 'Ultra-modern flat panel. Completely smooth surface for a seamless, European-inspired contemporary design.', image: '/doors/door-8.png' },
  { id: 'style-9', number: '09', name: 'Mitered Frame', description: 'Intricate joints. Precision-cut mitered corners create a continuous frame that beautifully catches the light.', image: '/doors/door-9.png' },
  { id: 'style-10', number: '10', name: 'Ogee Edge', description: 'Curved sophistication. An elegant S-shaped curve on the inner frame edge brings a soft, luxurious touch.', image: '/doors/door-10.png' },
  { id: 'style-11', number: '11', name: 'Wide Frame Shaker', description: 'Bold and substantial. Extra-wide stiles and rails give this shaker a heavy, grounding presence in large spaces.', image: '/doors/door-11.png' },
  { id: 'style-12', number: '12', name: 'Chamfered', description: 'A 45-degree angled cut transitions the frame to the panel, creating a sharp, geometric shadow line.', image: '/doors/door-12.png' },
  { id: 'style-13', number: '13', name: 'Pillow Edge', description: 'Softened aesthetics. The outer edges of the door are gently rounded, creating a pillowed, seamless feel.', image: '/doors/door-13.png' },
  { id: 'style-14', number: '14', name: 'Double Step', description: 'Maximized depth. Two distinct steps down to the center panel create an incredibly rich, luxurious shadow profile.', image: '/doors/door-14.png' },
  { id: 'style-15', number: '15', name: 'Reed Texture', description: 'Vertical reeding across the center panel adds a highly tactile, mid-century modern aesthetic.', image: '/doors/door-15.png' },
  { id: 'style-16', number: '16', name: 'Cove Profile', description: 'A concave scoop along the inner frame softens the transition to the flat center panel.', image: '/doors/door-16.png' },
  { id: 'style-17', number: '17', name: 'Slotted', description: 'Precision-routed horizontal or vertical slots provide an architectural, almost industrial modern look.', image: '/doors/door-17.png' },
  { id: 'style-18', number: '18', name: 'Arch Top', description: 'A gracefully arched upper rail brings a touch of classical, old-world elegance to the design.', image: '/doors/door-18.png' },
  { id: 'style-19', number: '19', name: 'Cathedral', description: 'A traditional cathedral arch on the top rail provides a timeless, highly detailed focal point.', image: '/doors/door-19.png' },
  { id: 'style-20', number: '20', name: 'Inset Shaker', description: 'Designed for inset cabinetry, this profile perfectly mimics the flush, built-in look of high-end millwork.', image: '/doors/door-20.png' },
  { id: 'style-21', number: '21', name: 'Quirk Bead', description: 'A subtle beaded detail paired with a sharp quirk line creates a highly tailored, custom millwork feel.', image: '/doors/door-21.png' },
  { id: 'style-22', number: '22', name: 'Square Flat', description: 'The absolute purest form of a frame-and-panel door, with sharp 90-degree angles and no easing.', image: '/doors/door-22.png' },
  { id: 'style-23', number: '23', name: 'Tapered Edge', description: 'The outer edges taper elegantly towards the back, making the door appear impossibly thin and light.', image: '/doors/door-23.png' },
  { id: 'style-24', number: '24', name: 'Fluted Panel', description: 'Concave fluting across the center panel creates mesmerizing vertical shadows that change throughout the day.', image: '/doors/door-24.png' },
  { id: 'style-25', number: '25', name: 'Applied Moulding', description: 'Intricate moulding applied to the inside edge of the frame adds an extra layer of classical detailing.', image: '/doors/door-25.png' },
  { id: 'style-26', number: '26', name: 'Bespoke Integration', description: 'A fully custom profile featuring integrated hardware pulls seamlessly routed directly into the door edge.', image: '/doors/door-26.png' },
]

// More robust color configuration for realistic blending on wood/white surfaces
const COLORS = [
  { id: 'c1', name: 'Natural Ash', hex: '#E6D8C8', blend: 'multiply', opacity: 0.6 },
  { id: 'c2', name: 'Golden Oak', hex: '#C89A62', blend: 'multiply', opacity: 0.8 },
  { id: 'c3', name: 'Rich Walnut', hex: '#4A3B32', blend: 'multiply', opacity: 0.9 },
  { id: 'c4', name: 'Smoked Ebony', hex: '#1A1817', blend: 'multiply', opacity: 0.95 },
  { id: 'c5', name: 'Matte White', hex: '#FFFFFF', blend: 'overlay', opacity: 0.8 },
  { id: 'c6', name: 'Charcoal', hex: '#2A2A2A', blend: 'multiply', opacity: 0.85 },
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
      cardsRef.current.forEach((card) => {
        if (!card) return
        
        // Setup initial state for non-active cards
        gsap.set(card, { 
          scale: 0.65, 
          opacity: 0.2,
          rotationY: 35,
          z: -200,
          filter: 'brightness(0.5)'
        })

        // Animate based on scroll position
        gsap.to(card, {
          scale: 1,
          opacity: 1,
          rotationY: 0,
          z: 0,
          filter: 'brightness(1)',
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: card,
            containerAnimation: scrollTween,
            start: 'left 65%', 
            end: 'right 35%', 
            scrub: true,
            onEnter: () => gsap.to(card, { scale: 1, opacity: 1, rotationY: 0, filter: 'brightness(1)', duration: 0.5 }),
            onLeave: () => gsap.to(card, { scale: 0.65, opacity: 0.2, rotationY: -35, filter: 'brightness(0.5)', duration: 0.5 }),
            onEnterBack: () => gsap.to(card, { scale: 1, opacity: 1, rotationY: 0, filter: 'brightness(1)', duration: 0.5 }),
            onLeaveBack: () => gsap.to(card, { scale: 0.65, opacity: 0.2, rotationY: 35, filter: 'brightness(0.5)', duration: 0.5 }),
          }
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  // 3D Mouse Tilt effect for the active card
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const activeCard = cardsRef.current[activeIndex]
      if (!activeCard) return

      const rect = activeCard.getBoundingClientRect()
      // Only tilt if mouse is roughly in the center of the screen
      if (e.clientX < window.innerWidth * 0.2 || e.clientX > window.innerWidth * 0.8) return;

      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      
      const rotateX = ((y - centerY) / centerY) * -10 // max 10 deg
      const rotateY = ((x - centerX) / centerX) * 10

      gsap.to(activeCard.querySelector('.door-image'), {
        rotateX,
        rotateY,
        duration: 0.6,
        ease: 'power2.out',
        transformPerspective: 1200
      })
      
      // Dynamic glare
      gsap.to(activeCard.querySelector('.glare'), {
        x: (x / rect.width) * 100 - 50,
        y: (y / rect.height) * 100 - 50,
        opacity: 0.5,
        duration: 0.4
      })
    }

    const handleMouseLeave = () => {
      const activeCard = cardsRef.current[activeIndex]
      if (!activeCard) return
      
      gsap.to(activeCard.querySelector('.door-image'), {
        rotateX: 0,
        rotateY: 0,
        duration: 1.2,
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
      className="h-screen w-full overflow-hidden relative bg-[#0a0a0a]"
    >
      
      {/* Premium Studio Lighting Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(40,40,40,1)_0%,rgba(10,10,10,1)_100%)] pointer-events-none z-0" />
      
      {/* Subtle Color Cast based on active color to illuminate the room slightly */}
      <div 
        className="absolute inset-0 opacity-10 mix-blend-color pointer-events-none z-0 transition-colors duration-1000"
        style={{ backgroundColor: activeColor.hex }}
      />

      {/* Header */}
      <div className="absolute top-0 left-0 w-full p-8 md:p-12 z-30 flex justify-between items-start pointer-events-none">
        <div>
          <h3 className="font-mono text-[10px] tracking-[0.3em] text-white/40 mb-4 uppercase">The Collection</h3>
          <h2 className="font-heading text-4xl md:text-5xl text-white font-light tracking-wide">Bespoke Options</h2>
        </div>
        <div className="text-right hidden md:block mt-2">
          <p className="font-mono text-[10px] tracking-[0.2em] text-[#C89A62] uppercase">Scroll to explore</p>
          <p className="font-mono text-[10px] tracking-[0.1em] text-white/30 mt-2">{STYLES.length} Unique Profiles</p>
        </div>
      </div>

      {/* Dynamic Centralized Info Panel */}
      <div className="absolute top-24 md:top-auto md:bottom-1/2 md:translate-y-1/2 left-4 md:left-16 z-30 pointer-events-none w-[90%] md:w-[350px]">
        <div className="overflow-hidden">
          <h1 className="font-heading text-7xl md:text-9xl text-white/5 leading-none mb-[-1.5rem] md:mb-[-2.5rem] ml-[-0.5rem] font-light">
            {STYLES[activeIndex].number}
          </h1>
        </div>
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-6 md:p-10 rounded-sm shadow-2xl relative overflow-hidden">
          {/* subtle animated glow inside panel */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#C89A62]/20 blur-3xl rounded-full"></div>
          
          <div className="w-12 h-[1px] bg-[#C89A62] mb-6" />
          <h4 className="font-heading text-2xl md:text-3xl text-white mb-4 tracking-wide font-light">
            {STYLES[activeIndex].name}
          </h4>
          <p className="font-mono text-[10px] md:text-xs text-white/50 leading-[2] tracking-wider uppercase">
            {STYLES[activeIndex].description}
          </p>
        </div>
      </div>

      {/* Horizontal Slider containing the 3D Cards */}
      <div className="absolute top-0 left-0 h-full flex items-center z-10 perspective-1000 w-[100vw]">
        {/* Padding allows first and last items to reach the center */}
        <div ref={sliderRef} className="flex gap-[15vw] px-[42.5vw] items-center h-full">
          {STYLES.map((style, i) => (
            <div 
              key={style.id}
              ref={el => { cardsRef.current[i] = el }}
              onClick={() => setSelectedDoor(style)}
              className="relative w-[60vw] md:w-[45vh] h-[50vh] md:h-[75vh] flex-shrink-0 flex items-center justify-center transform-style-3d cursor-pointer group"
              data-cursor="view"
            >
              {/* Floor Shadow for realism */}
              <div className="absolute -bottom-8 w-[90%] h-6 bg-black blur-2xl rounded-full opacity-80" />

              {/* The Actual Door Container */}
              <div className="door-image relative w-full h-full transform-style-3d transition-transform duration-100">
                
                {/* Base Door Image */}
                <img 
                  src={style.image} 
                  alt={style.name} 
                  className="w-full h-full object-contain relative z-10 drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]" 
                />
                
                {/* Realistic Color Blend Overlays mask-image ensures the blend only applies to the door shape if the image has a transparent background */}
                <div 
                  className="absolute inset-0 z-20 pointer-events-none transition-all duration-1000"
                  style={{ 
                    backgroundColor: activeColor.hex,
                    mixBlendMode: activeColor.blend as any,
                    opacity: activeColor.opacity,
                    maskImage: `url(${style.image})`,
                    maskSize: 'contain',
                    maskRepeat: 'no-repeat',
                    maskPosition: 'center',
                    WebkitMaskImage: `url(${style.image})`,
                    WebkitMaskSize: 'contain',
                    WebkitMaskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'center'
                  }} 
                />
                
                {/* Secondary color blend to bring out details when darkened or lightened */}
                <div 
                  className="absolute inset-0 z-20 pointer-events-none transition-all duration-1000 opacity-40 mix-blend-color"
                  style={{ 
                    backgroundColor: activeColor.hex,
                    maskImage: `url(${style.image})`,
                    maskSize: 'contain',
                    maskRepeat: 'no-repeat',
                    maskPosition: 'center',
                    WebkitMaskImage: `url(${style.image})`,
                    WebkitMaskSize: 'contain',
                    WebkitMaskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'center'
                  }} 
                />

                {/* Extra realistic studio lighting layer */}
                <div 
                  className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-tr from-black/40 via-transparent to-white/15 mix-blend-overlay"
                  style={{
                    maskImage: `url(${style.image})`,
                    maskSize: 'contain',
                    maskRepeat: 'no-repeat',
                    maskPosition: 'center',
                    WebkitMaskImage: `url(${style.image})`,
                    WebkitMaskSize: 'contain',
                    WebkitMaskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'center'
                  }}
                />

                {/* Glare effect */}
                <div 
                  className="glare absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 opacity-0 z-30 pointer-events-none mix-blend-overlay"
                  style={{
                    maskImage: `url(${style.image})`,
                    maskSize: 'contain',
                    maskRepeat: 'no-repeat',
                    maskPosition: 'center',
                    WebkitMaskImage: `url(${style.image})`,
                    WebkitMaskSize: 'contain',
                    WebkitMaskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'center'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fixed Bottom Color Palette */}
      <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-30 flex flex-col md:flex-row justify-end items-end md:items-center gap-6 pointer-events-none">
        <div className="pointer-events-auto backdrop-blur-2xl bg-black/60 border border-white/10 px-8 py-4 rounded-full flex items-center gap-8 shadow-2xl">
          <span className="font-mono text-[10px] tracking-[0.3em] text-white/50 uppercase hidden md:block">Ambient Finish</span>
          <div className="w-[1px] h-6 bg-white/10 hidden md:block"></div>
          <div className="flex gap-4 md:gap-5">
            {COLORS.map((color) => (
              <button
                key={color.id}
                onClick={() => setActiveColor(color)}
                className={`w-8 h-8 md:w-10 md:h-10 rounded-full transition-all duration-500 relative flex items-center justify-center group ${
                  activeColor.id === color.id ? 'scale-125 z-10' : 'hover:scale-110 opacity-60 hover:opacity-100'
                }`}
                title={color.name}
              >
                <div 
                  className="absolute inset-0 rounded-full shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] border border-white/20"
                  style={{ backgroundColor: color.hex }}
                />
                {/* Active Ring */}
                {activeColor.id === color.id && (
                  <div className="absolute inset-[-6px] rounded-full border border-[#C89A62]/60" />
                )}
                {/* Tooltip */}
                <span className="absolute -top-10 scale-0 group-hover:scale-100 transition-transform bg-black/80 text-white text-[9px] px-2 py-1 rounded font-mono tracking-wider whitespace-nowrap border border-white/10">
                  {color.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <ProductOverlay door={selectedDoor} onClose={() => setSelectedDoor(null)} />
    </section>
  )
}
