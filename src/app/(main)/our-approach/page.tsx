import React from 'react';
import { Target, Shield, Users, BarChart3 } from 'lucide-react';

export const metadata = {
  title: 'Our Approach | Baker Jones Holdings',
  description: 'Our investment approach combines rigorous analysis with disciplined portfolio construction for resilient long-term outcomes.',
};

export default function ApproachPage() {
  return (
    <main className="min-h-screen bg-corporate-white font-general">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-corporate-charcoal overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-corporate-gold/5 blur-[120px] rounded-full"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
            <span className="text-xs font-medium tracking-widest text-corporate-gold uppercase">Methodology</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-8 leading-[1.1] max-w-4xl mx-auto">
            Disciplined execution, <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-corporate-gold to-yellow-300">strategic alignment.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto">
            Our approach is rooted in rigorous analysis, proactive risk management, and deep market relationships, designed to source and execute differentiated investment opportunities for qualified investors.
          </p>
        </div>
      </section>

      {/* Philosophy Statement */}
      <section className="py-24 bg-corporate-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-medium text-corporate-charcoal mb-8">
              "We prioritise long-term alignment, focusing on quality, timing, and execution precision across every transaction."
            </h2>
            <div className="w-24 h-1 bg-corporate-gold mx-auto rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Four Pillars Bento Grid */}
      <section className="pb-24 bg-corporate-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Pillar 1 */}
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-corporate-charcoal/5 flex items-center justify-center mb-8">
                <Target className="w-7 h-7 text-corporate-charcoal" />
              </div>
              <h3 className="text-2xl font-serif font-semibold text-corporate-charcoal mb-4">Investment Philosophy</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our philosophy centres on fundamental value, structural market shifts, and asymmetric risk-reward profiles. We do not restrict ourselves to a single asset class, but rather seek out opportunities where we see a clear catalyst for capital appreciation or sustainable yield.
              </p>
              <ul className="space-y-3 mt-auto">
                <li className="flex items-start gap-3 text-sm text-gray-600">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-corporate-gold flex-shrink-0"></div>
                  <span>Focus on high-conviction opportunities rather than broad market tracking.</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-600">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-corporate-gold flex-shrink-0"></div>
                  <span>Emphasis on fundamental diligence and structural market advantages.</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-600">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-corporate-gold flex-shrink-0"></div>
                  <span>Flexibility to allocate across public, private, and fixed income markets as conditions dictate.</span>
                </li>
              </ul>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-corporate-charcoal/5 flex items-center justify-center mb-8">
                <Shield className="w-7 h-7 text-corporate-charcoal" />
              </div>
              <h3 className="text-2xl font-serif font-semibold text-corporate-charcoal mb-4">Risk Management</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Capital preservation is the foundation of our approach. Before assessing potential upside, we rigorously evaluate downside risks, structural protections, and liquidity parameters.
              </p>
              <ul className="space-y-3 mt-auto">
                <li className="flex items-start gap-3 text-sm text-gray-600">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-corporate-gold flex-shrink-0"></div>
                  <span>Detailed structural diligence on all private and fixed income placements.</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-600">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-corporate-gold flex-shrink-0"></div>
                  <span>Active monitoring of market volatility and macroeconomic indicators.</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-600">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-corporate-gold flex-shrink-0"></div>
                  <span>Appropriate sizing and diversification aligned with specific investor mandates.</span>
                </li>
              </ul>
            </div>

            {/* Pillar 3 */}
            <div className="bg-corporate-charcoal p-8 md:p-12 rounded-3xl shadow-lg flex flex-col h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-corporate-gold/10 blur-[80px] rounded-full"></div>
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-8 relative z-10">
                <Users className="w-7 h-7 text-corporate-gold" />
              </div>
              <h3 className="text-2xl font-serif font-semibold text-white mb-4 relative z-10">Strategic Partnerships</h3>
              <p className="text-white/70 mb-6 leading-relaxed relative z-10">
                Our execution capability is driven by a deep network of market relationships. We maintain active dialogue with primary issuers, institutional syndicates, and specialist fund managers.
              </p>
              <ul className="space-y-3 mt-auto relative z-10">
                <li className="flex items-start gap-3 text-sm text-white/80">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-corporate-gold flex-shrink-0"></div>
                  <span>Sourcing proprietary deal flow outside of open-market channels.</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-white/80">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-corporate-gold flex-shrink-0"></div>
                  <span>Securing preferential allocations in oversubscribed offerings.</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-white/80">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-corporate-gold flex-shrink-0"></div>
                  <span>Collaborating with lead sponsors and institutional leads to enhance investor access.</span>
                </li>
              </ul>
            </div>

            {/* Pillar 4 */}
            <div className="bg-corporate-gold/10 p-8 md:p-12 rounded-3xl border border-corporate-gold/20 flex flex-col h-full">
              <div className="w-14 h-14 rounded-2xl bg-corporate-gold/20 flex items-center justify-center mb-8">
                <BarChart3 className="w-7 h-7 text-corporate-charcoal" />
              </div>
              <h3 className="text-2xl font-serif font-semibold text-corporate-charcoal mb-4">Transparency & Reporting</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                We believe qualified investors require clear, timely, and actionable information regarding their positions and market activity.
              </p>
              <ul className="space-y-3 mt-auto">
                <li className="flex items-start gap-3 text-sm text-gray-700">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-corporate-gold flex-shrink-0"></div>
                  <span>Direct, transparent communication regarding execution and performance.</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-700">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-corporate-gold flex-shrink-0"></div>
                  <span>Detailed rationale for investment entry and exit decisions.</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-700">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-corporate-gold flex-shrink-0"></div>
                  <span>Comprehensive administrative and custodial coordination for seamless execution.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
