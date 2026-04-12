// Shared Framer Motion Variants applying the luxury easing 
// Easing: cubic-bezier(0.22, 1, 0.36, 1)

export const luxEasing = [0.22, 1, 0.36, 1] as const;

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 1.2, ease: luxEasing }
  }
}

export const slideUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 1.2, ease: luxEasing }
  }
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

export const parallaxSlide = (direction = 1) => ({
  hidden: { opacity: 0, y: 100 * direction },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 1.4, ease: luxEasing }
  }
})
