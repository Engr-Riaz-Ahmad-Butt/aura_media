'use client'

import { useLayoutEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export function useScrollReveal(options: { 
  y?: number, 
  x?: number, 
  opacity?: number, 
  duration?: number, 
  delay?: number, 
  stagger?: number, 
  trigger?: string | HTMLElement 
} = {}) {
  const revealRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = revealRef.current
    if (!el) return

    const { 
      y = 50, 
      x = 0, 
      opacity = 0, 
      duration = 1.2, 
      delay = 0, 
      stagger = 0.1, 
      trigger 
    } = options

    const ctx = gsap.context(() => {
      gsap.fromTo(el.children, 
        { y, x, opacity },
        { 
          y: 0, 
          x: 0, 
          opacity: 1, 
          duration, 
          delay, 
          stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: trigger || el,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }, el)

    return () => {
      ctx.revert()
    }
  }, [options])

  return revealRef
}
