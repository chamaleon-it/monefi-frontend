import React from 'react'

import {  HeroSection } from './components/hero'
import New from './components/new'
import { Whychoose } from './components/whychoose'
import { Insurance_Solutions } from './components/insurance-solutions'
import FAQ from '@/sections/home/FAQ'




export default function InsurancePage() {
  return (
    <main>
      <HeroSection/>
      <Insurance_Solutions/>
      <New/>
     <Whychoose/>
     <FAQ/>
    </main>
  )
}
