import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Subtle parallax on the background image
      gsap.to(imageRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      })

      // Fade out and move text up slightly on scroll
      gsap.to(textRef.current, {
        y: -50,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-brand-dark">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <img 
          ref={imageRef}
          src="/images/luxury_kitchen_hero_1785351624417.png" 
          alt="Luxury Kitchen Interior" 
          className="w-full h-[120%] object-cover object-center transform -translate-y-[10%]"
        />
        {/* Subtle dark gradient overlay to ensure text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/40 via-transparent to-brand-dark/60" />
      </div>

      {/* Content */}
      <div ref={textRef} className="relative z-10 w-full h-full flex flex-col justify-end items-center pb-32 px-8 text-white">
        <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl tracking-tight text-center mb-6">
          The Art of Living.
        </h1>
        <p className="font-body font-light text-lg md:text-xl text-brand-stone max-w-2xl text-center">
          Bespoke cabinetry and architectural woodwork, crafted for the world's most discerning interiors.
        </p>
      </div>
    </section>
  )
}
