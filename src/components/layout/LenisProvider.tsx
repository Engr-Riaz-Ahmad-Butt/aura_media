'use client'

import { ReactLenis, useLenis } from '@studio-freight/react-lenis'
import { ReactNode, useEffect } from 'react'
import { initGSAP, ScrollTrigger } from '@/lib/gsap'

function LenisScrollSync() {
  useLenis(() => {
    ScrollTrigger.update()
  }, [])

  useEffect(() => {
    const handleRefresh = () => ScrollTrigger.refresh()

    window.addEventListener('load', handleRefresh)
    window.addEventListener('resize', handleRefresh)

    return () => {
      window.removeEventListener('load', handleRefresh)
      window.removeEventListener('resize', handleRefresh)
    }
  }, [])

  return null
}

export function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    initGSAP()
    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 150)

    return () => {
      window.clearTimeout(refreshId)
    }
  }, [])

  return (
    <ReactLenis root options={{ lerp: 0.05, wheelMultiplier: 1, touchMultiplier: 2, infinite: false }}>
      <LenisScrollSync />
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {children as any}
    </ReactLenis>
  )
}
