'use client'

import React, { useRef, useState, useEffect } from 'react'
import { HTMLMotionProps, motion } from 'framer-motion'

interface MagneticWrapperProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode
  className?: string
}

export function MagneticButton({ children, className, ...props }: MagneticWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isTouch, setIsTouch] = useState(true)

  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches)
  }, [])

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch || !ref.current) return
    const { clientX, clientY } = e
    const { height, width, left, top } = ref.current.getBoundingClientRect()
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 })
  }

  const reset = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={isTouch ? { x: 0, y: 0 } : { x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`block ${className || ''}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}
