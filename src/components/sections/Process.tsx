'use client'

import React, { useRef, useEffect } from 'react'
import { SplitHeading } from '@/components/ui/SplitHeading'
import { gsap } from '@/lib/gsap'

const stages = [
  {
    id: '01',
    title: 'Consultation',
    description: 'We begin by unpacking your vision. This is where we align on the aesthetic, the mood, and the raw feeling you want to convey.'
  },
  {
    id: '02',
    title: 'Concept & Scouting',
    description: 'Our team researches locations, lighting conditions, and develops a master shot list that serves as the architectural blueprint of the project.'
  },
  {
    id: '03',
    title: 'The Shoot',
    description: 'We roll cameras with cinematic precision. Every frame is treated as a standalone piece of art, capturing the gravity of the moment.'
  },
  {
    id: '04',
    title: 'Edit & Curation',
    description: 'In post-production, we sculpt the light and color. We meticulously grade and sound-design to build an immersive digital artifact.'
  },
  {
    id: '05',
    title: 'Delivery & Legacy',
    description: 'You receive a physical-feeling digital heirloom. A masterfully crafted visual narrative that stands the test of time.'
  }
]

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<SVGPathElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (!containerRef.current || !lineRef.current || !wrapperRef.current) return

    const lineLength = lineRef.current.getTotalLength()
    gsap.set(lineRef.current, { strokeDasharray: lineLength, strokeDashoffset: lineLength })

    const ctx = gsap.context(() => {
      // Draw line down the middle
      gsap.to(lineRef.current, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top 60%',
          end: 'bottom 80%',
          scrub: 1,
        }
      })

      // Animate nodes
      const items = gsap.utils.toArray<HTMLElement>('.process-item')
      items.forEach((item, i) => {
        const circle = item.querySelector('.process-circle')
        const content = item.querySelector('.process-content')

        // Entrance animation for content block
        gsap.fromTo(content, 
          { opacity: 0, x: i % 2 === 0 ? 40 : -40 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 75%',
              toggleActions: 'play none none reverse'
            }
          }
        )

        // Circle fill animation corresponding to line passing
        gsap.to(circle, {
          backgroundColor: '#C9A84C', // gold
          borderColor: '#C9A84C',
          scale: 1.2,
          boxShadow: '0 0 20px rgba(201, 168, 76, 0.4)',
          duration: 0.3,
          scrollTrigger: {
            trigger: item,
            start: 'top 60%',
            toggleActions: 'play none none reverse'
          }
        })
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="py-24 md:py-40 bg-alabaster relative overflow-hidden" id="process">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-16 sm:mb-24 md:mb-32">
          {/* <SplitHeading 
            as="h2" 
            className="text-5xl md:text-7xl lg:text-[72px] text-midnight font-display italic"
          >
            The Creative Journey
          </SplitHeading> */}
          <div className="w-16 h-[1px] bg-champagne/40 mx-auto mt-8" />
        </div>

        <div ref={wrapperRef} className="relative w-full pb-20">
          
          {/* Center Line SVG */}
          <div className="absolute top-0 bottom-0 left-[24px] md:left-1/2 -mt-4 w-1 z-0">
            <svg className="w-full h-full" preserveAspectRatio="none">
              <path 
                ref={lineRef}
                d="M 2 0 L 2 10000" 
                stroke="#C5A028" 
                strokeWidth="2" 
                fill="none" 
              />
            </svg>
            <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-black/[0.03] -z-10 ml-[1px]" />
          </div>

          <div className="space-y-16 sm:space-y-24 md:space-y-32 lg:space-y-48">
            {stages.map((stage, i) => {
              const isEven = i % 2 === 0

              return (
                <div key={stage.id} className="process-item relative flex items-center w-full">
                  
                  {/* The central node circle */}
                  <div className="absolute left-[24px] md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-black/10 bg-white z-10 process-circle transition-all duration-500" />

                  {/* Desktop Layout - Alternating */}
                  <div className={`hidden md:flex w-full items-center justify-between ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
                    
                    {/* Number block */}
                    <div className="w-[45%] flex justify-end">
                      <div className={`w-full flex ${isEven ? 'justify-end pr-16' : 'justify-start pl-16'}`}>
                         <span className="text-[120px] lg:text-[160px] font-display text-black/[0.03] leading-none select-none font-bold">
                           {stage.id}
                         </span>
                      </div>
                    </div>

                    {/* Content block */}
                    <div className="w-[45%] process-content">
                      <div className={`w-full max-w-sm ${isEven ? 'pl-16' : 'pr-16 text-right'}`}>
                        <h3 className="text-3xl md:text-4xl text-midnight font-display italic mb-6">
                          {stage.title}
                        </h3>
                        <p className="text-midnight-muted text-[16px] leading-[1.8] font-light font-body">
                          {stage.description}
                        </p>
                      </div>
                    </div>

                  </div>

                  {/* Mobile Layout - Stacking */}
                  <div className="flex md:hidden flex-col w-full pl-16 process-content">
                    <span className="text-[80px] font-display text-black/[0.02] leading-none select-none mb-4 -ml-4 font-bold">
                       {stage.id}
                    </span>
                    <h3 className="text-2xl text-midnight font-display italic mb-4 mt-[-20px] relative z-10">
                      {stage.title}
                    </h3>
                    <p className="text-midnight-muted text-[15px] leading-[1.8] font-light font-body">
                      {stage.description}
                    </p>
                  </div>

                </div>
              )
            })}
          </div>

        </div>

      </div>
    </section>
  )
}
