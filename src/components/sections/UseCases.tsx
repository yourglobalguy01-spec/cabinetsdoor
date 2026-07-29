import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function UseCases() {
  const sectionRef = useRef<HTMLElement>(null)
  
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal
      gsap.from('.title-reveal', {
        yPercent: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
      })

      // Image reveals with clip-path
      gsap.utils.toArray<HTMLElement>('.image-reveal-wrapper').forEach((wrapper) => {
        const img = wrapper.querySelector('img')
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapper,
            start: 'top 85%',
          }
        })
        tl.fromTo(wrapper, 
          { clipPath: 'inset(100% 0 0 0)' }, 
          { clipPath: 'inset(0% 0 0 0)', duration: 1.5, ease: 'power4.inOut' }
        )
        if (img) {
          tl.fromTo(img, 
            { scale: 1.3 }, 
            { scale: 1, duration: 1.5, ease: 'power4.inOut' }, 
            '<'
          )
        }
      })

      // Stagger numbered list lines
      gsap.utils.toArray('.num-list-item').forEach((item: any, i) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: '.num-list-container',
            start: 'top 75%',
          }
        })
        tl.fromTo(item.querySelector('.num-line'),
          { scaleY: 0, transformOrigin: 'top' },
          { scaleY: 1, duration: 0.8, ease: 'power3.inOut', delay: i * 0.15 }
        )
        tl.fromTo(item.querySelectorAll('.num-content'),
          { x: -20, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.1 },
          "-=0.4"
        )
      })

      // Subtitle fade
      gsap.from('.subtitle-fade', {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.3,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
      })
      
      // Parallax text
      gsap.to('.parallax-text', {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 md:py-48 bg-white overflow-hidden w-full text-brand-dark">
      <div className="max-w-[1600px] px-4 md:px-12 mx-auto flex flex-col xl:flex-row gap-16 xl:gap-24 items-center xl:items-start">
        
        {/* Left: Become Inspired Images */}
        <div className="flex-1 w-full xl:w-5/12 flex flex-col">
          <div className="mb-16">
            <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl font-light tracking-wide mb-6 uppercase text-brand-dark overflow-hidden leading-[1.1]">
              <span className="title-reveal inline-block">BECOME</span><br/>
              <span className="title-reveal inline-block italic text-brand-oak pr-4">INSPIRED</span>
            </h2>
            <p className="subtitle-fade font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase text-brand-dark/50 leading-[2] max-w-sm">
              Let us take your project to the next level and unleash the possibilities.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-12 relative">
            {[
              { img: '/images/hospitality_cabinetry_1785361934418.png', title: 'HOSPITALITY INDUSTRY' },
              { img: '/images/healthcare_cabinetry_1785361948684.png', title: 'HEALTHCARE FACILITY' },
              { img: '/images/retail_cabinetry_1785361964343.png', title: 'RETAIL DISPLAYS', offset: true },
              { img: '/images/office_cabinetry_1785361975902.png', title: 'OFFICE FURNITURE' }
            ].map((item, i) => (
              <div key={i} className={`flex flex-col gap-4 ${item.offset ? 'mt-12' : ''}`}>
                <div className="image-reveal-wrapper relative aspect-[3/4] group overflow-hidden">
                  <div className="absolute inset-0 bg-brand-bg/50"></div>
                  <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover z-10 filter hover:brightness-110 transition-all duration-700" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-[1px] bg-brand-oak"></div>
                  <h4 className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-brand-dark/80">{item.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Use Cases Info */}
        <div className="flex-1 w-full xl:w-7/12 bg-brand-bg p-8 md:p-16 lg:p-24 text-brand-dark flex flex-col justify-between mt-12 xl:mt-24 relative shadow-xl">
          <div className="absolute -top-12 -right-12 text-[150px] font-heading font-light opacity-5 text-brand-dark select-none pointer-events-none parallax-text">
            APPLICATIONS
          </div>
          
          <div className="relative z-10">
            <h3 className="font-heading text-4xl md:text-5xl font-light mb-4 overflow-hidden">
              <span className="title-reveal inline-block">USE CASES</span>
            </h3>
            <p className="subtitle-fade font-mono text-xs tracking-[0.3em] uppercase mb-20 text-brand-oak">OF THERMOFOIL PANELS</p>

            <div className="num-list-container grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
              {[
                { num: '01', title: 'RETAIL DISPLAYS', desc: 'SHELVING, DISPLAY WALLS, AND COUNTERS' },
                { num: '02', title: 'HEALTHCARE FACILITIES', desc: 'HYGIENIC, EASY TO CLEAN SURFACE' },
                { num: '03', title: 'HOSPITALITY INDUSTRY', desc: 'FURNITURE, LAYOUT TREATMENT DESIGN' },
                { num: '04', title: 'OFFICE FURNITURE', desc: 'ACQUISITION OF ACCESSORIES' }
              ].map((item, i) => (
                <div key={i} className="num-list-item flex gap-6 relative">
                  <div className="num-line w-[1px] h-full bg-brand-oak absolute left-0 top-0"></div>
                  <div className="pl-6 flex flex-col gap-2">
                    <span className="num-content font-heading text-4xl md:text-5xl text-brand-oak/20 leading-none">{item.num}</span>
                    <h5 className="num-content font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] leading-tight text-brand-dark mt-2">{item.title}</h5>
                    <p className="num-content font-mono text-[9px] uppercase tracking-wider text-brand-dark/50 leading-relaxed mt-2">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-32 w-full border-t border-brand-dark/10 pt-12 flex justify-between items-center subtitle-fade relative z-10">
            <p className="font-mono text-[9px] tracking-[0.4em] font-bold uppercase text-brand-dark/40">
              INNOVATE
            </p>
            <div className="w-1 h-1 rounded-full bg-brand-oak"></div>
            <p className="font-mono text-[9px] tracking-[0.4em] font-bold uppercase text-brand-dark/40">
              MODERN
            </p>
            <div className="w-1 h-1 rounded-full bg-brand-oak"></div>
            <p className="font-mono text-[9px] tracking-[0.4em] font-bold uppercase text-brand-dark/40">
              LUXURY
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
