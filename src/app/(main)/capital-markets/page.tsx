import React from 'react';
import { ArrowRight, CheckCircle2, Shield, TrendingUp, Target } from 'lucide-react';
import Link from 'next/link';

export default function CapitalMarketsPage() {
  return (
    <div className="min-h-screen bg-corporate-white font-sans text-slate-800">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-[#082348] overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#082348] via-[#082348]/60 to-transparent"></div>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-corporate-gold font-bold tracking-[0.15em] uppercase text-[11px] mb-6 backdrop-blur-md">
            Investment Solutions
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white mb-6">
            Capital Markets
          </h1>
          <p className="text-white/70 text-[16px] lg:text-[18px] max-w-2xl mx-auto leading-relaxed">
            Strategic access to global public markets, delivering superior risk-adjusted returns through proprietary quantitative analysis and deep sector expertise.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-[#082348] mb-6">
                Navigating Complexity with <span className="text-corporate-gold italic font-normal">Precision.</span>
              </h2>
              <p className="text-[16px] text-slate-500 mb-8 leading-relaxed">
                Our Capital Markets division provides institutional clients and high-net-worth individuals with tailored exposure to equities, fixed income, and derivatives. By combining advanced macroeconomic research with algorithmic execution, we ensure optimal capital deployment in varying market conditions.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  "Equities & Fixed Income Portfolio Management",
                  "Algorithmic Trading & Execution",
                  "Macroeconomic & Sector-Specific Research",
                  "Risk Mitigation Strategies"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-corporate-gold shrink-0" />
                    <span className="text-[15px] font-medium text-[#082348]">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contact-us" className="inline-flex items-center justify-center px-8 py-3.5 bg-[#082348] text-white hover:bg-corporate-gold hover:text-[#082348] rounded-full font-bold text-[14px] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                Discuss Opportunities <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative z-10">
                <img src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop" alt="Capital Markets" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-corporate-gold/20 rounded-full blur-[80px] -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION 1: Core Strategy */}
      <section className="py-20 lg:py-24 bg-[#FAFAFA]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-corporate-gold/10 text-corporate-gold font-bold tracking-[0.15em] uppercase text-[11px] mb-4">Our Approach</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#082348] mb-6">Strategic Investment Framework</h2>
            <p className="text-slate-500 text-[16px] leading-relaxed">
              We employ a rigorous, data-driven approach to identify opportunities and manage risk across all public market environments.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 rounded-xl bg-[#082348]/5 flex items-center justify-center mb-6 text-[#082348]">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#082348] mb-3">Quantitative Analysis</h3>
              <p className="text-slate-500 text-[15px] leading-relaxed">We leverage advanced statistical models to identify mispricings and execute trades with minimal market impact.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 rounded-xl bg-[#082348]/5 flex items-center justify-center mb-6 text-[#082348]">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#082348] mb-3">Sector Specialization</h3>
              <p className="text-slate-500 text-[15px] leading-relaxed">Our portfolio managers possess deep domain expertise, allowing for highly concentrated, high-conviction positions.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 rounded-xl bg-[#082348]/5 flex items-center justify-center mb-6 text-[#082348]">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#082348] mb-3">Risk Mitigation</h3>
              <p className="text-slate-500 text-[15px] leading-relaxed">Dynamic hedging strategies and strict drawdown limits ensure capital preservation during periods of high volatility.</p>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION 2: Metrics */}
      <section className="py-20 lg:py-24 bg-[#082348] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-corporate-gold/10 rounded-full blur-[100px] -mr-[250px] -mt-[250px] pointer-events-none"></div>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-16">Delivering Consistent Alpha</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            <div className="pt-8 sm:pt-0">
              <div className="text-5xl font-serif font-bold text-corporate-gold mb-3">14.2%</div>
              <div className="text-[13px] text-white/60 font-medium uppercase tracking-[0.15em]">Historical Annualized Return</div>
            </div>
            <div className="pt-8 sm:pt-0">
              <div className="text-5xl font-serif font-bold text-corporate-gold mb-3">2.1</div>
              <div className="text-[13px] text-white/60 font-medium uppercase tracking-[0.15em]">Sharpe Ratio (5-Year)</div>
            </div>
            <div className="pt-8 sm:pt-0">
              <div className="text-5xl font-serif font-bold text-corporate-gold mb-3">$4.5B</div>
              <div className="text-[13px] text-white/60 font-medium uppercase tracking-[0.15em]">Strategy AUM</div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION 3: CTA */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="bg-corporate-gold/10 rounded-[2rem] p-10 lg:p-16 border border-corporate-gold/20 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="max-w-2xl text-center lg:text-left">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-[#082348] mb-4">Ready to optimize your public market exposure?</h2>
              <p className="text-[#082348]/70 text-[16px] leading-relaxed font-medium">Speak with our investment committee to learn how our Capital Markets strategies can align with your institutional mandate.</p>
            </div>
            <div className="shrink-0">
              <Link href="/contact-us" className="inline-flex items-center justify-center px-8 py-4 bg-[#082348] text-white hover:bg-[#051630] rounded-full font-bold text-[15px] transition-all shadow-xl hover:-translate-y-1">
                Schedule Consultation <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
