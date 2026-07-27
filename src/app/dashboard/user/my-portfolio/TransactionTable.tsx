"use client";

import { useAuth } from "@/auth/useAuth";
import { InvestmentType } from "@/enum/investment-type.enum";
import { fDateAndTime } from "@/utility/dateFormatters.ts";
import { fCurrency } from "@/utility/numberFormatters";
import useSWR from "swr";
import BondsRow from "./BondsRow";
import Link from "next/link";
import usePaths from "@/hooks/usePaths";

import { Wallet, TrendingUp, Coins, FileText, Percent, Clock, Rocket, ArrowUp, Sparkles, Plus, ExternalLink } from "lucide-react";

export default function TransactionsTable() {
  const { user } = useAuth();
  const paths = usePaths();
  const { data: portfolioData, isLoading } = useSWR<{
    message: string;
    data: {
      _id: string;
      symbol: string;
      name: string;
      quantity: number;
      unitPrice: number;
      totalValue: number;
      transaction: {
        createdAt: Date,
        buyBackDate?: Date | null,
        annualCouponRate?: number,
      },
      investmentType: InvestmentType;
      createdAt: Date;
      buyBack: null | "Yes" | "No";
      certificate?: string | null;
      interest: {
        date: Date,
        amount: number,
        _id: string,
      }[];
    }[];
  }>("/portfolio", { revalidateOnFocus: true, revalidateOnMount: true });

  const portfolio = portfolioData?.data ?? [];

  const stockValue = portfolio.reduce(
    (a, b) =>
      b.investmentType === InvestmentType.STOCK ? a + b.totalValue : a,
    0
  );
  const cryptoValue = portfolio.reduce(
    (a, b) =>
      b.investmentType === InvestmentType.CRYPTO ? a + b.totalValue : a,
    0
  );
  const bondValue = portfolio.reduce(
    (a, b) => (b.investmentType === InvestmentType.BOND ? a + b.totalValue : a),
    0
  );
  const ipoValue = portfolio.reduce(
    (a, b) =>
      b.investmentType === InvestmentType.IPO || (b.investmentType as string) === "IPO"
        ? a + b.totalValue
        : a,
    0
  );

  const bonds = portfolio.filter(
    (tx) => tx.investmentType === InvestmentType.BOND
  );
  const crypto = portfolio.filter(
    (tx) => tx.investmentType === InvestmentType.CRYPTO
  );
  const stock = portfolio.filter(
    (tx) => tx.investmentType === InvestmentType.STOCK
  );

  const now = new Date();
  let dailyInterest = 0;
  let accruedInterest = 0;

  bonds.forEach((bond) => {
    const startDate = new Date(bond.transaction?.createdAt || bond.createdAt || Date.now());
    const diffTime = Math.max(0, now.getTime() - startDate.getTime());
    const daysElapsed = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    const couponRate = bond.transaction?.annualCouponRate || (bond as any).annualCouponRate || 8.5;
    const bondInterestSum = bond.interest?.reduce((sum, item) => sum + (item.amount || 0), 0) || 0;
    const bondAnnualInterest = bondInterestSum > 0
      ? bondInterestSum
      : (bond.totalValue * (couponRate / 100));

    const bondDailyInterest = bondAnnualInterest / 365;
    const bondAccruedInterest = bondDailyInterest * daysElapsed;

    dailyInterest += bondDailyInterest;
    accruedInterest += bondAccruedInterest;
  });

  const SkeletonRow = () => (
    <tr className="animate-pulse border-b border-slate-100 whitespace-nowrap">
      {Array.from({ length: 9 }).map((_, i) => (
        <td key={i} className="py-4 px-5">
          <div className="h-4 bg-slate-200 rounded w-full mx-auto"></div>
        </td>
      ))}
    </tr>
  );

  return (
    <div className="w-full space-y-8 font-inter">
      <div>
        <h1 className="text-2xl lg:text-3xl font-serif font-bold text-[#082348]">
          Portfolio Asset Allocation
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
          Consolidated holdings statement, yield coupons, equity certificates, and digital reserves
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard
          icon={TrendingUp}
          label="Stock Holdings"
          value={fCurrency(stockValue)}
        />
        <SummaryCard
          icon={FileText}
          label="Bond Allocation"
          value={fCurrency(bondValue)}
        />
        <SummaryCard
          icon={Rocket}
          label="IPO Allocation"
          value={fCurrency(ipoValue)}
        />
        <SummaryCard
          icon={Clock}
          label="Accrued Interest"
          customValue={
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-2xl lg:text-3xl font-serif font-bold text-[#082348]">
                {fCurrency(accruedInterest)}
              </span>
              <span className="text-xs font-semibold text-emerald-600 flex items-center gap-0.5 font-sans">
                <ArrowUp className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                <span>+{fCurrency(dailyInterest)}</span>
                <span className="font-normal text-slate-400 ml-0.5">today</span>
              </span>
            </div>
          }
        />
      </div>

      {/* Bond Holdings Section */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-serif font-bold text-[#082348]">Fixed Income & Bond Holdings</h2>
            <p className="text-xs text-slate-500">Active debt securities, ISIN codes, annual coupon yields, and certificate documents</p>
          </div>
          <Link
            href={paths.dashboard.user.bonds}
            className="px-3.5 py-2 rounded-xl bg-[#082348] hover:bg-[#0B2A54] text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Explore Current Opportunities</span>
          </Link>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-[0_15px_35px_rgba(8,35,72,0.04)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full whitespace-nowrap text-left">
              <thead>
                <tr className="border-b border-slate-200/80 bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-[#082348]">
                  <th className="py-4 px-5">#</th>
                  <th className="py-4 px-5">ISIN Code</th>
                  <th className="py-4 px-5">Issuer Entity</th>
                  <th className="py-4 px-5">Quantity</th>
                  <th className="py-4 px-5">Unit Price</th>
                  <th className="py-4 px-5">Total Principal</th>
                  <th className="py-4 px-5">Start Date</th>
                  <th className="py-4 px-5">Buyback Status</th>
                  <th className="py-4 px-5">Buyback Window</th>
                  <th className="py-4 px-5">Coupon Rate</th>
                  <th className="py-4 px-5">Frequency</th>
                  <th className="py-4 px-5">Type</th>
                  <th className="py-4 px-5">Maturity Date</th>
                  <th className="py-4 px-5">Payment Schedule</th>
                  <th className="py-4 px-5">Certificate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isLoading &&
                  Array.from({ length: 5 }).map((_, i) => (
                    <SkeletonRow key={i} />
                  ))}

                {!isLoading && bonds.length > 0 && (
                  <>
                    {bonds.map((tx, i) => (
                      <BondsRow key={tx._id} i={i} tx={tx} />
                    ))}
                  </>
                )}

                {!isLoading && bonds.length === 0 && (
                  <tr>
                    <td
                      colSpan={15}
                      className="text-center py-12 text-slate-500 text-xs"
                    >
                      <div className="max-w-md mx-auto space-y-3">
                        <FileText className="w-8 h-8 text-[#C5A880] mx-auto" />
                        <p className="font-bold text-sm text-[#082348]">No Active Bond Allocations Yet</p>
                        <p className="text-slate-400">
                          Secure guaranteed fixed coupon yields up to 7.00% p.a. from tier-1 UK banks and sovereign gilts.
                        </p>
                        <div className="pt-1">
                          <Link
                            href={paths.dashboard.user.bonds}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#082348] text-white font-bold text-xs hover:bg-[#0B2A54] transition-all shadow-xs"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                            <span>View Current Bond Opportunities</span>
                          </Link>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {stock.length !== 0 && (
        <div className="space-y-4 pt-2">
          <h2 className="text-xl font-serif font-bold text-[#082348]">Equities & Stock Portfolio</h2>

          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-[0_15px_35px_rgba(8,35,72,0.04)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full whitespace-nowrap text-left">
                <thead>
                  <tr className="border-b border-slate-200/80 bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-[#082348]">
                    <th className="py-4 px-5">#</th>
                    <th className="py-4 px-5">Ticker</th>
                    <th className="py-4 px-5">Company Name</th>
                    <th className="py-4 px-5">Shares Held</th>
                    <th className="py-4 px-5">Unit Price</th>
                    <th className="py-4 px-5">Total Market Value</th>
                    <th className="py-4 px-5">Acquisition Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {isLoading &&
                    Array.from({ length: 10 }).map((_, i) => (
                      <SkeletonRow key={i} />
                    ))}

                  {!isLoading && portfolio.length > 0 && (
                    <>
                      {stock.map((tx, i) => (
                        <tr
                          key={tx._id}
                          className="hover:bg-slate-50/80 transition-colors whitespace-nowrap"
                        >
                          <td className="py-4 px-5 text-xs text-slate-400 font-mono">{i + 1}</td>
                          <td className="py-4 px-5 text-sm font-bold text-[#082348]">
                            {tx.symbol}
                          </td>
                          <td className="py-4 px-5 text-sm font-semibold text-slate-700">
                            {tx.name}
                          </td>
                          <td className="py-4 px-5 text-sm font-semibold text-slate-700">
                            {tx.quantity}
                          </td>
                          <td className="py-4 px-5 text-sm font-medium text-slate-600">
                            {fCurrency(tx.unitPrice)}
                          </td>
                          <td className="py-4 px-5 text-sm font-bold text-[#082348]">
                            {fCurrency(tx.totalValue)}
                          </td>
                          <td className="py-4 px-5 text-xs text-slate-500 font-mono">
                            {fDateAndTime(tx.createdAt)}
                          </td>
                        </tr>
                      ))}
                    </>
                  )}

                  {!isLoading && portfolio.length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
                        className="text-center py-12 text-slate-400 text-sm"
                      >
                        No stock holdings found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

const SummaryCard = ({
  icon: IconComponent,
  label,
  value,
  highlight = false,
  customValue,
}: {
  icon: React.ElementType;
  label: string;
  value?: string;
  highlight?: boolean;
  customValue?: React.ReactNode;
}) => (
  <div className={`rounded-3xl p-6 border transition-all duration-300 relative overflow-hidden ${
    highlight
      ? "bg-[#082348] text-white border-[#082348] shadow-lg shadow-[#082348]/15"
      : "bg-white text-slate-800 border-slate-200/90 shadow-[0_10px_30px_rgba(8,35,72,0.04)]"
  }`}>
    {highlight && (
      <div className="absolute top-0 right-0 h-1 left-0 bg-gradient-to-r from-transparent via-[#C5A880] to-transparent"></div>
    )}
    <div className="flex items-center justify-between mb-4">
      <span className={`text-[11px] font-bold uppercase tracking-wider ${highlight ? "text-slate-300" : "text-slate-500"}`}>
        {label}
      </span>
      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
        highlight ? "gold-gradient-bg text-slate-950 shadow-md" : "bg-[#C5A880]/15 text-[#C5A880]"
      }`}>
        <IconComponent className="w-5 h-5" />
      </div>
    </div>
    <div className={`text-2xl lg:text-3xl font-serif font-bold ${highlight ? "text-white" : "text-[#082348]"}`}>
      {customValue || value}
    </div>
  </div>
);
