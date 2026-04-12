'use client'

import * as React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { DayPicker, DayButtonProps, useDayPicker } from 'react-day-picker'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <div className="relative w-fit mx-auto p-1 rounded-2xl bg-white/50 backdrop-blur-xl border border-black/[0.03] shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
      <DayPicker
        showOutsideDays={showOutsideDays}
        className={cn('p-4', className)}
        classNames={{
          months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
          month: 'space-y-6',
          caption: 'flex justify-center pt-2 relative items-center mb-8',
          caption_label: 'text-[9px] font-display uppercase tracking-[0.4em] text-midnight/80 font-bold',
          nav: 'space-x-2 flex items-center',
          button_previous: cn(
            'absolute left-1 h-8 w-8 bg-black/[0.02] border border-black/[0.03] rounded-full flex items-center justify-center opacity-70 hover:opacity-100 hover:bg-black/[0.05] transition-all text-midnight'
          ),
          button_next: cn(
            'absolute right-1 h-8 w-8 bg-black/[0.02] border border-black/[0.03] rounded-full flex items-center justify-center opacity-70 hover:opacity-100 hover:bg-black/[0.05] transition-all text-midnight'
          ),
          table: 'w-full border-collapse space-y-1',
          head_row: 'flex mb-4',
          head_cell: 'text-champagne/60 rounded-md w-10 font-display text-[8px] uppercase tracking-widest',
          row: 'flex w-full mt-2',
          cell: 'h-10 w-10 text-center text-sm p-0 m-0.5 relative focus-within:relative focus-within:z-20',
          day: cn(
            'h-10 w-10 p-0 font-body text-midnight/70 transition-colors rounded-full relative'
          ),
          day_selected: 'text-alabaster font-bold',
          day_today: 'text-champagne font-bold bg-champagne/5',
          day_outside: 'day-outside text-midnight/10 opacity-30 pointer-events-none',
          day_disabled: 'text-midnight/5 opacity-10 pointer-events-none line-through',
          day_range_middle: 'aria-selected:bg-champagne/10 aria-selected:text-midnight',
          day_hidden: 'invisible',
          ...classNames,
        }}
        components={{
          Chevron: ({ orientation }) => orientation === 'left' ? <ChevronLeft className="h-4 w-4 stroke-[1.5]" /> : <ChevronRight className="h-4 w-4 stroke-[1.5]" />,
          DayButton: (props) => <CustomDayButton {...props} />
        }}
        {...props}
      />
    </div>
  )
}

function CustomDayButton(props: DayButtonProps) {
  const { day, modifiers, className, ...buttonProps } = props
  const { selected, disabled, today, outside } = modifiers
  
  if (outside) return <div className="h-10 w-10 transition-all duration-300 relative group opacity-0 pointer-events-none" />

  return (
    <motion.button
      {...(buttonProps as any)}
      whileHover={!disabled && !selected ? { scale: 1.1, backgroundColor: 'rgba(197, 160, 40, 0.05)' } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      className={cn(
        "h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 relative group",
        selected && "text-alabaster",
        disabled && "opacity-20 cursor-not-allowed",
        today && !selected && "border border-champagne/30",
        className
      )}
    >
      <AnimatePresence mode="popLayout">
        {selected && (
          <motion.div
            layoutId="day-selection-halo"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="absolute inset-0 bg-champagne shadow-[0_5px_15px_rgba(197,160,40,0.3)] z-[-1]"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
      </AnimatePresence>
      <span className={cn(
        "relative z-10 transition-colors duration-300 font-display text-[10px] tracking-widest",
        selected ? "text-alabaster font-bold" : "text-midnight/80",
        today && !selected ? "text-champagne font-bold" : ""
      )}>
        {day.date.getDate()}
      </span>

      {/* Subtle interaction indicator */}
      {!selected && !disabled && (
        <div className="absolute inset-0 rounded-full border border-champagne/0 group-hover:border-champagne/10 transition-all duration-500" />
      )}
    </motion.button>
  )
}

Calendar.displayName = 'Calendar'

export { Calendar }
