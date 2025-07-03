import React from 'react'
import { HeroSection } from './components/hero'
import { Section2 } from './components/Section2'
import WhyChooseUs from './components/WhyChooseUs'
import OurVision from './components/ourVision'
import OurValues from './components/ourValues'
import FAQ from '@/sections/home/FAQ'

export default function AboutUsPage() {
  return (
    <main>
      <HeroSection/>
      <Section2/>
      <WhyChooseUs/>
      <OurVision/>
      <OurValues/>
      <FAQ/>
    </main>
  )
}
