"use client"

import { useState, useMemo } from "react"
import useSWR, { useSWRConfig } from "swr"
import { fDate } from "@/utility/dateFormatters.ts"
import toast from "react-hot-toast"
import api from "@/services/api"

interface User {
  _id: string
  name: string
  email: string
}

interface Ipo {
  _id: string
  name: string
  stockSymbol: string
  companyName: string
}

interface IpoRequest {
  _id: string
  user: User
  ipo: Ipo
  status: "Pending" | "Approved" | "Rejected"
  createdAt: string
}

interface Pagination {
  total: number
  page: number
  limit: number
  totalPage: number
}

interface IpoRequestApiResponse {
  data: IpoRequest[]
  pagination: Pagination
}

export default function IPORequests() {
  const [filter, setFilter] = useState({ page: 1, limit: 10 })
  const { mutate } = useSWRConfig()

  const apiUrl = useMemo(() => {
    const params = new URLSearchParams({
      page: filter.page.toString(),
      limit: filter.limit.toString(),
    })
    return `/ipos/requests?${params.toString()}`
  }, [filter])

  const { data, isLoading } = useSWR<IpoRequestApiResponse>(apiUrl, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 0,
  })

  const requests = data?.data ?? []
  const pagination = data?.pagination

  const handlePageChange = (newPage: number) => {
    setFilter((prev) => ({ ...prev, page: newPage }))
  }

  const handleLimitChange = (newLimit: number) => {
    setFilter({ page: 1, limit: newLimit })
  }

  const getPageNumbers = () => {
    if (!pagination) return []
    const { page, totalPage } = pagination
    const pages = []
    const maxVisible = 5

    let start = Math.max(1, page - Math.floor(maxVisible / 2))
    const end = Math.min(totalPage, start + maxVisible - 1)

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1)
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    return pages
  }

  const handleStatusUpdate = async (id: string, status: "Approved" | "Rejected") => {
    try {
      await toast.promise(api.patch(`/ipos/requests/${id}`, { status }), {
        loading: "Updating status...",
        success: `Request ${status.toLowerCase()}!`,
        error: "Failed to update status.",
      })
      mutate(apiUrl)
    } catch (error) {
      console.error(error)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Approved":
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Approved</span>
      case "Rejected":
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Rejected</span>
      default:
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">Pending</span>
    }
  }

  const SkeletonRow = () => (
    <tr className="animate-pulse">
      {Array.from({ length: 7 }).map((_, i) => (
        <td key={i} className="py-3 px-4">
          <div className="h-4 bg-gray-300 rounded w-20 mx-auto"></div>
        </td>
      ))}
    </tr>
  )

  return (
    <div className="w-full space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-bakerjonesholdings-black">IPO Requests</h1>
        <select
          value={filter.limit}
          onChange={(e) => handleLimitChange(Number(e.target.value))}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bakerjonesholdings-pink"
        >
          <option value={10}>10 per page</option>
          <option value={25}>25 per page</option>
          <option value={50}>50 per page</option>
        </select>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left text-sm font-medium text-bakerjonesholdings-black bg-bakerjonesholdings-off-pink whitespace-nowrap">
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Client Name</th>
                <th className="py-3 px-4">IPO Name</th>
                <th className="py-3 px-4">Symbol</th>
                <th className="py-3 px-4">Request Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading &&
                Array.from({ length: filter.limit }).map((_, i) => (
                  <SkeletonRow key={i} />
                ))}

              {!isLoading && requests.length > 0 && (
                <>
                  {requests.map((request, i) => (
                    <tr key={request._id} className="border-b bg-bakerjonesholdings-off-pink whitespace-nowrap items-center">
                      <td className="py-3 px-4 text-sm">{(filter.page - 1) * filter.limit + i + 1}</td>
                      <td className="py-3 px-4 text-sm font-medium text-gray-800">
                        <div className="font-semibold text-gray-900">{request.user?.name}</div>
                        <div className="text-xs text-gray-500 font-normal">{request.user?.email}</div>
                      </td>
                      <td className="py-3 px-4 text-sm text-bakerjonesholdings-black">{request.ipo?.name}</td>
                      <td className="py-3 px-4 text-sm text-bakerjonesholdings-black">{request.ipo?.stockSymbol}</td>
                      <td className="py-3 px-4 text-sm text-bakerjonesholdings-black">{fDate(request.createdAt)}</td>
                      <td className="py-3 px-4 text-sm">{getStatusBadge(request.status)}</td>
                      <td className="py-3 px-4 text-sm text-center">
                        {request.status === "Pending" && (
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => handleStatusUpdate(request._id, "Approved")}
                              className="px-2 py-1 bg-green-500 hover:bg-green-600 text-white rounded text-xs"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(request._id, "Rejected")}
                              className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-xs"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                        {request.status !== "Pending" && <span className="text-gray-400 text-xs">No Actions</span>}
                      </td>
                    </tr>
                  ))}
                </>
              )}

              {!isLoading && requests.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-gray-500">
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
            {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total}
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
                className={`px-3 py-2 text-sm rounded-md border ${num === pagination.page
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
  )
}
