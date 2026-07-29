import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 1
      })
    }, 20)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (progress === 100) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          onComplete: onComplete
        })
        
        tl.to(textRef.current, {
          opacity: 0,
          y: -20,
          duration: 1,
          ease: "power2.inOut"
        })
        .to(containerRef.current, {
          opacity: 0,
          duration: 1.5,
          ease: "power2.inOut"
        })
      })
      
      return () => ctx.revert()
    }
  }, [progress, onComplete])

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-brand-dark flex flex-col items-center justify-center text-white"
    >
      <div ref={textRef} className="flex flex-col items-center">
        <h1 className="font-heading text-3xl tracking-widest uppercase mb-4 text-center">Maple Leaf Doors</h1>
        <div className="font-mono text-sm text-brand-stone">{progress}%</div>
      </div>
    </div>
  )
}
