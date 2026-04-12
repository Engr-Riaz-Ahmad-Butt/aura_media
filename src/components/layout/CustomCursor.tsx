'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Don't show on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const cursor = cursorRef.current
    const follower = followerRef.current
    if (!cursor || !follower) return

    // Standard easing for mouse tracking aiming for tactical feel
    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1, ease: 'power2.out' })
      gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.6, ease: 'power3.out' })
    }

    // Interactive element hover
    const onMouseEnter = () => {
      gsap.to(cursor, { scale: 0.5, duration: 0.3 })
      gsap.to(follower, { scale: 2.5, backgroundColor: 'rgba(201, 168, 76, 0.1)', borderColor: '#C9A84C', duration: 0.3 })
    }

    const onMouseLeave = () => {
      gsap.to(cursor, { scale: 1, duration: 0.3 })
      gsap.to(follower, { scale: 1, backgroundColor: 'transparent', borderColor: '#8A8478', duration: 0.3 })
    }

    window.addEventListener('mousemove', onMouseMove)

    // Attach to links and buttons dynamically
    const interactables = document.querySelectorAll('a, button, input, [data-interactive]')
    interactables.forEach(el => {
      el.addEventListener('mouseenter', onMouseEnter)
      el.addEventListener('mouseleave', onMouseLeave)
    })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      interactables.forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnter)
        el.removeEventListener('mouseleave', onMouseLeave)
      })
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="hidden md:block fixed top-0 left-0 w-2 h-2 bg-silk rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 will-change-transform mix-blend-difference"
      />
      <div
        ref={followerRef}
        className="hidden md:block fixed top-0 left-0 w-8 h-8 border border-silk-muted rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 will-change-transform transition-colors duration-300 mix-blend-difference"
      />
    </>
  )
}
