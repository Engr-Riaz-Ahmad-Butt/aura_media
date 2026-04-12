'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { SplitHeading } from '@/components/ui/SplitHeading'
import { ArrowRight } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-4 overflow-hidden bg-alabaster">
      {/* Cinematic Background with Soft Overlay */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-20 grayscale brightness-110"
        src="https://cdn.coverr.co/videos/coverr-wedding-ceremony-2636/1080p.mp4"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-alabaster/80 via-transparent to-alabaster z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,160,40,0.05)_0%,transparent_70%)] pointer-events-none z-1" />

      <div className="relative z-10 mx-auto max-w-7xl text-center pb-24 md:pb-32">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="mb-6 px-2 text-[9px] font-display font-medium uppercase tracking-[0.32em] text-champagne sm:text-[10px] md:mb-8 md:text-xs md:tracking-[0.4em]"
        >
          Capturing Life&apos;s Greatest Celebrations
        </motion.p>
        
        <SplitHeading 
          as="h1" 
          className="mb-8 text-[3.2rem] sm:text-5xl font-medium italic !leading-[0.92] md:text-8xl lg:text-[10rem]"
          delay={0.4}
        >
          Aura Media
        </SplitHeading>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
          className="mx-auto mb-10 max-w-2xl px-2 text-sm font-light leading-relaxed text-midnight-muted sm:text-base md:mb-16 md:text-xl"
        >
          Luxury photography and cinematic storytelling for weddings, birthdays, and elite events. We preserve your most cherished moments as timeless digital legacies.
        </motion.p>

        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 1 }}
           className="flex flex-col items-center justify-center gap-4 w-full px-4 sm:flex-row sm:px-0"
        >
          <Link href="#portfolio" className="w-full sm:w-auto">
            <Button variant="primary" size="lg" className="whitespace-nowrap w-full sm:w-auto h-12 sm:h-14 rounded-full bg-midnight px-6 text-center text-alabaster transition-all hover:bg-champagne hover:scale-105 sm:h-16 sm:px-10">
              See the Magic <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/contact" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 sm:h-14 rounded-full border-midnight/10 px-6 text-center text-midnight transition-all hover:bg-midnight hover:text-alabaster sm:h-16 sm:px-10">
              Inquire Today
            </Button>
          </Link>
        </motion.div>

        {/* Begin Your Journey - Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col items-center gap-2 sm:mt-14 md:mt-16 md:gap-3"
        >
          <span className="text-[10px] uppercase tracking-[0.35em] text-midnight/50 font-medium sm:text-[11px] sm:tracking-[0.4em] md:text-xs">
            Begin your journey
          </span>

          {/* Animated scroll line with pulsing dot */}
          <div className="relative flex flex-col items-center gap-1">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1.5 h-1.5 rounded-full bg-champagne/80 sm:w-2 sm:h-2"
            />
            <div className="w-[1px] h-8 bg-gradient-to-b from-champagne/50 to-transparent sm:h-10 md:h-14" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
