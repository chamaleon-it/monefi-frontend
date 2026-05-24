"use client"

import { useMemo, useState } from "react"
import useSWR from "swr"

import { TransactionStatus } from "@/enum/transaction-status.enum"
import { TradeAction } from "@/enum/trade-action.enum"
import { InvestmentType } from "@/enum/investment-type.enum"
import TransactionRow from "./TransactionRow"

interface Transaction {
  user:{
    email:string,
    name?:string,
    _id:string
  }
  _id: string
  symbol: string
  name: string
  quantity: number
  unitPrice: number
  annualCouponRate?: number;
  totalValue: number
  tradeAction: TradeAction
  investmentType: InvestmentType
  status: TransactionStatus
  createdAt: string
}

interface Pagination {
  total: number
  page: number
  limit: number
  totalPage: number
}

interface TransactionApiResponse {
  data: Transaction[]
  pagination: Pagination
}

export default function TransactionsTable() {
  const [filter, setFilter] = useState({ page: 1, limit: 10 })

  const apiUrl = useMemo(() => {
    const params = new URLSearchParams({
      page: filter.page.toString(),
      limit: filter.limit.toString(),
    })
    return `/transactions?${params.toString()}`
  }, [filter])

  const { data, isLoading,mutate } = useSWR<TransactionApiResponse>(apiUrl,{revalidateOnFocus:true,revalidateOnMount:true})

  const transactions = data?.data ?? []
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
      {Array.from({ length: 9 }).map((_, i) => (
        <td key={i} className="py-3 px-4">
          <div className="h-4 bg-gray-300 rounded w-20 mx-auto"></div>
        </td>
      ))}
    </tr>
  )

  return (
    <div className="w-full space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-bakerjonesholdings-black">Transactions</h1>
        <select
          value={filter.limit}
          onChange={(e) => handleLimitChange(Number(e.target.value))}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bakerjonesholdings-pink"
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
              <tr className="border-b text-left text-sm font-medium text-gray-600 bg-bakerjonesholdings-off-pink">
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Symbol</th>
                <th className="py-3 px-4">Quantity</th>
                 <th className="py-3 px-4">Coupon Rate</th>
                <th className="py-3 px-4">Unit Price</th>
                <th className="py-3 px-4">Total Value</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Investment</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading &&
                Array.from({ length: filter.limit }).map((_, i) => (
                  <SkeletonRow key={i} />
                ))}

              {!isLoading && transactions.length > 0 && (
                <>
                  {transactions.map((tx, i) => <TransactionRow  filter={filter} i={i} tx={tx} key={tx._id} mutate={mutate}/>)}
                </>
              )}

              {!isLoading && transactions.length === 0 && (
                <tr>
                  <td colSpan={9} className="text-center py-10 text-gray-500">
                    No transactions found.
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
            Showing {(pagination.page - 1) * pagination.limit + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total}
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
                className={`px-3 py-2 text-sm rounded-md border ${num === pagination.page ? 'bg-bakerjonesholdings-pink text-white' : 'text-gray-600 hover:bg-gray-100'}`}
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
