import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, CheckCircle2, Building2, Shield, Clock, Users, Globe, FileText, ChevronDown } from 'lucide-react';
import { ScrollAnimation } from '@/components/ScrollAnimation';
import Home2Header from '@/components/Home2Header';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Institutional Investments | Baker Jones Holdings",
  description: "Your gateway to premium institutional investments and bespoke financial solutions.",
};

export default function Home2Page() {
  return (
    <div className="bg-corporate-white text-slate-900 font-inter antialiased">
      <Home2Header />

      {/* 1. Hero Section (Centered Banner with Image) */}
      <section className="relative pt-28 pb-32 lg:pt-0 lg:pb-16 flex flex-col items-center justify-center overflow-hidden min-h-[75vh] lg:h-[calc(100vh-120px)] lg:min-h-[600px]">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
            alt="Cityscape"
            className="w-full h-full object-cover"
          />
          {/* Heavy overlay to ensure text readability */}
          <div className="absolute inset-0 bg-[#082348]/90"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#082348]/80 via-transparent to-[#082348]/80"></div>
        </div>

        <ScrollAnimation className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-8 w-full text-center flex flex-col items-center">

          <div className="inline-flex items-center justify-center px-5 py-1.5 rounded-full border border-white/10 mb-8">
            <span className="text-corporate-gold font-medium tracking-wide text-[13px]">
              Strategic Investment Partners
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[5.5rem] font-serif font-bold tracking-tight leading-[1.1] text-white mb-8 max-w-5xl">
            Building Long-Term <br className="hidden sm:block" />
            Value Through <span className="text-corporate-gold italic font-normal">Strategic <br className="hidden sm:block" /> Investments</span>
          </h1>

          <p className="text-white/60 text-[16px] lg:text-[18px] max-w-2xl mx-auto leading-relaxed mb-10">
            Baker Jones Holdings partners with forward-thinking businesses across technology, infrastructure, real estate, and digital innovation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Link href="#investment-approach" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 bg-white text-[#082348] hover:bg-slate-100 rounded-full font-medium text-[15px] transition-all">
              Explore Portfolio <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link href="/contact-us" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 bg-transparent border border-white/20 text-white hover:bg-white/10 rounded-full font-medium text-[15px] transition-all">
              Partner With Us
            </Link>
          </div>
        </ScrollAnimation>
      </section>

      {/* 2. Floating Stats Bar */}
      <section className="relative z-20 -mt-20 lg:-mt-24 px-6 lg:px-8 max-w-[1400px] mx-auto">
        <ScrollAnimation>
          <div className="bg-white rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] p-8 lg:p-12 border border-slate-100 flex flex-col lg:flex-row justify-between gap-10 lg:gap-6 items-center lg:divide-x divide-slate-200">
            <div className="flex-1 text-center lg:text-left lg:px-8 first:pl-0 last:pr-0 w-full">
              <div className="text-4xl font-serif font-bold text-[#082348] mb-2">$10B+</div>
              <div className="text-[13px] text-slate-500 font-semibold uppercase tracking-wider">Assets Under Management</div>
            </div>
            <div className="flex-1 text-center lg:text-left lg:px-8 first:pl-0 last:pr-0 w-full">
              <div className="text-4xl font-serif font-bold text-[#082348] mb-2">10,000+</div>
              <div className="text-[13px] text-slate-500 font-semibold uppercase tracking-wider">Active Institutional Clients</div>
            </div>
            <div className="flex-1 text-center lg:text-left lg:px-8 first:pl-0 last:pr-0 w-full">
              <div className="text-4xl font-serif font-bold text-[#082348] mb-2">15+</div>
              <div className="text-[13px] text-slate-500 font-semibold uppercase tracking-wider">Years of Excellence</div>
            </div>
          </div>
        </ScrollAnimation>
      </section>

      {/* As Featured In */}
      <section className="pt-10 pb-6 lg:pt-16 lg:pb-12 bg-corporate-white relative z-10">
        <ScrollAnimation className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="flex flex-col items-center justify-center md:-mt-8">
            <div className="w-full max-w-4xl bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100/60 px-4 py-6 md:px-12 md:py-8 flex flex-col items-center transition-transform hover:-translate-y-1 duration-500">
              <span className="text-[10px] md:text-[12px] font-bold text-slate-400 tracking-[0.2em] uppercase mb-6 md:mb-8">As Featured In</span>
              
              <div className="flex flex-row items-center justify-center gap-4 sm:gap-8 md:gap-16 w-full max-w-full overflow-hidden">
                {/* Yahoo! */}
                <div className="flex flex-col items-center justify-center gap-2 md:gap-3 group shrink-0 cursor-pointer">
                  <div className="w-8 h-8 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-[#6001D2] to-[#430297] flex items-center justify-center text-white font-bold text-[16px] md:text-[24px] italic shadow-[0_4px_12px_rgba(96,1,210,0.25)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_8px_20px_rgba(96,1,210,0.4)] group-hover:rotate-3">
                    Y!
                  </div>
                  <span className="text-slate-600 font-bold text-[12px] sm:text-[14px] md:text-xl transition-colors duration-300 group-hover:text-[#430297]">Yahoo!</span>
                </div>

                {/* Bloomberg */}
                <div className="flex flex-col items-center justify-center gap-2 md:gap-3 group shrink-0 cursor-pointer">
                  <div className="w-8 h-8 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-gray-800 to-black flex items-center justify-center text-white font-bold text-[16px] md:text-[24px] font-serif shadow-[0_4px_12px_rgba(0,0,0,0.2)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_8px_20px_rgba(0,0,0,0.4)] group-hover:-rotate-3">
                    B
                  </div>
                  <span className="text-slate-600 font-bold text-[12px] sm:text-[14px] md:text-xl transition-colors duration-300 group-hover:text-black">Bloomberg</span>
                </div>

                {/* Investing.com */}
                <div className="flex flex-col items-center justify-center gap-2 md:gap-3 group shrink-0 cursor-pointer">
                  <div className="w-8 h-8 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-[#F7931A] to-[#E37A00] flex items-center justify-center text-white font-bold text-[16px] md:text-[24px] font-serif shadow-[0_4px_12px_rgba(247,147,26,0.25)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_8px_20px_rgba(247,147,26,0.4)] group-hover:rotate-3">
                    i
                  </div>
                  <span className="text-slate-600 font-bold text-[12px] sm:text-[14px] md:text-xl transition-colors duration-300 group-hover:text-[#F7931A]">Investing.com</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </section>

      {/* 3. Deal Facilitation (SS1 & SS2 blend) */}
      <section className="py-8 lg:py-12 bg-corporate-white">
        <ScrollAnimation className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative z-10">
                <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1632&auto=format&fit=crop" alt="Corporate Meeting" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-corporate-gold/10 rounded-full blur-3xl z-0"></div>
            </div>
            <div>
              <span className="inline-block text-corporate-gold font-bold tracking-wider uppercase text-[11px] mb-4">Corporate Strategy</span>
              <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-serif font-bold tracking-tight leading-[1.15] text-[#082348] mb-6">
                Private Equity <span className="text-corporate-gold">Deal Facilitation</span>
              </h2>
              <p className="text-[16px] text-slate-500 mb-8 leading-relaxed">
                Baker Jones Holdings specialises in identifying, structuring, and facilitating premium private equity deals for institutional and high-net-worth clients globally.
              </p>

              <ul className="space-y-5 mb-10">
                <li className="flex items-start gap-4">
                  <div className="shrink-0 mt-1 w-6 h-6 rounded-full bg-corporate-gold/10 flex items-center justify-center text-corporate-gold">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-[15px] text-[#082348] mb-1">Exclusive Deal Flow</strong>
                    <span className="text-[14px] text-slate-500">Access opportunities usually reserved for top-tier funds.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="shrink-0 mt-1 w-6 h-6 rounded-full bg-corporate-gold/10 flex items-center justify-center text-corporate-gold">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-[15px] text-[#082348] mb-1">End-to-End Structuring</strong>
                    <span className="text-[14px] text-slate-500">Comprehensive legal and financial deal structuring.</span>
                  </div>
                </li>
              </ul>

              <Link href="/about-us" className="inline-flex items-center justify-center px-8 py-3.5 bg-[#082348] text-white hover:bg-[#051630] rounded-full font-bold text-[14px] transition-all hover:-translate-y-0.5">
                Learn More About Us
              </Link>
            </div>
          </div>
        </ScrollAnimation>
      </section>

      {/* 4. Investment Approach (Modern Bento Grid) */}
      <section id="investment-approach" className="py-8 lg:py-16 bg-white relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-corporate-gold/5 rounded-full blur-[100px] -mr-[400px] -mt-[400px] pointer-events-none"></div>

        <ScrollAnimation className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-8 lg:mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-corporate-gold/10 text-corporate-gold font-bold tracking-[0.15em] uppercase text-[11px] mb-4 lg:mb-6">
              Investment Approach
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-[3.25rem] font-serif font-bold tracking-tight leading-[1.1] text-[#082348] mb-4 lg:mb-6">
              Building Scalable <br />
              <span className="text-corporate-gold italic font-normal">Business Models.</span>
            </h2>
            <p className="text-[16px] lg:text-[18px] text-slate-500 leading-relaxed">
              Our portfolio companies benefit from our proprietary scaling frameworks. We transition businesses from founder-led operations to system-led enterprises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Card 1: Span 2 cols */}
            <div className="md:col-span-2 group bg-white rounded-[2rem] p-8 lg:p-12 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 relative overflow-hidden flex flex-col justify-between min-h-[320px]">
              <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-[#082348]/5 rounded-full group-hover:scale-[2] transition-transform duration-700"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-[#082348] text-white flex items-center justify-center mb-8 shadow-lg">
                  <Users className="w-7 h-7" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-serif font-bold text-[#082348] mb-4">Long-Term Strategic Partnerships</h3>
              </div>
              <p className="text-slate-500 text-[16px] leading-relaxed relative z-10 max-w-lg">
                We don't just invest capital; we invest expertise. We partner with founders who have long-term vision but need operational structure.
              </p>
            </div>

            {/* Card 2: Span 1 col, Dark Theme */}
            <div className="md:col-span-1 group bg-[#082348] rounded-[2rem] p-8 lg:p-10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(8,35,72,0.2)] transition-all duration-500 relative overflow-hidden flex flex-col justify-between min-h-[320px]">
              <div className="absolute -right-10 -top-10 w-48 h-48 bg-white/5 rounded-full group-hover:scale-[2] transition-transform duration-700"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-corporate-gold text-[#082348] flex items-center justify-center mb-8 shadow-lg">
                  <Building2 className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-white mb-4">Operational Optimization</h3>
              </div>
              <p className="text-white/70 text-[15px] leading-relaxed relative z-10">
                We deploy our internal systems and playbooks to streamline operations and increase profit margins.
              </p>
            </div>

            {/* Card 3: Span 1 col, Gold Theme */}
            <div className="md:col-span-1 group bg-corporate-gold rounded-[2rem] p-8 lg:p-10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(212,175,55,0.2)] transition-all duration-500 relative overflow-hidden flex flex-col justify-between min-h-[320px]">
              <div className="absolute -right-10 -top-10 w-48 h-48 bg-white/10 rounded-full group-hover:scale-[2] transition-transform duration-700"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white text-corporate-gold flex items-center justify-center mb-8 shadow-lg">
                  <Globe className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#082348] mb-4">Digital Transformation</h3>
              </div>
              <p className="text-[#082348]/80 text-[15px] leading-relaxed relative z-10 font-medium">
                Modernizing legacy systems and scaling digital infrastructure for exponential growth.
              </p>
            </div>

            {/* Card 4: Span 2 cols */}
            <div className="md:col-span-2 group bg-white rounded-[2rem] p-8 lg:p-12 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 relative overflow-hidden flex flex-col justify-between min-h-[320px]">
              <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-corporate-gold/10 rounded-full group-hover:scale-[2] transition-transform duration-700"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-[#082348] text-white flex items-center justify-center mb-8 shadow-lg">
                  <Shield className="w-7 h-7" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-serif font-bold text-[#082348] mb-4">Sustainable Growth Focus</h3>
              </div>
              <p className="text-slate-500 text-[16px] leading-relaxed relative z-10 max-w-lg">
                We prioritize cash flow, market dominance, and sustainable unit economics over rapid, unstable expansion.
              </p>
            </div>
          </div>
        </ScrollAnimation>
      </section>

      {/* 4. Diverse Opportunities (SS1 Style) */}
      <section className="py-8 lg:py-12 bg-[#FAFAFA]">
        <ScrollAnimation className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-8 lg:mb-12">
            <span className="inline-block text-corporate-gold font-bold tracking-wider uppercase text-[11px] mb-4">Investment Solutions</span>
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-serif font-bold tracking-tight leading-[1.15] text-[#082348] mb-4">
              Diverse Opportunities for <span className="text-corporate-gold">Every Investor</span>
            </h2>
            <p className="text-[16px] text-slate-500 max-w-2xl mx-auto">Explore our comprehensive range of investment vehicles tailored to match your specific risk appetite and time horizon.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <Link href="/capital-markets" className="group relative block h-[380px] rounded-2xl overflow-hidden shadow-lg">
              <img src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop" alt="Capital Markets" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#082348] via-[#082348]/40 to-transparent opacity-90 transition-opacity group-hover:opacity-100"></div>
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <h3 className="text-xl font-serif font-bold text-white mb-2">Capital Markets</h3>
                <span className="text-corporate-gold text-[13px] font-bold uppercase tracking-wider flex items-center group-hover:underline">
                  Explore <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
            {/* Card 2 */}
            <Link href="/private-equity" className="group relative block h-[380px] rounded-2xl overflow-hidden shadow-lg">
              <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop" alt="Private Equity" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#082348] via-[#082348]/40 to-transparent opacity-90 transition-opacity group-hover:opacity-100"></div>
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <h3 className="text-xl font-serif font-bold text-white mb-2">Private Equity</h3>
                <span className="text-corporate-gold text-[13px] font-bold uppercase tracking-wider flex items-center group-hover:underline">
                  Explore <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
            {/* Card 3 */}
            <Link href="/structured-holdings" className="group relative block h-[380px] rounded-2xl overflow-hidden shadow-lg">
              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop" alt="Structured Holdings" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#082348] via-[#082348]/40 to-transparent opacity-90 transition-opacity group-hover:opacity-100"></div>
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <h3 className="text-xl font-serif font-bold text-white mb-2">Structured Holdings</h3>
                <span className="text-corporate-gold text-[13px] font-bold uppercase tracking-wider flex items-center group-hover:underline">
                  Explore <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
            {/* Card 4 */}
            <Link href="/digital-assets" className="group relative block h-[380px] rounded-2xl overflow-hidden shadow-lg">
              <img src="https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=1969&auto=format&fit=crop" alt="Digital Assets" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#082348] via-[#082348]/40 to-transparent opacity-90 transition-opacity group-hover:opacity-100"></div>
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <h3 className="text-xl font-serif font-bold text-white mb-2">Digital Assets</h3>
                <span className="text-corporate-gold text-[13px] font-bold uppercase tracking-wider flex items-center group-hover:underline">
                  Explore <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </div>
        </ScrollAnimation>
      </section>

      {/* 5. The Baker Jones Advantage (Grid of 6) */}
      <section className="py-8 lg:py-12 bg-white">
        <ScrollAnimation className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-8 lg:mb-12">
            <span className="inline-block text-corporate-gold font-bold tracking-wider uppercase text-[11px] mb-4">Why Partner With Us</span>
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-serif font-bold tracking-tight leading-[1.15] text-[#082348]">
              The Baker Jones <span className="text-corporate-gold">Advantage</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Users, title: 'Strategic Partnership', desc: 'We align our interests with yours, acting as true partners in your wealth creation journey.' },
              { icon: Clock, title: 'Years of Experience', desc: 'Our leadership team brings decades of institutional financial market expertise.' },
              { icon: Shield, title: 'Dedicated Support', desc: 'Enjoy personalized advisory services from a dedicated account manager assigned to you.' },
              { icon: Building2, title: 'Institutional-Grade', desc: 'Access the same caliber of investment products usually reserved for large institutions.' },
              { icon: Globe, title: 'Global Network', desc: 'Leverage our extensive worldwide connections for unique cross-border opportunities.' },
              { icon: FileText, title: 'Fee Transparency', desc: 'Clear, straightforward fee structures with no hidden costs or surprise charges.' },
            ].map((item, i) => (
              <div key={i} className="p-8 border border-slate-100 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-shadow bg-white text-center flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-corporate-gold/10 text-corporate-gold flex items-center justify-center mb-6">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-[17px] font-bold text-[#082348] mb-3">{item.title}</h3>
                <p className="text-[14px] text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </ScrollAnimation>
      </section>

      {/* 6. Manage Platform Section (SS2 Blend) */}
      <section className="py-8 lg:py-12 bg-[#FAFAFA]">
        <ScrollAnimation className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="max-w-lg lg:pr-10">
              <span className="inline-block text-corporate-gold font-bold tracking-wider uppercase text-[11px] mb-4">Your Portal</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-tight leading-[1.15] text-[#082348] mb-6">
                Manage Your Investments From Our Secure Online Portal
              </h2>
              <p className="text-[16px] text-slate-500 mb-8 leading-relaxed">
                Gain full visibility into your corporate portfolio with real-time performance tracking and instant access to bespoke operational reports — all from one intuitive, secure dashboard.
              </p>
              <Link href="/login" className="inline-flex items-center justify-center px-8 py-3.5 bg-[#082348] text-white hover:bg-[#051630] rounded-full font-bold text-[14px] transition-all hover:-translate-y-0.5">
                Client Login <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>

            <div className="relative w-full max-w-xl mx-auto lg:mx-0">
              <div className="aspect-[4/3] bg-[#082348] rounded-2xl shadow-2xl flex flex-col overflow-hidden relative border border-white/10">
                {/* Mockup Header */}
                <div className="h-12 bg-black/20 border-b border-white/10 flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <div className="ml-4 h-6 w-1/3 bg-white/10 rounded"></div>
                </div>
                {/* Mockup Body */}
                <div className="flex-1 p-6 flex flex-col gap-6 bg-gradient-to-br from-[#082348] to-[#041124]">
                  <div className="w-40 h-5 bg-white/20 rounded-md"></div>
                  <div className="flex gap-4">
                    <div className="flex-1 h-32 bg-corporate-gold/20 rounded-xl border border-corporate-gold/30 p-4 flex flex-col justify-end">
                      <div className="w-16 h-2 bg-corporate-gold/50 rounded mb-2"></div>
                      <div className="w-24 h-4 bg-corporate-gold rounded"></div>
                    </div>
                    <div className="flex-1 h-32 bg-white/5 rounded-xl border border-white/10 p-4 flex flex-col justify-end">
                      <div className="w-16 h-2 bg-white/20 rounded mb-2"></div>
                      <div className="w-24 h-4 bg-white/40 rounded"></div>
                    </div>
                  </div>
                  <div className="w-full flex-1 bg-white/5 rounded-xl border border-white/10 mt-2"></div>
                </div>

                {/* Floating Mobile Mockup */}
                <div className="absolute -bottom-8 -left-8 w-36 h-64 bg-white border-4 border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
                  <div className="h-4 bg-slate-800 w-full relative">
                    <div className="absolute top-1 left-1/2 -translate-x-1/2 w-12 h-2 bg-black rounded-b-lg"></div>
                  </div>
                  <div className="flex-1 bg-slate-50 p-3 flex flex-col gap-3">
                    <div className="w-16 h-3 bg-slate-200 rounded"></div>
                    <div className="w-full h-16 bg-corporate-gold/10 rounded-lg border border-corporate-gold/20"></div>
                    <div className="w-full h-10 bg-slate-200 rounded-lg"></div>
                    <div className="w-full h-10 bg-slate-200 rounded-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </section>

      {/* 7. Testimonials */}
      <section className="py-8 lg:py-12 bg-white">
        <ScrollAnimation className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-8 lg:mb-12">
            <span className="inline-block text-corporate-gold font-bold tracking-wider uppercase text-[11px] mb-4">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-tight leading-[1.15] text-[#082348]">
              What Our <span className="text-corporate-gold">Clients Say</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              { text: "Baker Jones Holdings has completely transformed our corporate treasury management. Their access to exclusive deals is unparalleled in the market.", author: "James T.", role: "CFO" },
              { text: "The level of transparency and dedicated support we receive is outstanding. A truly institutional-grade experience from day one.", author: "Sarah H.", role: "Director" },
              { text: "Their strategic insight and robust digital portal have made managing our structural holdings incredibly efficient and secure.", author: "Michael R.", role: "Managing Partner" }
            ].map((t, i) => (
              <div key={i} className="bg-[#FAFAFA] p-8 lg:p-10 rounded-2xl border border-slate-100 relative">
                <div className="text-corporate-gold text-4xl font-serif absolute top-6 right-8 opacity-30">"</div>
                <div className="flex gap-1 text-corporate-gold mb-6">
                  {[...Array(5)].map((_, idx) => (
                    <svg key={idx} className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                  ))}
                </div>
                <p className="text-[15px] text-slate-600 leading-relaxed mb-8 italic">"{t.text}"</p>
                <div>
                  <strong className="block text-[#082348] font-bold text-[15px]">{t.author}</strong>
                  <span className="text-[13px] text-slate-500 uppercase tracking-widest">{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollAnimation>
      </section>

      {/* 8. FAQ */}
      <section className="py-8 lg:py-12 bg-[#FAFAFA]">
        <ScrollAnimation className="max-w-[800px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-8 lg:mb-12">
            <span className="inline-block text-corporate-gold font-bold tracking-wider uppercase text-[11px] mb-4">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-tight leading-[1.15] text-[#082348] mb-4 lg:mb-6">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-0 border-t border-slate-200">
            {[
              { q: "What types of investments do you offer?", a: "We focus on institutional-grade opportunities including private equity, structured notes, digital assets, and select capital market instruments." },
              { q: "Who is eligible to open an account?", a: "Our services are designed for corporate entities, trusts, and high-net-worth individuals seeking sophisticated wealth management solutions." },
              { q: "How secure is the online portal?", a: "Our platform employs bank-grade 256-bit encryption, strict access controls, and regular security audits to ensure your data and assets remain completely secure." },
              { q: "What is the minimum investment requirement?", a: "Minimum investment amounts vary depending on the specific product and asset class. Please contact our advisory team for detailed information." }
            ].map((faq, i) => (
              <details key={i} className="group border-b border-slate-200">
                <summary className="flex justify-between items-center font-semibold cursor-pointer list-none text-[15px] text-[#082348] py-6 hover:text-corporate-gold transition-colors">
                  {faq.q}
                  <span className="transition group-open:rotate-180">
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  </span>
                </summary>
                <p className="text-slate-500 pb-6 text-[14px] leading-relaxed">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </ScrollAnimation>
      </section>

      {/* 9. CTA */}
      <section className="bg-[#082348] py-10 lg:py-16">
        <ScrollAnimation className="max-w-[1400px] mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">Ready to Access Institutional Opportunities?</h2>
          <p className="text-white/70 text-[16px] max-w-2xl mx-auto mb-10">
            Join thousands of successful corporate clients who trust Baker Jones Holdings with their strategic capital growth.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/new-application-form" className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 bg-corporate-gold text-[#082348] hover:bg-yellow-500 rounded-full font-bold text-[15px] transition-all">
              Open Account
            </Link>
            <Link href="/contact-us" className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 bg-transparent border border-white/30 text-white hover:bg-white/10 rounded-full font-bold text-[15px] transition-all">
              Contact Us
            </Link>
          </div>
        </ScrollAnimation>
      </section>

      {/* Footer */}
      <footer className="bg-corporate-white border-t border-gray-200 pt-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 mb-12">
            <div className="md:col-span-5 lg:col-span-6">
              <Link href="/home-2" className="inline-block mb-4">
                <Image src="/logo/logo.svg" width={160} height={40} alt="Baker Jones Holdings logo" />
              </Link>
              <p className="text-[12px] text-slate-500 leading-relaxed max-w-[280px]">
                Baker Jones Holdings Ltd. LEI: 2138006FBDND9MVSV504. Company No: 04473176.
              </p>
            </div>
            <div className="md:col-span-2 lg:col-span-2">
              <h4 className="text-[13px] font-bold text-[#082348] mb-4">Products</h4>
              <ul className="space-y-3">
                <li><Link href="/capital-markets" className="text-[12px] font-medium text-slate-500 hover:text-[#082348]">Capital Markets</Link></li>
                <li><Link href="/private-equity" className="text-[12px] font-medium text-slate-500 hover:text-[#082348]">Private Equity</Link></li>
                <li><Link href="/structured-holdings" className="text-[12px] font-medium text-slate-500 hover:text-[#082348]">Structured Holdings</Link></li>
                <li><Link href="/digital-assets" className="text-[12px] font-medium text-slate-500 hover:text-[#082348]">Digital Assets</Link></li>
              </ul>
            </div>
            <div className="md:col-span-2 lg:col-span-2">
              <h4 className="text-[13px] font-bold text-[#082348] mb-4">Legal</h4>
              <ul className="space-y-3">
                <li><Link href="/terms" className="text-[12px] font-medium text-slate-500 hover:text-[#082348]">Terms of Use</Link></li>
                <li><Link href="/privacy" className="text-[12px] font-medium text-slate-500 hover:text-[#082348]">Privacy Policy</Link></li>
                <li><Link href="/cookie-policy" className="text-[12px] font-medium text-slate-500 hover:text-[#082348]">Cookie Policy</Link></li>
                <li><Link href="/regulatory-information" className="text-[12px] font-medium text-slate-500 hover:text-[#082348]">Regulatory Info</Link></li>
              </ul>
            </div>
            <div className="md:col-span-3 lg:col-span-2">
              <h4 className="text-[13px] font-bold text-[#082348] mb-4">Company</h4>
              <ul className="space-y-3">
                <li><Link href="/home-2" className="text-[12px] font-medium text-slate-500 hover:text-[#082348]">Home</Link></li>
                <li><Link href="/about-us" className="text-[12px] font-medium text-slate-500 hover:text-[#082348]">About Us</Link></li>
                <li><Link href="/login" className="text-[12px] font-medium text-slate-500 hover:text-[#082348]">Platform</Link></li>
                <li><Link href="/contact-us" className="text-[12px] font-medium text-slate-500 hover:text-[#082348]">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="py-6 border-t border-slate-100 text-center">
          <p className="text-[11px] text-slate-400 font-medium">
            ©{new Date().getFullYear()} Baker Jones Holdings Ltd. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
