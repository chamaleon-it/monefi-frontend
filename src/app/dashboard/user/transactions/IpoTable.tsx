"use client";

import { useMemo, useState } from "react";
import useSWR from "swr";
import { fCurrency } from "@/utility/numberFormatters";
import { fDateAndTime } from "@/utility/dateFormatters";
import { IpoRequestStatus } from "@/enum/ipo-request-status.enum";

interface IpoRequest {
  _id: string;
  ipo: {
    _id: string;
    name: string;
    stockSymbol: string;
    companyName: string;
  };
  quantity: number;
  totalAmount: number;
  status: IpoRequestStatus;
  createdAt: string;
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPage: number;
}

interface IpoRequestApiResponse {
  data: IpoRequest[];
  pagination: Pagination;
}

export default function IpoTable() {
  const [filter, setFilter] = useState({ page: 1, limit: 10 });

  const apiUrl = useMemo(() => {
    const params = new URLSearchParams({
      page: filter.page.toString(),
      limit: filter.limit.toString(),
    });
    return `/ipos/my-requests?${params.toString()}`;
  }, [filter]);

  const { data, isLoading } = useSWR<IpoRequestApiResponse>(apiUrl, {
    revalidateOnFocus: true,
    revalidateOnMount: true,
  });

  const requests = data?.data ?? [];
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
      {Array.from({ length: 7 }).map((_, i) => (
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
                <th className="py-4 px-5">Request Date</th>
                <th className="py-4 px-5">Request ID</th>
                <th className="py-4 px-5">IPO Offering</th>
                <th className="py-4 px-5">Ticker</th>
                <th className="py-4 px-5">Quantity Requested</th>
                <th className="py-4 px-5">Total Allocation Value</th>
                <th className="py-4 px-5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading &&
                Array.from({ length: filter.limit }).map((_, i) => (
                  <SkeletonRow key={i} />
                ))}

              {!isLoading && requests.length > 0 && (
                <>
                  {requests.map((req) => (
                    <tr key={req._id} className="hover:bg-slate-50/80 transition-colors whitespace-nowrap">
                      <td className="py-4 px-5 text-xs text-slate-500 font-mono">
                        {fDateAndTime(req.createdAt)}
                      </td>
                      <td className="py-4 px-5 text-xs text-slate-400 font-mono truncate max-w-[120px]">
                        {req._id}
                      </td>
                      <td className="py-4 px-5 text-sm font-bold text-[#082348]">
                        {req.ipo.name} <span className="text-xs text-slate-400 font-normal">({req.ipo.companyName})</span>
                      </td>
                      <td className="py-4 px-5 text-sm font-mono text-slate-600">
                        {req.ipo.stockSymbol}
                      </td>
                      <td className="py-4 px-5 text-sm font-semibold text-slate-700">
                        {req.quantity}
                      </td>
                      <td className="py-4 px-5 text-sm font-bold text-[#082348]">
                        {fCurrency(req.totalAmount)}
                      </td>
                      <td className="py-4 px-5 text-xs">
                        <span
                          className={`inline-block px-3 py-1 rounded-full font-bold text-[11px] uppercase tracking-wider text-center ${req.status === IpoRequestStatus.PENDING
                              ? "bg-amber-50 text-amber-700 border border-amber-200"
                              : req.status === IpoRequestStatus.APPROVED
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : "bg-rose-50 text-rose-700 border border-rose-200"
                            }`}
                        >
                          {req.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </>
              )}

              {!isLoading && requests.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-400 text-sm">
                    No IPO subscription requests found.
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
