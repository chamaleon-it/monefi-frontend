import { Metadata } from 'next'
import React from 'react'
import HeroSection from '@/sections/corporate/HeroSection'
import AboutSection from '@/sections/corporate/AboutSection'
import ServicesSection from '@/sections/corporate/ServicesSection'
import IndustriesSection from '@/sections/corporate/IndustriesSection'
import PortfolioSection from '@/sections/corporate/PortfolioSection'
import WhyWorkWithUsSection from '@/sections/corporate/WhyWorkWithUsSection'
import InsightsSection from '@/sections/corporate/InsightsSection'
import ContactCTASection from '@/sections/corporate/ContactCTASection'

export const metadata: Metadata = {
  title: "Home | Baker Jones Holdings",
  description: "Building Long-Term Value Through Strategic Investments",
}

export default function HomePage() {
  return (
    <div className="bg-corporate-white">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <IndustriesSection />
      <PortfolioSection />
      <WhyWorkWithUsSection />
      <InsightsSection />
      <ContactCTASection />
    </div>
  )
}
