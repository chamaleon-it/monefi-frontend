import FAQ from '@/sections/home/FAQ'
import Hero from '@/sections/home/Hero'
import LatestNews from '@/sections/home/LatestNews'
import Mission from '@/sections/home/Mission'
import OurPromise from '@/sections/home/OurPromise'
import ServiceWeOffers from '@/sections/home/ServiceWeOffers'
import Testimonials from '@/sections/home/Testimonials'
import { Metadata } from 'next'
import React from 'react'


export const metadata:Metadata  = {
  title:"Home | Monefi. | The smart choice for your finances."
}

export default function HomePage() {
  return (
   <main>
   <Hero/>
   <ServiceWeOffers />
   <Mission/>
   <OurPromise/>
   <Testimonials/>
   <LatestNews/>
   <FAQ/>
   </main>
  )
}
