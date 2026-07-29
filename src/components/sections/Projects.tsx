import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  { id: 1, name: 'Nawaabs', location: 'Commercial Project', year: '2025', image: '/images/luxury_kitchen_hero_1785351624417.png' },
  { id: 2, name: 'Rajdhani Sweets', location: 'Commercial Project', year: '2024', image: '/images/luxury_wardrobe_1785351636494.png' },
  { id: 3, name: 'Beauty Addix', location: 'Commercial Project', year: '2025', image: '/images/luxury_bathroom_1785351647878.png' },
]

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const wrapper = wrapperRef.current!
      
      // The main horizontal scrolling timeline
      const scrollTween = gsap.to(wrapper, {
        x: () => -(wrapper.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${wrapper.scrollWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      })

      // Image internal parallax
      gsap.utils.toArray('.project-image').forEach((img: any) => {
        gsap.to(img, {
          xPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: img.parentElement,
            containerAnimation: scrollTween,
            start: 'left right',
            end: 'right left',
            scrub: true,
          }
        })
      })
      
      // Title parallax (moves faster than the card)
      gsap.utils.toArray('.project-title').forEach((title: any) => {
        gsap.to(title, {
          x: 150,
          ease: 'none',
          scrollTrigger: {
            trigger: title.parentElement.parentElement,
            containerAnimation: scrollTween,
            start: 'left right',
            end: 'right left',
            scrub: true,
          }
        })
      })

    })

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="h-screen bg-brand-dark text-white overflow-hidden flex flex-col justify-center relative">
      
      {/* Absolute Header for context */}
      <div className="absolute top-16 left-8 md:left-16 z-20 pointer-events-none">
        <h3 className="font-mono text-sm tracking-widest text-brand-stone uppercase">Selected Projects</h3>
      </div>

      <div ref={wrapperRef} className="flex h-[70vh] md:h-[80vh] w-[max-content] items-center px-[10vw] gap-[15vw]">
        {PROJECTS.map((project, i) => (
          <div key={project.id} className="relative w-[80vw] md:w-[60vw] h-[60vh] md:h-[70vh] flex-shrink-0 flex items-center">
            
            {/* The Image Container - Masked */}
            <div 
              className="relative w-full md:w-[70%] h-full overflow-hidden group cursor-pointer ml-auto"
              data-cursor="view"
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700 z-10" />
              {/* The Image - Scaled up for parallax room */}
              <img 
                src={project.image} 
                alt={project.name} 
                className="project-image absolute top-0 left-[-20%] w-[140%] h-full object-cover"
              />
            </div>

            {/* Typography - Overlapping the image elegantly */}
            <div className="absolute left-0 bottom-[10%] md:bottom-[20%] z-20 pointer-events-none w-full">
              <div className="flex flex-col gap-4">
                <span className="font-mono text-xs md:text-sm tracking-widest text-brand-stone uppercase flex gap-4 items-center">
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  <span className="w-8 h-[1px] bg-brand-stone" />
                  <span>{project.location}</span>
                </span>
                
                <div className="overflow-visible">
                  <h2 className="project-title font-heading text-5xl md:text-7xl lg:text-9xl text-white tracking-tight leading-[0.9] whitespace-nowrap drop-shadow-2xl">
                    {project.name}
                  </h2>
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  )
}
