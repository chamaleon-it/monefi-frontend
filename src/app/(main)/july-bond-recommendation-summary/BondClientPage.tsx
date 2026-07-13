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
  minDeposit: string; // Dynamic minimum deposit value
}

export default function BondClientPage() {
  // Client portal states
  const [activeAdviserModal, setActiveAdviserModal] = useState<boolean>(false);
  const [activeProceedModal, setActiveProceedModal] = useState<boolean>(false);
  const [selectedBond, setSelectedBond] = useState<BondDetails | null>(null);

  // Accordion state (null if all closed, or index of open accordion)
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqData = [
    {
      question: "What happens when my bond reaches maturity?",
      answer: "When your bond finishes, you receive your entire original investment amount back in full, along with any final interest payment due. There are absolutely zero fees on maturity, meaning every penny of your initial capital and final return is yours to keep."
    },
    {
      question: "How often will my interest be paid?",
      answer: "We offer flexible monthly, quarterly, or annual payment options to suit your personal cash flow. We can provide these varied schedules because our unique credit facility agreements with different underlying banks allow us to structure payouts according to what works best for you."
    },
    {
      question: "Will someone help guide me through this entire process?",
      answer: "Yes, completely. You are never left to navigate this alone. From the moment you express interest, through setting up your account, to managing your active holdings, our team is here to hold your hand every step of the way. This personalised support continues right up to the end: a dedicated Baker Jones adviser will personally call you 30 days before your bond matures to help you seamlessly arrange your next steps."
    },
    {
      question: "How can I access my money early if my circumstances change?",
      answer: "For ultimate peace of mind, we offer a dedicated buy-back option after just 1 year via flexible, 1-year rolling contracts. If you need to exit early using this annual buy-back option, a small 0.5% penalty fee applies. If you choose to sell your bond early outside of this window, it is just a flat £7.95 dealing fee. Once finalised, your returned funds will land safely back in your bank account within 24 to 72 hours."
    },
    {
      question: "How are my payments handled and are they secure?",
      answer: "As a specialised firm, we ensure your transactions carry institutional-grade security. All financial transfers are routed exclusively through FCA-regulated UK banks, brokerages, or secure escrow services utilising household institutions like Barclays, Lloyds, or HSBC. To eliminate any settlement risk, your investment funds are only released once you hold the full, official bond certificate in your name. You can track all of this in real-time via your secure, 24/7 online operational platform."
    },
    {
      question: "How does Baker Jones earn money and how do you fit into the process?",
      answer: "We act strictly as your broker, using our wide network of banks, financial institutions, and family offices to bring all these different options together onto one page. Bonds are just one part of our broader business; we also generate revenue when our clients use us for other services like new company launches (pre-IPOs), managed funds, and other investments.\n\nBecause we run a diversified business, we do not need to charge you high setup costs or ongoing management fees for your bonds. Depending on the specific option you choose, we are either paid a small fee by the institution providing the bond or we earn a tiny transaction cost from the trade. What matters to you is that the interest rate you see on this page is exactly what you get. The only direct trading costs you will ever see from us are our standard flat £7.95 dealing fee, or a 0.5% penalty fee if you choose to exit a bond early using our annual buy-back option."
    }
  ];

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
  const [adviser, setAdviser] = useState({
    name: "Peter Cooke",
    title: "Senior Fixed-Income Director",
    phone: "+44 (0) 20 7123 4567",
    email: "peter.cooke@bakerjonesholdings.com",
    photo: "/peter_cooke.png"
  });

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const advisorParam = params.get("advisor") || params.get("Advisor") || params.get("dealer") || params.get("ref");
      const hash = window.location.hash.replace("#", "").toLowerCase();

      const isJS = (advisorParam?.toLowerCase() === "js" || hash === "js");
      if (isJS) {
        setAdviser({
          name: "John Sterling",
          title: "Senior Fixed-Income Director",
          phone: "+44 (0) 20 7123 4568",
          email: "john.sterling@bakerjonesholdings.com",
          photo: "/john_sterling.png"
        });
      } else {
        // Default is Peter Cooke
        setAdviser({
          name: "Peter Cooke",
          title: "Senior Fixed-Income Director",
          phone: "+44 (0) 20 7123 4567",
          email: "peter.cooke@bakerjonesholdings.com",
          photo: "/peter_cooke.png"
        });
      }
    }
  }, []);

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
      companyName: "Lloyds Bank",
      issuer: "Lloyds Bank",
      coupon: "6.625%",
      maturity: "1 year",
      isin: "XS2591847970",
      type: "Fixed Rate",
      whySelected: "This option aligns with a balanced approach to income generation and capital stability based on the objectives discussed during your consultation.",
      aboutIssuer: "Lloyds Bank is one of the UK's largest retail and commercial banking groups with an established history of financial strength.",
      keyConsiderations: [
        "One-year rolling contract available until maturity",
        "Flexible income options",
        "Tier 1 banking institution"
      ],
      recommended: true,
      lseUrl: "https://www.londonstockexchange.com/stock/XS2591847970/lloyds-bank-plc/analysis",
      factSheetUrl: "/docs/1234-plc-factsheet.pdf",
      minDeposit: "£10,000"
    },
    {
      id: "bond-alt-1",
      companyName: "UK Government",
      issuer: "UK Government",
      coupon: "4.375%",
      maturity: "1 year",
      isin: "GB00BPSNBB36",
      type: "Fixed Rate | Government Bond",
      whySelected: "This choice gives you a simple, steady income. It is backed by the UK government, making it one of the safest ways to save your money and earn regular cash payments.",
      aboutIssuer: "The United Kingdom Government issues debt via the Debt Management Office to fund public infrastructure, health, and national services, offering revenue backed entirely by the taxing power of the state.",
      keyConsiderations: [
        "One-year rolling contract available until maturity",
        "AAA rated sovereign credit profile",
        "Exemption from UK Capital Gains Tax (CGT)",
        "Government Backed"
      ],
      lseUrl: "https://www.londonstockexchange.com/stock/GB00BPSNBB36/uk-government/analysis",
      factSheetUrl: "/docs/uk-government-factsheet.pdf",
      minDeposit: "£10,000"
    },
    {
      id: "bond-alt-2",
      companyName: "National Grid plc",
      issuer: "National Grid plc",
      coupon: "6.50%",
      maturity: "1 year",
      isin: "XS0132735373",
      type: "Fixed Rate",
      whySelected: "Provides exposure to a regulated UK utility company often selected for defensive income characteristics.",
      aboutIssuer: "National Grid plc transmits and distributes electricity and gas across the United Kingdom and northeastern United States, operating high-voltage networks under strict price controls set by the energy regulator, Ofgem.",
      keyConsiderations: [
        "One-year rolling contract available until maturity",
        "Blue chip utility company",
        "Flexible income options",
        "Diversifies bond exposure"
      ],
      lseUrl: "https://www.londonstockexchange.com/stock/XS0132735373/national-grid-plc/analysis",
      factSheetUrl: "/docs/ijkl-corporation-factsheet.pdf",
      minDeposit: "£10,000"
    }
  ];

  // Configurable factsheet downloader with fallback
  const handleDownloadFactsheet = (bond: BondDetails) => {
    if (!bond.factSheetUrl) {
      toast.error("Fact sheet URL is not configured for this bond.");
      return;
    }

    try {
      const link = document.createElement("a");
      link.href = bond.factSheetUrl;
      const cleanName = bond.companyName.toLowerCase().replace(/[^a-z0-9]/g, "-");
      link.download = `${cleanName}-factsheet.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success(`Factsheet for ${bond.companyName} downloaded successfully.`);
    } catch (error) {
      console.warn("Direct download failed, opening PDF in a new tab as fallback:", error);
      window.open(bond.factSheetUrl, "_blank", "noopener,noreferrer");
      toast.success(`Factsheet for ${bond.companyName} opened in a new tab.`);
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
    setActiveProceedModal(true);
  };

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  // Logo Renderers
  const renderLogo = (companyName: string) => {
    switch (companyName) {
      case "Lloyds Bank plc":
        return (
          <img src="/bank logos/lloyds-logo.svg" alt="Lloyds Bank logo" className="w-full h-full object-contain" />
        );
      case "National Grid plc":
        return (
          <img src="/bank logos/national-grid-logo.png" alt="National Grid logo" className="w-full h-full object-contain animate-fade-in" />
        );
      case "Bank of America Corporation":
      case "Bank of America Corporation Corporation":
        return (
          <img src="/bank logos/bank-of-america.svg" alt="Bank of America logo" className="w-full h-full object-contain" />
        );
      case "UK Government":
        return (
          <img src="/bank logos/uk-government.svg" alt="UK Government logo" className="w-full h-full object-contain" />
        );
      default:
        return (
          <svg className="w-full h-full text-corporate-gold" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
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

      {/* --- CONTENT CONTAINER --- */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-12 md:pt-16">

        {/* Brand/Header Section */}
        <div className="mb-12 max-w-4xl border-b border-black/5 pb-8">
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-[#1e3a8a] mb-4">
            Bond recommendation summary
          </h1>
          <p className="text-sm md:text-base text-corporate-charcoal/70 mb-4 leading-relaxed">
            Following your consultation, we&apos;ve reviewed current fixed-income opportunities and selected three bond options that align with your investment objectives.
          </p>
          <span className="text-corporate-gold font-semibold uppercase tracking-wider text-xs block mt-2">
            Tailored Selection
          </span>
        </div>

        {/* SECTION HEADER: RECOMMENDATIONS */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold font-serif text-corporate-charcoal">Recommended Bonds</h2>
        </div>

        {/* --- RECOMMENDED BONDS LIST --- */}
        <div className="space-y-12">
          {bondData.map((bond) => {
            if (bond.recommended) {
              return (
                <motion.div
                  key={bond.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="bg-white rounded-3xl border-2 border-corporate-gold shadow-2xl relative overflow-hidden hover:shadow-black/10 transition-all duration-300 group"
                >
                  <div className="p-6 md:p-10 relative">
                    {/* Top Recommended Ribbon Badge */}
                    <div className="flex flex-wrap items-center gap-2 mb-6">
                      <span className="flex items-center gap-1.5 px-3 py-1 bg-corporate-gold text-white font-bold text-[10px] uppercase tracking-wider rounded-full shadow-md animate-pulse">
                        <i className="fa-solid fa-star text-[9px]" /> Our Choice
                      </span>
                    </div>

                    {/* Soft decorative background visual */}
                    <div className="absolute top-0 right-0 w-80 h-80 bg-corporate-gold/5 rounded-full blur-3xl pointer-events-none -z-10 group-hover:bg-corporate-gold/8 transition-colors duration-500" />

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">

                      {/* Col 1: Issuer Logo & Identity */}
                      <div className="lg:col-span-3 flex items-center gap-4">
                        <div className="w-20 h-20 bg-white rounded-2xl border border-black/5 shadow-sm flex items-center justify-center p-2 flex-shrink-0 overflow-hidden">
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
                          <span className="text-[10px] text-corporate-charcoal/40 font-semibold uppercase block">Rate</span>
                          <strong className="text-lg md:text-xl font-bold text-corporate-gold block leading-none">{bond.coupon}</strong>
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-[10px] text-corporate-charcoal/40 font-semibold uppercase block">Term</span>
                          <strong className="text-base md:text-lg font-bold text-corporate-charcoal block leading-none">{bond.maturity}</strong>
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-[10px] text-corporate-charcoal/40 font-semibold uppercase block">Min Deposit</span>
                          <strong className="text-base md:text-lg font-bold text-corporate-charcoal block leading-none">{bond.minDeposit}</strong>
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
                            Speak to adviser
                          </button>
                        </div>

                        {bond.factSheetUrl && (
                          <a
                            href={bond.factSheetUrl}
                            download={`${bond.companyName.toLowerCase().replace(/[^a-z0-9]/g, "-")}-factsheet.pdf`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full text-center py-2 bg-white border border-black/10 text-corporate-charcoal hover:bg-corporate-white transition-colors duration-300 font-semibold rounded-full text-[10px] cursor-pointer flex items-center justify-center gap-1.5"
                          >
                            <i className="fa-solid fa-file-pdf text-red-500" />
                            <span>Download Fact Sheet</span>
                          </a>
                        )}
                      </div>

                    </div>

                    {/* Row Bottom Info bar */}
                    <div className="mt-6 pt-4 border-t border-black/5 flex flex-wrap items-center justify-between gap-3">
                      <div className="text-xs text-corporate-charcoal/60 flex items-center gap-1.5">
                        <i className="fa-solid fa-circle-info text-corporate-gold text-[10px]" />
                        <span>Asset Structure: {bond.type} | Semi-annual interest frequency.</span>
                      </div>
                    </div>

                    {/* Permanently Expanded details container */}
                    <div className="pt-6 border-t border-black/5 mt-6 space-y-6 bg-corporate-beige/30 p-5 rounded-2xl border border-corporate-gold/15">

                      {/* Technical Specs Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-5 rounded-2xl border border-black/5">
                        <div>
                          <span className="text-[10px] text-corporate-charcoal/40 font-semibold uppercase block">Issuer</span>
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
                          <span className="text-[10px] text-corporate-charcoal/40 font-semibold uppercase block">Verify Bond</span>
                          <Link
                            href={bond.lseUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-semibold text-corporate-gold hover:underline block mt-0.5 flex items-center gap-1"
                          >
                            <span>Click here</span>
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
                      <div className="bg-white p-5 rounded-2xl border border-black/5">
                        <h5 className="font-bold text-[10px] uppercase tracking-wider text-corporate-charcoal/50 mb-3">Key Benefits & Considerations</h5>
                        <ul className="flex flex-col md:flex-row md:flex-wrap items-start md:items-center gap-x-8 gap-y-3">
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

                  </div>
                </motion.div>
              );
            } else {
              return (
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
                        <div className="w-20 h-20 bg-white rounded-2xl border border-black/5 shadow-sm flex items-center justify-center p-2 flex-shrink-0 overflow-hidden">
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
                          <span className="text-[10px] text-corporate-charcoal/40 font-semibold uppercase block">Rate</span>
                          <strong className="text-base md:text-lg font-bold text-corporate-charcoal block leading-none">{bond.coupon}</strong>
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-[10px] text-corporate-charcoal/40 font-semibold uppercase block">Term</span>
                          <strong className="text-base md:text-lg font-bold text-corporate-charcoal block leading-none">{bond.maturity}</strong>
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-[10px] text-corporate-charcoal/40 font-semibold uppercase block">Min Deposit</span>
                          <strong className="text-base md:text-lg font-bold text-corporate-charcoal block leading-none">{bond.minDeposit}</strong>
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
                            Speak to adviser
                          </button>
                        </div>

                        {bond.factSheetUrl && (
                          <a
                            href={bond.factSheetUrl}
                            download={`${bond.companyName.toLowerCase().replace(/[^a-z0-9]/g, "-")}-factsheet.pdf`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full text-center py-2 bg-white border border-black/10 text-corporate-charcoal hover:bg-corporate-white transition-colors duration-300 font-semibold rounded-full text-[10px] cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap"
                          >
                            <i className="fa-solid fa-file-pdf text-red-500" />
                            <span>Download Fact Sheet</span>
                          </a>
                        )}
                      </div>

                    </div>

                    {/* Row Bottom Info bar */}
                    <div className="mt-6 pt-4 border-t border-black/5 flex flex-wrap items-center justify-between gap-3">
                      <div className="text-xs text-corporate-charcoal/60 flex items-center gap-1.5">
                        <i className="fa-solid fa-circle-info text-corporate-gold text-[10px]" />
                        <span>Asset Structure: {bond.type}</span>
                      </div>
                    </div>

                    {/* Permanently Expanded details container */}
                    <div className="pt-6 border-t border-black/5 mt-6 space-y-6 bg-corporate-beige/30 p-5 rounded-2xl border border-corporate-gold/15">

                      {/* Technical Specs Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-5 rounded-2xl border border-black/5">
                        <div>
                          <span className="text-[10px] text-corporate-charcoal/40 font-semibold uppercase block">Issuer</span>
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
                          <span className="text-[10px] text-corporate-charcoal/40 font-semibold uppercase block">Verify Bond</span>
                          <Link
                            href={bond.lseUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-semibold text-corporate-gold hover:underline block mt-0.5 flex items-center gap-1"
                          >
                            <span>Click here</span>
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
                      <div className="bg-white p-5 rounded-2xl border border-black/5">
                        <h5 className="font-bold text-[10px] uppercase tracking-wider text-corporate-charcoal/50 mb-3">Key Benefits & Considerations</h5>
                        <ul className="flex flex-col md:flex-row md:flex-wrap items-start md:items-center gap-x-8 gap-y-3">
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

                  </div>
                </motion.div>
              );
            }
          })}
        </div>



        {/* --- 2. HOW TO PROCEED SECTION --- */}
        <section className="mt-28 bg-white border border-black/5 rounded-3xl p-8 lg:p-12 shadow-xl">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-corporate-gold font-semibold uppercase tracking-wider text-sm">Action Plan</span>
            <h2 className="text-3xl font-bold font-serif text-corporate-charcoal mt-1">Ready to Invest? How It Works</h2>
            <p className="text-sm text-corporate-charcoal/60 mt-3 leading-relaxed">
              We aim to make execution as seamless as possible. Follow these simple steps to finalize your transaction details.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative">
            {/* Divider line between Phase 1 and Phase 2 on larger screens */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-black/5 -translate-x-1/2" />

            {/* PHASE 1: DIGITAL SETUP */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 pb-4 border-b border-black/5">
                <span className="w-8 h-8 rounded-lg bg-corporate-charcoal/5 flex items-center justify-center text-corporate-charcoal font-bold text-xs">
                  I
                </span>
                <div>
                  <h3 className="font-bold text-sm uppercase tracking-wider text-corporate-charcoal/40">Phase 1</h3>
                  <h4 className="font-bold text-lg text-corporate-charcoal font-serif">Digital Setup</h4>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Step 1 */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-corporate-charcoal text-white flex items-center justify-center font-bold text-sm shadow-md">
                      01
                    </span>
                    <span className="w-10 h-10 rounded-xl bg-corporate-gold/10 flex items-center justify-center text-corporate-gold">
                      <i className="fa-solid fa-mouse-pointer text-lg" />
                    </span>
                  </div>
                  <div>
                    <h5 className="font-bold text-base text-corporate-charcoal font-serif mb-2">1. Apply Online</h5>
                    <ul className="text-xs text-corporate-charcoal/70 space-y-1.5 list-disc pl-4">
                      <li>Click Apply Now next to your chosen bond.</li>
                      <li>Start your secure application.</li>
                    </ul>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-corporate-charcoal text-white flex items-center justify-center font-bold text-sm shadow-md">
                      02
                    </span>
                    <span className="w-10 h-10 rounded-xl bg-corporate-gold/10 flex items-center justify-center text-corporate-gold">
                      <i className="fa-solid fa-shield-halved text-lg" />
                    </span>
                  </div>
                  <div>
                    <h5 className="font-bold text-base text-corporate-charcoal font-serif mb-2">2. Instant KYC</h5>
                    <ul className="text-xs text-corporate-charcoal/70 space-y-1.5 list-disc pl-4">
                      <li>Complete the brief form.</li>
                      <li>Securely upload your ID documents in under 5 minutes.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* PHASE 2: FINALISE & FUND */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 pb-4 border-b border-black/5">
                <span className="w-8 h-8 rounded-lg bg-corporate-gold/10 flex items-center justify-center text-corporate-gold font-bold text-xs">
                  II
                </span>
                <div>
                  <h3 className="font-bold text-sm uppercase tracking-wider text-corporate-gold/80">Phase 2</h3>
                  <h4 className="font-bold text-lg text-corporate-charcoal font-serif">Finalise & Fund</h4>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Step 3 */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-corporate-gold text-white flex items-center justify-center font-bold text-sm shadow-md">
                      03
                    </span>
                    <span className="w-10 h-10 rounded-xl bg-corporate-gold/10 flex items-center justify-center text-corporate-gold">
                      <i className="fa-solid fa-envelope text-lg" />
                    </span>
                  </div>
                  <div>
                    <h5 className="font-bold text-base text-corporate-charcoal font-serif mb-2">3. Tailor Your Order</h5>
                    <ul className="text-xs text-corporate-charcoal/70 space-y-1.5 list-disc pl-4">
                      <li>Once approved, your adviser will email you.</li>
                      <li>Confirm your exact invested amount and term.</li>
                    </ul>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-corporate-gold text-white flex items-center justify-center font-bold text-sm shadow-md">
                      04
                    </span>
                    <span className="w-10 h-10 rounded-xl bg-corporate-gold/10 flex items-center justify-center text-corporate-gold">
                      <i className="fa-solid fa-building-columns text-lg" />
                    </span>
                  </div>
                  <div>
                    <h5 className="font-bold text-base text-corporate-charcoal font-serif mb-2">4. Secure Bond</h5>
                    <ul className="text-xs text-corporate-charcoal/70 space-y-1.5 list-disc pl-4">
                      <li>Review your official Bond Purchase Agreement.</li>
                      <li>Receive our secure settlement bank details.</li>
                    </ul>
                  </div>
                </div>
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

            {/* Accordion 2: Secondary Market */}
            <div className="bg-white border border-black/5 rounded-2xl overflow-hidden shadow-sm">
              <button
                onClick={() => toggleAccordion(1)}
                className="w-full flex items-center justify-between p-6 text-left font-semibold text-corporate-charcoal hover:bg-corporate-white/50 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-3">
                  <i className="fa-solid fa-chart-line text-corporate-gold w-5" />
                  <span>Secondary Market</span>
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
                        The secondary market is simply a place where investors buy and sell bonds that have already been issued, similar to buying something second-hand. Baker Jones helps facilitate these transactions by matching you with individuals who want to sell their existing bonds before they mature.
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
                    <div className="px-6 pb-6 pt-4 border-t border-black/5 text-sm text-corporate-charcoal/70 leading-relaxed space-y-4">
                      <p>
                        We operate a transparent client fee structure. By processing transactions digitally, we remove manual admin tasks to keep our fixed-income advisory and custody service costs as low as possible:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="p-4 bg-corporate-white rounded-xl border border-black/5 text-center">
                          <span className="text-[10px] text-corporate-charcoal/50 uppercase font-bold block mb-1">Dealing Fees</span>
                          <span className="text-xl font-bold text-corporate-charcoal">£7.95</span>
                          <span className="text-xs text-corporate-charcoal/60 block mt-1">per buy or sell trade</span>
                        </div>
                        <div className="p-4 bg-corporate-white rounded-xl border border-black/5 text-center">
                          <span className="text-[10px] text-corporate-charcoal/50 uppercase font-bold block mb-1">Platform Fees</span>
                          <span className="text-xl font-bold text-corporate-charcoal">0.12%</span>
                          <span className="text-xs text-corporate-charcoal/60 block mt-1">annually</span>
                        </div>
                        <div className="p-4 bg-corporate-white rounded-xl border border-black/5 text-center">
                          <span className="text-[10px] text-corporate-charcoal/50 uppercase font-bold block mb-1">Early Exit Fees</span>
                          <span className="text-xl font-bold text-corporate-charcoal">0.5%</span>
                          <span className="text-xs text-corporate-charcoal/60 block mt-1">applicable to buyback agreements only</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Accordion 4: Protection and Custodianship */}
            <div className="bg-white border border-black/5 rounded-2xl overflow-hidden shadow-sm">
              <button
                onClick={() => toggleAccordion(3)}
                className="w-full flex items-center justify-between p-6 text-left font-semibold text-corporate-charcoal hover:bg-corporate-white/50 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-3">
                  <i className="fa-solid fa-lock text-corporate-gold w-5" />
                  <span>Protection and Custodianship</span>
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
                        Your cash and assets are held in separate, protected accounts managed by major UK custodian banks under strict UK CASS (Client Assets Sourcebook) rules, keeping your money legally detached from our own business operations. The cash deposits and qualifying bonds we recommend are eligible for standard Financial Services Compensation Scheme (FSCS) protection up to £120,000 per person, per institution. It is important to know that while your cash deposits are fully covered under this safety net, secondary market bonds are separate investment products where protection only applies if the underlying issuer fails, rather than covering general market performance. Please note that Baker Jones acts strictly as your broker to find and arrange these deals; we do not issue our own bonds or offer direct deposit products, which means Baker Jones itself is not covered by the FSCS.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </section>

        {/* --- FAQ SECTION --- */}
        <section className="mt-24 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-corporate-gold font-semibold uppercase tracking-wider text-xs">Clarifications</span>
            <h2 className="text-3xl font-bold font-serif text-corporate-charcoal mt-1">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-white border border-black/5 rounded-2xl overflow-hidden shadow-sm">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 text-left font-semibold text-corporate-charcoal hover:bg-corporate-white/50 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-3">
                    <i className="fa-solid fa-circle-question text-corporate-gold w-5" />
                    <span>{faq.question}</span>
                  </span>
                  <i className={`fa-solid fa-chevron-down text-sm text-corporate-gold transition-transform duration-300 ${openFaq === index ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence initial={false}>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-2 border-t border-black/5 text-sm text-corporate-charcoal/70 leading-relaxed whitespace-pre-line">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
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
            <div className="w-14 h-14 rounded-full bg-corporate-gold/20 flex-shrink-0 flex items-center justify-center border border-corporate-gold/30 overflow-hidden">
              {adviser.photo ? (
                <img src={adviser.photo} className="w-full h-full object-cover" alt={adviser.name} />
              ) : (
                <i className="fa-solid fa-user-check text-corporate-gold text-2xl" />
              )}
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
                  <h3 className="font-bold text-lg font-serif">Apply for Bond</h3>
                </div>
                <button
                  onClick={() => setActiveProceedModal(false)}
                  className="w-8 h-8 rounded-full bg-corporate-white hover:bg-black/5 flex items-center justify-center text-corporate-charcoal transition-colors cursor-pointer"
                >
                  <i className="fa-solid fa-xmark text-sm" />
                </button>
              </div>

              <div className="space-y-6">
                <p className="text-sm text-corporate-charcoal/75 leading-relaxed">
                  If you wish to apply for the{" "}
                  <strong className="text-corporate-charcoal font-semibold">
                    {selectedBond.companyName.includes("Lloyds") ? "Lloyds" : selectedBond.companyName} {selectedBond.coupon} bond
                  </strong>{" "}
                  please click on the application link below.
                </p>

                <div className="py-4 text-center">
                  <Link
                    href={`/new-application-form?advisor=${adviser.name === "John Sterling" ? "js" : "pc"}`}
                    className="inline-flex items-center gap-2 px-8 py-3 bg-[#1e3a8a] text-white hover:bg-corporate-gold font-semibold rounded-full text-sm shadow-md transition-colors duration-300"
                  >
                    <span>Apply Online Now</span>
                    <i className="fa-solid fa-arrow-right text-xs" />
                  </Link>
                </div>

                <p className="text-xs text-corporate-charcoal/60 leading-relaxed text-center font-medium">
                  Once completed your advisor will contact you to confirm the amount you wish to invest and the term.
                </p>

                <div className="flex justify-end pt-4 border-t border-black/5">
                  <button
                    onClick={() => setActiveProceedModal(false)}
                    className="px-6 py-2 border border-black/10 text-corporate-charcoal hover:bg-corporate-white font-semibold rounded-full text-xs transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
