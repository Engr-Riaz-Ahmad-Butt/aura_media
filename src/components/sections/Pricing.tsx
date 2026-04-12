'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { SplitHeading } from '@/components/ui/SplitHeading'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const pricingData = [
  {
    id: 'essentials',
    name: 'Essentials',
    photoPrice: 890,
    photoFilmPrice: 1490,
    features: [
      '4hr coverage',
      '200 edited photos',
      'Online gallery',
      '1 photographer',
      'High-resolution downloads'
    ]
  },
  {
    id: 'signature',
    name: 'Signature',
    photoPrice: 1890,
    photoFilmPrice: 2890,
    isFeatured: true,
    features: [
      '8hr coverage',
      '500 edited photos',
      'Highlight film (3 min)',
      '2 photographers',
      'Same-day preview',
      'Bespoke editing'
    ]
  },
  {
    id: 'elite',
    name: 'Elite',
    photoPrice: 3200,
    photoFilmPrice: 4800,
    features: [
      'Full-day coverage',
      'Unlimited photos',
      'Cinematic film (10 min)',
      '3 person crew',
      'Drone coverage',
      'Linen Hardcover Album'
    ]
  }
]

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 6L9 17L4 12" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export function Pricing() {
  const [includeFilm, setIncludeFilm] = useState(false)

  return (
    <section className="py-24 md:py-40 px-4 bg-alabaster relative overflow-hidden" id="pricing">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <SplitHeading 
            as="h2" 
            className="text-5xl md:text-7xl lg:text-[72px] text-midnight font-display italic mb-12"
          >
            The Investment
          </SplitHeading>
          
          {/* Custom Pill Toggle */}
          <div className="flex items-center justify-center gap-8">
            <span className={cn("text-[9px] uppercase tracking-[0.3em] font-bold transition-all duration-500", !includeFilm ? 'text-champagne underline underline-offset-8' : 'text-midnight/60')}>Photography</span>
            <button 
              onClick={() => setIncludeFilm(!includeFilm)}
              className="relative w-14 h-7 bg-black/[0.03] border border-black/[0.05] rounded-full p-1 transition-colors"
            >
              <motion.div 
                animate={{ x: includeFilm ? 28 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="w-5 h-5 bg-champagne rounded-full shadow-md"
              />
            </button>
            <span className={cn("text-[9px] uppercase tracking-[0.3em] font-bold transition-all duration-500", includeFilm ? 'text-champagne underline underline-offset-8' : 'text-midnight/60')}>Photography + Film</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14 items-stretch">
          {pricingData.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "relative p-6 sm:p-10 md:p-14 border rounded-3xl flex flex-col transition-all duration-700 overflow-hidden group",
                plan.isFeatured 
                  ? "bg-midnight border-champagne text-alabaster shadow-2xl md:scale-105 z-20" 
                  : "bg-white border-black/[0.03] text-midnight shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-xl"
              )}
            >
              {plan.isFeatured && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-champagne text-alabaster px-6 py-1.5 text-[9px] uppercase font-display font-bold tracking-[0.2em] rounded-b-xl">
                  Boutique Choice
                </div>
              )}

              <div className="mb-14 relative z-10">
                <h3 className={cn("font-display text-[10px] uppercase tracking-[0.4em] mb-6 font-bold", plan.isFeatured ? "text-champagne" : "text-midnight/60")}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className={cn("text-2xl font-light", plan.isFeatured ? "text-alabaster/70" : "text-midnight/45")}>$</span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={includeFilm ? 'film' : 'photo'}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="font-display text-6xl md:text-7xl italic leading-none"
                    >
                      {(includeFilm ? plan.photoFilmPrice : plan.photoPrice).toLocaleString()}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>

              <ul className="space-y-6 mb-16 flex-grow relative z-10">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-5 text-[13px] font-body font-light">
                    <span className="mt-1"><CheckIcon /></span>
                    <span className={plan.isFeatured ? "text-alabaster/90" : "text-midnight/75"}>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/contact" className="w-full relative z-10">
                <Button 
                  variant={plan.isFeatured ? 'primary' : 'outline'} 
                  size="lg" 
                  className={cn(
                    "w-full h-16 rounded-full font-display text-[10px] tracking-[0.4em] uppercase transition-all duration-500",
                    plan.isFeatured 
                      ? "bg-alabaster text-midnight hover:bg-champagne hover:text-alabaster" 
                      : "border-black/5 text-midnight hover:bg-midnight hover:text-alabaster"
                  )}
                  withMagnetic={false}
                >
                  Request Consultation
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-28 text-center">
          <p className="text-midnight/50 text-[9px] uppercase tracking-[0.3em] font-medium max-w-lg mx-auto leading-relaxed">
            All collections include a pre-event consultation and professional post-production. Custom tiered packages available upon request.
          </p>
        </div>
      </div>
    </section>
  )
}
