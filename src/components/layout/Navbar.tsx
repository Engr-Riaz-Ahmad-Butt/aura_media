'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from '../ui/Button'

const navLinks = [
  { name: 'Work', href: '/#portfolio' },
  { name: 'About', href: '/#about' },
  { name: 'Services', href: '/#services' },
  { name: 'Process', href: '/#process' },
  { name: 'Pricing', href: '/#pricing' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on link click
  const handleLinkClick = () => setIsMenuOpen(false)

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-[5000] transition-all duration-500 ${
          scrolled ? 'bg-alabaster/90 backdrop-blur-md border-b border-black/5 h-20' : 'bg-transparent h-28'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
          <Link 
            href="/" 
            className="font-display text-xl sm:text-2xl tracking-[0.22em] sm:tracking-[0.3em] text-midnight hover:text-champagne transition-colors z-[5001] max-w-[70vw]"
            onClick={handleLinkClick}
          >
            Aura Media
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-12 font-body text-[10px] tracking-[0.3em] uppercase text-midnight-muted">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="hover:text-champagne transition-colors relative group py-2"
              >
                {link.name}
                <span className="absolute bottom-1 left-0 w-full h-[1px] bg-champagne scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
              </Link>
            ))}
            <Link href="/contact">
              <Button variant="outline" className="ml-4 border-midnight/10 text-midnight hover:bg-midnight hover:text-alabaster">Book Now</Button>
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-midnight hover:text-champagne transition-colors z-[5001] p-2 shrink-0"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[4999] bg-alabaster flex flex-col items-center justify-start overflow-y-auto overscroll-contain pointer-events-auto px-6 pt-32 pb-10"
          >
            <nav className="flex w-full max-w-sm flex-col items-center gap-6 sm:gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                >
                  <Link
                    href={link.href}
                    className="text-2xl sm:text-4xl font-display tracking-[0.18em] sm:tracking-widest text-midnight hover:text-champagne transition-colors text-center"
                    onClick={handleLinkClick}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + navLinks.length * 0.1, duration: 0.5 }}
                className="mt-4 sm:mt-8 w-full flex justify-center"
              >
                <Link href="/contact" onClick={handleLinkClick}>
                  <Button size="md" variant="primary" className="bg-midnight text-alabaster w-full max-w-[220px] sm:w-auto">
                    Book Direct
                  </Button>
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
