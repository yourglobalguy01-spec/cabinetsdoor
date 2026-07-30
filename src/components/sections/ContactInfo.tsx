import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function ContactInfo() {
  const sectionRef = useRef<HTMLElement>(null)
  
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger fade for text
      gsap.from('.stagger-fade', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        }
      })
      
      // Floating Collage Parallax
      gsap.to('.float-img-1', {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true }
      })
      
      gsap.to('.float-img-2', {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true }
      })
      
      gsap.to('.float-img-3', {
        yPercent: -40,
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true }
      })

      // Image collage sequential reveal
      gsap.fromTo('.collage-img', 
        { clipPath: 'inset(100% 0 0 0)', scale: 1.1 },
        { 
          clipPath: 'inset(0% 0 0 0)', 
          scale: 1, 
          duration: 1.5, 
          stagger: 0.2, 
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: '.collage-container',
            start: 'top 60%'
          }
        }
      )

    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 md:py-48 bg-brand-bg overflow-hidden w-full text-brand-dark relative">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-brand-dark/10"></div>
      
      <div className="max-w-[1500px] px-4 md:px-8 mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
        
        {/* Left: Contact Details & Text */}
        <div className="flex-1 w-full lg:w-5/12 flex flex-col justify-center lg:pr-12">
          
          {/* Main Story Section */}
          <div className="mb-20">
            <div className="stagger-fade flex items-center gap-4 mb-8">
              <div className="h-[1px] w-8 bg-brand-oak"></div>
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-brand-oak font-bold">OUR APPROACH</span>
            </div>
            
            <h2 className="stagger-fade font-heading text-4xl md:text-5xl lg:text-[3.5rem] text-brand-dark font-light mb-10 leading-[1.1]">
              GETTING TO KNOW <br className="hidden md:block"/> <span className="italic text-brand-oak">EACH OTHER</span>
            </h2>
            
            <div className="font-body text-base lg:text-[17px] leading-[2.2] text-brand-dark/75 font-light flex flex-col gap-6">
              <p className="stagger-fade">
                Let's see if we're a good match. We'll make an appointment to meet and discuss your design objectives, because each client brings us his or her individual wish list. We make sure to listen very carefully. 
              </p>
              <p className="stagger-fade">
                Open communication is crucial to a successful relationship; helping you interpret your wish list is the first step in turning a house into a home.
              </p>
              <p className="stagger-fade text-brand-dark/90 font-normal">
                Now that we've gotten to know each other and defined the scope of work for your project, our creative ideas are flowing and we can't wait to share them with you!
              </p>
            </div>
          </div>

          {/* Contact Details Grid */}
          <div className="stagger-fade pt-12 border-t border-brand-dark/10">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold text-brand-dark/40 mb-10">CONTACT & LOCATION</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-8">
              {/* Reach Out */}
              <div className="flex flex-col gap-3">
                <span className="font-mono text-[10px] text-brand-dark/40 tracking-[0.2em] uppercase">REACH OUT</span>
                <a href="tel:+16476676786" className="font-body text-brand-dark text-lg md:text-xl tracking-wide hover:text-brand-oak transition-colors duration-300">
                  +1 647 667-6786
                </a>
                <a href="mailto:info@mapleleafdoors.com" className="font-body text-brand-dark/70 text-sm tracking-wide hover:text-brand-oak transition-colors duration-300">
                  INFO@MAPLELEAFDOORS.COM
                </a>
              </div>
              
              {/* Visit Studio */}
              <div className="flex flex-col gap-3">
                <span className="font-mono text-[10px] text-brand-dark/40 tracking-[0.2em] uppercase">VISIT STUDIO</span>
                <address className="font-body text-brand-dark/80 text-sm md:text-base not-italic leading-[2] tracking-wide">
                  9#173 Glidden Rd<br/>
                  Brampton, ON L6W3L9
                </address>
              </div>
            </div>
          </div>
          
        </div>

        {/* Right: Floating Collage */}
        <div className="collage-container flex-1 w-full lg:w-7/12 relative mt-16 lg:mt-0 h-[400px] md:h-[600px] lg:h-[800px] flex items-center justify-center">
          
          <div className="absolute w-full h-full inset-0">
            {/* Image 1 */}
            <div className="float-img-1 absolute top-[10%] left-[5%] w-[45%] aspect-[3/4] z-10 shadow-2xl overflow-hidden">
               <img src="/images/luxury_kitchen_hero_1785351624417.png" alt="Retail Display" className="collage-img w-full h-full object-cover" />
            </div>
            
            {/* Image 2 (Hero/Center) */}
            <div className="float-img-2 absolute top-[25%] left-[40%] w-[55%] aspect-square z-20 shadow-2xl overflow-hidden">
               <img src="/images/artisan_crafting_1785351660237.png" alt="Healthcare Facility" className="collage-img w-full h-[110%] -top-[5%] object-cover grayscale opacity-90" />
               <div className="absolute inset-0 bg-brand-dark/30 mix-blend-overlay"></div>
               
               <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-30">
                 <h2 className="stagger-fade font-heading text-4xl md:text-5xl text-brand-bg mb-4 font-light mix-blend-difference">MAPLE LEAF <br/><span className="italic text-brand-oak">DOORS</span></h2>
                 <p className="stagger-fade font-mono text-[9px] md:text-[10px] tracking-[0.4em] text-brand-bg/80 uppercase mb-2 mix-blend-difference">HIGH QUALITY THERMOFOIL DOORS</p>
                 <div className="stagger-fade w-[1px] h-8 bg-brand-oak mt-4"></div>
               </div>
            </div>
            
            {/* Image 3 */}
            <div className="float-img-3 absolute bottom-[10%] left-[20%] w-[35%] aspect-[4/5] z-0 shadow-xl overflow-hidden">
               <img src="/images/luxury_wardrobe_1785351636494.png" alt="Office Furniture" className="collage-img w-full h-full object-cover" />
            </div>
          </div>
          
        </div>

      </div>
    </section>
  )
}
