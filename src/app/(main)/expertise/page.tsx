import React from 'react';
import { TrendingUp, Landmark, Briefcase, LineChart, Globe } from 'lucide-react';

export const metadata = {
  title: 'Expertise | Baker Jones Holdings',
  description: 'Explore Baker Jones Holdings\' expertise across equities, managed funds, and income strategies.',
};

export default function ExpertisePage() {
  return (
    <main className="min-h-screen bg-corporate-white font-general">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-corporate-charcoal overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-corporate-gold/10 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-bakerjonesholdings-green/10 blur-[80px] rounded-full"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
              <span className="w-2 h-2 rounded-full bg-corporate-gold animate-pulse"></span>
              <span className="text-xs font-medium tracking-widest text-white/70 uppercase">Specialised Capital Markets</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-6 leading-[1.1]">
              Focused <span className="text-transparent bg-clip-text bg-gradient-to-r from-corporate-gold to-yellow-300">Investment</span><br/>Expertise
            </h1>
            <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl mb-10">
              At Baker Jones Holdings, we specialise in providing focused investment and capital markets expertise across public and private markets. Our work centres on identifying, structuring, and executing opportunities for qualified investors across UK and international financial markets.
            </p>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl">
              We operate with a high level of discretion, with a strong emphasis on execution quality, differentiated deal flow, and investor alignment.
            </p>
          </div>
        </div>
      </section>

      {/* Expertise Areas */}
      <section className="py-24 bg-corporate-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="space-y-24">
            {/* Area 1 */}
            <div className="grid md:grid-cols-12 gap-12 items-start">
              <div className="md:col-span-4 sticky top-32">
                <div className="w-16 h-16 rounded-2xl bg-corporate-charcoal/5 flex items-center justify-center mb-6">
                  <TrendingUp className="w-8 h-8 text-corporate-charcoal" />
                </div>
                <h2 className="text-3xl font-serif font-semibold text-corporate-charcoal mb-4">IPO & Pre-IPO Opportunities</h2>
              </div>
              <div className="md:col-span-8 bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
                <p className="text-lg text-gray-600 mb-6">
                  We focus on identifying and sourcing access to high-quality IPO-stage and pre-IPO investment opportunities for qualified investors.
                </p>
                <p className="text-lg text-gray-600 mb-8">
                  This includes exposure to late-stage private companies and potential future public market leaders prior to listing, with a focus on accessing opportunities typically reserved for institutional or early strategic investors.
                </p>
                <h3 className="font-semibold text-corporate-charcoal mb-4 text-lg">Our expertise includes:</h3>
                <ul className="space-y-4">
                  {[
                    "Pre-IPO capital access and investor introductions",
                    "Sourcing late-stage private investment opportunities ahead of listing",
                    "Private placements in companies approaching public markets",
                    "Strategic participation in pre-IPO funding rounds",
                    "Structuring access for qualified investors seeking early entry exposure"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-600">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-corporate-gold flex-shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-8 pt-8 border-t border-gray-100 text-gray-600 font-medium">
                  We focus on sourcing, access, timing, and allocation into high-quality pre-listing opportunities.
                </p>
              </div>
            </div>

            {/* Area 2 */}
            <div className="grid md:grid-cols-12 gap-12 items-start">
              <div className="md:col-span-4 sticky top-32">
                <div className="w-16 h-16 rounded-2xl bg-corporate-charcoal/5 flex items-center justify-center mb-6">
                  <Landmark className="w-8 h-8 text-corporate-charcoal" />
                </div>
                <h2 className="text-3xl font-serif font-semibold text-corporate-charcoal mb-4">Fixed Income</h2>
              </div>
              <div className="md:col-span-8 bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
                <p className="text-lg text-gray-600 mb-6">
                  We provide specialist access across high-yield and investment-grade fixed income markets, with a strong emphasis on primary issuance, structured credit, and opportunistic bond strategies.
                </p>
                <p className="text-lg text-gray-600 mb-8">
                  A core area of focus is large-scale bond raisings, where we participate in structuring and distribution of substantial issuance volumes across qualified investor networks. Within these transactions, we aim to secure preferential allocations where possible, including access to advantageous pricing levels such as sub-par or discounted entry in selected primary or secondary opportunities.
                </p>
                
                <div className="grid sm:grid-cols-2 gap-8 mt-8">
                  <div className="bg-corporate-white p-6 rounded-2xl">
                    <h3 className="font-semibold text-corporate-charcoal mb-4">Off-market / structured execution strategies</h3>
                    <ul className="space-y-3">
                      {[
                        "Private bond placements and negotiated allocations",
                        "Structured credit and private debt opportunities",
                        "Preferential tranche access within select issuance structures",
                        "Tailored execution for qualified investors seeking controlled exposure",
                        "Risk-managed positioning through deal-specific structuring"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-corporate-gold flex-shrink-0"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-corporate-white p-6 rounded-2xl">
                    <h3 className="font-semibold text-corporate-charcoal mb-4">Open market strategies</h3>
                    <ul className="space-y-3">
                      {[
                        "Active participation in liquid high-yield and investment-grade bond markets",
                        "Relative value credit positioning across issuers and sectors",
                        "Opportunistic entry and exit based on pricing inefficiencies",
                        "Yield optimisation through market timing and allocation strategy",
                        "Flexible portfolio construction aligned to investor mandate"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-corporate-gold flex-shrink-0"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <p className="mt-8 pt-8 border-t border-gray-100 text-gray-600 font-medium">
                  This dual approach allows us to tailor exposure between income-driven strategies focused on yield and capital preservation, and higher-conviction growth-oriented credit positioning depending on investor preference.
                </p>
              </div>
            </div>

            {/* Area 3 */}
            <div className="grid md:grid-cols-12 gap-12 items-start">
              <div className="md:col-span-4 sticky top-32">
                <div className="w-16 h-16 rounded-2xl bg-corporate-charcoal/5 flex items-center justify-center mb-6">
                  <Briefcase className="w-8 h-8 text-corporate-charcoal" />
                </div>
                <h2 className="text-3xl font-serif font-semibold text-corporate-charcoal mb-4">Fund Investments</h2>
              </div>
              <div className="md:col-span-8 bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
                <p className="text-lg text-gray-600 mb-6">
                  We facilitate access to a range of fund-based investment opportunities across private and public strategies.
                </p>
                <h3 className="font-semibold text-corporate-charcoal mb-4 text-lg">Our capabilities include:</h3>
                <ul className="space-y-4">
                  {[
                    "Access to private market funds (Private Equity, Venture Capital, Private Credit)",
                    "Participation in specialised alternative investment funds",
                    "Exposure to established public market fund managers",
                    "Co-investment opportunities alongside lead fund sponsors",
                    "Identification of niche or sector-specific fund strategies"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-600">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-corporate-gold flex-shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Area 4 */}
            <div className="grid md:grid-cols-12 gap-12 items-start">
              <div className="md:col-span-4 sticky top-32">
                <div className="w-16 h-16 rounded-2xl bg-corporate-charcoal/5 flex items-center justify-center mb-6">
                  <LineChart className="w-8 h-8 text-corporate-charcoal" />
                </div>
                <h2 className="text-3xl font-serif font-semibold text-corporate-charcoal mb-4">Equities & Secondary Markets</h2>
              </div>
              <div className="md:col-span-8 bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
                <p className="text-lg text-gray-600 mb-6">
                  Alongside primary and pre-IPO capital markets, we execute strategies across public equity markets on behalf of our investors.
                </p>
                <h3 className="font-semibold text-corporate-charcoal mb-4 text-lg">This includes:</h3>
                <ul className="space-y-4">
                  {[
                    "Targeted execution in listed equities across major global exchanges",
                    "Participation in secondary market block trades and special situations",
                    "Strategic positioning in undervalued or growth-oriented public companies",
                    "Portfolio adjustments and liquidity management for existing holdings"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-600">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-corporate-gold flex-shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Area 5 */}
            <div className="grid md:grid-cols-12 gap-12 items-start">
              <div className="md:col-span-4 sticky top-32">
                <div className="w-16 h-16 rounded-2xl bg-corporate-charcoal/5 flex items-center justify-center mb-6">
                  <Globe className="w-8 h-8 text-corporate-charcoal" />
                </div>
                <h2 className="text-3xl font-serif font-semibold text-corporate-charcoal mb-4">Market Access & Execution</h2>
              </div>
              <div className="md:col-span-8 bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
                <p className="text-lg text-gray-600 mb-6">
                  Execution quality is central to our capital markets operation. We ensure that our investors can access, structure, and participate in opportunities efficiently.
                </p>
                <ul className="space-y-4">
                  {[
                    "Discreet order execution and block trade facilitation",
                    "Structuring of complex or multi-tranche investment allocations",
                    "Access to global market liquidity and specialist counterparties",
                    "Coordination of settlement and custody arrangements for alternative assets"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-600">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-corporate-gold flex-shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
