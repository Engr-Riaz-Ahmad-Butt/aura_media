import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Portfolio } from '@/components/sections/Portfolio'
import { Gallery } from '@/components/sections/Gallery'
import { Services } from '@/components/sections/Services'
import { Process } from '@/components/sections/Process'
import { Pricing } from '@/components/sections/Pricing'
import { Testimonials } from '@/components/sections/Testimonials'
import { Booking } from '@/components/sections/Booking'
import { Footer } from '@/components/sections/Footer'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Portfolio />
      <Gallery />
      <Services />
      <Process />
      <Pricing />
      <Testimonials />
      <Booking />
      <Footer />
    </>
  )
}
