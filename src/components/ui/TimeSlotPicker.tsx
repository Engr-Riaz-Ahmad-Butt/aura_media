'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface TimeSlotPickerProps {
  selectedTime?: string
  onChange: (time: string) => void
  disabledTimes?: string[]
}

const ALL_TIME_SLOTS = [
  '09:00 AM', '10:00 AM', '11:00 AM',
  '01:00 PM', '02:00 PM', '03:00 PM',
  '04:00 PM', '05:00 PM', '06:00 PM'
]

export function TimeSlotPicker({ selectedTime, onChange, disabledTimes = [] }: TimeSlotPickerProps) {
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.05 }
        }
      }}
      className="grid grid-cols-3 gap-3"
    >
      {ALL_TIME_SLOTS.map((time) => {
        const isSelected = selectedTime === time
        const isDisabled = disabledTimes.includes(time)

        return (
          <motion.button
            key={time}
            type="button"
            disabled={isDisabled}
            onClick={() => onChange(time)}
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1 }
            }}
            whileHover={!isDisabled ? { scale: 1.05, backgroundColor: 'rgba(255,255,255,0.05)' } : {}}
            whileTap={!isDisabled ? { scale: 0.95 } : {}}
            className={cn(
              "relative h-12 rounded-xl border text-[10px] sm:text-[11px] font-body uppercase tracking-widest transition-all duration-300 overflow-hidden",
              isSelected 
                ? "text-alabaster border-champagne" 
                : "text-midnight/60 border-black/5 bg-black/[0.02] hover:bg-black/[0.05]",
              isDisabled && "opacity-10 cursor-not-allowed grayscale"
            )}
          >
            <AnimatePresence>
              {isSelected && (
                <motion.div 
                  layoutId="timeSlotGradient"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-champagne shadow-[0_5px_15px_rgba(197,160,40,0.2)] z-0"
                />
              )}
            </AnimatePresence>
            <span className="relative z-10">{time}</span>
          </motion.button>
        )
      })}
    </motion.div>
  )
}

import { AnimatePresence } from 'framer-motion'
