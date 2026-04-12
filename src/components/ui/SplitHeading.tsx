'use client'

import React, { useLayoutEffect, useRef } from 'react'
import SplitType from 'split-type'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { cn } from '@/lib/utils'

interface SplitHeadingProps {
  children: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  delay?: number
}

export function SplitHeading({
  children,
  className,
  as: Component = 'h2',
  delay = 0
}: SplitHeadingProps) {
  const headingRef = useRef<HTMLHeadingElement>(null)

  useLayoutEffect(() => {
    const el = headingRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      const text = new SplitType(el, { types: 'chars,words' })

      gsap.set(text.chars, {
        display: 'inline-block',
        willChange: 'transform, opacity',
      })

      gsap.from(text.chars, {
        yPercent: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.02,
        ease: 'power4.out',
        delay,
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      })

      ScrollTrigger.refresh()

      return () => {
        text.revert()
      }
    }, el)

    return () => ctx.revert()
  }, [children, delay])

  return (
    <Component
      ref={headingRef}
      className={cn("overflow-hidden leading-tight py-1", className)}
    >
      {children}
    </Component>
  )
}
