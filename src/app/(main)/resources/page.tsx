import React from 'react'
import { HeroSection } from './components/hero'
import { Section2 } from './components/section2'
import Section3 from './components/section3'
import { Section4 } from './components/section4'
import FAQ from '@/sections/home/FAQ'

export default function Resourcespage() {
  return (
    <main>
      <HeroSection/>
      <Section2/>
      <Section3/>
      <Section4/>
      <FAQ/>
    </main>
  )
}
