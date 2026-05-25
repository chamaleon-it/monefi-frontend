import FAQ from '@/sections/home/FAQ'
import Hero from '@/sections/home/Hero'
// import MaintenanceBanner from '@/sections/home/MaintenanceBanner'
// import LatestNews from '@/sections/home/LatestNews'
import Mission from '@/sections/home/Mission'
import OurPromise from '@/sections/home/OurPromise'
import ServiceWeOffers from '@/sections/home/ServiceWeOffers'
import Testimonials from '@/sections/home/Testimonials'
import { Metadata } from 'next'
import React from 'react'


export const metadata:Metadata  = {
  title:"Home | Baker Jones Holdings. | The smart choice for your finances.",
   description:
    "Empower your financial journey with expert advice and tailored financial services. From life insurance and mortgage solutions to business insurance and personal loans, we provide the support you need to make informed decisions and achieve lasting financial security.",
}

export default function HomePage() {
  return (
   <main>
   <Hero/>
   <ServiceWeOffers />
   <Mission/>
   <OurPromise/>
   <Testimonials/>
   {/* <LatestNews/> */}
   <FAQ/>
   {/* <MaintenanceBanner/> */}
   </main>
  )
}
