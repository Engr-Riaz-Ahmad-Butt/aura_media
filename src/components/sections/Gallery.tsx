'use client'

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '@/lib/data'
import { SplitHeading } from '@/components/ui/SplitHeading'
import { Lightbox } from '@/components/ui/Lightbox'
import Image from 'next/image'
import { cn } from '@/lib/utils'

const categories = ['All', 'Weddings', 'Birthdays', 'Events', 'Corporate', 'Commercial']

export function Gallery() {
  const [filter, setFilter] = useState('All')
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const mappedFilter = useMemo(() => {
    switch (filter) {
      case 'Weddings': return 'Wedding'
      case 'Birthdays': return 'Birthday'
      case 'Events': return 'Events'
      case 'Corporate': return 'Corporate'
      case 'Commercial': return 'Commercial'
      default: return 'All'
    }
  }, [filter])

  const filteredImages = useMemo(() => {
    return projects.filter(p => (mappedFilter === 'All' || p.category === mappedFilter) && p.mediaType === 'image')
  }, [mappedFilter])

  return (
    <section className="bg-alabaster w-full py-16 sm:py-24 md:py-32 px-4 sm:px-6" id="portfolio">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-12 sm:mb-16 md:mb-24">
          <SplitHeading 
            as="h2" 
            className="text-6xl md:text-8xl lg:text-9xl font-display text-midnight mb-12 italic"
          >
            The Portfolio
          </SplitHeading>
          
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 border-b border-black/[0.03] pb-6">
            {categories.map((cat) => (
              <button 
                key={cat} 
                onClick={() => setFilter(cat)} 
                className={cn(
                  "relative font-body text-[10px] md:text-xs tracking-[0.3em] uppercase transition-all duration-500 py-2 px-1 font-medium",
                filter === cat ? 'text-champagne font-bold' : 'text-midnight/60 hover:text-midnight'
                )}
              >
                {cat}
                {filter === cat && (
                  <motion.div 
                    layoutId="galleryActiveTab"
                    className="absolute bottom-[-1px] left-0 right-0 h-[1.5px] bg-champagne"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8"
        >
          <AnimatePresence mode='popLayout'>
            {filteredImages.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden rounded-3xl cursor-pointer break-inside-avoid shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-700"
                onClick={() => setSelectedIndex(projects.indexOf(project))}
              >
                <div className="aspect-auto">
                  <Image 
                    src={project.image} 
                    alt={project.title} 
                    width={800}
                    height={1000}
                    className="w-full h-auto object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105" 
                  />
                </div>
                
                <div className="absolute inset-0 bg-midnight/0 transition-colors duration-700 group-hover:bg-midnight/20 z-10" />
                
                <div className="absolute inset-x-8 bottom-8 translate-y-4 opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100 z-20">
                  <p className="text-champagne font-display text-[9px] tracking-[0.3em] uppercase mb-2 font-bold">
                    {project.category}
                  </p>
                  <h3 className="text-alabaster text-2xl font-display italic">
                    {project.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <Lightbox 
        isOpen={selectedIndex !== null} 
        onClose={() => setSelectedIndex(null)} 
        projects={projects}
        currentIndex={selectedIndex ?? 0}
        onNavigate={(newIndex) => setSelectedIndex(newIndex)}
      />
    </section>
  )
}
