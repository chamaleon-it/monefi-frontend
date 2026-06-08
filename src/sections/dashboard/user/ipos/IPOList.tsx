"use client"

import { useState, useMemo } from "react"
import useSWR from "swr"
import { fDate } from "@/utility/dateFormatters.ts"
import { fCurrency } from "@/utility/numberFormatters"
import toast from "react-hot-toast"
import api from "@/services/api"
import configuration from "@/config/configuration"
import RequestIPODialog from "./RequestIPODialog"

interface Ipo {
  _id: string
  name: string
  companyName: string
  stockSymbol: string
  openDate: string
  closeDate: string
  listingDate: string
  priceBandMin: number
  priceBandMax: number
  lotSize: number
  issueSize: number
  logoUrl?: string
}

interface Pagination {
  total: number
  page: number
  limit: number
  totalPage: number
}

interface IpoApiResponse {
  data: Ipo[]
  pagination: Pagination
}

const getLogoUrl = (url?: string) => {
  if (!url) return '/uploads/default-logo.png';
  if (url.startsWith('http')) return url;
  return `${configuration().backendURL}${url}`;
};

export default function IPOList() {
  const [filter, setFilter] = useState({ page: 1, limit: 10 })

  const apiUrl = useMemo(() => {
    const params = new URLSearchParams({
      page: filter.page.toString(),
      limit: filter.limit.toString(),
    })
    return `/ipos?${params.toString()}`
  }, [filter])

  const { data, isLoading } = useSWR<IpoApiResponse>(apiUrl, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 0,
  })

  const ipos = data?.data ?? []
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

  const handleRequestIPO = async (id: string) => {
    try {
      await toast.promise(api.post(`/ipos/${id}/request`), {
        loading: "Submitting request...",
        success: "IPO requested successfully!",
        error: "Failed to request IPO or already requested.",
      })
    } catch (error) {
      console.error(error)
    }
  }

  const SkeletonRow = () => (
    <tr className="animate-pulse">
        {Array.from({ length: 10 }).map((_, i) => (
          <td key={i} className="py-3 px-4">
            <div className="h-4 bg-gray-300 rounded w-20 mx-auto"/>
          </td>
        ))}
    </tr>
  )

  return (
    <div className="w-full space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-bakerjonesholdings-black">Available IPOs</h1>
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
                <th className="py-3 px-4">IPO Name</th>
                <th className="py-3 px-4">Company</th>
                <th className="py-3 px-4">Symbol</th>
                <th className="py-3 px-4">Open Date</th>
                <th className="py-3 px-4">Close Date</th>
                <th className="py-3 px-4">Price Band</th>
                <th className="py-3 px-4">Lot Size</th>
                <th className="py-3 px-4">Logo</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading &&
                Array.from({ length: filter.limit }).map((_, i) => (
                  <SkeletonRow key={i} />
                ))}

              {!isLoading && ipos.length > 0 && (
                <>
                  {ipos.map((ipo, i) => (
                    <tr key={ipo._id} className="border-b bg-bakerjonesholdings-off-pink whitespace-nowrap items-center">
                      <td className="py-3 px-4 text-sm">{(filter.page - 1) * filter.limit + i + 1}</td>
                      <td className="py-3 px-4 text-sm font-medium text-gray-800">{ipo.name}</td>
                      <td className="py-3 px-4 text-sm text-bakerjonesholdings-black">{ipo.companyName}</td>
                      <td className="py-3 px-4 text-sm font-semibold text-bakerjonesholdings-black">{ipo.stockSymbol}</td>
                      <td className="py-3 px-4 text-sm text-bakerjonesholdings-black">{ipo.openDate ? fDate(ipo.openDate) : "-"}</td>
                      <td className="py-3 px-4 text-sm text-bakerjonesholdings-black">{ipo.closeDate ? fDate(ipo.closeDate) : "-"}</td>
                      <td className="py-3 px-4 text-sm text-bakerjonesholdings-black">
                        {fCurrency(ipo.priceBandMin)} - {fCurrency(ipo.priceBandMax)}
                      </td>
                      <td className="py-3 px-4 text-sm text-bakerjonesholdings-black">{ipo.lotSize}</td>
                       <td className="py-3 px-4 text-sm text-center"><img src={getLogoUrl(ipo.logoUrl)} alt="logo" className="h-8 w-8 object-cover rounded bg-gray-50 border border-gray-100 mx-auto"/></td>
                       <td className="py-3 px-4 text-center">
                         <RequestIPODialog ipo={ipo} />
                       </td>
                    </tr>
                  ))}
                </>
              )}

              {!isLoading && ipos.length === 0 && (
                <tr>
                  <td colSpan={10} className="text-center py-10 text-gray-500">No IPOs currently available.</td>
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
  )
}
