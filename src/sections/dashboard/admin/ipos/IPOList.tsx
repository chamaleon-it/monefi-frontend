"use client"

import { useState, useMemo } from "react"
import useSWR, { useSWRConfig } from "swr"
import { fDate } from "@/utility/dateFormatters.ts"
import { fCurrency } from "@/utility/numberFormatters"
import toast from "react-hot-toast"
import api from "@/services/api"
import CreateIPODialog from "./CreateIPODialog"
import UpdateIPODialog from "./UpdateIPODialog"
import ViewIPODetailsDialog from "./ViewIPODetailsDialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

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
  companyDescription?: string
  officialWebsite?: string
  status: string
  isPublic: boolean
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

export default function IPOList() {
  const [filter, setFilter] = useState({ page: 1, limit: 10 })
  const { mutate } = useSWRConfig()

  // Edit dialog state
  const [editIpo, setEditIpo] = useState<Ipo | null>(null)
  const [editOpen, setEditOpen] = useState(false)

  // View dialog state
  const [viewIpoId, setViewIpoId] = useState<string | null>(null)
  const [viewOpen, setViewOpen] = useState(false)

  // Delete dialog state
  const [deleteIpo, setDeleteIpo] = useState<Ipo | null>(null)
  const [deleteOpen, setDeleteOpen] = useState(false)

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

  const handleDelete = async () => {
    if (!deleteIpo) return
    try {
      await toast.promise(api.delete(`/ipos/${deleteIpo._id}`), {
        loading: "Deleting IPO...",
        success: "IPO deleted successfully!",
        error: "Failed to delete IPO.",
      })
      setDeleteOpen(false)
      setDeleteIpo(null)
      mutate(apiUrl)
    } catch (error) {
      console.error(error)
    }
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Open":
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Open</span>
      case "Closed":
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Closed</span>
      case "Listed":
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Listed</span>
      case "Upcoming":
        return <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">Upcoming</span>
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">{status}</span>
    }
  }

  const SkeletonRow = () => (
    <tr className="animate-pulse">
      {Array.from({ length: 11 }).map((_, i) => (
        <td key={i} className="py-3 px-4">
          <div className="h-4 bg-gray-300 rounded w-20 mx-auto"></div>
        </td>
      ))}
    </tr>
  )

  return (
    <div className="w-full space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-bakerjonesholdings-black">IPOs</h1>
        <div className="flex items-center gap-4">
          <select
            value={filter.limit}
            onChange={(e) => handleLimitChange(Number(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bakerjonesholdings-pink"
          >
            <option value={10}>10 per page</option>
            <option value={25}>25 per page</option>
            <option value={50}>50 per page</option>
          </select>
          <CreateIPODialog />
        </div>
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
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Visibility</th>
                <th className="py-3 px-4 text-center">Actions</th>
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
                    <tr key={ipo._id} className="border-b bg-bakerjonesholdings-off-pink whitespace-nowrap">
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
                      <td className="py-3 px-4 text-sm">{getStatusBadge(ipo.status)}</td>
                      <td className="py-3 px-4 text-sm">
                        {ipo.isPublic ? (
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Public</span>
                        ) : (
                          <span className="px-2 py-1 bg-gray-200 text-gray-600 rounded-full text-xs font-medium">Hidden</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-sm text-center">
                        <div className="flex justify-center gap-1.5">
                          <button
                            onClick={() => { setViewIpoId(ipo._id); setViewOpen(true); }}
                            className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-xs transition-colors"
                            title="View Details"
                          >
                            View
                          </button>
                          <button
                            onClick={() => { setEditIpo(ipo); setEditOpen(true); }}
                            className="px-2 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded text-xs transition-colors"
                            title="Edit IPO"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => { setDeleteIpo(ipo); setDeleteOpen(true); }}
                            className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-xs transition-colors"
                            title="Delete IPO"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </>
              )}

              {!isLoading && ipos.length === 0 && (
                <tr>
                  <td colSpan={11} className="text-center py-10 text-gray-500">
                    No IPOs found.
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

      {/* Edit Dialog */}
      {editIpo && (
        <UpdateIPODialog
          ipo={editIpo}
          open={editOpen}
          onOpenChange={(open) => {
            setEditOpen(open);
            if (!open) setEditIpo(null);
          }}
        />
      )}

      {/* View Details Dialog */}
      {viewIpoId && (
        <ViewIPODetailsDialog
          ipoId={viewIpoId}
          open={viewOpen}
          onOpenChange={(open) => {
            setViewOpen(open);
            if (!open) setViewIpoId(null);
          }}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteOpen} onOpenChange={(open) => { setDeleteOpen(open); if (!open) setDeleteIpo(null); }}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-900">Delete IPO</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              Are you sure you want to delete <strong>{deleteIpo?.name}</strong>? This will also remove all associated client requests. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-gray-300 text-gray-700 hover:bg-gray-50">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
