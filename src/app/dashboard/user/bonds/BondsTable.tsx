"use client";

import React, { useState, useMemo } from "react";
import useSWR from "swr";
import Link from "next/link";
import { fDate } from "@/utility/dateFormatters.ts";
import { CouponFrequency } from "@/enum/coupon-frequency.enum";
import { CouponType } from "@/enum/coupon-type.enum";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import Modal from "@/components/ui/Modal";
import {
  FileText,
  ExternalLink,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Phone,
  Mail,
  CheckCircle2,
  Download,
  Building2,
  Info,
  TrendingUp,
  Copy,
  Check,
  Table as TableIcon,
  LayoutGrid
} from "lucide-react";

interface Bond {
  _id: string;
  name: string;
  isin: string;
  couponType: CouponType | string;
  annualCouponRate: number;
  couponFrequency: CouponFrequency | string;
  meturityDate: string;
  createdAt: string;
  description?: string;
  minDeposit?: string;
  lseUrl?: string;
  factSheetUrl?: string;
}

interface CuratedBond {
  id: string;
  companyName: string;
  issuer: string;
  coupon: string;
  annualCouponRate: number;
  maturity: string;
  isin: string;
  type: string;
  whySelected: string;
  aboutIssuer: string;
  keyConsiderations: string[];
  recommended?: boolean;
  lseUrl: string;
  factSheetUrl: string;
  minDeposit: string;
  logo: string;
  frequency: string;
}

const FEATURED_CURATED_BONDS: CuratedBond[] = [
  {
    id: "bond-featured-1",
    companyName: "Lloyds Bank plc",
    issuer: "Lloyds Bank Group",
    coupon: "6.625%",
    annualCouponRate: 6.625,
    maturity: "1 year rolling",
    isin: "XS2591847970",
    type: "Senior Unsecured | Fixed Rate",
    whySelected: "This option aligns with a balanced approach to income generation and capital stability based on high-yield UK retail banking metrics.",
    aboutIssuer: "Lloyds Bank is one of the UK's largest retail and commercial banking groups with an established history of financial strength and institutional credit backing.",
    keyConsiderations: [
      "One-year rolling contract available until maturity",
      "Flexible monthly/quarterly/annual income payouts",
      "Tier 1 UK banking institution",
      "FCA regulated custody & settlement"
    ],
    recommended: true,
    lseUrl: "https://www.londonstockexchange.com/stock/XS2591847970/lloyds-bank-plc/analysis",
    factSheetUrl: "/fact-sheet-pdf/Lloyds 6.625__bakerjones.pdf",
    minDeposit: "£10,000",
    logo: "/bank logos/lloyds-logo.svg",
    frequency: "Quarterly / Annual"
  },
  {
    id: "bond-featured-2",
    companyName: "HSBC Holdings plc",
    issuer: "HSBC Holdings",
    coupon: "7.000%",
    annualCouponRate: 7.0,
    maturity: "1 year rolling",
    isin: "XS0356452929",
    type: "Fixed Rate Bond",
    whySelected: "Offers exceptional capital yield from one of the world's premier global banking conglomerates with deep international liquidity reserves.",
    aboutIssuer: "HSBC Holdings plc is one of the world's largest banking and financial services organisations with a deeply established history of global financial strength.",
    keyConsiderations: [
      "High yield coupon structure",
      "Global systemically important bank (G-SIB)",
      "Exempt from UK CGT under specific conditions",
      "Annual buy-back liquidity guarantee"
    ],
    recommended: true,
    lseUrl: "https://www.londonstockexchange.com/stock/XS0356452929/hsbc-holdings-plc/analysis",
    factSheetUrl: "/fact-sheet-pdf/HSBC_7___bakerjones.pdf",
    minDeposit: "£10,000",
    logo: "hsbc",
    frequency: "Annual"
  },
  {
    id: "bond-featured-3",
    companyName: "UK Government Gilt",
    issuer: "HM Treasury / Debt Management Office",
    coupon: "4.375%",
    annualCouponRate: 4.375,
    maturity: "1 year rolling",
    isin: "GB00BPSNBB36",
    type: "Sovereign Debt | Government Backed",
    whySelected: "Provides absolute capital security backed directly by the taxing power of the United Kingdom HM Treasury DMO.",
    aboutIssuer: "The United Kingdom Government issues debt via the Debt Management Office to fund national infrastructure, health, and public services.",
    keyConsiderations: [
      "AAA / Aa3 sovereign credit security",
      "Full exemption from UK Capital Gains Tax (CGT)",
      "Zero default history",
      "Government sovereign backing"
    ],
    recommended: false,
    lseUrl: "https://www.londonstockexchange.com/stock/GB00BPSNBB36/uk-government/analysis",
    factSheetUrl: "/fact-sheet-pdf/4.375__ united kingdom __bakerjones.pdf",
    minDeposit: "£10,000",
    logo: "/bank logos/uk-government.svg",
    frequency: "Semi-Annual"
  },
  {
    id: "bond-featured-4",
    companyName: "National Grid Electricity Transmission",
    issuer: "National Grid plc",
    coupon: "6.500%",
    annualCouponRate: 6.5,
    maturity: "1 year rolling",
    isin: "XS0132735373",
    type: "Corporate Utility Bond",
    whySelected: "Provides exposure to a regulated UK utility company often selected for defensive income characteristics.",
    aboutIssuer: "National Grid transmits and distributes electricity and gas across the United Kingdom and northeastern United States under strict Ofgem price controls.",
    keyConsiderations: [
      "Defensive utility asset class",
      "Consistent operational cashflows",
      "Monopoly energy network positioning",
      "Flexible withdrawal choices"
    ],
    recommended: false,
    lseUrl: "https://www.londonstockexchange.com/stock/XS0132735373/national-grid-plc/analysis",
    factSheetUrl: "/fact-sheet-pdf/6.5_ National Grid Electricity Transmission_bakerjones.pdf",
    minDeposit: "£10,000",
    logo: "/bank logos/national-grid-logo.png",
    frequency: "Annual"
  }
];

