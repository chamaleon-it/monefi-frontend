import React from 'react'
import { HeroSection } from './components/hero'
import { Section2 } from './components/section2'
import Section3 from './components/section3'
import FAQ from '@/sections/home/FAQ'

export default function FinancialplanningPage() {
  return (
   <main>
    <HeroSection/>
    <Section2/>
    <Section3/>
    <FAQ/>
   </main>
  )
}
