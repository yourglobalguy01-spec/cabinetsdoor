import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface MenuOverlayProps {
  isOpen: boolean
  onClose: () => void
}

const MENU_ITEMS = [
  { label: 'Home', id: 'home' },
  { label: 'About Us', id: 'about' },
  { label: 'Collections', id: 'collections' },
  { label: 'Applications', id: 'applications' },
  { label: 'Colour Studio', id: 'colour-studio' },
  { label: 'Bespoke Options', id: 'bespoke-options' },
  { label: 'Selected Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' },
]

export function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([])
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      
      gsap.to(overlayRef.current, {
        clipPath: 'circle(150% at 100% 0%)',
        duration: 1,
        ease: 'power3.inOut'
      })
      
      gsap.fromTo(linksRef.current, 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, delay: 0.3, ease: 'power3.out' }
      )
    } else {
      document.body.style.overflow = 'auto'
      
      gsap.to(overlayRef.current, {
        clipPath: 'circle(0% at 100% 0%)',
        duration: 0.8,
        ease: 'power3.inOut'
      })
    }
  }, [isOpen])

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    onClose()
    
    // Scroll to the element after a brief delay to allow menu closing animation
    setTimeout(() => {
      const el = document.getElementById(id)
      if (el) {
        // Find position
        const y = el.getBoundingClientRect().top + window.scrollY
        window.scrollTo({ top: y, behavior: 'smooth' })
      }
    }, 600)
  }

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 bg-brand-dark z-[100] flex flex-col px-8 md:px-24 pointer-events-auto h-[100dvh] overflow-hidden"
      style={{ clipPath: 'circle(0% at 100% 0%)' }}
    >
      {/* Header section in normal flow but visually matches */}
      <div className="w-full py-8 md:py-12 flex justify-between items-center flex-shrink-0">
        <div className="font-heading text-xl md:text-2xl tracking-widest uppercase text-brand-bg">
          Maple Leaf Doors
        </div>
        <button 
          onClick={onClose}
          className="font-button text-sm uppercase tracking-wider text-brand-bg hover:text-brand-oak transition-colors p-2"
        >
          Close
        </button>
      </div>

      {/* Scrollable container for links if screen is too small, but ideally centers them */}
      <div className="flex-1 flex flex-col justify-center overflow-y-auto overflow-x-hidden no-scrollbar pb-8">
        <nav className="flex flex-col gap-3 md:gap-5">
          {MENU_ITEMS.map((item, i) => (
            <a
              key={item.id}
              ref={el => { linksRef.current[i] = el }}
              href={`#${item.id}`}
              onClick={(e) => handleScroll(e, item.id)}
              className="font-heading text-3xl md:text-4xl lg:text-5xl text-brand-bg hover:text-brand-oak transition-colors w-max uppercase tracking-wide font-light py-1"
            >
              {item.label}
            </a>
          ))}
        </nav>
        
        {/* Footer info in normal flow so it doesn't overlap */}
        <div className="mt-12 lg:mt-auto pt-8 font-mono text-[10px] tracking-widest uppercase text-brand-bg/50">
          <p>Premium Thermofoil Doors</p>
          <p className="mt-2">&copy; {new Date().getFullYear()} Maple Leaf Doors</p>
        </div>
      </div>
    </div>
  )
}
