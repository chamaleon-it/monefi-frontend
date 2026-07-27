"use client";

import React, { useState, useMemo } from "react";
import useSWR from "swr";
import { fDate } from "@/utility/dateFormatters.ts";
import { fCurrency } from "@/utility/numberFormatters";
import toast from "react-hot-toast";
import api from "@/services/api";
import configuration from "@/config/configuration";
import RequestIPODialog from "./RequestIPODialog";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Rocket,
  TrendingUp,
  Building2,
  Calendar,
  Layers,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  ShieldCheck,
  Download,
  Info,
  Table as TableIcon,
  LayoutGrid,
  ExternalLink
} from "lucide-react";

interface Ipo {
  _id: string;
  name: string;
  companyName: string;
  stockSymbol: string;
  openDate: string;
  closeDate: string;
  listingDate: string;
  priceBandMin: number;
  priceBandMax: number;
  lotSize: number;
  issueSize: number;
  logoUrl?: string;
  description?: string;
  sector?: string;
  valuation?: string;
}

interface CuratedIpo {
  id: string;
  name: string;
  companyName: string;
  stockSymbol: string;
  priceBand: string;
  priceBandMin: number;
  priceBandMax: number;
  lotSize: number;
  issueSize: string;
  valuation: string;
  sector: string;
  openDate: string;
  closeDate: string;
  listingDate: string;
  status: "OPEN FOR ALLOCATION" | "PRE-MARKET ALLOCATION" | "OPENING SOON";
  description: string;
  highlights: string[];
  logo: string;
  recommended?: boolean;
}

const FEATURED_CURATED_IPOS: CuratedIpo[] = [
  {
    id: "ipo-1",
    name: "Stripe Pre-IPO Secondary Allocation",
    companyName: "Stripe, Inc.",
    stockSymbol: "STRP",
    priceBand: "$28.50 - $32.00",
    priceBandMin: 28.5,
    priceBandMax: 32.0,
    lotSize: 100,
    issueSize: "$1.5B",
    valuation: "$65 Billion",
    sector: "Fintech & Payments Infrastructure",
    openDate: "2026-08-01",
    closeDate: "2026-08-25",
    listingDate: "2026-09-15",
    status: "OPEN FOR ALLOCATION",
    description: "Global payment processing titan processing hundreds of billions in internet commerce volume with institutional pre-IPO secondary backing.",
    highlights: [
      "Market leader powering 3M+ active internet businesses",
      "Robust positive free cashflow generation",
      "Backing from Sequoia Capital, Founders Fund, & Andreessen Horowitz",
      "Structured priority liquidity preferences"
    ],
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg",
    recommended: true
  },
  {
    id: "ipo-2",
    name: "Starlink Global Satellite Internet Pre-IPO",
    companyName: "Starlink / SpaceX",
    stockSymbol: "STRL",
    priceBand: "$45.00 - $52.00",
    priceBandMin: 45.0,
    priceBandMax: 52.0,
    lotSize: 50,
    issueSize: "$3.0B",
    valuation: "$180 Billion",
    sector: "Aerospace & Global Communications",
    openDate: "2026-08-10",
    closeDate: "2026-09-05",
    listingDate: "2026-10-01",
    status: "PRE-MARKET ALLOCATION",
    description: "Next-generation satellite internet constellation providing high-speed low-latency broadband coverage across 70+ nations globally.",
    highlights: [
      "Over 3 million active global subscriber base",
      "Monopolistic low-Earth orbit satellite infrastructure",
      "Government defense & commercial aviation contracts",
      "High expected retail demand upon public listing"
    ],
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Starlink_Logo.svg",
    recommended: true
  },
  {
    id: "ipo-3",
    name: "Revolut Global Banking Growth Round",
    companyName: "Revolut Ltd",
    stockSymbol: "REVO",
    priceBand: "£18.00 - £22.50",
    priceBandMin: 18.0,
    priceBandMax: 22.5,
    lotSize: 200,
    issueSize: "£850M",
    valuation: "$45 Billion",
    sector: "Neobanking & Wealth Management",
    openDate: "2026-08-15",
    closeDate: "2026-09-10",
    listingDate: "2026-09-30",
    status: "OPENING SOON",
    description: "Europe's most valuable financial technology super-app operating with full UK banking license authorization and 45M+ worldwide clients.",
    highlights: [
      "UK Banking license approval finalized",
      "Annual revenue growth exceeding 95% YoY",
      "Expanding global wealth and crypto trading product suites",
      "Potential London (LSE) and Nasdaq dual-listing"
    ],
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/70/Revolut_logo.svg",
    recommended: false
  }
];

