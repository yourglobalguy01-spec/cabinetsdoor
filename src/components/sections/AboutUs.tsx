import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function AboutUs() {
  const sectionRef = useRef<HTMLElement>(null)
  
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // Parallax Image
      gsap.to('.parallax-bg', {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      })

      // Title reveal
      gsap.from('.title-reveal', {
        yPercent: 100,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
        }
      })

      // Stagger fade for text blocks
      gsap.from('.stagger-fade', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        }
      })

      // Tan Box Reveal
      gsap.from('.tan-box', {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 1.2,
        ease: 'power4.inOut',
        scrollTrigger: {
          trigger: '.tan-box',
          start: 'top 80%',
        }
      })

      // List items stagger inside tan box
      gsap.from('.list-item-reveal', {
        x: -20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.5,
        scrollTrigger: {
          trigger: '.tan-box',
          start: 'top 80%',
        }
      })

    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-brand-bg overflow-hidden w-full text-brand-dark relative z-10">
      <div className="max-w-[1400px] px-4 md:px-12 mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 items-center lg:items-start">
        
        {/* Left: About Text & Image */}
        <div className="flex-1 w-full flex flex-col items-start relative">
          
          <div className="absolute -left-8 md:-left-16 top-[40%] -translate-y-1/2 -rotate-90 origin-center text-brand-oak font-mono tracking-[0.3em] whitespace-nowrap text-sm md:text-lg z-20">
            ABOUT US
          </div>
          <div className="absolute left-0 md:-left-8 top-[40%] w-[1px] h-24 bg-brand-oak z-20"></div>

          {/* Premium Grayscale Image */}
          <div className="relative w-full md:w-[85%] aspect-[4/5] mb-[-15%] md:mb-[-20%] z-0 ml-auto md:ml-8 lg:ml-16 shadow-2xl overflow-hidden">
            <img 
              src="/images/luxury_wardrobe_1785351636494.png" 
              alt="Craftsmanship" 
              className="parallax-bg absolute inset-0 w-full h-[120%] -top-[10%] object-cover grayscale opacity-90" 
            />
            <div className="absolute inset-0 bg-brand-dark/10 mix-blend-overlay"></div>
          </div>

          {/* Dark Overlay Box */}
          <div className="bg-brand-dark text-brand-bg p-8 md:p-14 w-[95%] md:w-[90%] relative z-20 shadow-2xl">
            <h2 className="font-heading text-4xl md:text-5xl text-brand-oak mb-8 overflow-hidden font-light tracking-wide">
              <span className="title-reveal inline-block">WHO WE ARE</span>
            </h2>
            <p className="stagger-fade font-body text-xs leading-[2] uppercase tracking-[0.15em] mb-8 text-brand-bg/90">
              ESTABLISHED IN 2012, MAPLE LEAF DOORS HAS BEEN PROUDLY SERVING THE CANADIAN MARKET WITH PREMIUM THERMOFOIL DOORS AND PANELS THAT COMBINE ELEGANT AESTHETICS WITH LONG-LASTING DURABILITY.
            </p>
            <p className="stagger-fade font-body text-xs leading-[2] uppercase tracking-[0.15em] text-brand-bg/90">
              WITH A REPUTATION BUILT ON QUALITY, RELIABILITY, AND EXCEPTIONAL SERVICE, WE ARE THE TRUSTED CHOICE FOR CABINETMAKERS, DESIGNERS, AND CONTRACTORS ACROSS THE COUNTRY.
            </p>
          </div>
        </div>

        {/* Right: Distinctive Image & List */}
        <div className="flex-1 w-full relative mt-16 lg:mt-32">
          
          <div className="mb-12 pl-6 border-l-[2px] border-brand-oak relative">
            <p className="stagger-fade font-mono text-[10px] tracking-[0.3em] uppercase text-brand-dark/50 mb-3">VISION AND ENJOYMENT</p>
            <h3 className="font-heading text-4xl md:text-5xl uppercase text-brand-dark overflow-hidden leading-[1.1] font-light">
              <span className="title-reveal inline-block">HOW WE</span> <br/>
              <span className="title-reveal inline-block text-brand-dark">ARE DISTINCTIVE</span>
            </h3>
          </div>
          
          <div className="tan-box bg-brand-oak p-10 md:p-14 text-brand-dark font-mono text-xs tracking-wider uppercase leading-relaxed relative shadow-lg">
            <div className="absolute -top-4 left-8 w-6 h-8 bg-brand-dark"></div>
            
            <ul className="flex flex-col gap-8">
              <li className="list-item-reveal">
                <strong className="block mb-2 font-bold text-sm">OVER A DECADE OF EXPERIENCE:</strong>
                TRUSTED BY CANADIAN PROFESSIONALS SINCE 2012.
              </li>
              <li className="list-item-reveal">
                <strong className="block mb-2 font-bold text-sm">CUSTOM MANUFACTURING:</strong>
                WIDE RANGE OF DOOR STYLES, FINISHES, AND SIZES.
              </li>
              <li className="list-item-reveal">
                <strong className="block mb-2 font-bold text-sm">RIGOROUS QUALITY CONTROL:</strong>
                EVERY PIECE IS THOROUGHLY INSPECTED.
              </li>
              <li className="list-item-reveal">
                <strong className="block mb-2 font-bold text-sm">ECO-CONSCIOUS PRODUCTION:</strong>
                SUSTAINABLE MATERIALS AND RESPONSIBLE PRACTICES.
              </li>
              <li className="list-item-reveal">
                <strong className="block mb-2 font-bold text-sm">EXCEPTIONAL SUPPORT:</strong>
                DEDICATED TEAM TO ASSIST WITH EVERY ORDER.
              </li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  )
}
