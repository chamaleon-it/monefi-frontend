"use client";

import { useMemo, useState, useCallback } from "react";
import useSWR from "swr";
import { fCurrency } from "@/utility/numberFormatters";
import { fDateAndTime } from "@/utility/dateFormatters.ts";
import { IpoRequestStatus } from "@/enum/ipo-request-status.enum";
import api from "@/services/api";
import toast from "react-hot-toast";

interface IpoRequest {
  _id: string;
  user: {
    email: string;
    name?: string;
  };
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

function IpoRow({ req, mutate }: { req: IpoRequest; mutate: () => void }) {
  const updateStatus = useCallback(
    async (id: string, status: IpoRequestStatus) => {
      try {
        await toast.promise(api.patch(`/ipos/requests/${id}`, { status }), {
          loading: "Request is updating...",
          error: (err) => err.response?.data?.message || "Error updating",
          success: "Request status updated.",
        });
        mutate();
      } catch (error) {
        console.log(error);
      }
    },
    [mutate]
  );

  return (
    <tr className="border-b bg-bakerjonesholdings-off-pink whitespace-nowrap">
      <td className="py-3 px-4 text-sm text-bakerjonesholdings-black">
        {fDateAndTime(req.createdAt)}
      </td>
      <td className="py-3 px-4 text-sm text-bakerjonesholdings-black">{req._id}</td>
      <td className="py-3 px-4 text-sm">
        <p className="font-bold">{req.user?.name}</p>
        <p className="text-sm">{req.user?.email}</p>
      </td>
      <td className="py-3 px-4 text-sm font-bold text-gray-800">
        {req.ipo.name} ({req.ipo.companyName})
      </td>
      <td className="py-3 px-4 text-sm text-bakerjonesholdings-black">{req.ipo.stockSymbol}</td>
      <td className="py-3 px-4 text-sm text-bakerjonesholdings-black">{req.quantity}</td>
      <td className="py-3 px-4 text-sm text-bakerjonesholdings-black font-semibold">
        {fCurrency(req.totalAmount)}
      </td>
      <td className={`py-3 px-4 text-xs`}>
        <p
          className={`
            ${
              (req.status === IpoRequestStatus.PENDING && "text-yellow-800 bg-yellow-400") ||
              (req.status === IpoRequestStatus.APPROVED && "text-green-800 bg-green-400") ||
              (req.status === IpoRequestStatus.REJECTED && "text-red-800 bg-red-400")
            }
            px-2 py-1 rounded-full text-center inline-block
          `}
        >
          {req.status}
        </p>
      </td>
      <td className="py-3 px-4 text-sm text-bakerjonesholdings-black">
        {req.status === IpoRequestStatus.PENDING && (
          <div className="flex gap-2.5">
            <button
              className="px-2 py-1.5 rounded-md text-white bg-green-600"
              onClick={() => updateStatus(req._id, IpoRequestStatus.APPROVED)}
            >
              Approve
            </button>
            <button
              className="px-2 py-1.5 rounded-md text-white bg-red-600"
              onClick={() => updateStatus(req._id, IpoRequestStatus.REJECTED)}
            >
              Reject
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}

export default function IpoTable() {
  const [filter, setFilter] = useState({ page: 1, limit: 10 });

  const apiUrl = useMemo(() => {
    const params = new URLSearchParams({
      page: filter.page.toString(),
      limit: filter.limit.toString(),
    });
    return `/ipos/requests?${params.toString()}`;
  }, [filter]);

  const { data, isLoading, mutate } = useSWR<IpoRequestApiResponse>(apiUrl, {
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
                <th className="py-3 px-4">Request Date</th>
                <th className="py-3 px-4">Request ID</th>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">IPO Name</th>
                <th className="py-3 px-4">Stock Symbol</th>
                <th className="py-3 px-4">Quantity</th>
                <th className="py-3 px-4">Total Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading &&
                Array.from({ length: filter.limit }).map((_, i) => (
                  <SkeletonRow key={i} />
                ))}

              {!isLoading && requests.length > 0 && (
                <>
                  {requests.map((req) => (
                    <IpoRow key={req._id} req={req} mutate={mutate} />
                  ))}
                </>
              )}

              {!isLoading && requests.length === 0 && (
                <tr>
                  <td colSpan={9} className="text-center py-10 text-gray-500">
                    No IPO requests found.
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
