'use client'

import React from 'react'
import Image from 'next/image'
import { Quote } from 'lucide-react'
import { CardStack, type CardStackItem } from '@/components/ui/card-stack'
import { SplitHeading } from '@/components/ui/SplitHeading'
import { cn } from '@/lib/utils'

type TestimonialItem = CardStackItem & {
  role: string
  avatar: string
  imageSrc: string
}

const testimonials: TestimonialItem[] = [
  {
    id: 1,
    title: 'Alexandra Vance',
    role: 'Wedding Photography',
    tag: 'Five-Star Story',
    description: 'Aura Media captured our wedding with such depth. The film feels like a piece of high-art cinema rather than just a memory.',
    imageSrc: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: 2,
    title: 'Marcus Thorne',
    role: 'Commercial Shoot',
    tag: 'Brand Narrative',
    description: 'The absolute precision in their lighting and direction is unmatched. They did not just shoot our product; they sculpted its narrative.',
    imageSrc: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: 3,
    title: 'Elena Rodriguez',
    role: 'Milestone Birthday',
    tag: 'Private Celebration',
    description: 'I was worried about the scale of the event, but they handled it with grace. The photos have a raw, physical weight to them.',
    imageSrc: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=1200',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: 4,
    title: 'Julian Chen',
    role: 'Brand Launch',
    tag: 'Editorial Precision',
    description: 'Aura Media understands luxury. Every frame is deliberate, every transition is polished. A truly world-class experience.',
    imageSrc: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1200',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: 5,
    title: 'Sophia Loren',
    role: 'Engagement Session',
    tag: 'Romantic Session',
    description: 'The best investment we made for our celebration. They made us feel comfortable and the results are simply breathtaking.',
    imageSrc: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=1200',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
  },
]

function TestimonialCard({ item, active }: { item: TestimonialItem; active: boolean }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-midnight">
      <div className="absolute inset-0">
        <Image
          src={item.imageSrc}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, 560px"
          className={cn(
            'object-cover transition duration-700',
            active ? 'scale-100' : 'scale-105 saturate-75'
          )}
          draggable={false}
          priority
        />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,18,18,0.08)_0%,rgba(18,18,18,0.28)_42%,rgba(18,18,18,0.88)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(226,188,81,0.24),transparent_42%)]" />

      <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="inline-flex items-center gap-3 rounded-full border border-alabaster/15 bg-alabaster/10 px-4 py-2 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-champagne" />
            <span className="font-display text-[9px] font-bold uppercase tracking-[0.35em] text-alabaster/85">
              {item.tag}
            </span>
          </div>

          <div className="rounded-full border border-alabaster/10 bg-alabaster/10 p-3 text-champagne backdrop-blur-md">
            <Quote className="h-4 w-4" strokeWidth={1.8} />
          </div>
        </div>

        <div className="space-y-5">
          <p className="max-w-md font-body text-base leading-7 text-alabaster/90 md:text-lg">
            &ldquo;{item.description}&rdquo;
          </p>

          <div className="flex items-center gap-4">
            <div className="relative h-14 w-14 overflow-hidden rounded-full border border-champagne/40 bg-alabaster/10 p-1">
              <Image
                src={item.avatar}
                alt={item.title}
                fill
                className="rounded-full object-cover"
                sizes="56px"
              />
            </div>

            <div>
              <p className="font-display text-sm font-bold uppercase tracking-[0.24em] text-alabaster">
                {item.title}
              </p>
              <p className="mt-1 font-body text-[11px] uppercase tracking-[0.32em] text-alabaster/65">
                {item.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-alabaster px-4 py-24 md:py-40" id="testimonials">
      <div className="pointer-events-none absolute inset-x-0 top-16 mx-auto h-56 w-[30rem] rounded-full bg-champagne/10 blur-[120px]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-40 w-[40rem] rounded-full bg-midnight/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col gap-8 lg:mb-24 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="mb-6 font-display text-[10px] font-bold uppercase tracking-[0.45em] text-champagne">
              Client Stories
            </p>
            <SplitHeading
              as="h2"
              className="text-5xl font-display italic text-midnight md:text-7xl lg:text-[72px]"
            >
              Testimonials that feel as cinematic as the work.
            </SplitHeading>
          </div>

          <p className="max-w-xl font-body text-base leading-8 text-midnight-muted md:text-lg">
            Swipe through the moments our clients keep returning to: the atmosphere, the tenderness,
            and the sense that every frame was handled with intention.
          </p>
        </div>

        <div className="rounded-[40px] border border-black/5 bg-white/55 px-4 py-8 shadow-[0_24px_80px_rgba(0,0,0,0.06)] backdrop-blur-sm md:px-8 md:py-10">
          <CardStack
            items={testimonials}
            initialIndex={0}
            autoAdvance
            intervalMs={3400}
            pauseOnHover
            showDots
            cardWidth={560}
            cardHeight={360}
            overlap={0.52}
            spreadDeg={52}
            activeLiftPx={26}
            maxVisible={5}
            className="mx-auto max-w-6xl"
            renderCard={(item, state) => <TestimonialCard item={item} active={state.active} />}
          />
        </div>
      </div>
    </section>
  )
}
