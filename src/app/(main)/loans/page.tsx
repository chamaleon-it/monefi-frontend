import React from 'react'
import { HeroSection } from './components/hero'
import { Loan_Solutions } from './components/loan-solutions'
import Through from './components/through'
import { Howitwork } from './components/howitworks'
import FAQ from '@/sections/home/FAQ'

export default function LoansPage() {
  return (
<main>
  <HeroSection/>
  <Loan_Solutions/>
  <Through/>
  <Howitwork/>
  <FAQ/>
</main>
  )
}