export default function IPOList() {
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  const [filter, setFilter] = useState({ page: 1, limit: 10 });
  const [selectedIpo, setSelectedIpo] = useState<CuratedIpo | null>(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestedLots, setRequestedLots] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const apiUrl = useMemo(() => {
    const params = new URLSearchParams({
      page: filter.page.toString(),
      limit: filter.limit.toString(),
    });
    return `/ipos?${params.toString()}`;
  }, [filter]);

  const { data: apiData, isLoading } = useSWR<{ data: Ipo[]; pagination: any }>(apiUrl, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 0,
  });

  const apiIpos = apiData?.data ?? [];
  const pagination = apiData?.pagination;

  const toggleExpand = (id: string) => {
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleOpenRequestModal = (ipo: CuratedIpo) => {
    setSelectedIpo(ipo);
    setRequestedLots(1);
    setIsRequestModalOpen(true);
  };

  const handleConfirmRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedIpo) return;
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success(
        `Pre-IPO allocation request for ${requestedLots} lot(s) in ${selectedIpo.companyName} submitted successfully!`
      );
      setIsRequestModalOpen(false);
    } catch (err) {
      toast.error("Failed to submit request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderLogo = (url: string, name: string) => {
    if (url.startsWith("http") || url.startsWith("/")) {
      return (
        <img
          src={url}
          alt={`${name} logo`}
          className="w-full h-full object-contain p-1"
          onError={(e) => {
            (e.target as HTMLElement).style.display = "none";
          }}
        />
      );
    }
    return <Rocket className="w-7 h-7 text-[#C5A880]" />;
  };

  return (
    <div className="w-full space-y-8 font-inter pb-16">
      {/* Header Hero Banner */}
      {/* <div className="relative rounded-3xl bg-gradient-to-r from-[#082348] via-[#0B2A54] to-[#082348] p-8 md:p-10 text-white shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-[#C5A880]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-[#C5A880]/20 text-[#F3E5AB] border border-[#C5A880]/30 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" /> Institutional Pre-IPO Access
            </span>
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-[10px] font-bold uppercase tracking-wider">
              Primary & Secondary Allocations
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-serif font-bold text-white tracking-tight">
            Curated Pre-IPO Opportunities
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Gain early institutional participation in high-growth technology pioneers, neobanks, and global unicorns before official public listing.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-300 font-medium">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
              <span>Institutional Escrow Custody</span>
            </div>
            <div className="flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-[#C5A880]" />
              <span>Pre-Market Pricing</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#C5A880]" />
              <span>Guaranteed Share Booking</span>
            </div>
          </div>
        </div>
      </div> */}

      {/* View Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
        <div>
          <h2 className="text-lg font-serif font-bold text-[#082348]">Available Pre-IPO & Public Allocations</h2>
          <p className="text-xs text-slate-500">Review upcoming listing dates, price bands, and lot allocations</p>
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
          {FEATURED_CURATED_IPOS.map((ipo) => {
            const isExpanded = !!expandedCards[ipo.id];
            return (
              <motion.div
                key={ipo.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className={`bg-white rounded-3xl border-2 transition-all duration-300 overflow-hidden relative ${ipo.recommended
                    ? "border-[#C5A880] shadow-[0_20px_40px_rgba(197,168,128,0.12)]"
                    : "border-slate-200/90 shadow-md hover:shadow-lg"
                  }`}
              >
                {/* Top Badge Ribbon */}
                <div className="bg-slate-50 px-6 py-2.5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {ipo.recommended && (
                      <span className="px-3 py-0.5 bg-gradient-to-r from-[#C5A880] to-[#E6C697] text-[#082348] font-bold text-[10px] uppercase tracking-wider rounded-full flex items-center gap-1 shadow-2xs">
                        ★ High Growth Selection
                      </span>
                    )}
                    <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 font-bold text-[10px] uppercase tracking-wider rounded-full border border-emerald-200">
                      {ipo.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-400 font-semibold uppercase">Ticker:</span>
                    <span className="px-2 py-0.5 bg-[#082348] text-white font-mono text-xs font-bold rounded">
                      {ipo.stockSymbol}
                    </span>
                  </div>
                </div>

                {/* Main Content */}
                <div className="p-6 md:p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    {/* Logo & Company Info */}
                    <div className="lg:col-span-4 flex items-center gap-4">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-50 rounded-2xl border border-slate-200 p-2.5 shrink-0 flex items-center justify-center shadow-xs">
                        {renderLogo(ipo.logo, ipo.companyName)}
                      </div>
                      <div className="space-y-1 min-w-0">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Target Enterprise</span>
                        <h3 className="text-xl font-serif font-bold text-[#082348] truncate">{ipo.companyName}</h3>
                        <p className="text-xs text-slate-500 truncate">{ipo.sector}</p>
                      </div>
                    </div>

                    {/* Specs Grid */}
                    <div className="lg:col-span-5 grid grid-cols-3 gap-3 border-y lg:border-y-0 lg:border-x border-slate-100 py-4 lg:py-0 lg:px-6">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Price Band</span>
                        <strong className="text-base sm:text-lg font-bold text-[#C5A880] block font-serif leading-none">
                          {ipo.priceBand}
                        </strong>
                        <span className="text-[10px] text-slate-500 block">Per Share</span>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Valuation</span>
                        <strong className="text-sm sm:text-base font-bold text-[#082348] block leading-none">
                          {ipo.valuation}
                        </strong>
                        <span className="text-[10px] text-slate-500 block">Target Size: {ipo.issueSize}</span>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Lot Size</span>
                        <strong className="text-sm sm:text-base font-bold text-[#082348] block leading-none">
                          {ipo.lotSize} Shares
                        </strong>
                        <span className="text-[10px] text-slate-500 block">Listing: {fDate(ipo.listingDate)}</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="lg:col-span-3 flex flex-col gap-2.5 justify-center">
                      <button
                        onClick={() => handleOpenRequestModal(ipo)}
                        className="w-full py-3 px-4 rounded-xl bg-[#082348] hover:bg-[#0B2A54] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Rocket className="w-4 h-4 text-[#C5A880]" />
                        <span>Request Allocation</span>
                      </button>

                      <button
                        onClick={() => toggleExpand(ipo.id)}
                        className="py-2 px-3 rounded-xl border border-slate-200 hover:border-[#C5A880] hover:bg-slate-50 text-slate-700 font-bold text-[11px] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                      >
                        <Info className="w-3.5 h-3.5 text-[#C5A880]" />
                        <span>{isExpanded ? "Hide Prospectus Info" : "View Opportunity Prospectus"}</span>
                      </button>
                    </div>
                  </div>

                  {/* Expandable Section */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-600 bg-slate-50/70 p-5 rounded-2xl border border-slate-100"
                      >
                        <div className="space-y-2">
                          <h4 className="font-bold text-[#082348] uppercase tracking-wider text-[11px] flex items-center gap-1">
                            <Building2 className="w-3.5 h-3.5 text-[#C5A880]" /> Corporate Profile
                          </h4>
                          <p className="leading-relaxed">{ipo.description}</p>
                          <div className="pt-2 flex items-center gap-4 text-[11px] font-semibold text-slate-500">
                            <span>Open: {fDate(ipo.openDate)}</span>
                            <span>Close: {fDate(ipo.closeDate)}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-bold text-[#082348] uppercase tracking-wider text-[11px] flex items-center gap-1">
                            <TrendingUp className="w-3.5 h-3.5 text-[#C5A880]" /> Investment Highlights
                          </h4>
                          <ul className="space-y-1.5">
                            {ipo.highlights.map((h, idx) => (
                              <li key={idx} className="flex items-start gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                <span>{h}</span>
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
                  <th className="py-4 px-5">IPO Offering</th>
                  <th className="py-4 px-5">Symbol</th>
                  <th className="py-4 px-5">Price Band</th>
                  <th className="py-4 px-5">Lot Size</th>
                  <th className="py-4 px-5">Open Date</th>
                  <th className="py-4 px-5">Close Date</th>
                  <th className="py-4 px-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {FEATURED_CURATED_IPOS.map((ipo, i) => (
                  <tr key={ipo.id} className="hover:bg-slate-50/80 transition-colors whitespace-nowrap">
                    <td className="py-4 px-5 text-xs text-slate-400 font-mono">{i + 1}</td>
                    <td className="py-4 px-5 font-bold text-[#082348]">{ipo.companyName}</td>
                    <td className="py-4 px-5">
                      <span className="px-2 py-0.5 bg-[#082348] text-white font-mono text-xs font-bold rounded">
                        {ipo.stockSymbol}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-sm font-bold text-[#C5A880]">{ipo.priceBand}</td>
                    <td className="py-4 px-5 text-xs font-semibold text-slate-600">{ipo.lotSize} Shares</td>
                    <td className="py-4 px-5 text-xs text-slate-500">{fDate(ipo.openDate)}</td>
                    <td className="py-4 px-5 text-xs text-slate-500">{fDate(ipo.closeDate)}</td>
                    <td className="py-4 px-5 text-right">
                      <button
                        onClick={() => handleOpenRequestModal(ipo)}
                        className="py-1.5 px-3 rounded-lg bg-[#082348] text-white font-bold text-xs hover:bg-[#0B2A54] transition-colors cursor-pointer"
                      >
                        Request
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* --- ALLOCATION REQUEST CUSTOM MODAL --- */}
      {isRequestModalOpen && selectedIpo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-serif font-bold text-[#082348]">Pre-IPO Share Request</h3>
                <p className="text-xs text-slate-500">{selectedIpo.companyName} ({selectedIpo.stockSymbol})</p>
              </div>
              <button
                onClick={() => setIsRequestModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleConfirmRequest} className="space-y-4">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#082348] to-[#0B2A54] text-white space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#F3E5AB] font-bold uppercase">Price Band</span>
                  <span className="font-bold text-white">{selectedIpo.priceBand}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#F3E5AB] font-bold uppercase">Standard Lot Size</span>
                  <span className="font-bold text-white">{selectedIpo.lotSize} Shares / Lot</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#F3E5AB] font-bold uppercase">Target Valuation</span>
                  <span className="font-bold text-[#C5A880]">{selectedIpo.valuation}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Number of Lots Requested
                </label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={requestedLots}
                  onChange={(e) => setRequestedLots(Math.max(1, Number(e.target.value)))}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#C5A880] font-bold text-base text-[#082348]"
                  required
                />
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                <div className="flex justify-between text-slate-600">
                  <span>Total Shares Requested:</span>
                  <span className="font-bold text-[#082348]">{requestedLots * selectedIpo.lotSize} Shares</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Estimated Total Investment Value:</span>
                  <span className="font-bold text-[#C5A880] text-sm">
                    ${(requestedLots * selectedIpo.lotSize * selectedIpo.priceBandMin).toLocaleString()} - ${
                      (requestedLots * selectedIpo.lotSize * selectedIpo.priceBandMax).toLocaleString()
                    }
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsRequestModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-[#082348] hover:bg-[#0B2A54] text-white font-bold text-xs uppercase tracking-wider shadow-md disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? "Submitting..." : "Submit Allocation Request"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
