'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'

export function useMagnet() {
  const magnetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = magnetRef.current
    if (!el) return

    const moveMagnet = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { left, top, width, height } = el.getBoundingClientRect()
      
      const centerX = left + width / 2
      const centerY = top + height / 2

      const deltaX = clientX - centerX
      const deltaY = clientY - centerY

      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
      const maxDistance = 100 // Strength of magnet area

      if (distance < maxDistance) {
        gsap.to(el, {
          x: deltaX * 0.4,
          y: deltaY * 0.4,
          duration: 0.6,
          ease: 'power3.out'
        })
      } else {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.8,
          ease: 'elastic.out(1, 0.3)'
        })
      }
    }

    const resetMagnet = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.3)'
      })
    }

    window.addEventListener('mousemove', moveMagnet)
    el.addEventListener('mouseleave', resetMagnet)

    return () => {
      window.removeEventListener('mousemove', moveMagnet)
      el.removeEventListener('mouseleave', resetMagnet)
    }
  }, [])

  return magnetRef
}
