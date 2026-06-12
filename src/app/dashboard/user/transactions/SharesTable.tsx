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
    <tr className="animate-pulse border-b bg-bakerjonesholdings-off-pink whitespace-nowrap">
      {Array.from({ length: 9 }).map((_, i) => (
        <td key={i} className="py-3 px-4">
          <div className="h-4 bg-gray-300 rounded w-full mx-auto"></div>
        </td>
      ))}
    </tr>
  );

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-end items-center">
        <select
          value={filter.limit}
          onChange={(e) => handleLimitChange(Number(e.target.value))}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bakerjonesholdings-pink text-sm"
        >
          <option value={10}>10 per page</option>
          <option value={25}>25 per page</option>
          <option value={50}>50 per page</option>
        </select>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap">
            <thead>
              <tr className="border-b text-left text-sm font-medium text-bakerjonesholdings-black bg-bakerjonesholdings-off-pink">
                <th className="py-3 px-4">Transaction Date</th>
                <th className="py-3 px-4">Transaction ID</th>
                <th className="py-3 px-4">Ticker</th>
                <th className="py-3 px-4">Company Name</th>
                <th className="py-3 px-4">Transaction Type</th>
                <th className="py-3 px-4">Execution Price</th>
                <th className="py-3 px-4">Shares Filled</th>
                <th className="py-3 px-4">Fees</th>
                <th className="py-3 px-4">Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {isLoading &&
                Array.from({ length: filter.limit }).map((_, i) => (
                  <SkeletonRow key={i} />
                ))}

              {!isLoading && transactions.length > 0 && (
                <>
                  {transactions.map((tx) => (
                    <tr key={tx._id} className="border-b bg-bakerjonesholdings-off-pink whitespace-nowrap">
                      <td className="py-3 px-4 text-sm text-bakerjonesholdings-black">
                        {fDateAndTime(tx.createdAt)}
                      </td>
                      <td className="py-3 px-4 text-sm text-bakerjonesholdings-black">
                        {tx._id}
                      </td>
                      <td className="py-3 px-4 text-sm font-bold text-gray-800">
                        {tx.symbol}
                      </td>
                      <td className="py-3 px-4 text-sm text-bakerjonesholdings-black">
                        {tx.name}
                      </td>
                      <td className="py-3 px-4 text-sm text-bakerjonesholdings-black">
                        {tx.tradeAction}
                      </td>
                      <td className="py-3 px-4 text-sm text-bakerjonesholdings-black">
                        {fCurrency(tx.unitPrice)}
                      </td>
                      <td className="py-3 px-4 text-sm text-bakerjonesholdings-black">
                        {tx.quantity}
                      </td>
                      <td className="py-3 px-4 text-sm text-bakerjonesholdings-black">
                        {fCurrency(tx.fees ?? 0)}
                      </td>
                      <td className="py-3 px-4 text-sm text-bakerjonesholdings-black font-semibold">
                        {fCurrency(tx.totalValue)}
                      </td>
                    </tr>
                  ))}
                </>
              )}

              {!isLoading && transactions.length === 0 && (
                <tr>
                  <td colSpan={9} className="text-center py-10 text-gray-500">
                    No share transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {pagination && pagination.totalPage > 1 && (
        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-bakerjonesholdings-black">
            Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of{" "}
            {pagination.total}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              className="px-3 py-2 border border-gray-300 text-sm rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            {getPageNumbers().map((num) => (
              <button
                key={num}
                onClick={() => handlePageChange(num)}
                className={`px-3 py-2 text-sm rounded-md border ${
                  num === pagination.page
                    ? "bg-bakerjonesholdings-pink text-white"
                    : "text-bakerjonesholdings-black hover:bg-gray-100"
                }`}
              >
                {num}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPage}
              className="px-3 py-2 border border-gray-300 text-sm rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
