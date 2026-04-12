'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { MagneticButton } from './MagneticButton'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  withMagnetic?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', withMagnetic = true, children, ...props }, ref) => {
    const baseStyles = "relative inline-flex items-center justify-center font-display tracking-widest uppercase overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
    
    const variants = {
      primary: "bg-champagne text-midnight hover:bg-champagne/90",
      outline: "border border-midnight/10 text-midnight hover:bg-midnight hover:text-alabaster",
      ghost: "text-midnight hover:text-champagne"
    }

    const sizes = {
      sm: "px-6 py-3 text-xs",
      md: "px-8 py-4 text-sm",
      lg: "px-12 py-5 text-base"
    }

    const ButtonElement = (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        <span className="relative z-10 inline-flex items-center gap-2 whitespace-nowrap">{children}</span>
        {variant !== 'ghost' && (
           <div className="absolute inset-0 bg-white/20 translate-y-[100%] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:translate-y-0" />
        )}
      </button>
    )

    if (withMagnetic) {
      return (
        <MagneticButton>
          {ButtonElement}
        </MagneticButton>
      )
    }

    return ButtonElement
  }
)

Button.displayName = "Button"
