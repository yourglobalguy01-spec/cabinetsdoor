import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function OurStory() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title in
      gsap.fromTo(titleRef.current, 
        { y: 100, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1.2, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          }
        }
      )

      // Animate text block in
      gsap.fromTo(textRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          }
        }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 md:py-48 px-4 md:px-8 bg-brand-bg text-brand-dark overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col gap-12 md:gap-24">
        
        {/* Top Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          <div className="lg:col-span-7">
            <h3 className="font-mono text-sm tracking-widest text-brand-stone mb-12 uppercase">Our Story</h3>
            <div className="overflow-hidden">
              <h2 ref={titleRef} className="font-heading text-4xl md:text-7xl lg:text-8xl leading-[1.1] text-brand-dark tracking-tight">
                A legacy of fine craftsmanship meeting modern innovation.
              </h2>
            </div>
          </div>
          
          <div className="lg:col-span-5 lg:mt-32" ref={textRef}>
            <div className="font-body text-xl md:text-2xl font-light leading-relaxed text-brand-dark/80 flex flex-col gap-8">
              <p>
                Every piece we create is born from a deep respect for natural materials and a relentless pursuit of perfection. Our master artisans blend traditional techniques with state-of-the-art precision.
              </p>
              <p>
                We believe your living space should be a reflection of your finest tastes, uncompromising in both form and function. It is not just about building cabinets; it is about crafting environments that inspire.
              </p>
            </div>
            
            <div className="mt-12">
              <button className="group flex items-center gap-4 font-button uppercase tracking-widest text-sm hover:text-brand-oak transition-colors">
                <span>Discover the process</span>
                <span className="w-12 h-[1px] bg-brand-dark group-hover:bg-brand-oak transition-colors" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
