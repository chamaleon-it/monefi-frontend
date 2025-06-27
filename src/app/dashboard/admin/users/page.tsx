"use client"

import { UserStatus } from "@/enum/user-status.enum"
import type { UserRoles } from "@/enum/user.enum"
import api from "@/services/api"
import { fAgo, fDateAndTime } from "@/utility/dateFormatters.ts"
import { fCurrency } from "@/utility/numberFormatters"
import { useState, useMemo } from "react"
import toast from "react-hot-toast"
import useSWR from "swr"

interface User {
  _id: string
  email: string
  role: UserRoles
  status: UserStatus
  lastLogin: Date
  createdAt: Date,
  balance:number
}

interface Pagination {
  total: number
  page: number
  limit: number
  totalPage: number
}

interface ApiResponse {
  data: User[]
  pagination: Pagination
}

interface FilterState {
  page: number
  limit: number
  email?: string
  role?: UserRoles
  status?: UserStatus
}

export default function UsersPage() {
  const [filter, setFilter] = useState<FilterState>({
    page: 1,
    limit: 10,
  })

  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean
    user: User | null
  }>({
    isOpen: false,
    user: null,
  })

  // Memoize the API URL to prevent unnecessary re-renders
  const apiUrl = useMemo(() => {
    const params = new URLSearchParams({
      page: filter.page.toString(),
      limit: filter.limit.toString(),
    })

    if (filter.email) params.append("email", filter.email)
    if (filter.role) params.append("role", filter.role)
    if (filter.status) params.append("status", filter.status)

    return `/users?${params.toString()}`
  }, [filter])

  const { data, error, isLoading, mutate } = useSWR<ApiResponse>(apiUrl)

  const users = data?.data ?? []
  const pagination = data?.pagination

  // Pagination handlers
  const handlePageChange = (newPage: number) => {
    setFilter((prev) => ({ ...prev, page: newPage }))
  }

  const handleLimitChange = (newLimit: number) => {
    setFilter((prev) => ({ ...prev, limit: newLimit, page: 1 }))
  }

  const openDeleteConfirmation = (user: User) => {
    setDeleteConfirmation({ isOpen: true, user })
  }

  const closeDeleteConfirmation = () => {
    setDeleteConfirmation({ isOpen: false, user: null })
  }

  const confirmDelete = async () => {
    if (!deleteConfirmation.user) return

    try {
      await toast.promise(api.delete(`/users/${deleteConfirmation.user._id}`), {
        loading: "Deleting...!",
        error: "Something is error, Please try again!",
        success: "User deleted successfully",
      })
      await mutate()
      closeDeleteConfirmation()
    } catch (error) {
      console.log(error);
      // Error is handled by toast.promise
    }
  }

  // Generate page numbers for pagination
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

  // Skeleton Row Component
  const SkeletonRow = () => (
    <tr className="animate-pulse">
      <td className="py-2.5 text-center">
        <div className="h-4 bg-gray-300 rounded w-8 mx-auto"></div>
      </td>
      <td className="py-2.5 text-center">
        <div className="h-4 bg-gray-300 rounded w-32 mx-auto"></div>
      </td>
      <td className="py-2.5 text-center">
        <div className="h-4 bg-gray-300 rounded w-16 mx-auto"></div>
      </td>
      <td className="py-2.5 text-center">
        <div className="h-4 bg-gray-300 rounded w-16 mx-auto"></div>
      </td>
      <td className="py-2.5 text-center">
        <div className="h-4 bg-gray-300 rounded w-24 mx-auto"></div>
      </td>
      <td className="py-2.5 text-center">
        <div className="h-4 bg-gray-300 rounded w-20 mx-auto"></div>
      </td>
      <td className="py-2.5 text-center">
        <div className="h-4 bg-gray-300 rounded w-16 mx-auto"></div>
      </td>
      <td className="py-2.5 text-center">
        <div className="h-4 bg-gray-300 rounded w-16 mx-auto"></div>
      </td>
    </tr>
  )

  // Error State
  if (error) {
    return (
      <div className="w-full">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Users</h3>
          <p className="text-red-600 mb-4">{error.message || "Something went wrong while fetching users data."}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-monefi-black">Customers</h1>
        <div className="flex items-center gap-4">
          <select
            value={filter.limit}
            onChange={(e) => handleLimitChange(Number(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-monefi-pink focus:border-transparent"
          >
            <option value={10}>10 per page</option>
            <option value={25}>25 per page</option>
            <option value={50}>50 per page</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-monefi-off-pink rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap">
            <thead>
              <tr className="font-inter font-medium border-b border-monefi-black">
                <th className="py-4 px-4 text-left">SL.No</th>
                <th className="py-4 px-4 text-left">Email Address</th>
                <th className="py-4 px-4 text-left">Status</th>
                <th className="py-4 px-4 text-left">Balance</th>
                <th className="py-4 px-4 text-left">Registration Date</th>
                <th className="py-4 px-4 text-left">Last Login</th>
                <th className="py-4 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Loading State */}
              {isLoading && (
                <>
                  {Array.from({ length: filter.limit }, (_, index) => (
                    <SkeletonRow key={index} />
                  ))}
                </>
              )}

              {/* Data Rows */}
              {!isLoading && users.length > 0 && (
                <>
                  {users.map((user, index) => (
                    <tr
                      key={user._id}
                      className="hover:bg-white/50 transition-colors duration-150 border-b border-gray-100 last:border-b-0"
                    >
                      <td className="py-3 px-4 text-monefi-black">{(filter.page - 1) * filter.limit + index + 1}</td>
                      <td className="py-3 px-4 text-monefi-black font-medium">{user.email}</td>

                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize ${
                            (user.status === UserStatus.ACTIVE && "bg-green-100 text-green-800") ||
                            (user.status === UserStatus.INACTIVE && "bg-yellow-100 text-yellow-800") ||
                            (user.status === UserStatus.DELETED && "bg-red-100 text-red-800") ||
                            "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{fCurrency(user.balance)}</td>
                      <td className="py-3 px-4 text-gray-600">{fDateAndTime(user.createdAt)}</td>
                      <td className="py-3 px-4 text-gray-600">{user.lastLogin ? fAgo(user.lastLogin) : "Never"}</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          
                         {user.status !== UserStatus.DELETED && <button
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                            onClick={() => openDeleteConfirmation(user)}
                          >
                            Delete
                          </button>}
                        </div>
                      </td>
                    </tr>
                  ))}
                </>
              )}

              {/* No Data State */}
              {!isLoading && users.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center">
                    <div className="text-gray-400 text-6xl mb-4">👥</div>
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">No Users Found</h3>
                    <p className="text-gray-500">There are no users to display at the moment.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPage > 1 && (
        <div className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm">
          <div className="text-sm text-gray-600">
            Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} results
          </div>

          <div className="flex items-center gap-2">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Previous
            </button>

            {/* Page Numbers */}
            <div className="flex gap-1">
              {pagination.page > 3 && (
                <>
                  <button
                    onClick={() => handlePageChange(1)}
                    className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    1
                  </button>
                  {pagination.page > 4 && <span className="px-3 py-2 text-sm text-gray-400">...</span>}
                </>
              )}

              {getPageNumbers().map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    pageNum === pagination.page
                      ? "bg-monefi-pink text-white"
                      : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              {pagination.page < pagination.totalPage - 2 && (
                <>
                  {pagination.page < pagination.totalPage - 3 && (
                    <span className="px-3 py-2 text-sm text-gray-400">...</span>
                  )}
                  <button
                    onClick={() => handlePageChange(pagination.totalPage)}
                    className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    {pagination.totalPage}
                  </button>
                </>
              )}
            </div>

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPage}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmation.isOpen && (
        <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50 ">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Delete User Account</h3>
            </div>

            <p className="text-gray-600 mb-6">
              Are you sure you want to delete the account for{" "}
              <span className="font-semibold text-gray-900">{deleteConfirmation.user?.email}</span>? This action cannot
              be undone and will permanently remove all user data from the system.
            </p>

            <div className="flex gap-3 justify-end">
              <button
                onClick={closeDeleteConfirmation}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
