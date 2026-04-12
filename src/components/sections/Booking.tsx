'use client'

import React, { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { SplitHeading } from '@/components/ui/SplitHeading'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { Calendar } from '@/components/ui/Calendar'
import { TimeSlotPicker } from '@/components/ui/TimeSlotPicker'
import { Phone, Mail, MapPin, Clock, MessageSquare, Calendar as CalendarIcon, Clock as ClockIcon } from 'lucide-react'
import { format, isSameDay } from 'date-fns'
import { cn } from '@/lib/utils'

const formSchema = z.object({
  fullName: z.string().min(2, { message: 'Required' }),
  email: z.string().email({ message: 'Invalid email' }),
  phone: z.string().min(8, { message: 'Invalid phone' }),
  eventType: z.string().min(1, { message: 'Select one' }),
  eventDate: z.date({ message: 'Select a date' }),
  eventTime: z.string().min(1, { message: 'Select a time' }),
  message: z.string().min(10, { message: 'Min 10 chars' }),
})

type FormData = z.infer<typeof formSchema>

// Mock Booked Data
const BOOKED_DATES = [
  new Date(2026, 3, 15),
  new Date(2026, 3, 20),
  new Date(2026, 3, 22),
]

const BOOKED_TIMES_MAP: Record<string, string[]> = {
  '2026-04-10': ['10:00 AM', '02:00 PM'],
  '2026-04-12': ['09:00 AM', '01:00 PM', '05:00 PM'],
}

export function Booking() {
  const [isSuccess, setIsSuccess] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)

  const { register, handleSubmit, control, setValue, watch, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const watchedDate = watch('eventDate')
  const dateString = watchedDate ? format(watchedDate, 'yyyy-MM-dd') : ''
  const disabledTimes = BOOKED_TIMES_MAP[dateString] || []

  const onSubmit = async (data: FormData) => {
    // Simulate API call
    console.log('Sending Booking:', {
      ...data,
      eventDate: format(data.eventDate, 'PPP'),
    })
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSuccess(true)
  }

  return (
    <>
      <section className="relative bg-alabaster px-4 py-16 md:py-32 lg:py-40 overflow-x-hidden" id="contact">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14 md:mb-20">
            <SplitHeading 
              as="h2" 
              className="mb-6 text-4xl font-display leading-tight italic text-midnight md:text-6xl lg:text-7xl"
            >
              Reserve Your Date
            </SplitHeading>
            <p className="max-w-xl font-body text-base text-midnight-muted sm:text-lg">
              Capturing your most precious milestones. Pick your preferred slot to begin our creative collaboration.
            </p>
          </div>

          <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-[60%_40%] lg:gap-20">
            {/* Background Spotlights for Atmosphere */}
            <div className="absolute -top-20 -left-20 w-96 h-96 bg-champagne/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-1/2 -right-20 w-64 h-64 bg-champagne/3 rounded-full blur-[100px] pointer-events-none" />

            {/* Left - Booking Form & Calendar */}
            <div className="relative z-10">
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    onSubmit={handleSubmit(onSubmit)} 
                    className="space-y-12 md:space-y-16"
                  >
                    <motion.div 
                      initial="hidden"
                      animate="visible"
                      variants={{
                        hidden: { opacity: 0 },
                        visible: { 
                          opacity: 1,
                          transition: { staggerChildren: 0.1 }
                        }
                      }}
                      className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2 md:gap-y-10"
                    >
                      <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                        <FormField label="Full Name" error={errors.fullName?.message}>
                          <input {...register('fullName')} placeholder="Eleanor Aura" className="w-full bg-black/[0.03] border border-black/[0.06] rounded-xl px-4 py-3 font-body text-base text-midnight outline-none transition-all duration-300 focus:bg-black/[0.05] focus:border-champagne focus:shadow-[0_0_0_4px_rgba(197,160,40,0.1)] placeholder:text-midnight/30" />
                        </FormField>
                      </motion.div>

                      <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                        <FormField label="Email Address" error={errors.email?.message}>
                          <input {...register('email')} type="email" placeholder="eleanor@studio.com" className="w-full bg-black/[0.03] border border-black/[0.06] rounded-xl px-4 py-3 font-body text-base text-midnight outline-none transition-all duration-300 focus:bg-black/[0.05] focus:border-champagne focus:shadow-[0_0_0_4px_rgba(197,160,40,0.1)] placeholder:text-midnight/30" />
                        </FormField>
                      </motion.div>

                      <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                        <FormField label="Phone Number" error={errors.phone?.message}>
                          <input {...register('phone')} type="tel" placeholder="+1 (555) 000-0000" className="w-full bg-black/[0.03] border border-black/[0.06] rounded-xl px-4 py-3 font-body text-base text-midnight outline-none transition-all duration-300 focus:bg-black/[0.05] focus:border-champagne focus:shadow-[0_0_0_4px_rgba(197,160,40,0.1)] placeholder:text-midnight/30" />
                        </FormField>
                      </motion.div>

                      <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                        <FormField label="Event Category" error={errors.eventType?.message}>
                          <select {...register('eventType')} className="w-full bg-black/[0.03] border border-black/[0.06] rounded-xl px-4 py-3 font-body text-base text-midnight outline-none transition-all duration-300 focus:bg-black/[0.05] focus:border-champagne focus:shadow-[0_0_0_4px_rgba(197,160,40,0.1)] appearance-none">
                            <option value="">Select Category</option>
                            <option value="Wedding">Wedding Session</option>
                            <option value="Birthday">Milestone Celebration</option>
                            <option value="Corporate">Corporate Visuals</option>
                            <option value="Commercial">Brand Content</option>
                            <option value="Other">Special Project</option>
                          </select>
                        </FormField>
                      </motion.div>
                    </motion.div>

                    {/* Interactive Calendar Selection */}
                    <div className="space-y-8 border-t border-black/5 pt-8 md:space-y-12 md:pt-12">
                      <div className="grid grid-cols-1 gap-8 sm:grid-cols-[1.1fr_0.9fr] lg:gap-20">
                        <motion.div 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4, duration: 0.8 }}
                        >
                          <label className="block text-[9px] text-champagne font-display uppercase tracking-[0.4em] font-bold mb-8 flex items-center gap-3">
                            <span className="w-8 h-[1px] bg-champagne/30" /> 01. Select Date
                          </label>
                          <Controller
                            control={control}
                            name="eventDate"
                            render={({ field }) => (
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={(date) => {
                                  field.onChange(date)
                                  setSelectedDate(date)
                                  setValue('eventTime', '')
                                }}
                                disabled={[
                                  { before: new Date() },
                                  ...BOOKED_DATES
                                ]}
                              />
                            )}
                          />
                          {errors.eventDate && (
                            <p className="mt-4 text-red-500/80 text-[10px] uppercase tracking-widest font-medium italic">{errors.eventDate.message}</p>
                          )}
                        </motion.div>

                        <motion.div 
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6, duration: 0.8 }}
                          className={cn("transition-all duration-700", !selectedDate && "opacity-30 blur-[2px] grayscale")}
                        >
                          <label className="block text-[9px] text-champagne font-display uppercase tracking-[0.4em] font-bold mb-8 flex items-center gap-3">
                            <span className="w-8 h-[1px] bg-champagne/30" /> 02. Pick Time
                          </label>
                          <div className="rounded-2xl border border-black/5 bg-black/[0.02] p-4 shadow-sm backdrop-blur-sm sm:p-6">
                            <Controller
                              control={control}
                              name="eventTime"
                              render={({ field }) => (
                                <TimeSlotPicker 
                                  selectedTime={field.value}
                                  onChange={field.onChange}
                                  disabledTimes={disabledTimes}
                                />
                              )}
                            />
                            {errors.eventTime && (
                              <p className="mt-4 text-red-500/80 text-[10px] uppercase tracking-widest font-medium italic">{errors.eventTime.message}</p>
                            )}
                            {selectedDate && (
                              <p className="mt-8 text-midnight/40 text-[9px] uppercase tracking-[0.2em] leading-relaxed">
                                Reviewing availability for<br/>
                                <span className="text-champagne font-bold">{format(selectedDate, 'MMMM do, yyyy')}</span>
                              </p>
                            )}
                          </div>
                        </motion.div>
                      </div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      <FormField label="The Vision (Message)" error={errors.message?.message}>
                        <textarea 
                          {...register('message')} 
                          rows={3} 
                          placeholder="Tell us about the atmosphere you want to capture..." 
                          className="w-full bg-black/[0.03] border border-black/[0.06] rounded-xl px-4 py-3 font-body text-base text-midnight outline-none transition-all duration-300 focus:bg-black/[0.05] focus:border-champagne focus:shadow-[0_0_0_4px_rgba(197,160,40,0.1)] resize-none placeholder:text-midnight/30" 
                        />
                      </FormField>

                      <div className="pt-12">
                        <MagneticButton className="w-full">
                          <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="h-14 w-full rounded-full bg-midnight text-[10px] font-bold uppercase tracking-[0.32em] text-alabaster shadow-lg transition-all duration-500 hover:bg-champagne hover:scale-[1.02] disabled:opacity-30 sm:h-16 md:h-24 md:text-sm md:tracking-[0.4em]"
                          >
                            {isSubmitting ? 'Transcribing...' : 'Send Inquiry'}
                          </button>
                        </MagneticButton>
                      </div>
                    </motion.div>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center py-20 text-center"
                  >
                    <div className="relative w-24 h-24 mb-8">
                      <motion.svg 
                        viewBox="0 0 100 100" 
                        className="w-full h-full text-champagne fill-none"
                      >
                        <motion.path 
                          d="M20 50L40 70L80 30" 
                          stroke="currentColor" 
                          strokeWidth="4" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.8, ease: "easeInOut" }}
                        />
                      </motion.svg>
                    </div>
                    <h3 className="text-3xl font-display text-midnight italic mb-4">Inquiry Received</h3>
                    <p className="text-midnight-muted max-w-sm">We've safely received your request. Expect a personalized response within 24 hours.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right - Info Panel */}
            <div className="space-y-10 md:space-y-16">
              <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-1 lg:gap-12">
                <InfoItem icon={MapPin} label="Location">
                  12 Cinema Lane, Suite 400<br />
                  Los Angeles, CA 90028
                </InfoItem>

                <InfoItem icon={Mail} label="Contact">
                  <a href="mailto:hello@auramedia.com" className="hover:text-champagne transition-colors underline decoration-champagne/30">
                    hello@auramedia.com
                  </a>
                </InfoItem>

                <InfoItem icon={Phone} label="Voice">
                  +1 (213) 555-0199
                </InfoItem>

                <InfoItem icon={Clock} label="Operational Hours">
                  Mon – Sat: 10am – 8pm<br />
                  Sunday: By Appointment
                </InfoItem>
              </div>

              <div className="space-y-8">
                <a 
                  href="https://wa.me/1234567890" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-4 rounded-full border border-[#25D366]/20 bg-[#25D366]/10 px-6 py-4 text-center font-display text-[10px] font-bold uppercase tracking-[0.24em] text-[#25D366] transition-all shadow-sm hover:bg-[#25D366] hover:text-white sm:w-auto sm:px-8 sm:py-5 sm:tracking-[0.3em]"
                >
                  <MessageSquare size={18} />
                  Connect on WhatsApp
                </a>

                {/* Google Maps with Filter */}
                <div className="relative h-[240px] w-full overflow-hidden rounded-3xl border border-black/5 grayscale brightness-105 sepia-[0.1] sm:h-[300px]">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3303.76344491703!2d-118.3308945234524!3d34.10178381559132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bf394a558763%3A0xc6a87c1b59364b4c!2sHollywood%20%26%20Vine!5e0!3m2!1sen!2sus!4v1712487445731!5m2!1sen!2sus" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                  />
                  <div className="absolute inset-0 pointer-events-none border border-champagne/5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <div className="group fixed bottom-4 right-4 z-[999] flex flex-col items-end sm:bottom-6 sm:right-6 md:bottom-10 md:right-10">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="mb-3 rounded-full bg-midnight px-4 py-2 text-[9px] font-bold uppercase tracking-[0.24em] text-alabaster opacity-0 pointer-events-none shadow-lg sm:px-6 sm:text-[10px] sm:tracking-widest"
        >
          Concierge Support
        </motion.div>
        <a 
          href="https://wa.me/1234567890" 
          target="_blank" 
          rel="noopener noreferrer"
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-transform hover:scale-110 sm:h-16 sm:w-16"
        >
          <MessageSquare size={28} />
          <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
        </a>
      </div>

    </>
  )
}

function FormField({ label, error, children }: { label: string, error?: string, children: React.ReactNode }) {
  return (
    <div className="space-y-1 relative group">
      <label className="block text-[10px] text-midnight/40 font-display uppercase tracking-[0.3em] font-bold mb-2">
        {label}
      </label>
      <div className="relative">
        {children}
      </div>
      {error && (
        <motion.p 
          initial={{ opacity: 0, y: -5 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-red-500/80 text-[10px] uppercase tracking-widest font-bold italic mt-2"
        >
          {error}
        </motion.p>
      )}
    </div>
  )
}

function InfoItem({ icon: Icon, label, children }: { icon: any, label: string, children: React.ReactNode }) {
  return (
    <div className="flex gap-4 sm:gap-6">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-black/5 bg-black/[0.02] text-champagne shadow-sm sm:h-14 sm:w-14">
        <Icon size={22} strokeWidth={1} />
      </div>
      <div>
        <h4 className="text-[10px] text-midnight uppercase tracking-[0.3em] font-bold mb-3">{label}</h4>
        <div className="font-body text-sm leading-relaxed text-midnight-muted sm:text-[15px]">
          {children}
        </div>
      </div>
    </div>
  )
}
