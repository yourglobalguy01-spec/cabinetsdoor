import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

interface PreloaderProps {
  onComplete: () => void
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Prevent scrolling during preloader
    document.body.style.overflow = 'hidden'

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = ''
        onComplete()
      }
    })

    // 1. Initial reveal of the text elements
    tl.fromTo(
      textRef.current?.children as HTMLCollection,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power4.out' }
    )

    // 2. Animate the progress bar and counter simultaneously
    tl.to(progressBarRef.current, {
      scaleX: 1,
      duration: 2.5,
      ease: 'power3.inOut'
    }, "-=0.5")

    // Update counter using a dummy object for GSAP
    const counterObj = { val: 0 }
    tl.to(counterObj, {
      val: 100,
      duration: 2.5,
      ease: 'power3.inOut',
      onUpdate: () => {
        setProgress(Math.round(counterObj.val))
      }
    }, "-=2.5")

    // 3. Slide everything up slightly to fade out
    tl.to([textRef.current, counterRef.current, progressBarRef.current], {
      y: -50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.inOut',
      stagger: 0.1
    }, "+=0.2")

    // 4. Slide the preloader container itself out of the viewport
    tl.to(containerRef.current, {
      yPercent: -100,
      duration: 1.2,
      ease: 'power4.inOut'
    })

    return () => {
      document.body.style.overflow = ''
      tl.kill()
    }
  }, [onComplete])

  const words = ['MAPLE', 'LEAF', 'DOORS']

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-brand-dark text-white flex flex-col items-center justify-between p-8 md:p-16 overflow-hidden"
    >
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <div className="overflow-hidden" ref={textRef}>
          {words.map((word, index) => (
            <span 
              key={index} 
              className="inline-block font-heading text-5xl md:text-8xl lg:text-[10rem] leading-none tracking-tight mr-4 md:mr-8 last:mr-0 text-brand-stone"
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      <div className="w-full max-w-7xl flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
        <div 
          ref={counterRef}
          className="font-mono text-5xl md:text-8xl text-brand-stone/50 font-light"
        >
          {progress.toString().padStart(3, '0')}
          <span className="text-2xl md:text-4xl">%</span>
        </div>

        <div className="w-full md:w-1/2 h-[2px] bg-brand-stone/20 relative overflow-hidden">
          <div 
            ref={progressBarRef}
            className="absolute top-0 left-0 h-full w-full bg-brand-stone origin-left"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>
      </div>
    </div>
  )
}
