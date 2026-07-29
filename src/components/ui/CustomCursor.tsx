import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState('default')

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      })
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName.toLowerCase() === 'button' || target.closest('button')) {
        setCursorVariant('button')
      } else if (target.tagName.toLowerCase() === 'a' || target.closest('a')) {
        setCursorVariant('link')
      } else if (target.hasAttribute('data-cursor')) {
        setCursorVariant(target.getAttribute('data-cursor') || 'default')
      } else {
        setCursorVariant('default')
      }
    }

    window.addEventListener('mousemove', mouseMove)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', mouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1,
      backgroundColor: 'transparent',
      border: '1px solid rgba(29, 29, 29, 0.5)',
      mixBlendMode: 'difference' as const,
    },
    button: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1.5,
      backgroundColor: 'rgba(29, 29, 29, 0.1)',
      border: '1px solid rgba(29, 29, 29, 0)',
      mixBlendMode: 'normal' as const,
    },
    link: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1.5,
      backgroundColor: 'transparent',
      border: '1px solid rgba(29, 29, 29, 1)',
      mixBlendMode: 'difference' as const,
    },
    view: {
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      scale: 1,
      backgroundColor: '#1D1D1D',
      border: 'none',
      mixBlendMode: 'normal' as const,
      color: '#F7F5F2',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }
  }

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] flex items-center justify-center text-[10px] font-mono tracking-widest uppercase hidden md:flex"
      variants={variants}
      animate={cursorVariant}
      transition={{ type: 'tween', ease: 'backOut', duration: 0.15 }}
    >
      {cursorVariant === 'view' ? 'View' : ''}
    </motion.div>
  )
}
