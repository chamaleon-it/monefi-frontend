"use client";

import getConfig from "@/config/configuration";
import { fDate } from "@/utility/dateFormatters.ts";
import { fCurrency } from "@/utility/numberFormatters";
import React, { useState } from "react";
import useSWR from "swr";
import InterestView from "./InterestView";
import { Copy, Check, FileText, ExternalLink, ShieldCheck, Award } from "lucide-react";
import toast from "react-hot-toast";

interface Props {
  tx: {
    _id: string;
    symbol: string;
    quantity: number;
    unitPrice: number;
    totalValue: number;
    transaction: {
      createdAt: Date;
      buyBackDate?: Date | null;
    };
    investmentType: string;
    createdAt: Date;
    buyBack: null | "Yes" | "No";
    certificate?: string | null;
    interest: {
      date: Date;
      amount: number;
      _id: string;
    }[];
  };
  i: number;
}

interface BondType {
  name: string;
  annualCouponRate: number;
  isin: string;
  couponFrequency: string;
  unitPrice: number;
  couponType: string;
  meturityDate?: string;
}

export default function BondsRow({ tx, i }: Props) {
  const [copiedIsin, setCopiedIsin] = useState(false);

  const { data } = useSWR<{
    message: string;
    data: BondType;
  }>(`/bonds/${tx.symbol}`);

  const bond = data?.data;
  const isinCode = bond?.isin || tx.symbol || "GB00BPSNBB36";

  const handleCopyIsin = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(isinCode);
    setCopiedIsin(true);
    toast.success(`ISIN ${isinCode} copied to clipboard`);
    setTimeout(() => setCopiedIsin(false), 2000);
  };

  return (
    <tr className="hover:bg-slate-50/80 transition-colors whitespace-nowrap">
      <td className="py-4 px-5 text-xs text-slate-400 font-mono">{i + 1}</td>

      {/* ISIN Code Badge with Copy Action */}
      <td className="py-4 px-5 text-xs">
        <button
          onClick={handleCopyIsin}
          className="font-mono text-slate-700 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-lg border border-slate-200 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          title="Click to copy ISIN"
        >
          <span>{isinCode}</span>
          {copiedIsin ? (
            <Check className="w-3 h-3 text-emerald-600" />
          ) : (
            <Copy className="w-3 h-3 text-slate-400" />
          )}
        </button>
      </td>

      {/* Issuer & Bond Description */}
      <td className="py-4 px-5">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#082348]/5 border border-[#082348]/10 flex items-center justify-center text-[#082348] shrink-0">
            <Award className="w-3.5 h-3.5 text-[#C5A880]" />
          </div>
          <div>
            <p className="text-sm font-bold text-[#082348]">{bond?.name || tx.symbol}</p>
            <p className="text-[10px] text-slate-400 font-medium">Senior Fixed Income Bond</p>
          </div>
        </div>
      </td>

      {/* Quantity & Unit Price */}
      <td className="py-4 px-5 text-sm font-semibold text-slate-700">{tx.quantity}</td>
      <td className="py-4 px-5 text-sm font-medium text-slate-600">
        {fCurrency(tx.unitPrice)}
      </td>

      {/* Total Principal Value */}
      <td className="py-4 px-5 text-sm font-bold text-[#082348]">
        {fCurrency(tx.totalValue)}
      </td>

      {/* Acquisition Date */}
      <td className="py-4 px-5 text-xs text-slate-500 font-mono">
        {fDate(tx.transaction.createdAt || tx.createdAt)}
      </td>

      {/* Buy-Back Guarantee Status */}
      <td className="py-4 px-5 text-xs">
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider ${
            tx.buyBack === "Yes" || true
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-slate-100 text-slate-600 border border-slate-200"
          }`}
        >
          <ShieldCheck className="w-3 h-3 text-emerald-600" />
          <span>{tx.buyBack === "Yes" ? "1-Yr Buyback Active" : "Annual Option"}</span>
        </span>
      </td>

      <td className="py-4 px-5 text-xs text-slate-500 font-mono">
        {tx.transaction.buyBackDate ? fDate(tx.transaction.buyBackDate) : "Annual Rolling"}
      </td>

      {/* Coupon Rate */}
      <td className="py-4 px-5 text-sm font-bold text-[#C5A880]">
        {bond?.annualCouponRate ? `${bond.annualCouponRate}%` : "6.625%"}
      </td>

      {/* Coupon Payout Frequency */}
      <td className="py-4 px-5 text-xs font-semibold text-slate-600">
        {bond?.couponFrequency || "Quarterly"}
      </td>

      {/* Coupon Type */}
      <td className="py-4 px-5 text-xs">
        <span className="inline-block px-2.5 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider bg-slate-100 text-[#082348] border border-slate-200">
          {bond?.couponType || "Fixed Rate"}
        </span>
      </td>

      {/* Maturity Date */}
      <td className="py-4 px-5 text-xs text-slate-500 font-mono">
        {bond?.meturityDate ? fDate(bond.meturityDate) : "1 Year Rolling"}
      </td>

      {/* Payment Schedule View */}
      <td className="py-4 px-5 text-xs">
        <InterestView tx={tx} />
      </td>

      {/* Official Certificate Download */}
      <td className="py-4 px-5 text-xs">
        {tx?.certificate ? (
          <a
            href={getConfig().backendURL + tx.certificate}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#082348]/20 bg-[#082348]/5 text-[#082348] hover:bg-[#082348] hover:text-white font-bold text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-lg transition-all inline-flex items-center gap-1.5"
          >
            <FileText className="w-3 h-3 text-[#C5A880]" />
            <span>Certificate</span>
          </a>
        ) : (
          <a
            href="/fact-sheet-pdf/Lloyds 6.625__bakerjones.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-slate-200 text-slate-700 hover:border-[#082348] hover:bg-slate-50 font-bold text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-lg transition-all inline-flex items-center gap-1"
          >
            <span>Factsheet</span>
            <ExternalLink className="w-2.5 h-2.5 text-slate-400" />
          </a>
        )}
      </td>
    </tr>
  );
}
