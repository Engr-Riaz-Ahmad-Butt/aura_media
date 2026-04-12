'use client'

import React, { useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from '@/lib/gsap'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Play } from 'lucide-react'

type Project = {
  id: string
  title: string
  category: string
  year: string
  mediaType?: string
  image: string
}

interface HorizontalGalleryProps {
  projects: Project[]
  onProjectClick: (index: number) => void
}

export function HorizontalGallery({ projects, onProjectClick }: HorizontalGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const stripRef = useRef<HTMLDivElement>(null)
  const [isDesktop, setIsDesktop] = React.useState(false)

  useEffect(() => {
    const updateViewport = () => setIsDesktop(window.innerWidth >= 1024)
    updateViewport()
    window.addEventListener('resize', updateViewport)

    return () => window.removeEventListener('resize', updateViewport)
  }, [])

  // GSAP Horizontal Scroll
  useEffect(() => {
    if (!isDesktop || !containerRef.current || !stripRef.current || projects.length === 0) return

    const container = containerRef.current
    const strip = stripRef.current

    const ctx = gsap.context(() => {
      // Calculate scroll distance based on strip width relative to viewport
      // If strip is narrow, we don't scroll much. Standard is x: -(stripWidth - viewportWidth)
      
      gsap.to(strip, {
        x: () => -(strip.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${strip.scrollWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [projects, isDesktop])

  // Custom Local Flare Logic per card
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardElement: HTMLDivElement) => {
    const rect = cardElement.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const flare = cardElement.querySelector('.lens-flare') as HTMLDivElement
    if (flare) {
      gsap.set(flare, { x: x - 100, y: y - 100, opacity: 1, scale: 1 })
    }
  }

  const handleMouseLeave = (cardElement: HTMLDivElement) => {
    const flare = cardElement.querySelector('.lens-flare') as HTMLDivElement
    if (flare) {
      gsap.to(flare, { opacity: 0, scale: 0.5, duration: 0.3 })
    }
  }

  if (projects.length === 0) return null

  if (!isDesktop) {
    return (
      <div className="w-full bg-alabaster px-4 py-6 sm:px-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {projects.map((project, index) => (
            <button
              key={project.id}
              type="button"
              onClick={() => onProjectClick(index)}
              className="group relative aspect-[4/5] overflow-hidden rounded-[28px] text-left shadow-xl"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-midnight/10 to-transparent" />
              <div className="absolute inset-x-5 bottom-5 z-10">
                <p className="mb-2 text-[9px] font-display font-bold uppercase tracking-[0.35em] text-champagne">
                  {project.category}
                </p>
                <h3 className="text-2xl font-display italic text-alabaster">{project.title}</h3>
              </div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="h-screen w-full overflow-hidden bg-alabaster relative">
      <div 
        ref={stripRef} 
        className="flex flex-nowrap items-center h-full gap-12 px-[10vw]"
      >
        <AnimatePresence>
          {projects.map((project, index) => {
            const isTall = (index + 1) % 3 === 0
            
            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
                onClick={() => onProjectClick(index)}
                onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                className={cn(
                  "group relative overflow-hidden rounded-[40px] cursor-pointer shrink-0 transition-all duration-700 shadow-2xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)]",
                  isTall ? 'w-[400px] h-[70vh] md:w-[500px] md:h-[80vh]' : 'w-[350px] h-[55vh] md:w-[460px] md:h-[65vh]'
                )}
              >
                {/* Local Lens Flare */}
                <div className="lens-flare pointer-events-none absolute w-[200px] h-[200px] rounded-full bg-champagne/20 blur-[60px] mix-blend-screen opacity-0 transition-opacity z-20" />

                <Image 
                  src={project.image} 
                  alt={project.title} 
                  fill 
                  className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 z-0" 
                />
                
                {/* Dark Overlay for light theme */}
                <div className="absolute inset-0 bg-midnight/0 transition-colors duration-700 group-hover:bg-midnight/20 z-10" />

                {/* Content Overlay */}
                <div className="absolute inset-x-10 bottom-10 translate-y-8 opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100 z-30">
                  <p className="text-champagne font-display text-[10px] tracking-[0.4em] uppercase mb-3 font-bold">
                    {project.category}
                  </p>
                  <h3 className="text-alabaster text-3xl md:text-4xl font-display italic line-clamp-1">
                    {project.title}
                  </h3>
                </div>

                {/* Video Indicator */}
                {project.mediaType === 'video' && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border border-alabaster/30 backdrop-blur-md flex items-center justify-center text-alabaster opacity-0 group-hover:opacity-100 transition-all duration-700 scale-75 group-hover:scale-100 z-30">
                    <Play className="ml-1 fill-alabaster" size={28} />
                  </div>
                )}
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}
