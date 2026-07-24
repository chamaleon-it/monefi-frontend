"use client";

import { useMemo, useState } from "react";
import useSWR from "swr";
import { fCurrency } from "@/utility/numberFormatters";
import { fDateAndTime } from "@/utility/dateFormatters.ts";
import { InvestmentType } from "@/enum/investment-type.enum";

interface Transaction {
  _id: string;
  symbol: string;
  name: string;
  quantity: number;
  unitPrice: number;
  fees?: number;
  totalValue: number;
  tradeAction: string;
  status: string;
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

export default function BondsTable() {
  const [filter, setFilter] = useState({ page: 1, limit: 10 });

  const apiUrl = useMemo(() => {
    const params = new URLSearchParams({
      page: filter.page.toString(),
      limit: filter.limit.toString(),
      investmentType: InvestmentType.BOND,
    });
    return `/transactions?${params.toString()}`;
  }, [filter]);

  const { data, isLoading } = useSWR<TransactionApiResponse>(apiUrl, {
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
      {Array.from({ length: 10 }).map((_, i) => (
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
                <th className="py-4 px-5">Transaction Date</th>
                <th className="py-4 px-5">Transaction ID</th>
                <th className="py-4 px-5">ISIN / Symbol</th>
                <th className="py-4 px-5">Issuer</th>
                <th className="py-4 px-5">Type</th>
                <th className="py-4 px-5">Units</th>
                <th className="py-4 px-5">Unit Price</th>
                <th className="py-4 px-5">Fees</th>
                <th className="py-4 px-5">Principal</th>
                <th className="py-4 px-5">Total Value</th>
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
                    <tr key={tx._id} className="hover:bg-slate-50/80 transition-colors whitespace-nowrap">
                      <td className="py-4 px-5 text-xs text-slate-500 font-mono">
                        {fDateAndTime(tx.createdAt)}
                      </td>
                      <td className="py-4 px-5 text-xs text-slate-400 font-mono truncate max-w-[120px]">
                        {tx._id}
                      </td>
                      <td className="py-4 px-5 text-sm font-bold text-[#082348]">
                        {tx.symbol}
                      </td>
                      <td className="py-4 px-5 text-sm font-semibold text-slate-700">
                        {tx.name}
                      </td>
                      <td className="py-4 px-5 text-xs">
                        <span className="inline-block px-2.5 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider bg-slate-100 text-[#082348] border border-slate-200">
                          {tx.tradeAction}
                        </span>
                      </td>
                      <td className="py-4 px-5 text-sm font-semibold text-slate-700">
                        {tx.quantity}
                      </td>
                      <td className="py-4 px-5 text-sm font-medium text-slate-600">
                        {fCurrency(tx.unitPrice)}
                      </td>
                      <td className="py-4 px-5 text-sm text-slate-400">
                        {fCurrency(tx.fees ?? 0)}
                      </td>
                      <td className="py-4 px-5 text-sm font-semibold text-slate-700">
                        {fCurrency(tx.totalValue)}
                      </td>
                      <td className="py-4 px-5 text-sm font-bold text-[#082348]">
                        {fCurrency(tx.totalValue + (tx.fees ?? 0))}
                      </td>
                    </tr>
                  ))}
                </>
              )}

              {!isLoading && transactions.length === 0 && (
                <tr>
                  <td colSpan={10} className="text-center py-12 text-slate-400 text-sm">
                    No bond transactions found.
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
                className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition-colors ${
                  num === pagination.page
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
