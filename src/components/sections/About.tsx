'use client'

import React, { useRef, useEffect } from 'react'
import { SplitHeading } from '@/components/ui/SplitHeading'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import Image from 'next/image'

export function About() {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  
  const clientsRef = useRef<HTMLSpanElement>(null)
  const yearsRef = useRef<HTMLSpanElement>(null)
  const momentsRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!containerRef.current || !imageRef.current || !textRef.current || !statsRef.current) return

    // Screen size check for mobile un-parallaxing
    const isDesktop = window.innerWidth >= 768

    const ctx = gsap.context(() => {
      if (isDesktop) {
        // Image Parallax (moves slower than scroll) -> data-speed="0.8" approx -20% y
        gsap.to(imageRef.current, {
          yPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        })

        // Text Parallax (moves faster than scroll) -> data-speed="1.2" approx 20% y
        gsap.to(textRef.current, {
          yPercent: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        })
      }

      // Animated Stat Counters
      const triggerStats = () => {
        // Clients: 850
        gsap.to(clientsRef.current, {
          innerHTML: 850,
          duration: 2,
          ease: "power2.out",
          snap: { innerHTML: 1 },
          onUpdate: function() {
            if (clientsRef.current) {
               const val = Math.round(Number(clientsRef.current.innerHTML));
               clientsRef.current.innerHTML = val + "+";
            }
          }
        })

        // Years: 12
        gsap.to(yearsRef.current, {
          innerHTML: 12,
          duration: 2,
          ease: "power2.out",
          snap: { innerHTML: 1 },
          onUpdate: function() {
            if (yearsRef.current) {
               const val = Math.round(Number(yearsRef.current.innerHTML));
               yearsRef.current.innerHTML = val + "+";
            }
          }
        })

        // Moments: 3200
        gsap.to(momentsRef.current, {
          innerHTML: 3200,
          duration: 2,
          ease: "power2.out",
          snap: { innerHTML: 1 },
          onUpdate: function() {
            if (momentsRef.current) {
               const val = Math.round(Number(momentsRef.current.innerHTML));
               momentsRef.current.innerHTML = val.toLocaleString() + "+";
            }
          }
        })
      }

      // Initialize counter innerHTML
      if (clientsRef.current) clientsRef.current.innerHTML = "0+"
      if (yearsRef.current) yearsRef.current.innerHTML = "0+"
      if (momentsRef.current) momentsRef.current.innerHTML = "0+"

      ScrollTrigger.create({
        trigger: statsRef.current,
        start: 'top 80%',
        once: true,
        onEnter: triggerStats
      })
      
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative min-h-screen w-full bg-alabaster overflow-hidden" id="about">
      <div className="w-full h-full flex flex-col md:grid md:grid-cols-[55%_45%]">
        
        {/* Left Column - Image */}
        <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-screen overflow-hidden flex items-center justify-center p-4 sm:p-6 md:p-16 border-b md:border-b-0 md:border-r border-black/[0.03]">
          <div 
            ref={imageRef} 
            className="relative w-full max-w-[600px] h-[500px] md:h-[700px] will-change-transform shadow-2xl rounded-3xl overflow-hidden"
          >
            {/* Elegant Corner Brackets */}
            <div className="absolute top-8 left-8 w-12 h-[1px] bg-champagne z-20" />
            <div className="absolute top-8 left-8 w-[1px] h-12 bg-champagne z-20" />

            <div className="absolute top-8 right-8 w-12 h-[1px] bg-champagne z-20" />
            <div className="absolute top-8 right-8 w-[1px] h-12 bg-champagne z-20" />

            <div className="absolute bottom-8 left-8 w-12 h-[1px] bg-champagne z-20" />
            <div className="absolute bottom-8 left-8 w-[1px] h-12 bg-champagne z-20" />

            <div className="absolute bottom-8 right-8 w-12 h-[1px] bg-champagne z-20" />
            <div className="absolute bottom-8 right-8 w-[1px] h-12 bg-champagne z-20" />

            {/* Subtle svg film grain for light theme */}
            <div className="absolute inset-0 z-10 opacity-[0.03] pointer-events-none mix-blend-multiply" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
            
            <Image 
              src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=2071"
              alt="The Art of Storytelling"
              fill
              className="object-cover grayscale brightness-110 hover:grayscale-0 transition-all duration-1000 z-0 ease-in-out"
            />
          </div>
        </div>

        {/* Right Column - Text Content */}
        <div className="relative w-full h-full flex flex-col justify-center p-6 sm:p-8 md:p-16 lg:px-24">
          <div ref={textRef} className="will-change-transform max-w-xl">
            <p className="text-champagne font-display text-[9px] tracking-[0.4em] uppercase mb-8 font-bold">
              The Studio Legacy
            </p>
            
            <SplitHeading 
              as="h2" 
              className="text-4xl md:text-5xl lg:text-[56px] leading-[1.1] text-midnight font-display mb-10 italic"
            >
              Capturing the feeling behind every frame.
            </SplitHeading>

            <div className="space-y-8 text-midnight-muted text-[17px] font-light leading-[1.8] font-body">
              <p>
                Aura Media was founded on a simple belief: your most cherished moments deserve to be preserved as timeless works of art. We specialize in the cinematic, the elegant, and the enduring.
              </p>
              <p>
                Whether it&apos;s the romantic grace of a wedding or the vibrant energy of a milestone celebration, our lenses are tuned to the subtle emotions that make your story unique.
              </p>
              <p>
                We don&apos;t just take photos; we create digital heirlooms—capturing the textures, light, and atmosphere that define your legacy.
              </p>
            </div>

            <div className="w-[80px] h-[1px] bg-champagne/40 my-10" />

            {/* GSAP Counters */}
            <div ref={statsRef} className="grid grid-cols-3 gap-6 md:gap-10 pt-4">
              <div className="flex flex-col">
                <span ref={clientsRef} className="text-midnight font-display text-4xl md:text-[52px] leading-none mb-3 italic">0+</span>
                <span className="text-midnight/40 font-body text-[10px] uppercase tracking-[0.3em] font-medium">Clients</span>
              </div>
              <div className="flex flex-col">
                <span ref={yearsRef} className="text-midnight font-display text-4xl md:text-[52px] leading-none mb-3 italic">0+</span>
                <span className="text-midnight/40 font-body text-[10px] uppercase tracking-[0.3em] font-medium">Years</span>
              </div>
              <div className="flex flex-col">
                <span ref={momentsRef} className="text-midnight font-display text-4xl md:text-[52px] leading-none mb-3 italic">0+</span>
                <span className="text-midnight/40 font-body text-[10px] uppercase tracking-[0.3em] font-medium">Captures</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