export default function BondsPage() {
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  const [selectedBond, setSelectedBond] = useState<CuratedBond | null>(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isAdviserModalOpen, setIsAdviserModalOpen] = useState(false);
  const [copiedIsin, setCopiedIsin] = useState<string | null>(null);

  // Request allocation state
  const [investAmount, setInvestAmount] = useState<string>("10000");
  const [paymentFrequency, setPaymentFrequency] = useState<string>("Quarterly");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // SWR fetch real bonds from API
  const { data: apiData } = useSWR<{ data: Bond[]; pagination: any }>("/bonds");
  const apiBonds = apiData?.data ?? [];

  const toggleExpand = (id: string) => {
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopyIsin = (isin: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(isin);
    setCopiedIsin(isin);
    toast.success(`ISIN ${isin} copied to clipboard`);
    setTimeout(() => setCopiedIsin(null), 2000);
  };

  const handleDownloadFactsheet = async (factSheetUrl: string, companyName: string) => {
    if (!factSheetUrl) {
      toast.error("Factsheet is not available for this bond.");
      return;
    }
    try {
      toast.loading("Preparing factsheet download...", { id: "download" });
      const response = await fetch(factSheetUrl);
      if (!response.ok) throw new Error("Failed to fetch");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const cleanName = companyName.toLowerCase().replace(/[^a-z0-9]/g, "-");
      link.download = `${cleanName}-factsheet.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success(`Factsheet for ${companyName} downloaded`, { id: "download" });
    } catch (err) {
      window.open(factSheetUrl, "_blank");
      toast.success(`Opened ${companyName} factsheet in new tab`, { id: "download" });
    }
  };

  const handleOpenRequestModal = (bond: CuratedBond) => {
    setSelectedBond(bond);
    setInvestAmount("10000");
    setIsRequestModalOpen(true);
  };

  const handleOpenAdviserModal = (bond: CuratedBond) => {
    setSelectedBond(bond);
    setIsAdviserModalOpen(true);
  };

  const handleConfirmAllocation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBond) return;
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success(
        `Allocation request for £${Number(investAmount).toLocaleString()} in ${selectedBond.companyName} submitted successfully!`
      );
      setIsRequestModalOpen(false);
    } catch (err) {
      toast.error("Allocation request failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderLogo = (logo: string, companyName: string) => {
    if (logo === "hsbc") {
      return (
        <svg className="w-full h-full text-[#db0011] p-1" viewBox="0 0 24 24" fill="currentColor">
          <path d="m24 12.007-5.996 5.997V5.996L24 12.007zm-5.996-6.01H6.01l5.996 6.01 5.997-6.01zM0 12.006l6.01 5.997V5.996L0 12.007zm6.01 5.997h11.994l-5.997-5.997-5.996 5.997z" />
        </svg>
      );
    }
    if (logo.startsWith("/")) {
      return <img src={logo} alt={`${companyName} logo`} className="w-full h-full object-contain" />;
    }
    return <Building2 className="w-8 h-8 text-[#C5A880]" />;
  };

  return (
    <div className="w-full space-y-8 font-inter pb-16">
      {/* Header Hero Banner */}
      {/* <div className="relative rounded-3xl bg-gradient-to-r from-[#082348] via-[#0B2A54] to-[#082348] p-8 md:p-10 text-white shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-[#C5A880]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-[#C5A880]/20 text-[#F3E5AB] border border-[#C5A880]/30 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" /> Fixed Income Opportunities
            </span>
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-[10px] font-bold uppercase tracking-wider">
              100% Capital Protection Terms
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-serif font-bold text-white tracking-tight">
            Institutional Fixed Income Bonds
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Curated selection of UK sovereign gilts, tier-1 banking institutions, and defensive utility debt securities with guaranteed coupon yields and 1-year annual buy-back flexibility.
          </p>

          <div className="pt-3 flex flex-wrap items-center gap-4 text-xs text-slate-300 font-medium">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
              <span>FCA Regulated Custody</span>
            </div>
            <div className="flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-[#C5A880]" />
              <span>Yields up to 7.00% p.a.</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#C5A880]" />
              <span>1-Year Rolling Options</span>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/july-bond-recommendation-summary"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#C5A880] hover:bg-[#b0926b] text-[#082348] font-bold text-xs shadow-md transition-all"
            >
              <FileText className="w-4 h-4" />
              <span>View Full July Recommendation Summary Proposal →</span>
            </Link>
          </div>
        </div>
      </div> */}

      {/* View Controller Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
        <div>
          <h2 className="text-lg font-serif font-bold text-[#082348]">Current Bond Offerings</h2>
          <p className="text-xs text-slate-500">Explore active fixed-income offerings and secure high-yield allocations</p>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200/80">
          <button
            onClick={() => setViewMode("cards")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === "cards"
              ? "bg-[#082348] text-white shadow-xs"
              : "text-slate-600 hover:text-[#082348]"
              }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Opportunities Showcase</span>
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === "table"
              ? "bg-[#082348] text-white shadow-xs"
              : "text-slate-600 hover:text-[#082348]"
              }`}
          >
            <TableIcon className="w-3.5 h-3.5" />
            <span>Data Table</span>
          </button>
        </div>
      </div>

      {/* --- CARDS SHOWCASE VIEW (JULY PAGE DESIGN) --- */}
      {viewMode === "cards" && (
        <div className="space-y-6">
          {FEATURED_CURATED_BONDS.map((bond) => {
            const isExpanded = !!expandedCards[bond.id];
            return (
              <motion.div
                key={bond.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className={`bg-white rounded-3xl border-2 transition-all duration-300 overflow-hidden relative ${bond.recommended
                  ? "border-[#C5A880] shadow-[0_20px_40px_rgba(197,168,128,0.12)]"
                  : "border-slate-200/90 shadow-md hover:shadow-lg"
                  }`}
              >
                {/* Top Badge Ribbon */}
                <div className="bg-slate-50 px-6 py-2.5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {bond.recommended && (
                      <span className="px-3 py-0.5 bg-gradient-to-r from-[#C5A880] to-[#E6C697] text-[#082348] font-bold text-[10px] uppercase tracking-wider rounded-full flex items-center gap-1 shadow-2xs">
                        ★ Recommended Choice
                      </span>
                    )}
                    <span className="px-2.5 py-0.5 bg-[#082348]/5 text-[#082348] font-bold text-[10px] uppercase tracking-wider rounded-full border border-[#082348]/10">
                      {bond.type}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-400 font-semibold uppercase">ISIN:</span>
                    <button
                      onClick={(e) => handleCopyIsin(bond.isin, e)}
                      className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono text-xs font-bold rounded border border-slate-200 flex items-center gap-1 transition-colors"
                      title="Click to copy ISIN"
                    >
                      <span>{bond.isin}</span>
                      {copiedIsin === bond.isin ? (
                        <Check className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <Copy className="w-3 h-3 text-slate-400" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Main Card Content */}
                <div className="p-6 md:p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    {/* Issuer Logo & Information */}
                    <div className="lg:col-span-4 flex items-center gap-4">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-50 rounded-2xl border border-slate-200 p-2.5 shrink-0 flex items-center justify-center shadow-xs">
                        {renderLogo(bond.logo, bond.companyName)}
                      </div>
                      <div className="space-y-1 min-w-0">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Issuer Entity</span>
                        <h3 className="text-xl font-serif font-bold text-[#082348] truncate">{bond.companyName}</h3>
                        <p className="text-xs text-slate-500 truncate">{bond.issuer}</p>
                      </div>
                    </div>

                    {/* Specs Grid */}
                    <div className="lg:col-span-5 grid grid-cols-3 gap-3 border-y lg:border-y-0 lg:border-x border-slate-100 py-4 lg:py-0 lg:px-6">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Annual Rate</span>
                        <strong className="text-xl sm:text-2xl font-bold text-[#C5A880] block font-serif leading-none">
                          {bond.coupon}
                        </strong>
                        <span className="text-[10px] text-slate-500 block">Fixed Coupon</span>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Duration</span>
                        <strong className="text-sm sm:text-base font-bold text-[#082348] block leading-none capitalize">
                          {bond.maturity}
                        </strong>
                        <span className="text-[10px] text-slate-500 block">Rolling Option</span>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Min Deposit</span>
                        <strong className="text-sm sm:text-base font-bold text-[#082348] block leading-none">
                          {bond.minDeposit}
                        </strong>
                        <span className="text-[10px] text-slate-500 block">{bond.frequency}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="lg:col-span-3 flex flex-col gap-2.5 justify-center">
                      <button
                        onClick={() => handleOpenRequestModal(bond)}
                        className="w-full py-3 px-4 rounded-xl bg-[#082348] hover:bg-[#0B2A54] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Sparkles className="w-4 h-4 text-[#C5A880]" />
                        <span>Request Allocation</span>
                      </button>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => handleDownloadFactsheet(bond.factSheetUrl, bond.companyName)}
                          className="py-2 px-2.5 rounded-xl border border-slate-200 hover:border-[#C5A880] hover:bg-slate-50 text-slate-700 font-bold text-[11px] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5 text-[#C5A880]" />
                          <span>Factsheet</span>
                        </button>
                        <a
                          href={bond.lseUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2 px-2.5 rounded-xl border border-slate-200 hover:border-[#082348] hover:bg-slate-50 text-slate-700 font-bold text-[11px] flex items-center justify-center gap-1.5 transition-all text-center"
                        >
                          <span>Verify</span>
                          <ExternalLink className="w-3 h-3 text-slate-400" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Expand / Collapse Section Toggle */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => toggleExpand(bond.id)}
                      className="text-xs font-bold text-[#082348] hover:text-[#C5A880] flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>{isExpanded ? "Hide Bond Details & Rationale" : "View Investment Rationale & Key Terms"}</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={() => handleOpenAdviserModal(bond)}
                      className="text-xs font-semibold text-slate-500 hover:text-[#082348] flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>Speak with Advisor</span>
                    </button>
                  </div>

                  {/* Expanded Accordion Body */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600 bg-slate-50/70 p-5 rounded-2xl border border-slate-100"
                      >
                        <div className="space-y-1.5">
                          <h4 className="font-bold text-[#082348] uppercase tracking-wider text-[11px] flex items-center gap-1">
                            <Info className="w-3.5 h-3.5 text-[#C5A880]" /> Selection Rationale
                          </h4>
                          <p className="leading-relaxed">{bond.whySelected}</p>
                        </div>

                        <div className="space-y-1.5">
                          <h4 className="font-bold text-[#082348] uppercase tracking-wider text-[11px] flex items-center gap-1">
                            <Building2 className="w-3.5 h-3.5 text-[#C5A880]" /> About Issuer
                          </h4>
                          <p className="leading-relaxed">{bond.aboutIssuer}</p>
                        </div>

                        <div className="space-y-1.5">
                          <h4 className="font-bold text-[#082348] uppercase tracking-wider text-[11px] flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" /> Key Considerations
                          </h4>
                          <ul className="space-y-1">
                            {bond.keyConsiderations.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* --- TABLE VIEW --- */}
      {viewMode === "table" && (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-[0_15px_35px_rgba(8,35,72,0.04)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full whitespace-nowrap text-left">
              <thead>
                <tr className="border-b border-slate-200/80 bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-[#082348]">
                  <th className="py-4 px-5">#</th>
                  <th className="py-4 px-5">Bond Description</th>
                  <th className="py-4 px-5">ISIN Code</th>
                  <th className="py-4 px-5">Coupon Type</th>
                  <th className="py-4 px-5">Annual Coupon Rate</th>
                  <th className="py-4 px-5">Frequency</th>
                  <th className="py-4 px-5">Min Deposit</th>
                  <th className="py-4 px-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {FEATURED_CURATED_BONDS.map((bond, i) => (
                  <tr key={bond.id} className="hover:bg-slate-50/80 transition-colors whitespace-nowrap">
                    <td className="py-4 px-5 text-xs text-slate-400 font-mono">{i + 1}</td>
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 p-1 flex items-center justify-center shrink-0 border border-slate-200">
                          {renderLogo(bond.logo, bond.companyName)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[#082348]">{bond.companyName}</p>
                          <p className="text-[11px] text-slate-400">{bond.issuer}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-5 text-xs">
                      <button
                        onClick={(e) => handleCopyIsin(bond.isin, e)}
                        className="font-mono text-slate-600 bg-slate-50 px-2 py-1 rounded border border-slate-200 inline-flex items-center gap-1 hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        <span>{bond.isin}</span>
                        <Copy className="w-3 h-3 text-slate-400" />
                      </button>
                    </td>
                    <td className="py-4 px-5 text-xs">
                      <span className="inline-block px-2.5 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider bg-slate-100 text-[#082348] border border-slate-200">
                        {bond.type.split("|")[0]}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-sm font-bold text-[#C5A880]">{bond.coupon}</td>
                    <td className="py-4 px-5 text-xs font-semibold text-slate-600">{bond.frequency}</td>
                    <td className="py-4 px-5 text-xs font-bold text-[#082348]">{bond.minDeposit}</td>
                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={bond.lseUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-1.5 px-2.5 rounded-lg border border-slate-200 hover:border-[#082348] text-slate-700 font-bold text-xs inline-flex items-center gap-1 transition-colors"
                          title="Verify on London Stock Exchange"
                        >
                          <span>Verify</span>
                          <ExternalLink className="w-3 h-3 text-slate-400" />
                        </a>
                        <button
                          onClick={() => handleOpenRequestModal(bond)}
                          className="py-1.5 px-3 rounded-lg bg-[#082348] text-white font-bold text-xs hover:bg-[#0B2A54] transition-colors cursor-pointer"
                        >
                          Request
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* --- ALLOCATION REQUEST MODAL --- */}
      <Modal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        title={`Request Bond Allocation - ${selectedBond?.companyName || ""}`}
      >
        {selectedBond && (
          <form onSubmit={handleConfirmAllocation} className="space-y-6 pt-2">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#082348] to-[#0B2A54] text-white space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#F3E5AB] font-bold uppercase tracking-wider">
                  Target Bond Opportunity
                </span>
                <span className="px-2.5 py-0.5 bg-[#C5A880] text-[#082348] font-bold text-[10px] rounded-full">
                  ISIN: {selectedBond.isin}
                </span>
              </div>
              <h3 className="text-lg font-serif font-bold text-white">{selectedBond.companyName}</h3>
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Annual Yield</span>
                  <span className="font-bold text-[#C5A880] text-sm">{selectedBond.coupon}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Term</span>
                  <span className="font-bold text-white">{selectedBond.maturity}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Min Deposit</span>
                  <span className="font-bold text-white">{selectedBond.minDeposit}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Desired Investment Principal (£)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-400">£</span>
                  <input
                    type="number"
                    min="10000"
                    step="1000"
                    value={investAmount}
                    onChange={(e) => setInvestAmount(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-300 focus:border-[#C5A880] focus:ring-2 focus:ring-[#C5A880]/20 font-bold text-base text-[#082348]"
                    required
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Minimum deposit requirement: £10,000</p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Coupon Payout Frequency Preference
                </label>
                <select
                  value={paymentFrequency}
                  onChange={(e) => setPaymentFrequency(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#C5A880] focus:ring-2 focus:ring-[#C5A880]/20 font-semibold text-sm text-[#082348]"
                >
                  <option value="Monthly">Monthly Payouts</option>
                  <option value="Quarterly">Quarterly Payouts</option>
                  <option value="Annual">Annual Payout on Maturity</option>
                </select>
              </div>

              {/* Yield Calculation Preview Box */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <div className="flex justify-between text-slate-600">
                  <span>Estimated Annual Interest Return:</span>
                  <span className="font-bold text-[#C5A880] text-sm">
                    £{((Number(investAmount) || 0) * (selectedBond.annualCouponRate / 100)).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })} / yr
                  </span>
                </div>
                <div className="flex justify-between text-slate-500 text-[11px]">
                  <span>Capital Repayment at Maturity:</span>
                  <span className="font-bold text-[#082348]">
                    £{(Number(investAmount) || 0).toLocaleString()} (100% Guaranteed)
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsRequestModalOpen(false)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-[#082348] hover:bg-[#0B2A54] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? "Submitting..." : "Confirm & Submit Request"}
              </button>
            </div>
          </form>
        )}
      </Modal>

      {/* --- ADVISER CONSULTATION MODAL --- */}
      <Modal
        isOpen={isAdviserModalOpen}
        onClose={() => setIsAdviserModalOpen(false)}
        title="Consult Dedicated Wealth Adviser"
      >
        <div className="space-y-6 pt-2 text-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#082348] to-[#0B2A54] mx-auto flex items-center justify-center shadow-lg text-[#C5A880] font-bold text-2xl font-serif">
            JS
          </div>

          <div className="space-y-1">
            <h3 className="text-xl font-serif font-bold text-[#082348]">John Sinclair</h3>
            <p className="text-xs font-semibold text-[#C5A880] uppercase tracking-wider">
              Senior Wealth Adviser | Baker Jones Holdings
            </p>
          </div>

          <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
            Our wealth advisers are available to guide you through fixed-income structuring, portfolio yield optimization, and institutional escrow procedures.
          </p>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3 text-left max-w-sm mx-auto text-xs">
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-[#C5A880]" />
              <span className="font-bold text-[#082348]">+44 (0) 118 211 8521</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-[#C5A880]" />
              <span className="font-bold text-[#082348]">johnsinclair@bakerjonesholdings.com</span>
            </div>
          </div>

          <button
            onClick={() => {
              toast.success("Callback request sent to John Sinclair.");
              setIsAdviserModalOpen(false);
            }}
            className="w-full py-3 rounded-xl bg-[#082348] hover:bg-[#0B2A54] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
          >
            Request Instant Advisor Callback
          </button>
        </div>
      </Modal>
    </div>
  );
}
