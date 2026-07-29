"use client";

import getConfig from "@/config/configuration";
import { UserStatus } from "@/enum/user-status.enum";
import type { UserRoles } from "@/enum/user.enum";
import api from "@/services/api";
import { fAgo, fDateAndTime } from "@/utility/dateFormatters";
import { fCurrency } from "@/utility/numberFormatters";
import { useState, useMemo } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";

interface LoginActivityItem {
  ip: string;
  device: string;
  time: Date | string;
}

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
  loginActivity?: LoginActivityItem[];
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

  const [loginActivityModal, setLoginActivityModal] = useState<{
    isOpen: boolean;
    user: User | null;
    activity: LoginActivityItem[];
    page: number;
    isLoading: boolean;
  }>({
    isOpen: false,
    user: null,
    activity: [],
    page: 1,
    isLoading: false,
  });

  const openLoginActivityModal = async (user: User) => {
    setLoginActivityModal({
      isOpen: true,
      user,
      activity: user.loginActivity
        ? [...user.loginActivity].sort(
          (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
        )
        : [],
      page: 1,
      isLoading: true,
    });

    try {
      const res = await api.get(`/users/${user._id}`);
      const fetchedUser: User = res.data?.data;
      const rawActivity: LoginActivityItem[] =
        fetchedUser?.loginActivity || user?.loginActivity || [];

      // Sort descending by time (last/most recent login details first, first login details on last page)
      const sortedActivity = [...rawActivity].sort(
        (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
      );

      setLoginActivityModal((prev) => ({
        ...prev,
        activity: sortedActivity,
        isLoading: false,
      }));
    } catch (err) {
      console.error("Failed to fetch user login activity", err);
      const rawActivity: LoginActivityItem[] = user?.loginActivity || [];
      const sortedActivity = [...rawActivity].sort(
        (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
      );
      setLoginActivityModal((prev) => ({
        ...prev,
        activity: sortedActivity,
        isLoading: false,
      }));
    }
  };

  const closeLoginActivityModal = () => {
    setLoginActivityModal({
      isOpen: false,
      user: null,
      activity: [],
      page: 1,
      isLoading: false,
    });
  };

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
    <div className="w-full space-y-6 font-inter">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="text-2xl lg:text-3xl font-serif font-bold text-[#082348]">
            Client Roster
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Manage registered investor accounts, deposit capital balances, and approve KYC verification
          </p>
        </div>

        <div className="flex items-center gap-4">
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
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-[0_15px_35px_rgba(8,35,72,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap text-left">
            <thead>
              <tr className="border-b border-slate-200/80 bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-[#082348]">
                <th className="py-4 px-5">SL.No</th>
                <th className="py-4 px-5">Client Profile</th>
                <th className="py-4 px-5">Status</th>
                <th className="py-4 px-5">Capital Balance</th>
                <th className="py-4 px-5">Registration Date</th>
                <th className="py-4 px-5">Last Activity</th>
                <th className="py-4 px-5">KYC Status</th>
                <th className="py-4 px-5">Document Verification</th>
                <th className="py-4 px-5">KYC Review</th>
                <th className="py-4 px-5">Account Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading &&
                Array.from({ length: filter.limit }, (_, i) => (
                  <SkeletonRow key={i} />
                ))}

              {!isLoading &&
                users.length > 0 &&
                users.map((user, index) => (
                  <tr
                    key={user._id}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="py-4 px-5 text-xs text-slate-400 font-mono">
                      {(filter.page - 1) * filter.limit + index + 1}
                    </td>
                    <td className="py-4 px-5 text-sm">
                      <p className="font-bold text-[#082348]">{user.name}</p>
                      <p className="text-xs text-slate-400">{user.email}</p>
                    </td>
                    <td className="py-4 px-5 text-xs">
                      <span
                        className={`inline-block px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider ${user.status === UserStatus.ACTIVE
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : user.status === UserStatus.INACTIVE
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-rose-50 text-rose-700 border border-rose-200"
                          }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-sm font-bold text-[#082348]">
                      {fCurrency(user.balance)}
                    </td>
                    <td className="py-4 px-5 text-xs text-slate-500">
                      {fDateAndTime(user.createdAt)}
                    </td>
                    <td className="py-4 px-5 text-xs text-slate-500 font-medium">
                      {user.lastLogin ? fAgo(user.lastLogin) : "Never"}
                    </td>
                    <td className="py-4 px-5 text-xs">
                      <span className={`inline-block px-2.5 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider 
                        ${user.kycStatus === "Not submitted" && "bg-slate-100 text-slate-600 border border-slate-200"} 
                         ${user.kycStatus === "Pending" && "bg-amber-50 text-amber-700 border border-amber-200"} 
                         ${user.kycStatus === "Completed" && "bg-emerald-50 text-emerald-700 border border-emerald-200"}
                          ${user.kycStatus === "Expired" && "bg-rose-50 text-rose-700 border border-rose-200"}
                           ${user.kycStatus === "Rejected" && "bg-rose-50 text-rose-700 border border-rose-200"}
                       `}>
                        {user.kycStatus}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-xs">
                      <div className="flex gap-1.5 flex-col">
                        {user?.identityVerification?.file && (
                          <a
                            className="text-[#082348] hover:text-[#C5A880] border border-slate-200 bg-slate-50 rounded-lg px-2.5 py-1 font-semibold text-xs transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                            href={
                              getConfig().backendURL +
                              user.identityVerification.file
                            }
                          >
                            📄 {user.identityVerification.proof}
                          </a>
                        )}
                        {user?.proofOfAddress?.file && (
                          <a
                            className="text-[#082348] hover:text-[#C5A880] border border-slate-200 bg-slate-50 rounded-lg px-2.5 py-1 font-semibold text-xs transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                            href={
                              getConfig().backendURL + user.proofOfAddress.file
                            }
                          >
                            🏠 {user.proofOfAddress.proof}
                          </a>
                        )}
                      </div>
                    </td>

                    <td className="py-4 px-5 text-xs">
                      {user.kycStatus === "Pending" && (
                        <div className="flex gap-1.5 flex-row">
                          <button
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-lg transition-colors cursor-pointer shadow-2xs"
                            onClick={async () => {
                              try {
                                const payload = {
                                  status: "Completed",
                                  id: user._id,
                                };

                                await toast.promise(
                                  api.post("/users/update_status", payload),
                                  {
                                    loading: "Updating KYC status...",
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
                            Approve
                          </button>

                          <button
                            className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-lg transition-colors cursor-pointer shadow-2xs"
                            onClick={async () => {
                              try {
                                const payload = {
                                  status: "Rejected",
                                  id: user._id,
                                };

                                await toast.promise(
                                  api.post("/users/update_status", payload),
                                  {
                                    loading: "Updating KYC status...",
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
                            Reject
                          </button>
                        </div>
                      )}
                    </td>

                    <td className="py-4 px-5 text-xs">
                      <div className="flex gap-2">
                        {user.status === UserStatus.ACTIVE && (
                          <button
                            className="gold-gradient-bg text-slate-950 font-bold text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-2xs cursor-pointer hover:opacity-95 transition-opacity"
                            onClick={() => openDepositModal(user)}
                          >
                            Deposit Cash
                          </button>
                        )}
                        {user.status !== UserStatus.DELETED && (
                          <button
                            className="border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                            onClick={() => openDeleteConfirmation(user)}
                          >
                            Delete
                          </button>
                        )}
                        <button
                          className="border border-[#082348]/20 text-[#082348] hover:bg-slate-100 font-bold text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                          onClick={() => openLoginActivityModal(user)}
                        >
                          Login Activity
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

              {!isLoading && users.length === 0 && (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-slate-400">
                    No client records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPage > 1 && (
        <div className="flex items-center justify-between bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs">
          <div className="text-xs text-slate-500 font-medium">
            Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of{" "}
            {pagination.total} clients
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              className="px-3 py-1.5 border border-slate-200 text-xs font-semibold text-slate-700 rounded-xl disabled:opacity-40 hover:bg-slate-50 transition-colors"
            >
              Previous
            </button>
            {getPageNumbers().map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition-colors ${pageNum === pagination.page
                  ? "bg-[#082348] text-white border-[#082348]"
                  : "text-slate-700 border-slate-200 hover:bg-slate-50"
                  }`}
              >
                {pageNum}
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

      {/* Delete Modal */}
      {deleteConfirmation.isOpen && (
        <div className="fixed inset-0 bg-[#082348]/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full font-inter">
            <h3 className="text-xl font-serif font-bold text-[#082348] mb-2">Delete Client Account</h3>
            <p className="text-slate-600 text-sm mb-6">
              Are you sure you want to revoke and delete{" "}
              <span className="font-bold text-[#082348]">
                {deleteConfirmation.user?.email}
              </span>
              ? This action is permanent and cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={closeDeleteConfirmation}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-rose-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-rose-700 transition-colors"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Deposit Modal */}
      {depositModal.isOpen && (
        <div className="fixed inset-0 bg-[#082348]/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full font-inter">
            <h3 className="text-xl font-serif font-bold text-[#082348] mb-1">Inject Client Capital</h3>
            <p className="text-slate-500 text-xs mb-4">
              Specify USD capital deposit for <strong className="text-[#082348]">{depositModal.user?.email}</strong>
            </p>
            <input
              type="number"
              value={depositModal.amount}
              onChange={(e) =>
                setDepositModal((prev) => ({ ...prev, amount: e.target.value }))
              }
              placeholder="Enter deposit amount ($)"
              className="w-full h-11 px-4 mb-5 border border-slate-200 rounded-xl bg-slate-50 text-sm font-semibold text-[#082348] focus:bg-white focus:border-[#C5A880] focus:ring-2 focus:ring-[#C5A880]/20 outline-none"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={closeDepositModal}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeposit}
                className="px-5 py-2.5 gold-gradient-bg text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-md cursor-pointer hover:opacity-95 transition-opacity"
              >
                Confirm Capital Deposit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Login Activity Modal */}
      {loginActivityModal.isOpen && (
        <div className="fixed inset-0 bg-[#082348]/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full font-inter">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-serif font-bold text-[#082348]">
                  Login Activity Log
                </h3>
                <p className="text-slate-500 text-xs mt-0.5">
                  Historical access logs for{" "}
                  <strong className="text-[#082348]">
                    {loginActivityModal.user?.name || loginActivityModal.user?.email}
                  </strong>{" "}
                  ({loginActivityModal.user?.email})
                </p>
              </div>
              <button
                onClick={closeLoginActivityModal}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {loginActivityModal.isLoading ? (
              <div className="py-12 text-center text-slate-400 text-sm">
                <div className="animate-spin inline-block w-6 h-6 border-2 border-[#082348] border-t-transparent rounded-full mb-2"></div>
                <p>Loading login logs...</p>
              </div>
            ) : loginActivityModal.activity.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-sm bg-slate-50 rounded-2xl border border-slate-100">
                No recorded login activity found for this user.
              </div>
            ) : (
              <>
                <div className="overflow-x-auto rounded-2xl border border-slate-200/80 mb-4">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-[#082348] font-bold uppercase tracking-wider text-[10px]">
                        <th className="py-3 px-4">#</th>
                        <th className="py-3 px-4">Device / Browser</th>
                        <th className="py-3 px-4">Time & Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {loginActivityModal.activity
                        .slice(
                          (loginActivityModal.page - 1) * 5,
                          loginActivityModal.page * 5
                        )
                        .map((log, index) => {
                          const recordIndex =
                            (loginActivityModal.page - 1) * 5 + index + 1;
                          return (
                            <tr key={index} className="hover:bg-slate-50/60">
                              <td className="py-3 px-4 font-mono text-slate-400">
                                {recordIndex}
                              </td>
                              <td className="py-3 px-4 max-w-[200px] truncate text-slate-600 font-medium">
                                {log.device || "Unknown Device"}
                              </td>
                              <td className="py-3 px-4 text-slate-500 font-medium">
                                {fDateAndTime(log.time)}
                                <span className="text-[10px] text-slate-400 ml-1.5">
                                  ({fAgo(new Date(log.time))})
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>

                {/* Modal Pagination */}
                {Math.ceil(loginActivityModal.activity.length / 5) > 1 && (
                  <div className="flex items-center justify-between bg-slate-50 rounded-xl p-3 border border-slate-200/80">
                    <div className="text-xs text-slate-500 font-medium">
                      Showing{" "}
                      {(loginActivityModal.page - 1) * 5 + 1} to{" "}
                      {Math.min(
                        loginActivityModal.page * 5,
                        loginActivityModal.activity.length
                      )}{" "}
                      of {loginActivityModal.activity.length} entries
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() =>
                          setLoginActivityModal((prev) => ({
                            ...prev,
                            page: prev.page - 1,
                          }))
                        }
                        disabled={loginActivityModal.page === 1}
                        className="px-3 py-1 border border-slate-200 text-xs font-semibold text-slate-700 rounded-lg disabled:opacity-40 hover:bg-white transition-colors cursor-pointer"
                      >
                        Previous
                      </button>

                      {Array.from(
                        {
                          length: Math.ceil(
                            loginActivityModal.activity.length / 5
                          ),
                        },
                        (_, i) => i + 1
                      ).map((pageNum) => (
                        <button
                          key={pageNum}
                          onClick={() =>
                            setLoginActivityModal((prev) => ({
                              ...prev,
                              page: pageNum,
                            }))
                          }
                          className={`px-2.5 py-1 text-xs font-bold rounded-lg border transition-colors cursor-pointer ${pageNum === loginActivityModal.page
                            ? "bg-[#082348] text-white border-[#082348]"
                            : "text-slate-700 border-slate-200 bg-white hover:bg-slate-100"
                            }`}
                        >
                          {pageNum}
                        </button>
                      ))}

                      <button
                        onClick={() =>
                          setLoginActivityModal((prev) => ({
                            ...prev,
                            page: prev.page + 1,
                          }))
                        }
                        disabled={
                          loginActivityModal.page ===
                          Math.ceil(loginActivityModal.activity.length / 5)
                        }
                        className="px-3 py-1 border border-slate-200 text-xs font-semibold text-slate-700 rounded-lg disabled:opacity-40 hover:bg-white transition-colors cursor-pointer"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

            <div className="mt-5 flex justify-end">
              <button
                onClick={closeLoginActivityModal}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
