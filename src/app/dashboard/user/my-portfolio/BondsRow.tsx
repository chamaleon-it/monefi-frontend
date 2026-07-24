import getConfig from "@/config/configuration";
import { fDate } from "@/utility/dateFormatters.ts";
import { fCurrency } from "@/utility/numberFormatters";
import React from "react";
import useSWR from "swr";
import InterestView from "./InterestView";

interface Props {
  tx: {
    _id: string;
    symbol: string;
    quantity: number;
    unitPrice: number;
    totalValue: number;
    transaction: {
      createdAt: Date
      buyBackDate?: Date | null
    }
    investmentType: string;
    createdAt: Date;
    buyBack: null | "Yes" | "No";
    certificate?: string | null;
    interest: {
      date: Date,
      amount: number,
      _id: string,
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
  const { data } = useSWR<{
    message: string;
    data: BondType;
  }>(`/bonds/${tx.symbol}`);

  const bond = data?.data;
  return (
    <tr className="hover:bg-slate-50/80 transition-colors whitespace-nowrap">
      <td className="py-4 px-5 text-xs text-slate-400 font-mono">{i + 1}</td>
      <td className="py-4 px-5 text-xs font-mono text-slate-600 bg-slate-50 px-2 py-0.5 rounded border border-slate-200 inline-block my-3">
        {bond?.isin}
      </td>
      <td className="py-4 px-5 text-sm font-bold text-[#082348]">{bond?.name}</td>
      <td className="py-4 px-5 text-sm font-semibold text-slate-700">{tx.quantity}</td>
      <td className="py-4 px-5 text-sm font-medium text-slate-600">
        {fCurrency(tx.unitPrice)}
      </td>
      <td className="py-4 px-5 text-sm font-bold text-[#082348]">
        {fCurrency(tx.totalValue)}
      </td>
      <td className="py-4 px-5 text-xs text-slate-500 font-mono">{fDate(tx.transaction.createdAt)}</td>

      <td className="py-4 px-5 text-xs">
        <span className={`inline-block px-2.5 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider ${
          tx.buyBack === "Yes"
            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
            : "bg-slate-100 text-slate-600 border border-slate-200"
        }`}>
          {tx.buyBack || "No"}
        </span>
      </td>
      <td className="py-4 px-5 text-xs text-slate-500 font-mono">
        {tx.transaction.buyBackDate ? fDate(tx.transaction.buyBackDate) : "-"}
      </td>

      <td className="py-4 px-5 text-sm font-bold text-[#C5A880]">
        {bond?.annualCouponRate} %
      </td>
      <td className="py-4 px-5 text-xs font-semibold text-slate-600">
        {bond?.couponFrequency}
      </td>
      <td className="py-4 px-5 text-xs">
        <span className="inline-block px-2.5 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider bg-slate-100 text-[#082348] border border-slate-200">
          {bond?.couponType}
        </span>
      </td>
      <td className="py-4 px-5 text-xs text-slate-500 font-mono">
        {bond?.meturityDate ? fDate(bond?.meturityDate) : "-"}
      </td>
      <td className="py-4 px-5 text-xs">
        <InterestView tx={tx} />
      </td>
      <td className="py-4 px-5 text-xs">
        {tx?.certificate ? (
          <a
            href={getConfig().backendURL + tx.certificate}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-slate-200 text-[#082348] font-bold text-[10px] uppercase tracking-wider px-3.5 py-1.5 rounded-lg hover:bg-slate-50 transition-colors inline-block"
          >
            View Document
          </a>
        ) : (
          <span className="text-slate-400 font-mono">-</span>
        )}
      </td>
    </tr>
  );
}
