"use client";

import { useMemo, useState, useCallback } from "react";
import useSWR from "swr";
import { fCurrency } from "@/utility/numberFormatters";
import { fDateAndTime } from "@/utility/dateFormatters";
import { InvestmentType } from "@/enum/investment-type.enum";
import { TransactionStatus } from "@/enum/transaction-status.enum";
import api from "@/services/api";
import toast from "react-hot-toast";
import TransactionFeeModal from "./TransactionFeeModal";

interface Transaction {
  user: {
    email: string;
    _id: string;
    name?: string;
  };
  _id: string;
  symbol: string;
  name: string;
  quantity: number;
  unitPrice: number;
  fees?: number;
  totalValue: number;
  tradeAction: string;
  status: TransactionStatus;
  createdAt: string;
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPage: number;
}

interface TransactionApiResponse {
  data: Transaction[];
  pagination: Pagination;
}

function SharesRow({ tx, mutate }: { tx: Transaction; mutate: () => void }) {
  const [showDateModal, setShowDateModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showFeeModal, setShowFeeModal] = useState(false);

  const cancelTransaction = useCallback(
    async (id: string) => {
      try {
        await toast.promise(api.patch("/transactions/status", { id, status: TransactionStatus.CANCELLED }), {
          loading: "Transaction is updating...",
          error: (err) => err.response?.data?.message || "Error updating",
          success: "Transaction is updated.",
        });
        mutate();
      } catch (error) {
        console.log(error);
      }
    },
    [mutate]
  );

  const changeDate = useCallback(async () => {
    if (!selectedDate) {
      toast.error("Please select a valid date");
      return;
    }
    const payload = {
      id: tx._id,
      date: new Date(selectedDate),
    };

    try {
      await toast.promise(api.patch("/transactions/update_date", payload), {
        loading: "Updating the transaction date...",
        success: ({ data }) => data.message,
        error: (err) => err.response?.data?.message || "Error updating",
      });
      setShowDateModal(false);
      mutate();
    } catch (error) {
      console.log(error);
    }
  }, [selectedDate, mutate, tx._id]);

  return (
    <>
      <tr className="hover:bg-slate-50/80 transition-colors whitespace-nowrap">
        <td className="py-4 px-5 text-xs text-slate-500 font-mono">
          {fDateAndTime(tx.createdAt)}
        </td>
        <td className="py-4 px-5 text-xs font-mono text-slate-400">{tx._id.slice(-8).toUpperCase()}</td>
        <td className="py-4 px-5 text-sm">
          <p className="font-bold text-[#082348]">{tx.user?.name}</p>
          <p className="text-xs text-slate-400">{tx.user?.email}</p>
        </td>
        <td className="py-4 px-5 text-sm font-bold text-[#082348]">{tx.symbol}</td>
        <td className="py-4 px-5 text-sm font-semibold text-slate-700">{tx.name}</td>
        <td className="py-4 px-5 text-xs font-semibold text-slate-600">{tx.tradeAction}</td>
        <td className="py-4 px-5 text-sm font-medium text-slate-600">{fCurrency(tx.unitPrice)}</td>
        <td className="py-4 px-5 text-sm font-semibold text-slate-700">{tx.quantity}</td>
        <td className="py-4 px-5 text-sm font-medium text-slate-600">{fCurrency(tx.fees ?? 0)}</td>
        <td className="py-4 px-5 text-sm font-bold text-[#082348]">{fCurrency(tx.totalValue)}</td>
        <td className="py-4 px-5 text-sm font-bold text-[#082348]">{fCurrency(tx.totalValue + (tx.fees ?? 0))}</td>
        <td className="py-4 px-5 text-xs">
          <span
            className={`inline-block px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider text-center ${tx.status === TransactionStatus.PENDING
                ? "bg-amber-50 text-amber-700 border border-amber-200"
                : tx.status === TransactionStatus.COMPLETED
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "bg-rose-50 text-rose-700 border border-rose-200"
              }`}
          >
            {tx.status}
          </span>
        </td>
        <td className="py-4 px-5 text-xs">
          <div className="flex gap-2">
            {tx.status === TransactionStatus.PENDING && (
              <>
                <button
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-2xs transition-colors cursor-pointer"
                  onClick={() => setShowFeeModal(true)}
                >
                  Complete
                </button>
                <button
                  className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-2xs transition-colors cursor-pointer"
                  onClick={() => cancelTransaction(tx._id)}
                >
                  Cancel
                </button>
              </>
            )}
            <button
              className="border border-slate-200 text-[#082348] hover:bg-slate-50 font-bold text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
              onClick={() => setShowDateModal(true)}
            >
              Change Date
            </button>
          </div>
          {showDateModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-[#082348]/40 backdrop-blur-xs z-50 p-4 font-inter">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xl min-w-[340px]">
                <h3 className="mb-1 font-serif font-bold text-xl text-[#082348]">Change Transaction Date</h3>
                <p className="mb-5 text-xs text-slate-500">Update execution date timestamp for audit logs</p>
                <label className="block mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 block">Select New Date</span>
                  <input
                    type="date"
                    className="w-full h-11 px-4 border border-slate-200 rounded-xl bg-slate-50 text-sm font-semibold text-[#082348] focus:bg-white focus:border-[#C5A880] outline-none"
                    value={selectedDate ?? ""}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </label>
                <div className="flex gap-2.5 justify-end mt-6">
                  <button
                    className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl hover:bg-slate-200 transition-colors"
                    onClick={() => setShowDateModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 gold-gradient-bg text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-md cursor-pointer"
                    onClick={changeDate}
                  >
                    Confirm Date
                  </button>
                </div>
              </div>
            </div>
          )}
          {showFeeModal && (
            <TransactionFeeModal
              open={showFeeModal}
              onClose={() => setShowFeeModal(false)}
              transaction={tx}
              onSuccess={mutate}
            />
          )}
        </td>
      </tr>
    </>
  );
}

export default function SharesTable() {
  const [filter, setFilter] = useState({ page: 1, limit: 10 });

  const apiUrl = useMemo(() => {
    const params = new URLSearchParams({
      page: filter.page.toString(),
      limit: filter.limit.toString(),
      investmentType: InvestmentType.STOCK,
    });

    return `/transactions?${params.toString()}`;
  }, [filter]);

  const { data, isLoading, mutate } = useSWR<TransactionApiResponse>(apiUrl, {
    revalidateOnFocus: true,
    revalidateOnMount: true,
  });

  const transactions = data?.data ?? [];
  const pagination = data?.pagination;

  const handlePageChange = (newPage: number) => {
    setFilter((prev) => ({ ...prev, page: newPage }));
  };

  const handleLimitChange = (newLimit: number) => {
    setFilter({ page: 1, limit: newLimit });
  };

  const getPageNumbers = () => {
    if (!pagination) return [];
    const { page, totalPage } = pagination;
    const pages = [];
    const maxVisible = 5;

    let start = Math.max(1, page - Math.floor(maxVisible / 2));
    const end = Math.min(totalPage, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const SkeletonRow = () => (
    <tr className="animate-pulse border-b border-slate-100 whitespace-nowrap">
      {Array.from({ length: 13 }).map((_, i) => (
        <td key={i} className="py-4 px-5">
          <div className="h-4 bg-slate-200 rounded w-full mx-auto"></div>
        </td>
      ))}
    </tr>
  );

  return (
    <div className="w-full space-y-4 font-inter">
      <div className="flex justify-end items-center">
        <select
          value={filter.limit}
          onChange={(e) => handleLimitChange(Number(e.target.value))}
          className="px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#C5A880] text-xs font-semibold text-slate-700 shadow-2xs"
        >
          <option value={10}>10 per page</option>
          <option value={25}>25 per page</option>
          <option value={50}>50 per page</option>
        </select>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-[0_15px_35px_rgba(8,35,72,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap text-left">
            <thead>
              <tr className="border-b border-slate-200/80 bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-[#082348]">
                <th className="py-4 px-5">Date</th>
                <th className="py-4 px-5">Tx ID</th>
                <th className="py-4 px-5">Client Profile</th>
                <th className="py-4 px-5">Ticker</th>
                <th className="py-4 px-5">Company Name</th>
                <th className="py-4 px-5">Type</th>
                <th className="py-4 px-5">Price</th>
                <th className="py-4 px-5">Shares</th>
                <th className="py-4 px-5">Fees</th>
                <th className="py-4 px-5">Investment Sum</th>
                <th className="py-4 px-5">Total Amount</th>
                <th className="py-4 px-5">Status</th>
                <th className="py-4 px-5">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading &&
                Array.from({ length: filter.limit }).map((_, i) => (
                  <SkeletonRow key={i} />
                ))}

              {!isLoading && transactions.length > 0 && (
                <>
                  {transactions.map((tx) => (
                    <SharesRow key={tx._id} tx={tx} mutate={mutate} />
                  ))}
                </>
              )}

              {!isLoading && transactions.length === 0 && (
                <tr>
                  <td colSpan={13} className="text-center py-12 text-slate-400 text-sm">
                    No share transactions recorded.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {pagination && pagination.totalPage > 1 && (
        <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <p className="text-xs text-slate-500 font-medium">
            Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of{" "}
            {pagination.total}
          </p>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              className="px-3 py-1.5 border border-slate-200 text-xs font-semibold text-slate-700 rounded-xl disabled:opacity-40 hover:bg-slate-50 transition-colors"
            >
              Previous
            </button>
            {getPageNumbers().map((num) => (
              <button
                key={num}
                onClick={() => handlePageChange(num)}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition-colors ${num === pagination.page
                    ? "bg-[#082348] text-white border-[#082348]"
                    : "text-slate-700 border-slate-200 hover:bg-slate-50"
                  }`}
              >
                {num}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPage}
              className="px-3 py-1.5 border border-slate-200 text-xs font-semibold text-slate-700 rounded-xl disabled:opacity-40 hover:bg-slate-50 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
