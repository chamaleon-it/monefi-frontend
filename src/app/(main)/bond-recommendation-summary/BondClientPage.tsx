"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import toast from "react-hot-toast";
import { useLenis } from "lenis/react";

// Interface definitions
interface BondDetails {
  id: string;
  companyName: string;
  issuer: string;
  coupon: string;
  maturity: string;
  isin: string;
  type: string;
  whySelected: string;
  aboutIssuer: string;
  keyConsiderations: string[];
  recommended?: boolean;
  label?: string;
  lseUrl: string;
}

export default function BondClientPage() {
  // Client portal states
  const [activeDrawer, setActiveDrawer] = useState<boolean>(false);
  const [activeProceedModal, setActiveProceedModal] = useState<boolean>(false);
  const [selectedBond, setSelectedBond] = useState<BondDetails | null>(null);
  const [messageText, setMessageText] = useState<string>("");
  const [messageSent, setMessageSent] = useState<boolean>(false);
  const [proceedConfirmed, setProceedConfirmed] = useState<boolean>(false);
  const [proceedSubmitted, setProceedSubmitted] = useState<boolean>(false);
  
  // Accordion state (null if all closed, or index of open accordion)
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  // Downloading factsheet animation states
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const lenis = useLenis();

  // Lock body scroll when drawer or modal is open
  React.useEffect(() => {
    if (activeDrawer || activeProceedModal) {
      document.body.style.overflow = "hidden";
      if (lenis) lenis.stop();
    } else {
      document.body.style.overflow = "";
      if (lenis) lenis.start();
    }
    return () => {
      document.body.style.overflow = "";
      if (lenis) lenis.start();
    };
  }, [lenis, activeDrawer, activeProceedModal]);

  // Detailed bond data
  const bondData: BondDetails[] = [
    {
      id: "bond-featured",
      companyName: "1234 plc",
      issuer: "ABCD Bank plc",
      coupon: "6.50% Fixed",
      maturity: "July 2028",
      isin: "XS2648591038",
      type: "Fixed Rate",
      whySelected: "This option aligns with a balanced approach to income generation and capital stability based on the objectives discussed during your consultation.",
      aboutIssuer: "ABCD Bank plc is one of the UK's largest retail and commercial banking groups with an established history of financial strength.",
      keyConsiderations: [
        "One-year rolling contract available until maturity",
        "Flexible income options",
        "Tier 1 banking institution"
      ],
      recommended: true,
      lseUrl: "https://www.londonstockexchange.com/stock/65XS/abcd-bank-plc/analysis"
    },
    {
      id: "bond-alt-1",
      companyName: "EFGH plc",
      issuer: "EFGH Infrastructure plc",
      coupon: "6.50% Fixed",
      maturity: "December 2028",
      isin: "XS2739485029",
      type: "Fixed Rate",
      whySelected: "Provides exposure to a regulated UK utility company often selected for defensive income characteristics.",
      aboutIssuer: "EFGH plc operates essential water and environmental infrastructure systems across the United Kingdom, offering stable, long-term regulated revenues.",
      keyConsiderations: [
        "Blue chip utility company",
        "Flexible income options",
        "Diversifies bond exposure"
      ],
      lseUrl: "https://www.londonstockexchange.com/stock/65EF/efgh-plc/analysis"
    },
    {
      id: "bond-alt-2",
      companyName: "IJKL Corporation",
      issuer: "IJKL International Group plc",
      coupon: "7.00% Fixed",
      maturity: "October 2028",
      isin: "XS2859103948",
      type: "Fixed Rate",
      whySelected: "Provides exposure to a higher yielding bond issued by a Tier 1 bank. Suitable for investors seeking enhanced income with higher minimum investment levels.",
      aboutIssuer: "IJKL Corporation is a globally systemically important financial services institution operating in over 50 countries with a robust balance sheet.",
      keyConsiderations: [
        "Flexible income options",
        "Globally systemically important bank",
        "Higher yield"
      ],
      label: "Higher Income",
      lseUrl: "https://www.londonstockexchange.com/stock/70IJ/ijkl-corporation/analysis"
    }
  ];

  // Simulated factsheet downloader
  const handleDownloadFactsheet = (id: string, name: string) => {
    if (downloadingId) return;
    setDownloadingId(id);
    toast.loading(`Preparing factsheet for ${name}...`, { id: "download" });
    
    setTimeout(() => {
      setDownloadingId(null);
      toast.success(`Factsheet for ${name} downloaded successfully.`, {
        id: "download",
        duration: 3000,
      });
    }, 1500);
  };

  // Open advisor contact panel
  const triggerDiscuss = (bond: BondDetails) => {
    setSelectedBond(bond);
    setMessageSent(false);
    setMessageText("");
    setActiveDrawer(true);
  };

  // Open proceed confirmation modal
  const triggerProceed = (bond: BondDetails) => {
    setSelectedBond(bond);
    setProceedConfirmed(false);
    setProceedSubmitted(false);
    setActiveProceedModal(true);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) {
      toast.error("Please enter a message.");
      return;
    }
    
    // Simulate sending message
    toast.loading("Sending secure message...", { id: "message" });
    setTimeout(() => {
      setMessageSent(true);
      toast.success("Message sent to Alexander Jones.", { id: "message" });
    }, 1000);
  };

  const handleConfirmProceed = () => {
    if (!proceedConfirmed) {
      toast.error("Please check the confirmation box.");
      return;
    }

    toast.loading("Registering selection...", { id: "proceed" });
    setTimeout(() => {
      setProceedSubmitted(true);
      toast.success("Selection confirmed.", { id: "proceed" });
    }, 1500);
  };

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  // SVG Logo Renderers
  const renderLogo = (companyName: string) => {
    switch (companyName) {
      case "1234 plc":
        return (
          <svg className="w-10 h-10 text-corporate-gold" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="4" />
            <path d="M50 20V80" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
            <path d="M35 35L50 20L65 35" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="50" cy="50" r="10" fill="currentColor" />
          </svg>
        );
      case "EFGH plc":
        return (
          <svg className="w-10 h-10 text-teal-600" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="15" y="15" width="70" height="70" rx="16" stroke="currentColor" strokeWidth="4" />
            <path d="M30 50C40 35 60 35 70 50" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
            <path d="M30 62C40 47 60 47 70 62" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
            <circle cx="50" cy="30" r="6" fill="currentColor" />
          </svg>
        );
      case "IJKL Corporation":
        return (
          <svg className="w-10 h-10 text-slate-700" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 10L85 30V70L50 90L15 70V30L50 10Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
            <path d="M35 40H65" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
            <path d="M50 40V70" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
          </svg>
        );
      default:
        return (
          <svg className="w-10 h-10 text-corporate-gold" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="4" strokeDasharray="6 6" />
          </svg>
        );
    }
  };

  return (
    <div className="relative min-h-screen bg-corporate-white font-sans text-corporate-charcoal pb-24">
      {/* Font Awesome Icons CDN */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />

      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden bg-corporate-charcoal text-white pt-24 pb-20 lg:pt-32 lg:pb-28">
        <div className="absolute inset-0 z-0">
          {/* Subtle gold-blue gradient background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-corporate-gold/15 via-corporate-charcoal to-corporate-charcoal" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15 mix-blend-overlay"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-semibold uppercase tracking-wider text-corporate-gold"
          >
            <i className="fa-solid fa-lock text-[10px]" /> Private Client Portal
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 font-serif text-white"
          >
            Bond Recommendation Summary
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-white/70 max-w-3xl mb-12 leading-relaxed"
          >
            Following your consultation, we&apos;ve reviewed current fixed-income opportunities and selected three bond options that align with your investment objectives.
          </motion.p>

          {/* Glass Notice Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="max-w-2xl w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 md:p-6 flex items-start gap-4 text-left"
          >
            <div className="w-10 h-10 rounded-full bg-corporate-gold/20 flex-shrink-0 flex items-center justify-center text-corporate-gold">
              <i className="fa-solid fa-triangle-exclamation text-lg" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-base mb-1">Market Notice</h4>
              <p className="text-white/75 text-sm leading-relaxed">
                These opportunities are sourced from the secondary bond market and availability may change without notice.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- CONTENT CONTAINER --- */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-16 lg:mt-24">
        
        {/* SECTION HEADER: RECOMMENDATIONS */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-corporate-gold font-semibold uppercase tracking-wider text-sm">Tailored Selection</span>
            <h2 className="text-3xl lg:text-4xl font-bold font-serif text-corporate-charcoal mt-1">Recommended Assets</h2>
          </div>
          <div className="text-sm text-corporate-charcoal/60 max-w-md">
            Prepared exclusively for <strong className="text-corporate-charcoal">Private Client Accounts</strong>. Rates and specifications valid for execution request.
          </div>
        </div>

        {/* --- 1. FEATURED RECOMMENDATION CARD --- */}
        {bondData.filter(b => b.recommended).map((bond) => (
          <motion.div
            key={bond.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-3xl p-8 lg:p-12 shadow-2xl shadow-black/5 border border-black/5 relative overflow-hidden mb-12 hover:shadow-black/10 transition-all duration-300 group"
          >
            {/* Soft decorative visual background elements inside card */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-corporate-gold/5 rounded-full blur-3xl pointer-events-none -z-10 group-hover:bg-corporate-gold/8 transition-colors duration-500" />
            
            {/* Top Badge & Logo Row */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/5 pb-8 mb-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-corporate-white rounded-2xl border border-black/5 shadow-inner">
                  {renderLogo(bond.companyName)}
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider font-semibold text-corporate-charcoal/40">Issuer Entity</span>
                  <h3 className="text-2xl font-bold text-corporate-charcoal font-serif">{bond.companyName}</h3>
                </div>
              </div>

              <div className="flex items-center gap-2 px-4 py-2 bg-corporate-gold/10 text-corporate-gold font-semibold text-sm rounded-full border border-corporate-gold/20 shadow-sm animate-pulse">
                <i className="fa-solid fa-star text-xs" /> Recommended Selection
              </div>
            </div>

            {/* Grid for Coupon Rate, Maturity & At-a-Glance Factsheet */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              
              {/* Financial Highlight */}
              <div className="lg:col-span-4 flex flex-col justify-center bg-corporate-charcoal text-white rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-corporate-gold/20 via-transparent to-transparent pointer-events-none" />
                <span className="text-sm font-medium uppercase tracking-wider text-corporate-gold mb-2">Annualized Return</span>
                <div className="text-5xl lg:text-6xl font-bold tracking-tight text-white mb-2 font-serif">{bond.coupon}</div>
                <div className="text-sm text-white/60 mb-6 flex items-center gap-2">
                  <i className="fa-solid fa-calendar-days text-corporate-gold" /> Maturity: {bond.maturity}
                </div>
                <div className="w-full h-[1px] bg-white/10 my-4" />
                <div className="text-xs text-white/50 leading-relaxed">
                  Fixed income paid semi-annually. Principal returned fully at maturity date.
                </div>
              </div>

              {/* At a Glance Table & Detail */}
              <div className="lg:col-span-8 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-corporate-charcoal/40 mb-4">At a Glance Specifications</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8 border-b border-black/5 pb-8">
                    <div className="space-y-1">
                      <span className="text-xs text-corporate-charcoal/50">Guarantor / Issuer</span>
                      <p className="font-semibold text-corporate-charcoal text-sm md:text-base">{bond.issuer}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs text-corporate-charcoal/50">Maturity Date</span>
                      <p className="font-semibold text-corporate-charcoal text-sm md:text-base">{bond.maturity}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs text-corporate-charcoal/50">ISIN Reference</span>
                      <p className="font-semibold text-corporate-charcoal text-sm md:text-base font-mono tracking-tight">{bond.isin}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs text-corporate-charcoal/50">Coupon Schedule</span>
                      <p className="font-semibold text-corporate-charcoal text-sm md:text-base">{bond.coupon}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs text-corporate-charcoal/50">Asset Structure</span>
                      <p className="font-semibold text-corporate-charcoal text-sm md:text-base">{bond.type}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs text-corporate-charcoal/50">Account Minimum</span>
                      <p className="font-semibold text-corporate-charcoal text-sm md:text-base">£100,000</p>
                    </div>
                  </div>

                  {/* Why Selected & About Issuer */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="space-y-2">
                      <h5 className="font-bold text-sm text-corporate-charcoal flex items-center gap-2">
                        <i className="fa-solid fa-compass text-corporate-gold" /> Why this has been selected for you
                      </h5>
                      <p className="text-sm text-corporate-charcoal/70 leading-relaxed">
                        {bond.whySelected}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h5 className="font-bold text-sm text-corporate-charcoal flex items-center gap-2">
                        <i className="fa-solid fa-building-columns text-corporate-gold" /> About the issuer
                      </h5>
                      <p className="text-sm text-corporate-charcoal/70 leading-relaxed">
                        {bond.aboutIssuer}
                      </p>
                    </div>
                  </div>

                  {/* Key Considerations list */}
                  <div className="bg-corporate-white/50 rounded-2xl p-6 border border-black/5 mb-8">
                    <h5 className="font-bold text-xs uppercase tracking-wider text-corporate-charcoal/50 mb-3">Key Benefits & Considerations</h5>
                    <ul className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {bond.keyConsiderations.map((consideration, idx) => (
                        <li key={idx} className="flex items-center gap-2.5 text-sm text-corporate-charcoal font-medium">
                          <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 flex-shrink-0 text-xs">
                            <i className="fa-solid fa-check" />
                          </span>
                          <span>{consideration}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action Row */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
                  <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
                    <button
                      onClick={() => triggerProceed(bond)}
                      className="flex-1 sm:flex-initial text-center px-8 py-3.5 bg-corporate-charcoal text-white hover:bg-corporate-gold transition-colors duration-300 font-semibold rounded-full text-sm shadow-md cursor-pointer"
                    >
                      Proceed with this option
                    </button>
                    <button
                      onClick={() => triggerDiscuss(bond)}
                      className="flex-1 sm:flex-initial text-center px-8 py-3.5 bg-white border border-black/10 text-corporate-charcoal hover:bg-corporate-white transition-colors duration-300 font-semibold rounded-full text-sm cursor-pointer"
                    >
                      Discuss with your adviser
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </motion.div>
        ))}

        {/* SECTION HEADER: ALTERNATIVE OPTIONS */}
        <div className="mt-20 mb-10">
          <span className="text-corporate-gold font-semibold uppercase tracking-wider text-sm">Diversification Options</span>
          <h2 className="text-3xl font-bold font-serif text-corporate-charcoal mt-1 font-serif">Alternative Fixed-Income Assets</h2>
        </div>

        {/* --- ALTERNATIVES GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {bondData.filter(b => !b.recommended).map((bond) => (
            <motion.div
              key={bond.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-black/5 relative overflow-hidden flex flex-col justify-between hover:shadow-2xl transition-all duration-300 group"
            >
              <div>
                {/* Logo & Corporate Tag */}
                <div className="flex items-center justify-between border-b border-black/5 pb-5 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-corporate-white rounded-xl border border-black/5 shadow-inner">
                      {renderLogo(bond.companyName)}
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-corporate-charcoal/40">Issuer</span>
                      <h4 className="text-xl font-bold text-corporate-charcoal font-serif">{bond.companyName}</h4>
                    </div>
                  </div>

                  {bond.label && (
                    <span className="px-3 py-1 bg-amber-100 border border-amber-200 text-amber-800 text-xs font-semibold rounded-full shadow-sm">
                      <i className="fa-solid fa-percent text-[10px] mr-1" /> {bond.label}
                    </span>
                  )}
                </div>

                {/* Big Rate Box */}
                <div className="bg-corporate-white rounded-2xl p-5 mb-6 flex justify-between items-center border border-black/5">
                  <div>
                    <span className="text-xs text-corporate-charcoal/50 block">Annualized Coupon</span>
                    <strong className="text-2xl md:text-3xl font-bold text-corporate-charcoal font-serif">{bond.coupon}</strong>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-corporate-charcoal/50 block">Maturity Date</span>
                    <span className="text-sm font-semibold text-corporate-charcoal">{bond.maturity}</span>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-4 mb-6">
                  <div className="space-y-1">
                    <h5 className="font-bold text-xs text-corporate-charcoal flex items-center gap-1.5">
                      <i className="fa-solid fa-circle-question text-corporate-gold" /> Why this is included
                    </h5>
                    <p className="text-sm text-corporate-charcoal/70 leading-relaxed">
                      {bond.whySelected}
                    </p>
                  </div>

                  {/* Key Considerations bullets */}
                  <div className="space-y-2 border-t border-black/5 pt-4">
                    <h5 className="font-bold text-xs uppercase tracking-wider text-corporate-charcoal/40">Key Considerations</h5>
                    <ul className="space-y-2">
                      {bond.keyConsiderations.map((consideration, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-corporate-charcoal">
                          <span className="w-1.5 h-1.5 rounded-full bg-corporate-gold flex-shrink-0" />
                          <span>{consideration}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action Buttons & Links */}
              <div className="border-t border-black/5 pt-6 mt-4">
                <div className="flex gap-4">
                  <button
                    onClick={() => triggerProceed(bond)}
                    className="flex-1 text-center px-4 py-2.5 bg-corporate-charcoal text-white hover:bg-corporate-gold transition-colors duration-300 font-semibold rounded-full text-xs shadow-sm cursor-pointer"
                  >
                    Proceed
                  </button>
                  <button
                    onClick={() => triggerDiscuss(bond)}
                    className="flex-1 text-center px-4 py-2.5 bg-white border border-black/10 text-corporate-charcoal hover:bg-corporate-white transition-colors duration-300 font-semibold rounded-full text-xs cursor-pointer"
                  >
                    Discuss with adviser
                  </button>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

        {/* --- 2. HOW TO PROCEED SECTION --- */}
        <section className="mt-28 bg-white border border-black/5 rounded-3xl p-8 lg:p-12 shadow-xl">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-corporate-gold font-semibold uppercase tracking-wider text-sm">Action Plan</span>
            <h2 className="text-3xl font-bold font-serif text-corporate-charcoal mt-1">How to Proceed</h2>
            <p className="text-sm text-corporate-charcoal/60 mt-3 leading-relaxed">
              We aim to make execution as seamless as possible. Follow these simple steps to finalize your transaction details.
            </p>
          </div>

          {/* Horizontal Timeline */}
          <div className="relative">
            {/* Progress line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-dashed-gold border-t border-dashed border-corporate-gold/30 -translate-y-1/2 hidden md:block" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
              
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-full bg-corporate-charcoal text-white flex items-center justify-center font-bold text-lg mb-6 border-4 border-corporate-white shadow-lg transition-transform duration-300 group-hover:scale-110 relative">
                  <div className="absolute -inset-1 rounded-full bg-corporate-gold/20 animate-ping -z-10 group-hover:-inset-2 transition-all duration-300" />
                  1
                </div>
                <h3 className="font-bold text-lg text-corporate-charcoal mb-2 font-serif">Reply to adviser email</h3>
                <p className="text-sm text-corporate-charcoal/60 leading-relaxed max-w-xs">
                  Respond directly to the summary message sent to your registered inbox by your adviser.
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-full bg-corporate-charcoal text-white flex items-center justify-center font-bold text-lg mb-6 border-4 border-corporate-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                  2
                </div>
                <h3 className="font-bold text-lg text-corporate-charcoal mb-2 font-serif">Request to proceed</h3>
                <p className="text-sm text-corporate-charcoal/60 leading-relaxed max-w-xs">
                  Specify which bond option and allocation size you would like to proceed with.
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-full bg-corporate-gold text-white flex items-center justify-center font-bold text-lg mb-6 border-4 border-corporate-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                  3
                </div>
                <h3 className="font-bold text-lg text-corporate-charcoal mb-2 font-serif">Adviser confirms</h3>
                <p className="text-sm text-corporate-charcoal/60 leading-relaxed max-w-xs">
                  Your adviser verifies availability in the secondary market, confirms rates and executes the allocation.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* --- 3. ACCORDIONS SECTION --- */}
        <section className="mt-20 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-corporate-gold font-semibold uppercase tracking-wider text-xs">Client Disclosures</span>
            <h2 className="text-2xl font-bold font-serif text-corporate-charcoal mt-1">Regulatory & Asset Information</h2>
          </div>

          <div className="space-y-4">
            
            {/* Accordion 1: Regulation Status */}
            <div className="bg-white border border-black/5 rounded-2xl overflow-hidden shadow-sm">
              <button
                onClick={() => toggleAccordion(0)}
                className="w-full flex items-center justify-between p-6 text-left font-semibold text-corporate-charcoal hover:bg-corporate-white/50 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-3">
                  <i className="fa-solid fa-shield-halved text-corporate-gold w-5" />
                  <span>Regulation Status</span>
                </span>
                <i className={`fa-solid fa-chevron-down text-sm text-corporate-gold transition-transform duration-300 ${openAccordion === 0 ? "rotate-180" : ""}`} />
              </button>
              
              <AnimatePresence initial={false}>
                {openAccordion === 0 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 pt-2 border-t border-black/5 text-sm text-corporate-charcoal/70 leading-relaxed space-y-4">
                      <p>
                        Baker Jones Holdings is authorised and regulated by the Financial Conduct Authority (FCA). Our firm registry reference number provides clients with statutory protections and guarantees that advisory operations conform to national financial standards.
                      </p>
                      <div>
                        <Link
                          href="https://register.fca.org.uk/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-corporate-charcoal text-white hover:bg-corporate-gold transition-colors duration-300 font-semibold rounded-full text-xs shadow-sm"
                        >
                          View FCA Register →
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Accordion 2: Secondary Market Information */}
            <div className="bg-white border border-black/5 rounded-2xl overflow-hidden shadow-sm">
              <button
                onClick={() => toggleAccordion(1)}
                className="w-full flex items-center justify-between p-6 text-left font-semibold text-corporate-charcoal hover:bg-corporate-white/50 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-3">
                  <i className="fa-solid fa-chart-line text-corporate-gold w-5" />
                  <span>Secondary Market Information</span>
                </span>
                <i className={`fa-solid fa-chevron-down text-sm text-corporate-gold transition-transform duration-300 ${openAccordion === 1 ? "rotate-180" : ""}`} />
              </button>
              
              <AnimatePresence initial={false}>
                {openAccordion === 1 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 pt-2 border-t border-black/5 text-sm text-corporate-charcoal/70 leading-relaxed">
                      <p>
                        These bonds were originally issued in the primary market and are currently available through secondary market trading. Secondary market liquidity fluctuates based on market demand, broader interest rate adjustments, and macroeconomic indicators. Consequently, final yield-to-maturity, transaction pricing, and capital availability may change without notice prior to official execution.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Accordion 3: Our Fees */}
            <div className="bg-white border border-black/5 rounded-2xl overflow-hidden shadow-sm">
              <button
                onClick={() => toggleAccordion(2)}
                className="w-full flex items-center justify-between p-6 text-left font-semibold text-corporate-charcoal hover:bg-corporate-white/50 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-3">
                  <i className="fa-solid fa-percent text-corporate-gold w-5" />
                  <span>Our Fees</span>
                </span>
                <i className={`fa-solid fa-chevron-down text-sm text-corporate-gold transition-transform duration-300 ${openAccordion === 2 ? "rotate-180" : ""}`} />
              </button>
              
              <AnimatePresence initial={false}>
                {openAccordion === 2 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 pt-2 border-t border-black/5 text-sm text-corporate-charcoal/70 leading-relaxed space-y-4">
                      <p>
                        We operate a transparent client fee structure. Our fixed-income advisory and custody services are detailed as follows:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-corporate-white p-4 rounded-xl border border-black/5">
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-bold text-corporate-charcoal/40">Portfolio Advisory</span>
                          <p className="font-bold text-corporate-charcoal text-sm">0.50% per annum</p>
                          <span className="text-xs text-corporate-charcoal/60">Billed semi-annually</span>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-bold text-corporate-charcoal/40">Secondary Execution</span>
                          <p className="font-bold text-corporate-charcoal text-sm">At-Cost Brokerage</p>
                          <span className="text-xs text-corporate-charcoal/60">No hidden commissions</span>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-bold text-corporate-charcoal/40">Account Custody</span>
                          <p className="font-bold text-corporate-charcoal text-sm">£0.00 / Free</p>
                          <span className="text-xs text-corporate-charcoal/60">Standard client storage</span>
                        </div>
                      </div>
                      <p className="text-xs text-corporate-charcoal/50">
                        *Note: Full details regarding structural execution fees are outlined in your Client Agreement. There are no additional transaction-entry fees.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Accordion 4: Protection & Custodianship */}
            <div className="bg-white border border-black/5 rounded-2xl overflow-hidden shadow-sm">
              <button
                onClick={() => toggleAccordion(3)}
                className="w-full flex items-center justify-between p-6 text-left font-semibold text-corporate-charcoal hover:bg-corporate-white/50 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-3">
                  <i className="fa-solid fa-lock text-corporate-gold w-5" />
                  <span>Protection & Custodianship</span>
                </span>
                <i className={`fa-solid fa-chevron-down text-sm text-corporate-gold transition-transform duration-300 ${openAccordion === 3 ? "rotate-180" : ""}`} />
              </button>
              
              <AnimatePresence initial={false}>
                {openAccordion === 3 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 pt-2 border-t border-black/5 text-sm text-corporate-charcoal/70 leading-relaxed space-y-3">
                      <p>
                        All client cash and assets are held in segregated client accounts with Tier 1 custodian banks under the Client Assets Sourcebook (CASS) rules. This ensures maximum protection of your capital at all times.
                      </p>
                      <p>
                        Eligible investments may be protected by the Financial Services Compensation Scheme (FSCS) up to £85,000 per person, per firm. This protection operates in case of default or insolvency of the registered broker/custodian.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </section>

      </div>

      {/* --- SLIDE-OUT ADVISER DRAWER --- */}
      <AnimatePresence>
        {activeDrawer && (
          <>
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveDrawer(false)}
              className="fixed inset-0 bg-black z-50 cursor-pointer"
            />
            
            {/* Drawer Container */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full sm:w-[480px] bg-white shadow-2xl z-50 border-l border-black/5 text-corporate-charcoal flex flex-col h-full"
            >
              {/* Header (Fixed at the top of the drawer) */}
              <div className="flex items-center justify-between p-6 md:px-8 md:pt-8 md:pb-5 border-b border-black/5 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-user-tie text-corporate-gold text-lg" />
                  <h3 className="font-bold text-lg font-serif">Consult with Adviser</h3>
                </div>
                <button
                  onClick={() => setActiveDrawer(false)}
                  className="w-8 h-8 rounded-full bg-corporate-white hover:bg-black/5 flex items-center justify-center text-corporate-charcoal transition-colors cursor-pointer"
                >
                  <i className="fa-solid fa-xmark text-sm" />
                </button>
              </div>

              {/* Scrollable Content inside the drawer */}
              <div className="flex-1 overflow-y-auto p-6 md:px-8 md:pb-8 md:pt-6 space-y-6">
                {selectedBond && (
                  <div className="bg-corporate-white rounded-2xl p-4 border border-black/5 text-xs flex items-center justify-between">
                    <div>
                      <span className="text-corporate-charcoal/50 uppercase block font-bold tracking-wider text-[10px]">Reference Selection</span>
                      <strong className="text-corporate-charcoal text-sm">{selectedBond.companyName} ({selectedBond.coupon})</strong>
                    </div>
                    <span className="px-2.5 py-1 bg-corporate-charcoal text-white rounded-full font-semibold">
                      {selectedBond.maturity}
                    </span>
                  </div>
                )}

                {/* Adviser profile Card */}
                <div className="flex items-center gap-4 bg-corporate-charcoal text-white p-5 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-corporate-gold/10 rounded-full blur-xl pointer-events-none" />
                  
                  {/* Styled Avatar */}
                  <div className="w-14 h-14 rounded-full bg-corporate-gold/20 flex-shrink-0 flex items-center justify-center border border-corporate-gold/30">
                    <i className="fa-solid fa-user-check text-corporate-gold text-2xl" />
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-base font-serif text-white">Alexander Jones</h4>
                    <p className="text-xs text-corporate-gold">Senior Fixed-Income Director</p>
                    <p className="text-[10px] text-white/50 mt-1">Baker Jones Wealth Advisory</p>
                  </div>
                </div>

                {/* Secure Contact Details */}
                <div className="space-y-4">
                  <h5 className="font-bold text-xs uppercase tracking-wider text-corporate-charcoal/40">Direct Channels</h5>
                  
                  <Link
                    href="tel:+442071234567"
                    className="flex items-center justify-between p-4 bg-corporate-white hover:bg-corporate-beige/40 rounded-2xl border border-black/5 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-full bg-corporate-gold/10 flex items-center justify-center text-corporate-gold text-sm group-hover:scale-105 transition-transform">
                        <i className="fa-solid fa-phone" />
                      </span>
                      <div>
                        <span className="text-[10px] text-corporate-charcoal/50 uppercase font-bold block">Call Direct</span>
                        <span className="text-sm font-semibold text-corporate-charcoal">+44 (0) 20 7123 4567</span>
                      </div>
                    </div>
                    <i className="fa-solid fa-chevron-right text-xs text-corporate-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>

                  <Link
                    href="mailto:alexander.jones@bakerjonesholdings.com"
                    className="flex items-center justify-between p-4 bg-corporate-white hover:bg-corporate-beige/40 rounded-2xl border border-black/5 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-full bg-corporate-gold/10 flex items-center justify-center text-corporate-gold text-sm group-hover:scale-105 transition-transform">
                        <i className="fa-solid fa-envelope" />
                      </span>
                      <div>
                        <span className="text-[10px] text-corporate-charcoal/50 uppercase font-bold block">Secure Email</span>
                        <span className="text-sm font-semibold text-corporate-charcoal">alex.jones@bakerjones.com</span>
                      </div>
                    </div>
                    <i className="fa-solid fa-chevron-right text-xs text-corporate-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </div>

                {/* Secure message option */}
                <div className="space-y-4 border-t border-black/5 pt-6">
                  <h5 className="font-bold text-xs uppercase tracking-wider text-corporate-charcoal/40">Send Message</h5>
                  
                  {!messageSent ? (
                    <form onSubmit={handleSendMessage} className="space-y-4">
                      <div>
                        <label htmlFor="msg-area" className="sr-only">Message Content</label>
                        <textarea
                          id="msg-area"
                          rows={4}
                          value={messageText}
                          onChange={(e) => setMessageText(e.target.value)}
                          placeholder="Tell Alexander about your portfolio requirements, desired allocation amount, or questions about this secondary market opportunity..."
                          className="w-full text-sm bg-corporate-white border border-black/10 rounded-2xl p-4 focus:outline-none focus:border-corporate-gold transition-colors text-corporate-charcoal placeholder-corporate-charcoal/30 resize-none font-medium"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full py-3 bg-corporate-charcoal text-white font-semibold rounded-full hover:bg-corporate-gold transition-colors duration-300 text-sm shadow-md cursor-pointer"
                      >
                        <i className="fa-solid fa-paper-plane mr-2" /> Send Secure Request
                      </button>
                    </form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 text-center space-y-3"
                    >
                      <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center text-xl">
                        <i className="fa-solid fa-circle-check" />
                      </div>
                      <h4 className="font-bold text-emerald-800 text-base font-serif">Request Dispatched</h4>
                      <p className="text-xs text-emerald-700 leading-relaxed">
                        Alexander Jones has been notified. A confirmation transcript has been sent to your registered email address.
                      </p>
                      <button
                        type="button"
                        onClick={() => setMessageSent(false)}
                        className="text-xs text-corporate-charcoal font-semibold hover:underline mt-2 inline-block cursor-pointer"
                      >
                        Send another message
                      </button>
                    </motion.div>
                  )}
                </div>

                {/* Legal Notice */}
                <div className="border-t border-black/5 pt-5 text-[10px] text-corporate-charcoal/40 leading-relaxed">
                  Communications through this channel are subject to standard security encryption. Records of requests are archived in accordance with FCA client records requirements.
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- PROCEED EXECUTION MODAL --- */}
      <AnimatePresence>
        {activeProceedModal && selectedBond && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProceedModal(false)}
              className="fixed inset-0 bg-black cursor-pointer"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative z-10 border border-black/5 text-corporate-charcoal p-6 md:p-8"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-black/5 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-file-invoice-dollar text-corporate-gold text-lg" />
                  <h3 className="font-bold text-lg font-serif">Confirm Execution Intent</h3>
                </div>
                <button
                  onClick={() => setActiveProceedModal(false)}
                  className="w-8 h-8 rounded-full bg-corporate-white hover:bg-black/5 flex items-center justify-center text-corporate-charcoal transition-colors cursor-pointer"
                >
                  <i className="fa-solid fa-xmark text-sm" />
                </button>
              </div>

              {!proceedSubmitted ? (
                <div className="space-y-6">
                  <p className="text-sm text-corporate-charcoal/70 leading-relaxed">
                    You have requested to proceed with the following fixed-income asset selection. Please review details below and confirm.
                  </p>

                  {/* Summary Card */}
                  <div className="bg-corporate-white border border-black/5 rounded-2xl p-5 space-y-3">
                    <div className="flex justify-between items-center text-xs border-b border-black/5 pb-3">
                      <span className="text-corporate-charcoal/50 font-bold uppercase tracking-wider">Asset Selected</span>
                      <span className="px-2.5 py-0.5 bg-corporate-charcoal text-white rounded-full font-semibold">{selectedBond.companyName}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-xs pt-1">
                      <div className="space-y-1">
                        <span className="text-corporate-charcoal/50">Expected Return</span>
                        <p className="font-bold text-sm text-corporate-charcoal">{selectedBond.coupon}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-corporate-charcoal/50">Maturity Date</span>
                        <p className="font-bold text-sm text-corporate-charcoal">{selectedBond.maturity}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-corporate-charcoal/50">ISIN Number</span>
                        <p className="font-bold text-sm text-corporate-charcoal font-mono">{selectedBond.isin}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-corporate-charcoal/50">Issuer entity</span>
                        <p className="font-bold text-sm text-corporate-charcoal">{selectedBond.issuer}</p>
                      </div>
                    </div>
                  </div>

                  {/* Confirmation Box */}
                  <div className="flex items-start gap-3 bg-amber-50/50 border border-amber-100 p-4 rounded-xl">
                    <input
                      type="checkbox"
                      id="confirm-cb"
                      checked={proceedConfirmed}
                      onChange={(e) => setProceedConfirmed(e.target.checked)}
                      className="mt-1 w-4 h-4 text-corporate-gold border-black/10 focus:ring-corporate-gold focus:ring-offset-0 rounded cursor-pointer"
                    />
                    <label htmlFor="confirm-cb" className="text-xs text-corporate-charcoal/70 leading-relaxed cursor-pointer font-medium select-none">
                      I confirm that I want to submit my execution request for this secondary market bond and I understand that availability and rates will be finalized by my adviser.
                    </label>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4 pt-2">
                    <button
                      onClick={() => setActiveProceedModal(false)}
                      className="flex-1 py-3 border border-black/10 text-corporate-charcoal hover:bg-corporate-white font-semibold rounded-full text-sm transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleConfirmProceed}
                      disabled={!proceedConfirmed}
                      className="flex-1 py-3 bg-corporate-charcoal text-white hover:bg-corporate-gold disabled:bg-slate-200 disabled:text-slate-400 font-semibold rounded-full text-sm transition-all duration-300 shadow-md cursor-pointer"
                    >
                      Submit Intent
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center text-3xl">
                    <i className="fa-solid fa-circle-check" />
                  </div>
                  
                  <h4 className="text-2xl font-bold font-serif text-corporate-charcoal">Request Received</h4>
                  <p className="text-sm text-corporate-charcoal/70 leading-relaxed max-w-sm mx-auto">
                    Your intent to proceed with <strong className="text-corporate-charcoal">{selectedBond.companyName} ({selectedBond.coupon})</strong> has been logged.
                  </p>
                  
                  <div className="bg-corporate-white p-4 rounded-xl text-left border border-black/5 text-xs space-y-2 max-w-sm mx-auto">
                    <h5 className="font-semibold text-corporate-charcoal">Next Steps:</h5>
                    <ol className="list-decimal pl-4 space-y-1.5 text-corporate-charcoal/60">
                      <li>Your adviser will check availability in the secondary market.</li>
                      <li>A secure allocation call will be placed to confirm execution.</li>
                      <li>Funding instructions will be issued via your secure client inbox.</li>
                    </ol>
                  </div>

                  <div className="pt-6">
                    <button
                      onClick={() => setActiveProceedModal(false)}
                      className="px-8 py-2.5 bg-corporate-charcoal text-white hover:bg-corporate-gold transition-colors duration-300 font-semibold rounded-full text-sm shadow-sm cursor-pointer"
                    >
                      Return to Portal
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
