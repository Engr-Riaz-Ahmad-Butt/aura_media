'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { SplitHeading } from '@/components/ui/SplitHeading'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const services = [
  {
    id: 'wedding',
    title: 'Wedding Photography & Film',
    description: 'Cinematic storytelling for your most profound day. We capture the textures, the light, and the raw emotion of your union.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="9" cy="12" r="6" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="15" cy="12" r="6" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 9L12 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'birthday',
    title: 'Birthday & Milestone Events',
    description: 'Vibrant and emotive coverage of life\'s significant markers. From intimate gatherings to grand celebrations.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 10V22M12 10C12 10 9 9 9 6C9 3 12 2 12 2C12 2 15 3 15 6C15 9 12 10 12 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 22H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'corporate',
    title: 'Corporate & Brand Coverage',
    description: 'Professional visual assets that mirror your brand\'s excellence. High-end coverage for summits, launches, and profiles.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="7" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 7V5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 13V13.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'commercial',
    title: 'Commercial & Product Shoots',
    description: 'High-velocity visual content designed for impact. Sculpting light and perspective to elevate your product narrative.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 3L12 21" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 12L21 12" stroke="currentColor" strokeWidth="1.5" />
        <path d="M18.36 5.64L5.64 18.36" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5.64 5.64L18.36 18.36" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.2" />
      </svg>
    )
  }
]

export function Services() {
  return (
    <section className="py-24 md:py-40 px-4 bg-alabaster" id="services">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-28">
          <SplitHeading 
            as="h2" 
            className="text-5xl md:text-7xl lg:text-[72px] mb-8 text-midnight font-display italic"
          >
            Curated Services
          </SplitHeading>
          <div className="w-16 h-[1px] bg-champagne/40 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 1, 
                delay: i * 0.1, 
                ease: [0.22, 1, 0.36, 1] 
              }}
              className="group p-6 sm:p-10 md:p-14 bg-white border border-black/[0.03] rounded-3xl relative overflow-hidden transition-all duration-700 hover:shadow-2xl hover:-translate-y-2"
            >
              <div className="relative z-10">
                <div className="mb-12 text-champagne/60 group-hover:text-champagne transition-colors duration-500 transform group-hover:scale-110 origin-left transition-transform">
                  {service.icon}
                </div>
                
                <h3 className="text-3xl font-display text-midnight mb-6 italic">
                  {service.title}
                </h3>
                
                <p className="text-midnight-muted font-body text-[16px] leading-[1.8] mb-12 max-w-sm">
                  {service.description}
                </p>
                
                <Link 
                  href={`#${service.id}`}
                  className="inline-flex items-center gap-3 text-champagne font-display text-[10px] tracking-[0.4em] uppercase font-bold group/link"
                >
                  Discover More
                  <ArrowRight 
                    size={14} 
                    className="transition-transform duration-500 group-hover/link:translate-x-3" 
                  />
                </Link>
              </div>

              {/* Subtle background flair */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-champagne/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
