import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'

// Register plugins immediately on import (client-side)
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)

  // Custom cubic-bezier registry: cubic-bezier(0.22, 1, 0.36, 1)
  gsap.registerEase('lux-ease', (progress: number) => {
    return progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
  })
}

export const initGSAP = () => {
  if (typeof window !== 'undefined') {
    // Globally register luxurious defaults
    gsap.defaults({
      ease: 'power3.out', // Fallback
      duration: 1.2
    })
  }
}

export { gsap, ScrollTrigger }
