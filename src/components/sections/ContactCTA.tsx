'use client'

import React from 'react'
import { SplitHeading } from '../ui/SplitHeading'
import { Button } from '../ui/Button'
import Link from 'next/link'

export function ContactCTA() {
  return (
    <section className="relative overflow-hidden bg-midnight px-4 py-24 sm:py-32 md:py-40 lg:py-48">
      {/* Soft champagne radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(197,160,40,0.06)_0%,transparent_70%)] pointer-events-none" />
      <div className="container mx-auto px-4 text-center relative z-10 flex flex-col items-center">
        <p className="mb-4 text-[9px] font-display font-bold uppercase tracking-[0.35em] text-champagne sm:text-[10px] sm:tracking-[0.5em] md:mb-8">Limited Availability This Season</p>
        <SplitHeading className="mb-6 text-3xl font-display italic leading-tight text-alabaster sm:text-5xl md:mb-10 md:text-7xl lg:text-9xl">
          Preserve Your Legacy Now.
        </SplitHeading>
        <p className="mb-8 max-w-xl text-balance font-body text-sm font-light leading-relaxed text-alabaster/70 sm:text-base md:mb-16 md:text-xl">
          Our calendar for the upcoming season is highly selective. Secure your date to ensure your most treasured moments are captured by masters.
        </p>
        <Link href="/contact">
           <Button size="lg" className="h-12 sm:h-14 rounded-full bg-alabaster px-8 text-[10px] tracking-[0.28em] text-midnight transition-all duration-700 hover:bg-champagne hover:text-alabaster sm:h-16 sm:px-16 sm:tracking-[0.4em]">Inquire Now</Button>
        </Link>
      </div>
    </section>
  )
}
