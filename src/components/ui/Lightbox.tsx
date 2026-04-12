'use client'

import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

type Project = {
  id: string
  title: string
  category: string
  year: string
  mediaType?: string
  videoUrl?: string
  image: string
  description: string
}

interface LightboxProps {
  isOpen: boolean
  onClose: () => void
  projects: Project[]
  currentIndex: number
  onNavigate: (newIndex: number) => void
}

export function Lightbox({ isOpen, onClose, projects, currentIndex, onNavigate }: LightboxProps) {
  const currentProject = projects[currentIndex]

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % projects.length)
      if (e.key === 'ArrowLeft') onNavigate((currentIndex - 1 + projects.length) % projects.length)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = 'auto'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, currentIndex, projects.length, onClose, onNavigate])

  return (
    <AnimatePresence>
      {isOpen && currentProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-midnight/97 backdrop-blur-xl p-4 md:p-12"
          onClick={onClose}
        >
          {/* Close Button */}
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute top-8 right-8 text-alabaster/50 hover:text-champagne transition-colors duration-300 z-20"
            onClick={onClose}
          >
            <X size={28} strokeWidth={1.5} />
          </motion.button>

          {/* Left Arrow */}
          <button 
            className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 text-alabaster/65 hover:text-champagne transition-colors duration-300 z-20"
            onClick={(e) => { e.stopPropagation(); onNavigate((currentIndex - 1 + projects.length) % projects.length) }}
          >
            <ChevronLeft size={44} strokeWidth={1} />
          </button>

          {/* Right Arrow */}
          <button 
            className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 text-alabaster/65 hover:text-champagne transition-colors duration-300 z-20"
            onClick={(e) => { e.stopPropagation(); onNavigate((currentIndex + 1) % projects.length) }}
          >
            <ChevronRight size={44} strokeWidth={1} />
          </button>

          <div className="relative w-full h-full flex flex-col items-center justify-center gap-8" onClick={(e) => e.stopPropagation()}>
            <motion.div
              key={currentProject.id}
              initial={{ opacity: 0, scale: 0.88, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-[90vw] h-[70vh] md:max-h-[78vh] flex items-center justify-center overflow-hidden rounded-2xl"
            >
              {currentProject.mediaType === 'video' && currentProject.videoUrl ? (
                <video 
                  src={currentProject.videoUrl} 
                  autoPlay 
                  controls
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <Image
                  src={currentProject.image}
                  alt={currentProject.title}
                  fill
                  className="object-contain"
                  priority
                />
              )}
            </motion.div>

            <motion.div
              key={`text-${currentProject.id}`}
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <p className="text-champagne text-[10px] tracking-[0.4em] uppercase mb-3 font-display font-bold">{currentProject.category}</p>
              <h2 className="text-3xl md:text-5xl font-display text-alabaster italic">{currentProject.title}</h2>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
