'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function LoadingScreen() {
  const [shouldRender, setShouldRender] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Check if already loaded in this session
    const hasLoaded = sessionStorage.getItem('hasLoaded')
    if (hasLoaded) {
      // Use microtask/timeout to avoid sync setState in effect
      setTimeout(() => setShouldRender(false), 0)
      return
    }

    // Animation timing logic
    const timer = setTimeout(() => {
      setIsLoaded(true)
      sessionStorage.setItem('hasLoaded', 'true')
    }, 1800) // Match the 1.8s duration

    const removeTimer = setTimeout(() => {
      setShouldRender(false)
    }, 2400) // 1.8s + 0.6s fade

    return () => {
      clearTimeout(timer)
      clearTimeout(removeTimer)
    }
  }, [])

  if (!shouldRender) return null

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isLoaded ? 0 : 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-0 z-[9999] bg-alabaster flex items-center justify-center ${isLoaded ? 'pointer-events-none' : ''}`}
    >
      <svg width="400" height="100" viewBox="0 0 400 100" className="text-champagne stroke-current fill-transparent">
        <motion.text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="font-display text-4xl uppercase tracking-[0.3em] font-light"
          initial={{ strokeDasharray: "1000", strokeDashoffset: "1000" }}
          animate={{ strokeDashoffset: "0" }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Aura Media
        </motion.text>
      </svg>
    </motion.div>
  )
}
