'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { SplitHeading } from '../ui/SplitHeading'
import { Button } from '../ui/Button'
import Link from 'next/link'

const WORK_ITEMS = [
  { id: 1, title: 'The Obsidian Gala', category: 'Commercial Event', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80' },
  { id: 2, title: 'Vouvray Campaign', category: 'Brand Editoral', image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80' },
  { id: 3, title: 'Eternal Promise', category: 'Luxury Wedding', image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80' },
]

export function PortfolioPreview() {
  return (
    <section className="py-32 bg-alabaster text-midnight">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
           <SplitHeading className="text-4xl md:text-6xl font-display text-midnight italic text-balance max-w-2xl">
              Curated masterworks of light and emotion.
           </SplitHeading>
           <Link href="/portfolio">
              <Button variant="outline">View Full Archive</Button>
           </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
           {WORK_ITEMS.map((item, idx) => (
             <motion.div 
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 1, delay: idx * 0.2, ease: [0.22, 1, 0.36, 1] }}
               key={item.id} 
               className="group cursor-pointer block"
             >
                <div className="relative aspect-[4/5] bg-black/[0.02] overflow-hidden border border-black/[0.04] rounded-2xl mb-8 shadow-sm group-hover:shadow-xl transition-shadow duration-700">
                   <div 
                     className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] scale-100 group-hover:scale-110"
                     style={{ backgroundImage: `url('${item.image}')` }}
                   />
                </div>
                <div className="flex justify-between items-center px-2">
                   <h3 className="font-display text-xl text-midnight italic">{item.title}</h3>
                   <span className="text-[10px] font-body text-champagne uppercase tracking-[0.3em] font-bold">{item.category}</span>
                </div>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  )
}
