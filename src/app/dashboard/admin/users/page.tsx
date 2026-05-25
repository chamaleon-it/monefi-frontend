"use client";

import getConfig from "@/config/configuration";
import { UserStatus } from "@/enum/user-status.enum";
import type { UserRoles } from "@/enum/user.enum";
import api from "@/services/api";
import { fAgo, fDateAndTime } from "@/utility/dateFormatters.ts";
import { fCurrency } from "@/utility/numberFormatters";
import { useState, useMemo } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";

interface User {
  _id: string;
  email: string;
  name?: string;
  role: UserRoles;
  status: UserStatus;
  lastLogin: Date;
  createdAt: Date;
  balance: number;
  identityVerification?: {
    proof: string;
    file: string;
  };
  proofOfAddress?: {
    proof: string;
    file: string;
  };
  kycStatus: "Not submitted" | "Pending" | "Completed" | "Expired" | "Rejected";
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPage: number;
}

interface ApiResponse {
  data: User[];
  pagination: Pagination;
}

interface FilterState {
  page: number;
  limit: number;
  email?: string;
  role?: UserRoles;
  status?: UserStatus;
}

export default function UsersPage() {
  const [filter, setFilter] = useState<FilterState>({
    page: 1,
    limit: 10,
  });

  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean;
    user: User | null;
  }>({
    isOpen: false,
    user: null,
  });

  const [depositModal, setDepositModal] = useState<{
    isOpen: boolean;
    user: User | null;
    amount: string;
  }>({
    isOpen: false,
    user: null,
    amount: "",
  });

  const apiUrl = useMemo(() => {
    const params = new URLSearchParams({
      page: filter.page.toString(),
      limit: filter.limit.toString(),
    });

    if (filter.email) params.append("email", filter.email);
    if (filter.role) params.append("role", filter.role);
    if (filter.status) params.append("status", filter.status);

    return `/users?${params.toString()}`;
  }, [filter]);

  const { data, error, isLoading, mutate } = useSWR<ApiResponse>(apiUrl);

  const users = data?.data ?? [];

  console.log(users);

  const pagination = data?.pagination;

  const handlePageChange = (newPage: number) => {
    setFilter((prev) => ({ ...prev, page: newPage }));
  };

  const handleLimitChange = (newLimit: number) => {
    setFilter((prev) => ({ ...prev, limit: newLimit, page: 1 }));
  };

  const openDeleteConfirmation = (user: User) => {
    setDeleteConfirmation({ isOpen: true, user });
  };

  const closeDeleteConfirmation = () => {
    setDeleteConfirmation({ isOpen: false, user: null });
  };

  const confirmDelete = async () => {
    if (!deleteConfirmation.user) return;

    try {
      await toast.promise(api.delete(`/users/${deleteConfirmation.user._id}`), {
        loading: "Deleting...!",
        error: "Something went wrong. Please try again!",
        success: "User deleted successfully",
      });
      await mutate();
      closeDeleteConfirmation();
    } catch (error) {
      console.error(error);
    }
  };

  const openDepositModal = (user: User) => {
    setDepositModal({ isOpen: true, user, amount: "" });
  };

  const closeDepositModal = () => {
    setDepositModal({ isOpen: false, user: null, amount: "" });
  };

  const handleDeposit = async () => {
    const amount = parseFloat(depositModal.amount);

    if (!depositModal.user || isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid deposit amount.");
      return;
    }

    try {
      await toast.promise(
        api.post(`/users/${depositModal.user._id}/deposit`, { amount }),
        {
          loading: "Depositing...",
          success: (res) => res.data.message,
          error: (error) => error.response.data.message,
        }
      );
      await mutate();
      closeDepositModal();
    } catch (error) {
      console.error(error);
    }
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
    <tr className="animate-pulse">
      {Array(7)
        .fill(null)
        .map((_, i) => (
          <td key={i} className="py-2.5 text-center">
            <div className="h-4 bg-gray-300 rounded w-24 mx-auto"></div>
          </td>
        ))}
    </tr>
  );

  if (error) {
    return (
      <div className="w-full">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            Error Loading Users
          </h3>
          <p className="text-red-600 mb-4">
            {error.message || "Something went wrong while fetching users data."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-bakerjonesholdings-black">Customers</h1>
        <div className="flex items-center gap-4">
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
      </div>

      {/* Table */}
      <div className="bg-bakerjonesholdings-off-pink rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap">
            <thead>
              <tr className="font-inter font-medium border-b border-bakerjonesholdings-black">
                <th className="py-4 px-4 text-left">SL.No</th>
                <th className="py-4 px-4 text-left">Email Address</th>
                <th className="py-4 px-4 text-left">Status</th>
                <th className="py-4 px-4 text-left">Balance</th>
                <th className="py-4 px-4 text-left">Registration Date</th>
                <th className="py-4 px-4 text-left">Last Login</th>
                <th className="py-4 px-4 text-left">KYC Status</th>
                <th className="py-4 px-4 text-left">KYC</th>
                <th className="py-4 px-4 text-left">KYC Actions</th>
                <th className="py-4 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading &&
                Array.from({ length: filter.limit }, (_, i) => (
                  <SkeletonRow key={i} />
                ))}

              {!isLoading &&
                users.length > 0 &&
                users.map((user, index) => (
                  <tr
                    key={user._id}
                    className="hover:bg-white/50 border-b border-gray-100 last:border-b-0"
                  >
                    <td className="py-3 px-4">
                      {(filter.page - 1) * filter.limit + index + 1}
                    </td>
                    <td className="py-3 px-4 font-medium">
                      <p className="font-bold">{user.name}</p>
                      <p className="text-sm">{user.email}</p>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize ${
                          user.status === UserStatus.ACTIVE
                            ? "bg-green-100 text-green-800"
                            : user.status === UserStatus.INACTIVE
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">{fCurrency(user.balance)}</td>
                    <td className="py-3 px-4">
                      {fDateAndTime(user.createdAt)}
                    </td>
                    <td className="py-3 px-4">
                      {user.lastLogin ? fAgo(user.lastLogin) : "Never"}
                    </td>
                    <td className="py-3 px-4">
                      <p className={`px-1 py-0.5 border rounded-md text-xs capitalize text-center 
                        ${user.kycStatus === "Not submitted" && "bg-yellow-300"} 
                         ${user.kycStatus === "Pending" && "bg-yellow-300"} 
                         ${user.kycStatus === "Completed" && "bg-green-400"}
                          ${user.kycStatus === "Expired" && "bg-red-400"}
                           ${user.kycStatus === "Rejected" && "bg-red-400"}
                       `}>
                      {user.kycStatus}
                      </p>
                      </td>
                    <td>
                      <div className="flex gap-2 flex-col">
                        {user?.identityVerification?.file && (
                          <a
                            className="text-green-600 border rounded-md px-3 py-1 text-sm"
                            target="_blank"
                            rel="noopener noreferrer"
                            href={
                              getConfig().backendURL +
                              user.identityVerification.file
                            }
                          >
                            {" "}
                            {user.identityVerification.proof}
                          </a>
                        )}
                        {user?.proofOfAddress?.file && (
                          <a
                            className="text-green-600 border rounded-md px-3 py-1 text-sm"
                            target="_blank"
                            rel="noopener noreferrer"
                            href={
                              getConfig().backendURL + user.proofOfAddress.file
                            }
                          >
                            {" "}
                            {user.proofOfAddress.proof}
                          </a>
                        )}
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      {user.kycStatus === "Pending" && (
                        <div className="flex gap-2 flex-col">
                          <button
                            className="text-green-600 border rounded-md px-3 py-1 text-sm cursor-pointer"
                            onClick={async () => {
                              try {
                                const payload = {
                                  status: "Completed",
                                  id: user._id,
                                };

                                await toast.promise(
                                  api.post("/users/update_status", payload),
                                  {
                                    loading: "KYC status is updating...!",
                                    success: ({ data }) => data.message,
                                    error: ({ response }) =>
                                      response.data.message,
                                  }
                                );
                                mutate();
                              } catch (error) {
                                console.log(error);
                              }
                            }}
                          >
                            Completed
                          </button>

                          <button
                            className="text-red-600 border rounded-md px-3 py-1 text-sm cursor-pointer"
                            onClick={async () => {
                              try {
                                const payload = {
                                  status: "Rejected",
                                  id: user._id,
                                };

                                await toast.promise(
                                  api.post("/users/update_status", payload),
                                  {
                                    loading: "KYC status is updating...!",
                                    success: ({ data }) => data.message,
                                    error: ({ response }) =>
                                      response.data.message,
                                  }
                                );
                                mutate();
                              } catch (error) {
                                console.log(error);
                              }
                            }}
                          >
                            Rejected
                          </button>
                        </div>
                      )}
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex gap-3">
                        {user.status !== UserStatus.DELETED && (
                          <button
                            className="text-red-600 border rounded-md px-3 py-1 text-sm"
                            onClick={() => openDeleteConfirmation(user)}
                          >
                            Delete
                          </button>
                        )}
                        {user.status === UserStatus.ACTIVE && (
                          <button
                            className="text-green-600 border rounded-md px-3 py-1 text-sm"
                            onClick={() => openDepositModal(user)}
                          >
                            Deposit Cash
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}

              {!isLoading && users.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center">
                    <div className="text-gray-400 text-6xl mb-4">👥</div>
                    <h3 className="text-lg font-semibold text-bakerjonesholdings-black mb-2">
                      No Users Found
                    </h3>
                    <p className="text-gray-500">
                      There are no users to display at the moment.
                    </p>
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
          <div className="text-sm text-bakerjonesholdings-black">
            Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of{" "}
            {pagination.total} results
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              className="px-3 py-2 text-sm font-medium border rounded-lg"
            >
              Previous
            </button>
            {getPageNumbers().map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`px-3 py-2 text-sm font-medium rounded-lg ${
                  pageNum === pagination.page
                    ? "bg-bakerjonesholdings-pink text-white"
                    : "border"
                }`}
              >
                {pageNum}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPage}
              className="px-3 py-2 text-sm font-medium border rounded-lg"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteConfirmation.isOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Delete User</h3>
            <p className="mb-6">
              Are you sure you want to delete{" "}
              <span className="font-medium">
                {deleteConfirmation.user?.email}
              </span>
              ? This cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={closeDeleteConfirmation}
                className="px-4 py-2 bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Deposit Modal */}
      {depositModal.isOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Deposit Cash</h3>
            <p className="mb-3">
              Enter amount to deposit for{" "}
              <strong>{depositModal.user?.email}</strong>
            </p>
            <input
              type="number"
              value={depositModal.amount}
              onChange={(e) =>
                setDepositModal((prev) => ({ ...prev, amount: e.target.value }))
              }
              placeholder="Enter amount"
              className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-bakerjonesholdings-pink"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={closeDepositModal}
                className="px-4 py-2 bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleDeposit}
                className="px-4 py-2 bg-green-600 text-white rounded-lg"
              >
                Deposit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
