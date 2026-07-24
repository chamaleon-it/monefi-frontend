"use client";

import { useAuth } from "@/auth/useAuth";
import { InvestmentType } from "@/enum/investment-type.enum";
import { fDate, fDateAndTime } from "@/utility/dateFormatters.ts";
import { fCurrency } from "@/utility/numberFormatters";
import useSWR from "swr";
import BondsRow from "./BondsRow";

import { Wallet, TrendingUp, Coins, FileText } from "lucide-react";

export default function TransactionsTable() {
  const { user } = useAuth();
  const {
    data: portfolioData,
    isLoading,
    mutate: portfolioMutate,
  } = useSWR<{
    message: string;
    data: {
      _id: string;
      symbol: string;
      name: string;
      quantity: number;
      unitPrice: number;
      totalValue: number;
      investmentType: InvestmentType;
      transaction: {
        createdAt: Date;
        buyBackDate?: Date | null;
      };
      createdAt: Date;
      buyBack: null | "Yes" | "No";
      certificate?: string | null;
      interest: {
        date: Date;
        amount: number;
        _id: string;
      }[];
      user: {
        name: string;
        email: string;
      };
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

  const bonds = portfolio.filter(
    (tx) => tx.investmentType === InvestmentType.BOND
  );
  const crypto = portfolio.filter(
    (tx) => tx.investmentType === InvestmentType.CRYPTO
  );
  const stock = portfolio.filter(
    (tx) => tx.investmentType === InvestmentType.STOCK
  );

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
          Master Client Portfolio Control
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
          Global asset inventory, client bond certificates, coupon management, and asset totals
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard
          icon={Wallet}
          label="Available Reserves"
          value={fCurrency(user?.balance ?? 0)}
          highlight={true}
        />
        <SummaryCard
          icon={TrendingUp}
          label="Total Stock Equity"
          value={fCurrency(stockValue)}
        />
        <SummaryCard
          icon={Coins}
          label="Total Crypto Assets"
          value={fCurrency(cryptoValue)}
        />
        <SummaryCard
          icon={FileText}
          label="Total Bond Value"
          value={fCurrency(bondValue)}
        />
      </div>

      {bonds.length !== 0 && (
        <div className="space-y-4 pt-2">
          <h2 className="text-xl font-serif font-bold text-[#082348]">Bonds</h2>

          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-[0_15px_35px_rgba(8,35,72,0.04)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full whitespace-nowrap text-left">
                <thead>
                  <tr className="border-b border-slate-200/80 bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-[#082348]">
                    <th className="py-4 px-5">#</th>
                    <th className="py-4 px-5">Client Profile</th>
                    <th className="py-4 px-5">Symbol</th>
                    <th className="py-4 px-5">Quantity</th>
                    <th className="py-4 px-5">Unit Price</th>
                    <th className="py-4 px-5">Total Value</th>
                    <th className="py-4 px-5">Buyback</th>
                    <th className="py-4 px-5">Buyback Date</th>
                    <th className="py-4 px-5">Interest</th>
                    <th className="py-4 px-5">Upload Certificate</th>
                    <th className="py-4 px-5">Order Date</th>
                    <th className="py-4 px-5">Coupon Rate</th>
                    <th className="py-4 px-5">Frequency</th>
                    <th className="py-4 px-5">Type</th>
                    <th className="py-4 px-5">Maturity Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {isLoading &&
                    Array.from({ length: 10 }).map((_, i) => (
                      <SkeletonRow key={i} />
                    ))}

                  {!isLoading && portfolio.length > 0 && (
                    <>
                      {bonds.map((tx, i) => (
                        <BondsRow
                          key={tx._id}
                          i={i}
                          tx={tx}
                          portfolioMutate={portfolioMutate}
                        />
                      ))}
                    </>
                  )}

                  {!isLoading && portfolio.length === 0 && (
                    <tr>
                      <td
                        colSpan={15}
                        className="text-center py-12 text-slate-400 text-sm"
                      >
                        No bond holdings found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {stock.length !== 0 && (
        <div className="space-y-4 pt-2">
          <h2 className="text-xl font-serif font-bold text-[#082348]">Equities & Stock Holdings</h2>

          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-[0_15px_35px_rgba(8,35,72,0.04)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full whitespace-nowrap text-left">
                <thead>
                  <tr className="border-b border-slate-200/80 bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-[#082348]">
                    <th className="py-4 px-5">#</th>
                    <th className="py-4 px-5">Client Profile</th>
                    <th className="py-4 px-5">Ticker</th>
                    <th className="py-4 px-5">Quantity</th>
                    <th className="py-4 px-5">Unit Price</th>
                    <th className="py-4 px-5">Total Value</th>
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
                          <td className="py-4 px-5 text-sm font-semibold">
                            <p className="font-bold text-[#082348]">{tx.user.name}</p>
                            <p className="text-xs text-slate-400">{tx.user.email}</p>
                          </td>
                          <td className="py-4 px-5 text-sm font-bold text-[#082348]">
                            {tx.symbol}
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
                          <td className="py-4 px-5 text-xs text-slate-500 whitespace-nowrap">
                            {fDate(tx.createdAt)}
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

      {crypto.length !== 0 && (
        <div className="space-y-4 pt-2">
          <h2 className="text-xl font-serif font-bold text-[#082348]">Digital Asset & Crypto Holdings</h2>

          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-[0_15px_35px_rgba(8,35,72,0.04)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full whitespace-nowrap text-left">
                <thead>
                  <tr className="border-b border-slate-200/80 bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-[#082348]">
                    <th className="py-4 px-5">#</th>
                    <th className="py-4 px-5">Client Profile</th>
                    <th className="py-4 px-5">Symbol</th>
                    <th className="py-4 px-5">Quantity</th>
                    <th className="py-4 px-5">Unit Price</th>
                    <th className="py-4 px-5">Total Value</th>
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
                      {crypto.map((tx, i) => (
                        <tr
                          key={tx._id}
                          className="hover:bg-slate-50/80 transition-colors whitespace-nowrap"
                        >
                          <td className="py-4 px-5 text-xs text-slate-400 font-mono">{i + 1}</td>
                          <td className="py-4 px-5 text-sm font-semibold">
                            <p className="font-bold text-[#082348]">{tx.user.name}</p>
                            <p className="text-xs text-slate-400">{tx.user.email}</p>
                          </td>
                          <td className="py-4 px-5 text-sm font-bold text-[#082348]">
                            {tx.symbol}
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
                          <td className="py-4 px-5 text-xs text-slate-500 whitespace-nowrap">
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
                        No crypto holdings found.
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
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  highlight?: boolean;
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
      {value}
    </div>
  </div>
);
