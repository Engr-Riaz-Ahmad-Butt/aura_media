'use client'

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '@/lib/data'
import { SplitHeading } from '@/components/ui/SplitHeading'
import { Lightbox } from '@/components/ui/Lightbox'
import { HorizontalGallery } from './HorizontalGallery'
import { Button } from '../ui/Button'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Play } from 'lucide-react'

// Updated categories using the master setup
const categories = ['All', 'Weddings', 'Birthdays', 'Events', 'Commercial']

export function Portfolio() {
  const [filter, setFilter] = useState('All')
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [showMore, setShowMore] = useState(false)

  // Map requested categories to the underlying strict data categories
  const mappedFilter = useMemo(() => {
    switch (filter) {
      case 'Weddings': return 'Wedding'
      case 'Birthdays': return 'Birthday'
      case 'Events': return 'Events'
      case 'Commercial': return 'Commercial'
      default: return 'All'
    }
  }, [filter])

  const filteredProjects = useMemo(() => {
    return projects.filter(p => mappedFilter === 'All' || p.category === mappedFilter)
  }, [mappedFilter])

  // Split view into horizontal section and masonry section
  const horizontalItems = filteredProjects.slice(0, 6)
  const masonryItems = filteredProjects.slice(6)

  return (
    <section className="bg-alabaster w-full relative" id="portfolio">
      {/* Heading & Categories */}
      <div className="pt-16 md:pt-24 pb-12 px-6 max-w-[100vw] overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <SplitHeading 
            as="h2" 
            className="text-6xl md:text-[5rem] lg:text-[7rem] xl:text-[9rem] font-display text-midnight italic leading-none"
          >
            The Work
          </SplitHeading>
          
          <div className="mt-16 flex flex-wrap justify-center gap-6 md:gap-12 relative">
            {categories.map((cat) => (
              <button 
                key={cat} 
                onClick={() => {
                  setFilter(cat)
                  setShowMore(false)
                }} 
                className={cn(
                  "relative font-display text-[10px] md:text-xs tracking-[0.4em] uppercase transition-all duration-500 py-3 px-1 font-bold",
                filter === cat ? 'text-champagne' : 'text-midnight/60 hover:text-midnight'
                )}
              >
                {cat}
                {filter === cat && (
                  <motion.div 
                    layoutId="portfolioActiveTab"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-champagne"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* GSAP Horizontal Gallery (First 6 items) */}
      <div className="w-full relative">
        <HorizontalGallery 
          projects={horizontalItems} 
          onProjectClick={(index) => setSelectedIndex(index)} 
        />
      </div>

      {/* Masonry Expansion & Load More */}
      {masonryItems.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col items-center mt-20">
          <AnimatePresence>
            {!showMore && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0, scale: 0.9, transition: { duration: 0.5 } }}
                className="mb-12"
              >
                <Button 
                  variant="outline" 
                  onClick={() => setShowMore(true)}
                  className="rounded-full px-12 h-16 text-[10px] tracking-[0.4em] uppercase border-black/5 hover:bg-midnight hover:text-alabaster transition-all duration-500"
                >
                  View Archive
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showMore && (
              <motion.div 
                className="columns-1 md:columns-2 lg:columns-3 gap-10 w-full space-y-10 pb-32"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                {masonryItems.map((project, idx) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: idx * 0.05 }}
                    className="group relative overflow-hidden rounded-3xl cursor-pointer break-inside-avoid block shadow-lg hover:shadow-2xl transition-all duration-700"
                    onClick={() => setSelectedIndex(horizontalItems.length + idx)}
                  >
                    <Image 
                      src={project.image} 
                      alt={project.title} 
                      width={600}
                      height={project.mediaType === 'video' ? 400 : 800}
                      className="w-full h-auto object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-midnight/0 transition-colors duration-700 group-hover:bg-midnight/20 z-10" />
                    
                    <div className="absolute inset-x-8 bottom-8 translate-y-4 opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100 z-20">
                      <p className="text-champagne font-display text-[9px] tracking-[0.3em] uppercase mb-2 font-bold">
                        {project.category}
                      </p>
                      <h3 className="text-alabaster text-2xl font-display italic">
                        {project.title}
                      </h3>
                    </div>

                    {project.mediaType === 'video' && (
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-alabaster/30 backdrop-blur-md flex items-center justify-center text-alabaster opacity-0 group-hover:opacity-100 transition-all duration-700 scale-75 group-hover:scale-100 z-20">
                        <Play className="ml-1 fill-alabaster" size={24} />
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Lightbox Modal */}
      <Lightbox 
        isOpen={selectedIndex !== null} 
        onClose={() => setSelectedIndex(null)} 
        projects={filteredProjects}
        currentIndex={selectedIndex ?? 0}
        onNavigate={(newIndex) => setSelectedIndex(newIndex)}
      />
    </section>
  )
}
