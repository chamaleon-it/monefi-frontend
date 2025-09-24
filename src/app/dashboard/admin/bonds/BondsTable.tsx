"use client"

import { useState, useMemo } from "react"
import useSWR from "swr"
import { fDate } from "@/utility/dateFormatters.ts"
import { CouponFrequency } from "@/enum/coupon-frequency.enum"
import { CouponType } from "@/enum/coupon-type.enum"
import { fCurrency } from "@/utility/numberFormatters"
import { fBoolean } from "@/utility/fBoolean"

interface Bond {
  _id: string
  name: string
  isin: string
  unitPrice: number
  couponType: CouponType
annualCouponRate:number
  couponFrequency: CouponFrequency
  meturityDate: string
  createdAt: string
  isPublic:boolean
}

interface Pagination {
  total: number
  page: number
  limit: number
  totalPage: number
}

interface BondApiResponse {
  data: Bond[]
  pagination: Pagination
}

export default function BondsPage() {
  const [filter, setFilter] = useState({ page: 1, limit: 10 })

  const apiUrl = useMemo(() => {
    const params = new URLSearchParams({
      page: filter.page.toString(),
      limit: filter.limit.toString(),
    })
    return `/bonds?${params.toString()}`
  }, [filter])

  const { data, isLoading } = useSWR<BondApiResponse>(apiUrl)

  const bonds = data?.data ?? []
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
        <h1 className="text-2xl font-bold text-monefi-black">Bonds</h1>
        <select
          value={filter.limit}
          onChange={(e) => handleLimitChange(Number(e.target.value))}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-monefi-pink"
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
              <tr className="border-b text-left text-sm font-medium text-gray-600 bg-monefi-off-pink whitespace-nowrap">
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">ISIN</th>
                <th className="py-3 px-4">Unit Price</th>
                <th className="py-3 px-4">Coupon Type</th>
                <th className="py-3 px-4">Coupon Rate</th>
                <th className="py-3 px-4">Frequency</th>
                <th className="py-3 px-4">Maturity</th>
                <th className="py-3 px-4">Public / Private</th>
              </tr>
            </thead>
            <tbody>
              {isLoading &&
                Array.from({ length: filter.limit }).map((_, i) => (
                  <SkeletonRow key={i} />
                ))}

              {!isLoading && bonds.length > 0 && (
                <>
                  {bonds.map((bond, i) => (
                    <tr key={bond._id} className="border-b bg-monefi-off-pink whitespace-nowrap">
                      <td className="py-3 px-4 text-sm">{(filter.page - 1) * filter.limit + i + 1}</td>
                      <td className="py-3 px-4 text-sm font-medium text-gray-800">{bond.name}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{bond.isin}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{fCurrency(bond.unitPrice)}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{bond.couponType}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{bond.annualCouponRate ? `${bond.annualCouponRate} %`  : "-"}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{bond.couponFrequency}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{bond?.meturityDate && fDate(bond.meturityDate)}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{fBoolean(bond.isPublic,"Public","Private")}</td>
                    </tr>
                  ))}
                </>
              )}

              {!isLoading && bonds.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-gray-500">
                    No bonds found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {pagination && pagination.totalPage > 1 && (
        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-600">
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
                    ? "bg-monefi-pink text-white"
                    : "text-gray-600 hover:bg-gray-100"
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
