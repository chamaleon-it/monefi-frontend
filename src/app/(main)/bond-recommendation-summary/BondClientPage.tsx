"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import toast from "react-hot-toast";
import Modal from "@/components/ui/Modal";

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
  factSheetUrl?: string; // Configurable PDF Fact Sheet URL
}

export default function BondClientPage() {
  // Client portal states
  const [activeAdviserModal, setActiveAdviserModal] = useState<boolean>(false);
  const [activeProceedModal, setActiveProceedModal] = useState<boolean>(false);
  const [selectedBond, setSelectedBond] = useState<BondDetails | null>(null);
  const [proceedConfirmed, setProceedConfirmed] = useState<boolean>(false);
  const [proceedSubmitted, setProceedSubmitted] = useState<boolean>(false);

  // Accordion state (null if all closed, or index of open accordion)
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  // Downloading factsheet animation states
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  // Redesigned card details expand/collapse state
  const [expandedBonds, setExpandedBonds] = useState<Record<string, boolean>>({});
  const toggleExpand = (id: string) => {
    setExpandedBonds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // DOM refs to bypass Lenis scroll interception for proceed modal
  const modalScrollRef = React.useRef<HTMLDivElement>(null);
  const modalBackdropRef = React.useRef<HTMLDivElement>(null);

  // Adviser details
  const adviser = {
    name: "Alexander Jones",
    title: "Senior Fixed-Income Director",
    phone: "+44 (0) 20 7123 4567",
    email: "alexander.jones@bakerjonesholdings.com"
  };

  // Native scroll event managers for modal scroll lock bypass
  React.useEffect(() => {
    const scrollEl = modalScrollRef.current;
    const backdropEl = modalBackdropRef.current;

    const stopScrollPropagation = (e: Event) => {
      e.stopPropagation();
    };

    const preventScrollDefault = (e: Event) => {
      e.preventDefault();
    };

    if (scrollEl) {
      scrollEl.addEventListener("wheel", stopScrollPropagation, { passive: true });
      scrollEl.addEventListener("touchmove", stopScrollPropagation, { passive: true });
    }

    if (backdropEl) {
      backdropEl.addEventListener("wheel", preventScrollDefault, { passive: false });
      backdropEl.addEventListener("touchmove", preventScrollDefault, { passive: false });
    }

    return () => {
      if (scrollEl) {
        scrollEl.removeEventListener("wheel", stopScrollPropagation);
        scrollEl.removeEventListener("touchmove", stopScrollPropagation);
      }
      if (backdropEl) {
        backdropEl.removeEventListener("wheel", preventScrollDefault);
        backdropEl.removeEventListener("touchmove", preventScrollDefault);
      }
    };
  }, [activeProceedModal]);

  // Lock body scroll when proceed modal is open
  React.useEffect(() => {
    if (activeProceedModal) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [activeProceedModal]);

  // Detailed bond data with configurable factsheet URLs
  const bondData: BondDetails[] = [
    {
      id: "bond-featured",
      companyName: "Lloyds Bank plc",
      issuer: "Lloyds Bank plc",
      coupon: "6.50% Fixed",
      maturity: "July 2028",
      isin: "XS2648591038",
      type: "Fixed Rate",
      whySelected: "This option aligns with a balanced approach to income generation and capital stability based on the objectives discussed during your consultation.",
      aboutIssuer: "Lloyds Bank plc is one of the UK's largest retail and commercial banking groups with an established history of financial strength.",
      keyConsiderations: [
        "One-year rolling contract available until maturity",
        "Flexible income options",
        "Tier 1 banking institution"
      ],
      recommended: true,
      lseUrl: "https://www.londonstockexchange.com/stock/65XS/abcd-bank-plc/analysis",
      factSheetUrl: "/docs/1234-plc-factsheet.pdf"
    },
    {
      id: "bond-alt-1",
      companyName: "National Grid plc",
      issuer: "National Grid Infrastructure plc",
      coupon: "6.50% Fixed",
      maturity: "December 2028",
      isin: "XS2739485029",
      type: "Fixed Rate",
      whySelected: "Provides exposure to a regulated UK utility company often selected for defensive income characteristics.",
      aboutIssuer: "National Grid plc operates essential water and environmental infrastructure systems across the United Kingdom, offering stable, long-term regulated revenues.",
      keyConsiderations: [
        "Blue chip utility company",
        "Flexible income options",
        "Diversifies bond exposure"
      ],
      lseUrl: "https://www.londonstockexchange.com/stock/65EF/efgh-plc/analysis",
      factSheetUrl: "/docs/efgh-plc-factsheet.pdf"
    },
    {
      id: "bond-alt-2",
      companyName: "Bank of America Corporation",
      issuer: "Bank of America Corporation International Group plc",
      coupon: "7.00% Fixed",
      maturity: "October 2028",
      isin: "XS2859103948",
      type: "Fixed Rate",
      whySelected: "Provides exposure to a higher yielding bond issued by a Tier 1 bank. Suitable for investors seeking enhanced income with higher minimum investment levels.",
      aboutIssuer: "Bank of America Corporation is a globally systemically important financial services institution operating in over 50 countries with a robust balance sheet.",
      keyConsiderations: [
        "Flexible income options",
        "Globally systemically important bank",
        "Higher yield"
      ],
      label: "Higher Income",
      lseUrl: "https://www.londonstockexchange.com/stock/70IJ/ijkl-corporation/analysis",
      factSheetUrl: "/docs/ijkl-corporation-factsheet.pdf"
    }
  ];

  // Configurable factsheet downloader with fallback
  const handleDownloadFactsheet = async (bond: BondDetails) => {
    if (!bond.factSheetUrl) {
      toast.error("Fact sheet URL is not configured for this bond.");
      return;
    }

    if (downloadingId) return;
    setDownloadingId(bond.id);
    toast.loading(`Preparing factsheet download for ${bond.companyName}...`, { id: "download" });

    try {
      const response = await fetch(bond.factSheetUrl);
      if (!response.ok) {
        throw new Error(`File fetch returned status ${response.status}`);
      }

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      const cleanName = bond.companyName.toLowerCase().replace(/[^a-z0-9]/g, "-");
      link.download = `${cleanName}-factsheet.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);

      toast.success(`Factsheet for ${bond.companyName} downloaded successfully.`, {
        id: "download",
        duration: 3000,
      });
    } catch (error) {
      console.warn("Direct download failed, opening PDF in a new tab as fallback:", error);
      // Fallback
      window.open(bond.factSheetUrl, "_blank", "noopener,noreferrer");
      toast.success(`Factsheet for ${bond.companyName} opened in a new tab.`, {
        id: "download",
        duration: 3000,
      });
    } finally {
      setDownloadingId(null);
    }
  };

  // Open advisor contact modal
  const triggerDiscuss = (bond: BondDetails) => {
    setSelectedBond(bond);
    setActiveAdviserModal(true);
  };

  // Open proceed confirmation modal
  const triggerProceed = (bond: BondDetails) => {
    setSelectedBond(bond);
    setProceedConfirmed(false);
    setProceedSubmitted(false);
    setActiveProceedModal(true);
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
      case "Lloyds Bank plc":
        return (
          <svg className="w-10 h-10 text-corporate-gold" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="4" />
            <path d="M50 20V80" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
            <path d="M35 35L50 20L65 35" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="50" cy="50" r="10" fill="currentColor" />
          </svg>
        );
      case "National Grid plc":
        return (
          <svg className="w-10 h-10 text-teal-600" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="15" y="15" width="70" height="70" rx="16" stroke="currentColor" strokeWidth="4" />
            <path d="M30 50C40 35 60 35 70 50" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
            <path d="M30 62C40 47 60 47 70 62" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
            <circle cx="50" cy="30" r="6" fill="currentColor" />
          </svg>
        );
      case "Bank of America Corporation Corporation":
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
            className="bg-white rounded-3xl border-2 border-corporate-gold shadow-2xl relative overflow-hidden mb-12 hover:shadow-black/10 transition-all duration-300 group"
          >
            <div className="p-6 md:p-10 relative">
              {/* Top Recommended Ribbon Badge */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="flex items-center gap-1.5 px-3 py-1 bg-corporate-gold text-white font-bold text-[10px] uppercase tracking-wider rounded-full shadow-md animate-pulse">
                  <i className="fa-solid fa-star text-[9px]" /> Recommended Selection
                </span>
              </div>

              {/* Soft decorative background visual */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-corporate-gold/5 rounded-full blur-3xl pointer-events-none -z-10 group-hover:bg-corporate-gold/8 transition-colors duration-500" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                
                {/* Col 1: Issuer Logo & Identity */}
                <div className="lg:col-span-3 flex items-center gap-4">
                  <div className="p-3 bg-corporate-white rounded-2xl border border-black/5 shadow-inner flex-shrink-0">
                    {renderLogo(bond.companyName)}
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-corporate-charcoal/40 block">Issuer Entity</span>
                    <h3 className="text-xl font-bold text-corporate-charcoal font-serif truncate leading-snug">{bond.companyName}</h3>
                    <span className="text-[10px] text-corporate-charcoal/60 font-mono block mt-0.5 truncate">ISIN: {bond.isin}</span>
                  </div>
                </div>

                {/* Col 2: Specifications Row Grid */}
                <div className="lg:col-span-5 grid grid-cols-3 gap-2 border-y lg:border-y-0 lg:border-x border-black/5 py-4 lg:py-0 lg:px-6">
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-corporate-charcoal/40 font-semibold uppercase block">Rate (AER)</span>
                    <strong className="text-lg md:text-xl font-bold text-corporate-gold block leading-none">{bond.coupon}</strong>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-corporate-charcoal/40 font-semibold uppercase block">Term</span>
                    <strong className="text-base md:text-lg font-bold text-corporate-charcoal block leading-none">{bond.maturity}</strong>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-corporate-charcoal/40 font-semibold uppercase block">Min Deposit</span>
                    <strong className="text-base md:text-lg font-bold text-corporate-charcoal block leading-none">£100,000</strong>
                  </div>
                </div>

                {/* Col 3: Action CTAs Column */}
                <div className="lg:col-span-4 flex flex-col gap-2 w-full sm:w-auto lg:w-full">
                  <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-2 w-full">
                    <button
                      onClick={() => triggerProceed(bond)}
                      className="flex-1 text-center py-2.5 bg-corporate-charcoal hover:bg-corporate-gold text-white font-semibold rounded-full text-xs shadow-sm cursor-pointer transition-colors duration-300"
                    >
                      Apply Now
                    </button>
                    <button
                      onClick={() => triggerDiscuss(bond)}
                      className="flex-1 text-center py-2.5 bg-white border border-black/10 text-corporate-charcoal hover:bg-corporate-white font-semibold rounded-full text-xs cursor-pointer transition-colors duration-300"
                    >
                      Discuss with your adviser
                    </button>
                  </div>
                  
                  {bond.factSheetUrl && (
                    <button
                      onClick={() => handleDownloadFactsheet(bond)}
                      disabled={downloadingId === bond.id}
                      className="w-full text-center py-2 bg-white border border-black/10 text-corporate-charcoal hover:bg-corporate-white disabled:opacity-50 transition-colors duration-300 font-semibold rounded-full text-[10px] cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      {downloadingId === bond.id ? (
                        <>
                          <i className="fa-solid fa-spinner animate-spin" />
                          <span>Downloading...</span>
                        </>
                      ) : (
                        <>
                          <i className="fa-solid fa-file-pdf text-red-500" />
                          <span>Download Fact Sheet</span>
                        </>
                      )}
                    </button>
                  )}
                </div>

              </div>

              {/* Row Bottom Info bar */}
              <div className="mt-6 pt-4 border-t border-black/5 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-corporate-charcoal/60 flex items-center gap-1.5">
                  <i className="fa-solid fa-circle-info text-corporate-gold text-[10px]" />
                  <span>Asset Structure: {bond.type} | Semi-annual interest frequency.</span>
                </div>
                <button
                  onClick={() => toggleExpand(bond.id)}
                  className="text-xs text-corporate-gold font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                >
                  {expandedBonds[bond.id] ? (
                    <>
                      <span>Hide details</span>
                      <i className="fa-solid fa-chevron-up text-[10px]" />
                    </>
                  ) : (
                    <>
                      <span>Show details</span>
                      <i className="fa-solid fa-chevron-down text-[10px]" />
                    </>
                  )}
                </button>
              </div>

              {/* Expanded details dropdown */}
              <AnimatePresence initial={false}>
                {expandedBonds[bond.id] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pt-6 border-t border-black/5 mt-4 space-y-6">
                      
                      {/* Technical Specs Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-corporate-white p-5 rounded-2xl border border-black/5">
                        <div>
                          <span className="text-[10px] text-corporate-charcoal/40 font-semibold uppercase block">Guarantor / Issuer</span>
                          <span className="text-xs font-semibold text-corporate-charcoal block mt-0.5">{bond.issuer}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-corporate-charcoal/40 font-semibold uppercase block">ISIN Reference</span>
                          <span className="text-xs font-semibold text-corporate-charcoal font-mono block mt-0.5">{bond.isin}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-corporate-charcoal/40 font-semibold uppercase block">Asset Structure</span>
                          <span className="text-xs font-semibold text-corporate-charcoal block mt-0.5">{bond.type}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-corporate-charcoal/40 font-semibold uppercase block">London Stock Exchange</span>
                          <Link
                            href={bond.lseUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-semibold text-corporate-gold hover:underline block mt-0.5 flex items-center gap-1"
                          >
                            <span>View Analysis</span>
                            <i className="fa-solid fa-up-right-from-square text-[9px]" />
                          </Link>
                        </div>
                      </div>

                      {/* Why Selected & About Issuer */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                          <h5 className="font-bold text-xs text-corporate-charcoal flex items-center gap-1.5">
                            <i className="fa-solid fa-compass text-corporate-gold" /> Why this has been selected for you
                          </h5>
                          <p className="text-xs text-corporate-charcoal/70 leading-relaxed">
                            {bond.whySelected}
                          </p>
                        </div>
                        <div className="space-y-1.5">
                          <h5 className="font-bold text-xs text-corporate-charcoal flex items-center gap-1.5">
                            <i className="fa-solid fa-building-columns text-corporate-gold" /> About the issuer
                          </h5>
                          <p className="text-xs text-corporate-charcoal/70 leading-relaxed">
                            {bond.aboutIssuer}
                          </p>
                        </div>
                      </div>

                      {/* Key Considerations checkmarks */}
                      <div className="bg-corporate-white p-5 rounded-2xl border border-black/5">
                        <h5 className="font-bold text-[10px] uppercase tracking-wider text-corporate-charcoal/50 mb-3">Key Benefits & Considerations</h5>
                        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {bond.keyConsiderations.map((consideration, idx) => (
                            <li key={idx} className="flex items-center gap-2.5 text-xs text-corporate-charcoal font-medium">
                              <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 flex-shrink-0 text-xs">
                                <i className="fa-solid fa-check" />
                              </span>
                              <span>{consideration}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </motion.div>
        ))}

        {/* SECTION HEADER: ALTERNATIVE OPTIONS */}
        <div className="mt-20 mb-10">
          <span className="text-corporate-gold font-semibold uppercase tracking-wider text-sm">Diversification Options</span>
          <h2 className="text-3xl font-bold font-serif text-corporate-charcoal mt-1 font-serif">Alternative Fixed-Income Assets</h2>
        </div>

        {/* --- ALTERNATIVES LIST --- */}
        <div className="space-y-6">
          {bondData.filter(b => !b.recommended).map((bond) => (
            <motion.div
              key={bond.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-white rounded-3xl border border-black/5 shadow-xl relative overflow-hidden hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="p-6 md:p-8">
                {/* Top Optional Badge */}
                {bond.label && (
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-amber-100 border border-amber-200 text-amber-800 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
                      <i className="fa-solid fa-percent text-[9px] mr-1" /> {bond.label}
                    </span>
                  </div>
                )}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  
                  {/* Col 1: Issuer Logo & Identity */}
                  <div className="lg:col-span-3 flex items-center gap-4">
                    <div className="p-3 bg-corporate-white rounded-2xl border border-black/5 shadow-inner flex-shrink-0">
                      {renderLogo(bond.companyName)}
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-corporate-charcoal/40 block">Issuer</span>
                      <h3 className="text-lg font-bold text-corporate-charcoal font-serif truncate leading-snug">{bond.companyName}</h3>
                      <span className="text-[10px] text-corporate-charcoal/60 font-mono block mt-0.5 truncate">ISIN: {bond.isin}</span>
                    </div>
                  </div>

                  {/* Col 2: Specifications Row Grid */}
                  <div className="lg:col-span-5 grid grid-cols-3 gap-2 border-y lg:border-y-0 lg:border-x border-black/5 py-4 lg:py-0 lg:px-6">
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-corporate-charcoal/40 font-semibold uppercase block">Rate (AER)</span>
                      <strong className="text-base md:text-lg font-bold text-corporate-charcoal block leading-none">{bond.coupon}</strong>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-corporate-charcoal/40 font-semibold uppercase block">Term</span>
                      <strong className="text-base md:text-lg font-bold text-corporate-charcoal block leading-none">{bond.maturity}</strong>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-corporate-charcoal/40 font-semibold uppercase block">Min Deposit</span>
                      <strong className="text-base md:text-lg font-bold text-corporate-charcoal block leading-none">£100,000</strong>
                    </div>
                  </div>

                  {/* Col 3: Action CTAs Column */}
                  <div className="lg:col-span-4 flex flex-col gap-2 w-full sm:w-auto lg:w-full">
                    <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-2 w-full">
                      <button
                        onClick={() => triggerProceed(bond)}
                        className="flex-1 text-center py-2.5 bg-corporate-charcoal hover:bg-corporate-gold text-white font-semibold rounded-full text-xs shadow-sm cursor-pointer transition-colors duration-300"
                      >
                        Apply Now
                      </button>
                      <button
                        onClick={() => triggerDiscuss(bond)}
                        className="flex-1 text-center py-2.5 bg-white border border-black/10 text-corporate-charcoal hover:bg-corporate-white font-semibold rounded-full text-xs cursor-pointer transition-colors duration-300 whitespace-nowrap"
                      >
                        Discuss with adviser
                      </button>
                    </div>
                    
                    {bond.factSheetUrl && (
                      <button
                        onClick={() => handleDownloadFactsheet(bond)}
                        disabled={downloadingId === bond.id}
                        className="w-full text-center py-2 bg-white border border-black/10 text-corporate-charcoal hover:bg-corporate-white disabled:opacity-50 transition-colors duration-300 font-semibold rounded-full text-[10px] cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap"
                      >
                        {downloadingId === bond.id ? (
                          <>
                            <i className="fa-solid fa-spinner animate-spin" />
                            <span>Downloading...</span>
                          </>
                        ) : (
                          <>
                            <i className="fa-solid fa-file-pdf text-red-500" />
                            <span>Download Fact Sheet</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>

                </div>

                {/* Row Bottom Info bar */}
                <div className="mt-6 pt-4 border-t border-black/5 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs text-corporate-charcoal/60 flex items-center gap-1.5">
                    <i className="fa-solid fa-circle-info text-corporate-gold text-[10px]" />
                    <span>Asset Structure: {bond.type} | Regulated secondary market asset.</span>
                  </div>
                  <button
                    onClick={() => toggleExpand(bond.id)}
                    className="text-xs text-corporate-gold font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    {expandedBonds[bond.id] ? (
                      <>
                        <span>Hide details</span>
                        <i className="fa-solid fa-chevron-up text-[10px]" />
                      </>
                    ) : (
                      <>
                        <span>Show details</span>
                        <i className="fa-solid fa-chevron-down text-[10px]" />
                      </>
                    )}
                  </button>
                </div>

                {/* Expanded details dropdown */}
                <AnimatePresence initial={false}>
                  {expandedBonds[bond.id] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 border-t border-black/5 mt-4 space-y-6">
                        
                        {/* Technical Specs Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-corporate-white p-5 rounded-2xl border border-black/5">
                          <div>
                            <span className="text-[10px] text-corporate-charcoal/40 font-semibold uppercase block">Guarantor / Issuer</span>
                            <span className="text-xs font-semibold text-corporate-charcoal block mt-0.5">{bond.issuer}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-corporate-charcoal/40 font-semibold uppercase block">ISIN Reference</span>
                            <span className="text-xs font-semibold text-corporate-charcoal font-mono block mt-0.5">{bond.isin}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-corporate-charcoal/40 font-semibold uppercase block">Asset Structure</span>
                            <span className="text-xs font-semibold text-corporate-charcoal block mt-0.5">{bond.type}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-corporate-charcoal/40 font-semibold uppercase block">London Stock Exchange</span>
                            <Link
                              href={bond.lseUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-semibold text-corporate-gold hover:underline block mt-0.5 flex items-center gap-1"
                            >
                              <span>View Analysis</span>
                              <i className="fa-solid fa-up-right-from-square text-[9px]" />
                            </Link>
                          </div>
                        </div>

                        {/* Why Selected & About Issuer */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-1.5">
                            <h5 className="font-bold text-xs text-corporate-charcoal flex items-center gap-1.5">
                              <i className="fa-solid fa-compass text-corporate-gold" /> Why this has been selected for you
                            </h5>
                            <p className="text-xs text-corporate-charcoal/70 leading-relaxed">
                              {bond.whySelected}
                            </p>
                          </div>
                          <div className="space-y-1.5">
                            <h5 className="font-bold text-xs text-corporate-charcoal flex items-center gap-1.5">
                              <i className="fa-solid fa-building-columns text-corporate-gold" /> About the issuer
                            </h5>
                            <p className="text-xs text-corporate-charcoal/70 leading-relaxed">
                              {bond.aboutIssuer}
                            </p>
                          </div>
                        </div>

                        {/* Key Considerations checkmarks */}
                        <div className="bg-corporate-white p-5 rounded-2xl border border-black/5">
                          <h5 className="font-bold text-[10px] uppercase tracking-wider text-corporate-charcoal/50 mb-3">Key Benefits & Considerations</h5>
                          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {bond.keyConsiderations.map((consideration, idx) => (
                              <li key={idx} className="flex items-center gap-2.5 text-xs text-corporate-charcoal font-medium">
                                <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 flex-shrink-0 text-xs">
                                  <i className="fa-solid fa-check" />
                                </span>
                                <span>{consideration}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

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

      {/* --- ADVISER CONTACT MODAL --- */}
      <Modal
        isOpen={activeAdviserModal}
        onClose={() => setActiveAdviserModal(false)}
        title="Consult with Adviser"
      >
        <div className="space-y-6">
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
              <h4 className="font-bold text-base font-serif text-white">{adviser.name}</h4>
              <p className="text-xs text-corporate-gold">{adviser.title}</p>
              <p className="text-[10px] text-white/50 mt-1">Baker Jones Wealth Advisory</p>
            </div>
          </div>

          {/* Secure Contact Details */}
          <div className="space-y-4">
            <h5 className="font-bold text-xs uppercase tracking-wider text-corporate-charcoal/40">Direct Channels</h5>

            <div className="grid grid-cols-1 gap-3">
              <Link
                href={`tel:${adviser.phone.replace(/[^0-9+]/g, "")}`}
                className="flex items-center justify-between p-4 bg-corporate-white hover:bg-corporate-beige/40 rounded-2xl border border-black/5 transition-colors group"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <span className="w-9 h-9 rounded-full bg-corporate-gold/10 flex items-center justify-center text-corporate-gold text-sm group-hover:scale-105 transition-transform flex-shrink-0">
                    <i className="fa-solid fa-phone" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] text-corporate-charcoal/50 uppercase font-bold block">Call Direct</span>
                    <span className="text-xs font-semibold text-corporate-charcoal break-all">{adviser.phone}</span>
                  </div>
                </div>
                <i className="fa-solid fa-chevron-right text-xs text-corporate-gold opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-2" />
              </Link>

              <Link
                href={`mailto:${adviser.email}`}
                className="flex items-center justify-between p-4 bg-corporate-white hover:bg-corporate-beige/40 rounded-2xl border border-black/5 transition-colors group"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <span className="w-9 h-9 rounded-full bg-corporate-gold/10 flex items-center justify-center text-corporate-gold text-sm group-hover:scale-105 transition-transform flex-shrink-0">
                    <i className="fa-solid fa-envelope" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] text-corporate-charcoal/50 uppercase font-bold block">Secure Email</span>
                    <span className="text-xs font-semibold text-corporate-charcoal break-all">{adviser.email}</span>
                  </div>
                </div>
                <i className="fa-solid fa-chevron-right text-xs text-corporate-gold opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-2" />
              </Link>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center sm:justify-end gap-3 border-t border-black/5 pt-6 w-full">
            <Link
              href={`tel:${adviser.phone.replace(/[^0-9+]/g, "")}`}
              className="text-center px-6 py-3 bg-corporate-gold text-white font-semibold rounded-full hover:bg-corporate-charcoal transition-colors duration-300 text-sm shadow-md flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-phone" /> Call Adviser
            </Link>

            <Link
              href={`mailto:${adviser.email}`}
              className="text-center px-6 py-3 bg-corporate-charcoal text-white font-semibold rounded-full hover:bg-corporate-gold transition-colors duration-300 text-sm shadow-md flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-envelope" /> Send Email
            </Link>

            <button
              onClick={() => setActiveAdviserModal(false)}
              className="py-3 px-6 border border-black/10 text-corporate-charcoal hover:bg-corporate-white font-semibold rounded-full text-sm transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>

          {/* Legal Notice */}
          <div className="border-t border-black/5 pt-4 text-[10px] text-corporate-charcoal/40 leading-relaxed text-center">
            Communications through this channel are subject to standard security encryption. Records of requests are archived in accordance with FCA client records requirements.
          </div>
        </div>
      </Modal>

      {/* --- PROCEED EXECUTION MODAL --- */}
      <AnimatePresence>
        {activeProceedModal && selectedBond && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            {/* Backdrop Blur */}
            <motion.div
              ref={modalBackdropRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProceedModal(false)}
              onWheel={(e) => e.preventDefault()}
              onTouchMove={(e) => e.preventDefault()}
              className="fixed inset-0 bg-black cursor-pointer"
            />

            {/* Modal Body */}
            <motion.div
              ref={modalScrollRef}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.5 }}
              data-lenis-prevent
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative z-10 border border-black/5 text-corporate-charcoal p-6 md:p-8 max-h-[90vh] overflow-y-auto"
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
