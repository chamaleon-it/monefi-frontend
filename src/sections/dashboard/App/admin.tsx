import { InvestmentType } from "@/enum/investment-type.enum";
import { TradeAction } from "@/enum/trade-action.enum";
import { TransactionStatus } from "@/enum/transaction-status.enum";
import { UserStatus } from "@/enum/user-status.enum";
import { UserRoles } from "@/enum/user.enum";
import { fAgo, fDate, fDateAndTime } from "@/utility/dateFormatters";
import { fCurrency } from "@/utility/numberFormatters";
import { Wallet, TrendingUp, Coins, FileText, ArrowUpRight, ArrowDownRight, Users, ShieldCheck, Clock } from "lucide-react";
import React from "react";
import useSWR from "swr";

export default function AdminDashboard() {
  const { data: transactionData, isLoading } = useSWR<{
    data: {
      _id: string;
      symbol: string;
      name: string;
      quantity: number;
      unitPrice: number;
      totalValue: number;
      tradeAction: TradeAction;
      investmentType: InvestmentType;
      status: TransactionStatus;
      createdAt: string;
    }[];
  }>("/transactions");

  const transaction = transactionData?.data ?? [];

  const { data: userData } = useSWR<{
    data: {
      _id: string;
      email: string;
      name: string;
      role: UserRoles;
      status: UserStatus;
      lastLogin: Date;
      createdAt: Date;
      balance: number;
    }[];
  }>("/users");

  const users = userData?.data ?? [];

  const { data: portfolioStatistics } = useSWR<{
    message: string;
    data: {
      bondValue: number;
      stockValue: number;
      cryptoValue: number;
    };
  }>("/portfolio/statastics");

  const { data: fullBalanceData } = useSWR<{ message: string; data: number }>(
    "/users/get_full_balance"
  );

  return (
    <div className="space-y-8 font-inter">
      {/* Portfolio Overview Header */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <h1 className="text-2xl lg:text-3xl font-serif font-bold text-[#082348]">
              Executive Admin Console
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
              Platform-wide liquidity metrics, client portfolio statistics, and user control
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-2xs text-xs font-semibold text-slate-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Administrator Control Active</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <SummaryCard
            icon={Wallet}
            label="Total Platform Liquidity"
            value={fCurrency(fullBalanceData?.data ?? 0)}
            highlight={true}
          />
          <SummaryCard
            icon={TrendingUp}
            label="Total Stock Equity"
            value={fCurrency(portfolioStatistics?.data.stockValue ?? 0)}
          />
          <SummaryCard
            icon={Coins}
            label="Total Crypto Reserves"
            value={fCurrency(portfolioStatistics?.data.cryptoValue ?? 0)}
          />
          <SummaryCard
            icon={FileText}
            label="Total Bond Allocations"
            value={fCurrency(portfolioStatistics?.data.bondValue ?? 0)}
          />
        </div>
      </div>

      {/* Recent Platform Transactions */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-serif font-bold text-[#082348]">
              Platform Execution Ledger
            </h2>
            <p className="text-slate-500 text-xs">
              Live audit of orders placed by clients across equities, bonds, and crypto
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-[0_15px_35px_rgba(8,35,72,0.04)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-200/80 bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-[#082348]">
                  <th className="py-4 px-5">#</th>
                  <th className="py-4 px-5">Asset</th>
                  <th className="py-4 px-5">Quantity</th>
                  <th className="py-4 px-5">Unit Price</th>
                  <th className="py-4 px-5">Total Value</th>
                  <th className="py-4 px-5">Action</th>
                  <th className="py-4 px-5">Category</th>
                  <th className="py-4 px-5">Date</th>
                  <th className="py-4 px-5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {!isLoading && transaction.length > 0 && (
                  <>
                    {transaction.map((tx, i) => (
                      <tr key={tx._id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-4 px-5 text-xs text-slate-400 font-mono">{i + 1}</td>
                        <td className="py-4 px-5 text-sm">
                          <p className="font-bold text-[#082348]">{tx.name}</p>
                          <p className="text-xs text-slate-400 font-mono">{tx.symbol}</p>
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
                        <td className="py-4 px-5 text-xs">
                          <span className={`inline-flex items-center gap-1 font-bold px-2.5 py-1 rounded-full ${tx.tradeAction === TradeAction.BUY
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-blue-50 text-blue-700 border border-blue-200"
                            }`}>
                            {tx.tradeAction === TradeAction.BUY ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                            {tx.tradeAction}
                          </span>
                        </td>
                        <td className="py-4 px-5 text-xs font-semibold text-slate-600">
                          {tx.investmentType}
                        </td>
                        <td className="py-4 px-5 text-xs text-slate-500 whitespace-nowrap">
                          {fDate(tx.createdAt)}
                        </td>
                        <td className="py-4 px-5 text-xs">
                          <span
                            className={`inline-block px-3 py-1 rounded-full font-bold text-[11px] uppercase tracking-wider text-center ${tx.status === TransactionStatus.PENDING
                                ? "bg-amber-50 text-amber-700 border border-amber-200"
                                : tx.status === TransactionStatus.COMPLETED
                                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                  : "bg-rose-50 text-rose-700 border border-rose-200"
                              }`}
                          >
                            {tx.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </>
                )}

                {transaction.length === 0 && (
                  <tr>
                    <td colSpan={9} className="text-center py-12 text-slate-400 text-sm">
                      <Clock className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                      No transaction history recorded.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Institutional User Roster */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-serif font-bold text-[#082348]">
              Client & User Directory
            </h2>
            <p className="text-slate-500 text-xs">
              Overview of registered institutional and individual accounts
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-[0_15px_35px_rgba(8,35,72,0.04)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-200/80 bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-[#082348]">
                  <th className="py-4 px-5">SL.No</th>
                  <th className="py-4 px-5">User Profile</th>
                  <th className="py-4 px-5">Account Status</th>
                  <th className="py-4 px-5">Available Balance</th>
                  <th className="py-4 px-5">Registration Date</th>
                  <th className="py-4 px-5">Last Activity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((user, index) => (
                  <tr
                    key={user._id}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="py-4 px-5 text-xs text-slate-400 font-mono">{index + 1}</td>
                    <td className="py-4 px-5 text-sm">
                      <p className="font-bold text-[#082348]">{user?.name}</p>
                      <p className="text-xs text-slate-400">{user.email}</p>
                    </td>

                    <td className="py-4 px-5 text-xs">
                      <span
                        className={`inline-block px-3 py-1 rounded-full font-bold text-[11px] uppercase tracking-wider text-center ${user.status === UserStatus.ACTIVE
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : user.status === UserStatus.INACTIVE
                              ? "bg-amber-50 text-amber-700 border border-amber-200"
                              : "bg-rose-50 text-rose-700 border border-rose-200"
                          }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-sm font-bold text-[#082348]">
                      {fCurrency(user.balance)}
                    </td>
                    <td className="py-4 px-5 text-xs text-slate-500">
                      {fDateAndTime(user.createdAt)}
                    </td>
                    <td className="py-4 px-5 text-xs text-slate-500 font-medium">
                      {user.lastLogin ? fAgo(user.lastLogin) : "Never"}
                    </td>
                  </tr>
                ))}

                {users.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-slate-400 text-sm">
                      No user accounts found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
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
  <div className={`rounded-3xl p-6 border transition-all duration-300 relative overflow-hidden ${highlight
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
      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${highlight ? "gold-gradient-bg text-slate-950 shadow-md" : "bg-[#C5A880]/15 text-[#C5A880]"
        }`}>
        <IconComponent className="w-5 h-5" />
      </div>
    </div>
    <div className={`text-2xl lg:text-3xl font-serif font-bold ${highlight ? "text-white" : "text-[#082348]"}`}>
      {value}
    </div>
  </div>
);

