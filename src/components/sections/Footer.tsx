'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { ParticleField } from '../three/ParticleField'
const InstagramIcon = ({ size = 18, strokeWidth = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
)

const FacebookIcon = ({ size = 18, strokeWidth = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)

const YoutubeIcon = ({ size = 18, strokeWidth = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.56 49.56 0 0 1-16.2 0A2 2 0 0 1 2.5 17Z"/><path d="m10 15 5-3-5-3z"/>
  </svg>
)

const PinterestIcon = ({ size = 18, strokeWidth = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/><circle cx="12" cy="12" r="10"/>
  </svg>
)

const footerLinks = [
  {
    title: 'Services',
    links: [
      { name: 'Weddings', href: '#wedding' },
      { name: 'Milestones', href: '#birthday' },
      { name: 'Corporate', href: '#corporate' },
      { name: 'Commercial', href: '#commercial' },
    ]
  },
  {
    title: 'Portfolio',
    links: [
      { name: 'Cinematic Films', href: '#portfolio' },
      { name: 'Still Life', href: '#portfolio' },
      { name: 'Private Gallery', href: '#portfolio' },
      { name: 'Editorial', href: '#portfolio' },
    ]
  },
  {
    title: 'Studio',
    links: [
      { name: 'Our Ethos', href: '#about' },
      { name: 'The Process', href: '#process' },
      { name: 'Contact', href: '#contact' },
      { name: 'Careers', href: '/careers' },
    ]
  },
  {
    title: 'Legal',
    links: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Cookie Policy', href: '#' },
      { name: 'Print Rights', href: '#' },
    ]
  }
]

const socialIcons = [
  { Icon: InstagramIcon, href: '#' },
  { Icon: FacebookIcon, href: '#' },
  { Icon: YoutubeIcon, href: '#' },
  { Icon: PinterestIcon, href: '#' },
]

export function Footer() {
  return (
    <footer className="relative bg-midnight overflow-hidden">
      {/* Background Particle Effect - Refined for Champagne tone */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <ParticleField count={60} color="#C5A028" size={0.015} />
        </Canvas>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 md:pt-32 pb-16 relative z-10">
        {/* Large Logo Branding */}
        <div className="text-center mb-16 md:mb-28">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-[18vw] sm:text-[14vw] md:text-[12vw] font-display text-alabaster tracking-tight leading-none mb-8 italic"
          >
            Aura Media
          </motion.h2>
          <p className="text-champagne font-display text-[10px] tracking-[0.5em] uppercase font-bold">The Art of Storytelling</p>
        </div>

        {/* First Divider */}
        <div className="w-full h-[1px] bg-alabaster/5 mb-24" />

        {/* Link Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-24 mb-28 text-center md:text-left">
          {footerLinks.map((column) => (
            <div key={column.title} className="space-y-8">
              <h4 className="text-[10px] text-champagne font-display uppercase tracking-[0.3em] font-bold">
                {column.title}
              </h4>
              <ul className="space-y-4">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      className="text-alabaster/70 hover:text-alabaster transition-all duration-500 text-[13px] font-body font-light block transform hover:translate-x-1"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Second Divider */}
        <div className="w-full h-[1px] bg-alabaster/5 mb-16" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 text-[10px] uppercase tracking-[0.25em] text-alabaster/60 font-medium">
          <div className="flex items-center gap-4">
            <span>© 2026 Aura Media.</span>
            <span className="hidden md:inline w-1 h-1 bg-champagne/40 rounded-full" />
            <span className="hidden md:inline">Preserving Legacies</span>
          </div>

          <div className="flex items-center gap-10">
            {socialIcons.map(({ Icon, href }, i) => (
              <motion.a 
                key={i}
                href={href}
                whileHover={{ y: -5, color: '#C5A028' }}
                className="text-alabaster/60 transition-all duration-500"
                aria-label="Social Link"
              >
                <Icon size={20} strokeWidth={1.2} />
              </motion.a>
            ))}
          </div>

          <div className="font-display italic text-[11px] text-champagne/70">
            Capturing Light, Creating History.
          </div>
        </div>
      </div>
    </footer>
  )
}
