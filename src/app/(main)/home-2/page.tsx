import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, Star, ChevronDown, CheckCircle2, TrendingUp, Building2, Briefcase, Landmark, Shield, Clock, BarChart } from 'lucide-react';
import { ScrollAnimation } from '@/components/ScrollAnimation';
import { InvestmentCalculator } from '@/components/InvestmentCalculator';
import Home2Header from '@/components/Home2Header';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Home 2 | Baker Jones Holdings",
  description: "Building Long-Term Value Through Strategic Investments",
};

export default function Home2Page() {
  return (
    <div className="bg-corporate-white text-slate-900 font-inter antialiased">

      {/* Sticky Header */}
      <Home2Header />

      {/* 1. Hero Section */}
      <section className="bg-[#FAFAFA] pt-12 pb-16 lg:pt-0 lg:pb-0 lg:h-[calc(100vh-76px)] flex flex-col justify-center">
        <ScrollAnimation className="max-w-[1400px] mx-auto px-6 lg:px-8 w-full h-full flex flex-col py-6 lg:py-8" delay={0.1}>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 mb-8 lg:mb-10 shrink-0">
            <div className="max-w-2xl">
              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex gap-1 text-[#FBBF24]">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current border-none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <span className="text-[13px] font-semibold text-slate-500 uppercase tracking-widest">Rated 4.9/5 by 5000+ Clients</span>
              </div>

              <h1 className="text-5xl lg:text-[4rem] font-semibold tracking-tighter leading-[1.05] text-[#082348]">
                Building Value Through <br /> Strategic Investments.
              </h1>
            </div>

            <div className="flex flex-col items-start lg:items-end gap-5 lg:pb-3">
              <p className="text-slate-500 text-[14px] max-w-[280px] lg:text-right leading-relaxed">
                Expertly managed structural growth and Pre-IPO investments tailored for long-term scalability.
              </p>
              <Link href="/new-application-form" className="inline-flex items-center justify-center px-8 py-3.5 bg-[#082348] text-white hover:bg-[#051630] rounded-full font-bold text-[14px] transition-all shadow-xl hover:-translate-y-0.5">
                Open Account <ArrowUpRight className="ml-2 w-4 h-4 stroke-[2.5]" />
              </Link>
            </div>
          </div>

          <div className="w-full h-[300px] lg:h-[420px] shrink-0 rounded-[2rem] overflow-hidden shadow-2xl relative mb-8">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
              alt="Corporate building"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#082348]/40 to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 mt-auto shrink-0 pt-2 pb-4">
            <div className="flex flex-col border-l-2 border-corporate-gold pl-5">
              <span className="text-3xl font-semibold text-[#082348] tracking-tight">$10B+</span>
              <span className="text-[13px] text-slate-500 font-medium mt-1">Assets Under Management</span>
            </div>
            <div className="flex flex-col border-l-2 border-corporate-gold pl-5">
              <span className="text-3xl font-semibold text-[#082348] tracking-tight">15+</span>
              <span className="text-[13px] text-slate-500 font-medium mt-1">Years of Market Excellence</span>
            </div>
            <div className="flex flex-col border-l-2 border-corporate-gold pl-5">
              <span className="text-3xl font-semibold text-[#082348] tracking-tight">100+</span>
              <span className="text-[13px] text-slate-500 font-medium mt-1">Global Institutional Partners</span>
            </div>
          </div>
        </ScrollAnimation>
      </section>

      {/* 2. Your Wealth Section */}
      <section className="py-8 lg:py-10 bg-white">
        <ScrollAnimation className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div className="max-w-xl">
              <span className="inline-block text-corporate-gold font-bold tracking-wider uppercase text-[11px] mb-4">Strategic Capital</span>
              <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-semibold tracking-tight leading-[1.15] text-[#082348] mb-6">Your Business, Thoughtfully Scaled</h2>
              <p className="text-[15px] text-slate-500 mb-8 leading-relaxed max-w-2xl">
                At Baker Jones Holdings, we provide tailored corporate strategies that prioritise capital preservation, operational efficiency, and long-term scalable growth.
              </p>

              {/* As Featured In */}
              <div className="mb-8">
                <span className="block text-[12px] text-slate-400 font-medium mb-4 uppercase tracking-wider">As Featured in</span>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2 group cursor-default">
                    <div className="w-6 h-6 rounded bg-[#6001D2] flex items-center justify-center text-white font-bold text-[12px] italic shadow-sm group-hover:scale-110 transition-transform">Y!</div>
                    <span className="text-slate-700 text-[14px] font-bold group-hover:text-[#6001D2] transition-colors">Yahoo!</span>
                  </div>
                  <span className="text-slate-300">|</span>
                  <div className="flex items-center gap-2 group cursor-default">
                    <div className="w-6 h-6 rounded bg-black flex items-center justify-center text-white font-bold text-[14px] font-serif shadow-sm group-hover:scale-110 transition-transform">B</div>
                    <span className="text-slate-700 text-[14px] font-bold group-hover:text-black transition-colors">Bloomberg</span>
                  </div>
                  <span className="text-slate-300">|</span>
                  <div className="flex items-center gap-2 group cursor-default">
                    <div className="w-6 h-6 rounded bg-[#F97316] flex items-center justify-center text-white font-bold text-[13px] shadow-sm group-hover:scale-110 transition-transform">i</div>
                    <span className="text-slate-700 text-[14px] font-bold group-hover:text-[#F97316] transition-colors">Investing.com</span>
                  </div>
                </div>
              </div>

              <Link href="/about" className="inline-flex items-center justify-center px-8 py-3.5 bg-corporate-gold text-white hover:bg-yellow-600 rounded-full font-bold text-[14px] transition-all hover:-translate-y-0.5">
                Discover More
              </Link>
            </div>

            <div className="flex flex-col gap-8 lg:pt-4">
              <div className="flex gap-6 group">
                <div className="shrink-0 mt-1 w-10 h-10 rounded-full bg-corporate-gold/10 flex items-center justify-center text-corporate-gold">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[17px] font-bold mb-3 text-[#082348]">Tailored Investment Strategies</h3>
                  <p className="text-slate-500 text-[14px] leading-relaxed mb-4">Achieve your financial goals with customised strategies focused on capital preservation and consistent returns.</p>
                  <span className="inline-block px-3 py-1 bg-slate-100 text-slate-500 text-[11px] font-bold uppercase tracking-widest rounded-md">Strategic</span>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="shrink-0 mt-1 w-10 h-10 rounded-full bg-corporate-gold/10 flex items-center justify-center text-corporate-gold">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[17px] font-bold mb-3 text-[#082348]">Secure Your Financial Future</h3>
                  <p className="text-slate-500 text-[14px] leading-relaxed mb-4">We offer structural holdings, pre-IPO investments, and digital assets tailored strictly to your corporate goals.</p>
                  <span className="inline-block px-3 py-1 bg-slate-100 text-slate-500 text-[11px] font-bold uppercase tracking-widest rounded-md">Secure</span>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="shrink-0 mt-1 w-10 h-10 rounded-full bg-corporate-gold/10 flex items-center justify-center text-corporate-gold">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[17px] font-bold mb-3 text-[#082348]">Exclusive Investment Access</h3>
                  <p className="text-slate-500 text-[14px] leading-relaxed mb-4">Access investment-grade opportunities including select corporate bonds and carefully curated market expansions.</p>
                  <span className="inline-block px-3 py-1 bg-slate-100 text-slate-500 text-[11px] font-bold uppercase tracking-widest rounded-md">Accessible</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </section>

      {/* 3. Manage Platform Section */}
      <section className="py-8 lg:py-10 bg-[#FAFAFA]">
        <ScrollAnimation className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-corporate-gold font-bold tracking-wider uppercase text-[11px] mb-4">Your Gateway</span>
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-semibold tracking-tight leading-[1.15] text-[#082348] mb-6">Manage Your Investments<br />From Our Secure Online Portal</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="max-w-lg mx-auto lg:mx-0 lg:ml-auto text-center lg:text-left">
              <p className="text-[15px] text-slate-500 mb-8 leading-relaxed max-w-2xl">
                Our secure online portal gives you full visibility into your corporate portfolio, real-time performance tracking, and instant access to bespoke operational reports — all from one intuitive dashboard.
              </p>
              <Link href="/login" className="inline-flex items-center text-corporate-gold font-bold hover:text-yellow-600 transition-colors text-[14px]">
                Learn more about our platform <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
            <div className="relative w-full max-w-lg mx-auto lg:mx-0 lg:mr-auto">
              <div className="aspect-video bg-[#082348] border border-[#082348]/10 rounded-2xl shadow-[0_20px_50px_-12px_rgba(8,35,72,0.3)] flex flex-col overflow-hidden relative">
                <div className="h-10 border-b border-white/10 flex items-center px-4 gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
                </div>
                <div className="flex-1 p-6 flex flex-col gap-4">
                  <div className="w-32 h-4 bg-white/10 rounded-full"></div>
                  <div className="flex gap-4">
                    <div className="flex-1 h-24 bg-corporate-gold/20 rounded-xl border border-corporate-gold/30"></div>
                    <div className="flex-1 h-24 bg-white/5 rounded-xl"></div>
                  </div>
                </div>

                <div className="absolute -bottom-6 -left-6 w-32 h-40 bg-white border border-slate-100 rounded-2xl shadow-2xl flex flex-col p-4 gap-3 z-10">
                  <div className="w-10 h-10 rounded-full bg-corporate-gold/10 text-corporate-gold flex items-center justify-center">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full mt-auto"></div>
                  <div className="w-2/3 h-2 bg-slate-100 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </section>

      {/* 4. Bespoke Investment Solutions */}
      <section className="py-8 lg:py-10 bg-white">
        <ScrollAnimation className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-corporate-gold font-bold tracking-wider uppercase text-[11px] mb-4">What We Offer</span>
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-semibold tracking-tight leading-[1.15] text-[#082348] mb-6">Bespoke Investment Solutions</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#FAFAFA] p-8 rounded-2xl group hover:shadow-lg transition-all duration-300">
              <div className="flex justify-between items-start mb-12">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-corporate-gold shadow-sm">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div className="w-8 h-8 rounded-full bg-corporate-gold text-white flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 -rotate-45" />
                </div>
              </div>
              <h3 className="text-[17px] font-bold mb-3 text-[#082348]">Strategic Investments</h3>
              <p className="text-slate-500 text-[14px] leading-relaxed">Long-term capital allocation across high-growth markets designed for sustainable corporate growth.</p>
            </div>

            <div className="bg-[#FAFAFA] p-8 rounded-2xl group hover:shadow-lg transition-all duration-300">
              <div className="flex justify-between items-start mb-12">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-corporate-gold shadow-sm">
                  <Landmark className="w-4 h-4" />
                </div>
                <div className="w-8 h-8 rounded-full bg-corporate-gold text-white flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 -rotate-45" />
                </div>
              </div>
              <h3 className="text-[17px] font-bold mb-3 text-[#082348]">Business Acquisitions</h3>
              <p className="text-slate-500 text-[14px] leading-relaxed">Acquiring established entities with scalable infrastructure for conservative and steady expansion.</p>
            </div>

            <div className="bg-[#FAFAFA] p-8 rounded-2xl group hover:shadow-lg transition-all duration-300">
              <div className="flex justify-between items-start mb-12">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-corporate-gold shadow-sm">
                  <Building2 className="w-4 h-4" />
                </div>
                <div className="w-8 h-8 rounded-full bg-corporate-gold text-white flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 -rotate-45" />
                </div>
              </div>
              <h3 className="text-[17px] font-bold mb-3 text-[#082348]">Real Estate Holdings</h3>
              <p className="text-slate-500 text-[14px] leading-relaxed">Access institutional-grade premium commercial and digital real estate opportunities.</p>
            </div>

            <div className="bg-[#FAFAFA] p-8 rounded-2xl group hover:shadow-lg transition-all duration-300">
              <div className="flex justify-between items-start mb-12">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-corporate-gold shadow-sm">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div className="w-8 h-8 rounded-full bg-corporate-gold text-white flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 -rotate-45" />
                </div>
              </div>
              <h3 className="text-[17px] font-bold mb-3 text-[#082348]">Growth Partnerships</h3>
              <p className="text-slate-500 text-[14px] leading-relaxed">Strategic joint ventures designed to accelerate market share and brand presence globally.</p>
            </div>
          </div>
        </ScrollAnimation>
      </section>

      {/* 4A. Curated Collections (Soft / Cute Layout) */}
      <section className="py-10 lg:py-12 bg-white overflow-hidden">
        <ScrollAnimation className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            <div className="order-2 lg:order-1 relative h-[500px] w-full flex flex-col justify-center">

              {/* Structured Premium Cards */}
              <div className="w-full max-w-[320px] ml-auto p-6 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 group hover:-translate-y-1 transition-all duration-300 cursor-pointer relative z-10 translate-x-4 lg:translate-x-8">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 rounded bg-[#FAFAFA] border border-slate-100 text-[#082348] flex items-center justify-center transition-colors group-hover:border-[#082348]">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-[#082348] text-[15px]">Growth Equity</h3>
                </div>
                <p className="text-[13px] text-slate-500 leading-relaxed">Access to rapidly scaling private companies with institutional potential.</p>
              </div>

              <div className="w-full max-w-[360px] mx-auto p-8 bg-[#082348] text-white rounded-2xl shadow-[0_20px_40px_rgba(8,35,72,0.2)] group hover:-translate-y-1 transition-all duration-300 cursor-pointer relative z-20 -my-4 lg:-my-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded bg-white/10 border border-white/5 text-corporate-gold flex items-center justify-center">
                    <Star className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-white/50 border border-white/10 px-3 py-1 rounded-sm">Premium</span>
                </div>
                <h3 className="font-bold text-[18px] mb-2">Pre-IPO Access</h3>
                <p className="text-[13px] text-white/70 leading-relaxed">Exclusive entry to unicorns before they go public, bypassing traditional retail channels.</p>
              </div>

              <div className="w-full max-w-[320px] mr-auto p-6 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 group hover:-translate-y-1 transition-all duration-300 cursor-pointer relative z-10 -translate-x-4 lg:-translate-x-8">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 rounded bg-corporate-gold/5 border border-corporate-gold/20 text-corporate-gold flex items-center justify-center transition-colors group-hover:bg-corporate-gold group-hover:text-white group-hover:border-corporate-gold">
                    <Shield className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-[#082348] text-[15px]">Corporate Bonds</h3>
                </div>
                <p className="text-[13px] text-slate-500 leading-relaxed">Stable yield generation focused on capital preservation and fixed periodic returns.</p>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <span className="inline-block px-4 py-1.5 bg-corporate-gold/10 text-corporate-gold font-bold tracking-wider uppercase text-[11px] rounded-full mb-6">Curated Portfolios</span>
              <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-semibold tracking-tight leading-[1.15] text-[#082348] mb-6">
                Investing doesn't have to be intimidating.
              </h2>
              <p className="text-[15px] text-slate-500 mb-8 leading-relaxed max-w-2xl">
                We've packaged our most exclusive institutional-grade assets into beautifully simple, curated collections. Whether you are seeking aggressive growth or stable yield, our portfolios are designed to be approachable, transparent, and effortlessly managed.
              </p>
              <Link href="/register" className="inline-flex items-center justify-center px-8 py-4 bg-[#FAFAFA] text-[#082348] hover:bg-[#082348] hover:text-white border border-gray-200 rounded-full font-bold text-[14px] transition-all shadow-sm hover:shadow-xl hover:-translate-y-1">
                Explore Collections <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>

          </div>
        </ScrollAnimation>
      </section>

      {/* 4B. Global Presence (Dark Themed) */}
      <section className="py-10 lg:py-12 bg-[#082348] relative overflow-hidden">
        {/* Subtle background abstract */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-corporate-gold opacity-5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
        <ScrollAnimation className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <span className="inline-block text-corporate-gold font-bold tracking-wider uppercase text-[11px] mb-4">Global reach, Local precision</span>
              <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-semibold tracking-tight leading-[1.15] text-white mb-6">
                Capital Markets <br /><span className="text-white/50">Without Borders.</span>
              </h2>
              <p className="text-slate-300 text-[16px] leading-relaxed mb-10 max-w-lg">
                Your portfolio should not be limited by geography. We execute high-conviction strategies across developed and emerging markets, leveraging on-the-ground intelligence to uncover asymmetric opportunities.
              </p>

              <div className="grid grid-cols-2 gap-x-8 gap-y-10">
                <div>
                  <div className="text-corporate-gold text-2xl font-bold mb-1">London</div>
                  <div className="text-white/60 text-[13px]">European Headquarters</div>
                </div>
                <div>
                  <div className="text-corporate-gold text-2xl font-bold mb-1">New York</div>
                  <div className="text-white/60 text-[13px]">Equities & Fixed Income</div>
                </div>
                <div>
                  <div className="text-corporate-gold text-2xl font-bold mb-1">Singapore</div>
                  <div className="text-white/60 text-[13px]">Asian Markets Desk</div>
                </div>
                <div>
                  <div className="text-corporate-gold text-2xl font-bold mb-1">Dubai</div>
                  <div className="text-white/60 text-[13px]">Commodities & Wealth</div>
                </div>
              </div>
            </div>

            <div className="relative h-[400px] lg:h-[550px] w-full rounded-[2rem] overflow-hidden shadow-2xl shadow-[#041225]">
              <img src="https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=1200&auto=format&fit=crop" alt="Global Markets" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-[#082348] mix-blend-color opacity-80"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#082348] via-transparent to-transparent"></div>

              <div className="absolute bottom-6 left-6 right-6 lg:bottom-10 lg:left-10 lg:right-10 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-6">
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <div className="text-white/60 text-[12px] uppercase tracking-wider mb-1">Global Fund Return</div>
                    <div className="text-white text-3xl font-bold">18.4% <span className="text-corporate-gold text-[16px] font-normal">IRR</span></div>
                  </div>
                  <TrendingUp className="text-corporate-gold w-8 h-8" />
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-corporate-gold rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </section>

      {/* 4C. Performance Focus */}
      <section className="py-10 lg:py-12 bg-white">
        <ScrollAnimation className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1 relative">
              {/* Offset abstract blocks */}
              <div className="bg-[#FAFAFA] rounded-[2rem] p-10 lg:p-14 border border-gray-100 shadow-2xl relative z-10">
                <div className="text-[12px] font-bold text-corporate-gold uppercase tracking-widest mb-6">Audited Performance</div>

                <div className="mb-10">
                  <div className="text-5xl lg:text-6xl font-semibold tracking-tighter text-[#082348] mb-2">12.8%</div>
                  <div className="text-slate-500 text-[14px]">Average annualized return over 5 years (net of fees)</div>
                </div>

                <div className="mb-10">
                  <div className="text-5xl lg:text-6xl font-semibold tracking-tighter text-[#082348] mb-2">$2.4B</div>
                  <div className="text-slate-500 text-[14px]">Active capital deployed in alternative markets</div>
                </div>

                <Link href="/register" className="inline-flex w-full items-center justify-center px-8 py-4 bg-[#082348] text-white hover:bg-[#051630] rounded-xl font-bold text-[14px] transition-all shadow-xl hover:-translate-y-0.5">
                  Begin Investing <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
              {/* Background offset block */}
              <div className="absolute top-8 -right-8 w-full h-full border-2 border-corporate-gold/20 rounded-[2rem] -z-10 hidden md:block"></div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-semibold tracking-tight leading-[1.15] text-[#082348] mb-6">
                Outperforming Through Precision.
              </h2>
              <p className="text-[15px] text-slate-500 mb-8 leading-relaxed max-w-2xl">
                We don't chase trends; we engineer returns. Our algorithmic risk-management protocols combined with deep institutional relationships allow us to deliver consistent alpha, regardless of market volatility.
              </p>
              <ul className="space-y-4 mb-10">
                <li className="flex items-start gap-4">
                  <div className="mt-1 w-6 h-6 rounded-full bg-corporate-gold/20 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-corporate-gold" />
                  </div>
                  <span className="text-[#082348] font-medium">Institutional-grade risk hedging protocols.</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1 w-6 h-6 rounded-full bg-corporate-gold/20 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-corporate-gold" />
                  </div>
                  <span className="text-[#082348] font-medium">Direct ownership structure via segregated accounts.</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1 w-6 h-6 rounded-full bg-corporate-gold/20 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-corporate-gold" />
                  </div>
                  <span className="text-[#082348] font-medium">Quarterly liquidity options on select portfolios.</span>
                </li>
              </ul>
            </div>
          </div>
        </ScrollAnimation>
      </section>

      {/* 5. Trusted Advice */}
      <section className="py-8 lg:py-10 bg-[#FAFAFA]">
        <ScrollAnimation className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* The pill image collage */}
            <div className="flex gap-4 justify-center items-center h-[300px] lg:h-[450px]">
              <div className="w-1/3 h-full">
                <div className="w-full h-full rounded-full overflow-hidden shadow-lg transform -translate-y-6">
                  <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover grayscale opacity-80 mix-blend-multiply" alt="" />
                </div>
              </div>
              <div className="w-1/3 h-[110%] z-10 ">
                <div className="w-full h-full rounded-full overflow-hidden shadow-2xl">
                  <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover grayscale" alt="" />
                </div>
              </div>
              <div className="w-1/3 h-full ">
                <div className="w-full h-full rounded-full overflow-hidden shadow-lg transform translate-y-6">
                  <img src="https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover grayscale opacity-80 mix-blend-multiply" alt="" />
                </div>
              </div>
            </div>

            <div className="max-w-xl mx-auto lg:mx-0 lg:ml-12">
              <span className="inline-block text-corporate-gold font-bold tracking-wider uppercase text-[11px] mb-4">Trusted Experience</span>
              <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-semibold tracking-tight leading-[1.15] text-[#082348] mb-6">Trusted Advice.<br />Backed by Experience.</h2>
              <p className="text-[15px] text-slate-500 mb-8 leading-relaxed max-w-2xl">
                At Baker Jones Holdings, our experienced partners work closely with you to build personalised corporate strategies tailored to your enterprise goals. We take the time to understand your needs — from operational scaling and capital preservation to digital transformation objectives.
              </p>
              <Link href="/contact" className="inline-flex items-center justify-center px-8 py-3.5 bg-corporate-gold text-white hover:bg-yellow-600 rounded-full font-bold text-[14px] transition-all hover:-translate-y-0.5">
                Contact Us
              </Link>
            </div>
          </div>
        </ScrollAnimation>
      </section>

      {/* 6. Partner Section */}
      <section className="py-8 lg:py-10 bg-white border-b border-gray-100">
        <ScrollAnimation className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-semibold tracking-tight leading-[1.15] text-[#082348] mb-6">Your Partner in Income, Access, and Risk Management</h2>
              <p className="text-[15px] text-slate-500 mb-8 leading-relaxed max-w-2xl">
                Partner with Baker Jones Holdings for tailored business strategies that prioritise stability, robust systems, and smart long-term growth.
              </p>
              <Link href="/new-application-form" className="inline-flex items-center justify-center px-8 py-3.5 bg-[#082348] text-white hover:bg-[#051630] rounded-full font-bold text-[14px] transition-all hover:-translate-y-0.5">
                Apply Now
              </Link>
            </div>
            <div>
              <p className="text-[14px] text-slate-500 leading-relaxed border-l-2 border-corporate-gold pl-8 py-2">
                In today's dynamic business environment, making confident structural decisions requires deep insight and experience. At Baker Jones Holdings, we deliver strategic guidance, innovative infrastructure access, and risk-managed strategies to help you grow and protect your enterprise — with full transparency, every step of the way.
              </p>
            </div>
          </div>
        </ScrollAnimation>
      </section>

      {/* 7. Empowering Investors */}
      <section className="py-8 lg:py-10 bg-[#FAFAFA]">
        <ScrollAnimation className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="mb-12 max-w-2xl">
            <span className="inline-block text-corporate-gold font-bold tracking-wider uppercase text-[11px] mb-4">Financial Growth</span>
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-semibold tracking-tight leading-[1.15] text-[#082348] mb-6">Empowering investors to invest with Clarity and Control</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-10 rounded-3xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-white hover:border-slate-100 transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#FAFAFA] flex items-center justify-center text-corporate-gold mb-6 border border-slate-100">
                <Briefcase className="w-4 h-4" />
              </div>
              <h3 className="text-[17px] font-bold mb-3 text-[#082348]">Strategic Guidance</h3>
              <p className="text-slate-500 text-[14px] leading-relaxed">Connect with our skilled, licensed operational professionals with deep knowledge of market expansion.</p>
            </div>
            <div className="bg-white p-10 rounded-3xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-white hover:border-slate-100 transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#FAFAFA] flex items-center justify-center text-corporate-gold mb-6 border border-slate-100">
                <Building2 className="w-4 h-4" />
              </div>
              <h3 className="text-[17px] font-bold mb-3 text-[#082348]">Collaborative Approach</h3>
              <p className="text-slate-500 text-[14px] leading-relaxed">We work alongside you to develop tailored frameworks aligned with your specific goals.</p>
            </div>
            <div className="bg-white p-10 rounded-3xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-white hover:border-slate-100 transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#FAFAFA] flex items-center justify-center text-corporate-gold mb-6 border border-slate-100">
                <Shield className="w-4 h-4" />
              </div>
              <h3 className="text-[17px] font-bold mb-3 text-[#082348]">Trusted Platform</h3>
              <p className="text-slate-500 text-[14px] leading-relaxed">Operate through a secure, robust digital platform focused on transparency.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-10 rounded-3xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-white hover:border-slate-100 transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#FAFAFA] flex items-center justify-center text-corporate-gold mb-6 border border-slate-100">
                <Clock className="w-4 h-4" />
              </div>
              <h3 className="text-[17px] font-bold mb-3 text-[#082348]">24/7 Dedicated Support</h3>
              <p className="text-slate-500 text-[14px] leading-relaxed">Our local operational team is here when you need us most — ready to answer questions.</p>
            </div>
            <div className="bg-white p-10 rounded-3xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-white hover:border-slate-100 transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#FAFAFA] flex items-center justify-center text-corporate-gold mb-6 border border-slate-100">
                <BarChart className="w-4 h-4" />
              </div>
              <h3 className="text-[17px] font-bold mb-3 text-[#082348]">Transparent Reporting</h3>
              <p className="text-slate-500 text-[14px] leading-relaxed">Access clear, detailed performance reports and enterprise updates through our portal.</p>
            </div>
          </div>
        </ScrollAnimation>
      </section>

      {/* 7.5. Investment Calculator */}
      <InvestmentCalculator />

      {/* 8. FAQ Section */}
      <section className="py-8 lg:py-10 bg-white">
        <ScrollAnimation className="max-w-[800px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-corporate-gold font-bold tracking-wider uppercase text-[11px] mb-4">FAQ</span>
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-semibold tracking-tight leading-[1.15] text-[#082348] mb-6">Most Popular Questions</h2>
            <p className="text-[14px] text-slate-500">We offer a range of corporate solutions including strategic acquisitions, operational consulting, and digital infrastructure.</p>
          </div>

          <div className="space-y-0 border-t border-slate-200">
            {/* Simple FAQ items using HTML details/summary */}
            <details className="group border-b border-slate-200">
              <summary className="flex justify-between items-center font-semibold cursor-pointer list-none text-[15px] text-[#082348] py-6 hover:text-corporate-gold transition-colors">
                How can I scale my business operations sustainably?
                <span className="transition group-open:rotate-180">
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </span>
              </summary>
              <p className="text-slate-500 pb-6 text-[14px] leading-relaxed">
                Our strategic consulting and digital infrastructure products are specifically designed to provide consistent, reliable scaling frameworks. We work with you to create a modern operational stack that matches your needs.
              </p>
            </details>

            <details className="group border-b border-slate-200">
              <summary className="flex justify-between items-center font-semibold cursor-pointer list-none text-[15px] text-[#082348] py-6 hover:text-corporate-gold transition-colors">
                What makes Baker Jones Holdings different?
                <span className="transition group-open:rotate-180">
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </span>
              </summary>
              <p className="text-slate-500 pb-6 text-[14px] leading-relaxed">
                Baker Jones Holdings combines institutional-grade operational expertise with personalized advisory services. We prioritize transparency, capital preservation, and building long-term relationships rather than short-term gains.
              </p>
            </details>

            <details className="group border-b border-slate-200">
              <summary className="flex justify-between items-center font-semibold cursor-pointer list-none text-[15px] text-[#082348] py-6 hover:text-corporate-gold transition-colors">
                Are these strategies suitable for conservative entities?
                <span className="transition group-open:rotate-180">
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </span>
              </summary>
              <p className="text-slate-500 pb-6 text-[14px] leading-relaxed">
                Absolutely. Many of our frameworks, particularly our structural and backend offerings, are designed with conservative growth in mind. We focus on asset preservation and steady efficiency rather than high-risk speculation.
              </p>
            </details>
          </div>
        </ScrollAnimation>
      </section>

      {/* Vossen-style Footer */}
      <footer className="bg-white border-t border-gray-100 pt-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 mb-12">
            {/* Col 1 */}
            <div className="md:col-span-5 lg:col-span-6">
              <Link href="/home-2" className="inline-block mb-4">
                <Image src="/logo/logo.svg" width={160} height={40} alt="Baker Jones Holdings logo" />
              </Link>
              <p className="text-[12px] text-slate-400 leading-relaxed max-w-[280px]">
                Baker Jones Holdings Ltd. LEI: 2138006FBDND9MVSV504. Company No: 04473176.
              </p>
            </div>

            {/* Col 2 */}
            <div className="md:col-span-2 lg:col-span-2">
              <h4 className="text-[13px] font-bold text-black mb-4">Products</h4>
              <ul className="space-y-3">
                <li><Link href="#" className="text-[12px] font-medium text-slate-500 hover:text-black">Stocks & Shares</Link></li>
                <li><Link href="#" className="text-[12px] font-medium text-slate-500 hover:text-black">Fixed Income & Bonds</Link></li>
                <li><Link href="#" className="text-[12px] font-medium text-slate-500 hover:text-black">Pre-IPO Investments</Link></li>
                <li><Link href="#" className="text-[12px] font-medium text-slate-500 hover:text-black">Digital Assets</Link></li>
              </ul>
            </div>

            {/* Col 3 */}
            <div className="md:col-span-2 lg:col-span-2">
              <h4 className="text-[13px] font-bold text-black mb-4">Legal</h4>
              <ul className="space-y-3">
                <li><Link href="#" className="text-[12px] font-medium text-slate-500 hover:text-black">Terms of Use</Link></li>
                <li><Link href="#" className="text-[12px] font-medium text-slate-500 hover:text-black">Privacy Policy</Link></li>
                <li><Link href="#" className="text-[12px] font-medium text-slate-500 hover:text-black">Financial Services Guide</Link></li>
                <li><Link href="#" className="text-[12px] font-medium text-slate-500 hover:text-black">Disclaimer</Link></li>
              </ul>
            </div>

            {/* Col 4 */}
            <div className="md:col-span-3 lg:col-span-2">
              <h4 className="text-[13px] font-bold text-black mb-4">Company</h4>
              <ul className="space-y-3">
                <li><Link href="/home-2" className="text-[12px] font-medium text-slate-500 hover:text-black">Home</Link></li>
                <li><Link href="/about" className="text-[12px] font-medium text-slate-500 hover:text-black">About Us</Link></li>
                <li><Link href="#" className="text-[12px] font-medium text-slate-500 hover:text-black">Platform</Link></li>
                <li><Link href="/contact" className="text-[12px] font-medium text-slate-500 hover:text-black">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>



        <div className="py-4 text-center">
          <p className="text-[10px] text-slate-400 font-medium">
            ©{new Date().getFullYear()} Baker Jones Holdings Ltd. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
