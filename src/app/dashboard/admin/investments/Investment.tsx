"use client";

import { topCrypto } from "@/data/top-crypto";
import { topStock } from "@/data/top-stock";
import { CouponFrequency } from "@/enum/coupon-frequency.enum";
import { CouponType } from "@/enum/coupon-type.enum";
import { InvestmentType } from "@/enum/investment-type.enum";
// import { TransactionStatus } from "@/enum/transaction-status.enum";
import { UserStatus } from "@/enum/user-status.enum";
import { UserRoles } from "@/enum/user.enum";
import api from "@/services/api";
import { fCurrency } from "@/utility/numberFormatters";
import { InvestmentZod } from "@/validator/investment.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useSWR from "swr";

export default function Investment() {
  const {
    register,
    formState: { errors, isSubmitting },
    setError,
    setValue,
    handleSubmit,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(InvestmentZod),
    defaultValues: {
      investmentType: InvestmentType.STOCK,
      quantity: 0,
      annualCouponRate: 0,
    },
  });

  const submit = handleSubmit(async (data) => {
    try {
      await toast.promise(api.post("/transactions/invest", data), {
        loading: "Investing...",
        success: "Invested",
        error: "Failed to Invest.",
      });

      reset();
    } catch (error) {
      let err: string | [string] = "Something went wrong.";
      if (
        error &&
        typeof error === "object" &&
        (error as AxiosError).isAxiosError
      ) {
        err =
          (
            (error as AxiosError).response?.data as {
              message: [string] | string;
            }
          )?.message || "Something went wrong.";
      }
      const message = typeof err === "string" ? err : err[0];
      setError("root", { message });
    }
  });

  const { data: bondData } = useSWR<{
    message: string;
    data: {
      _id: string;
      name: string;
      isin: string;
      unitPrice: number;
      couponType: CouponType;
      couponFrequency: CouponFrequency;
      meturityDate: string;
      createdAt: string;
      isPublic: boolean;
      annualCouponRate: number;
    }[];
  }>("/bonds?page=1&limit=2000");

  const { data: userData } = useSWR<{
    message: string;
    data: {
      _id: string;
      email: string;
      name: string;
      role: UserRoles;
      status: UserStatus;
      lastLogin: Date;
      createdAt: Date;
      balance: number;
    }[];
  }>("/users?page=1&&limit=200");

  const invermentType = watch("investmentType");
  const unitPrice = watch("unitPrice");
  const quantity = watch("quantity");

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-[0_15px_35px_rgba(8,35,72,0.04)] overflow-hidden font-inter">
      <div className="p-6 border-b border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C5A880] to-transparent"></div>
        <h2 className="text-xl font-serif font-bold text-[#082348] mb-0.5">Capital Placement Terms</h2>
        <p className="text-slate-500 text-xs">Direct asset placement and client allocation execution</p>
      </div>
      <form onSubmit={submit} className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Investment Asset Class
              </label>
              <select
                {...register("investmentType")}
                className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 text-[#082348] text-sm focus:outline-none focus:bg-white focus:border-[#C5A880] focus:ring-2 focus:ring-[#C5A880]/20 transition-all font-semibold cursor-pointer"
              >
                <option value="">Select Asset Class</option>
                {Object.values(InvestmentType).filter((op) => op !== InvestmentType.CRYPTO).map((op) => (
                  <option value={op} key={op}>
                    {op}
                  </option>
                ))}
              </select>
              {errors.investmentType && (
                <p className="text-xs text-rose-500 mt-1 font-medium">
                  {errors.investmentType.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Target Client Account
              </label>
              <select
                className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 text-[#082348] text-sm focus:outline-none focus:bg-white focus:border-[#C5A880] focus:ring-2 focus:ring-[#C5A880]/20 transition-all font-semibold cursor-pointer"
                {...register("user")}
              >
                <option value="">Select client account</option>
                {userData?.data.map(
                  (user) =>
                    user.role === UserRoles.USER && (
                      <option key={user._id} value={user._id}>
                        {user.name || user?.email} ({user.email})
                      </option>
                    )
                )}
              </select>
              {errors.user && (
                <p className="text-xs text-rose-500 mt-1 font-medium">{errors.user.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {invermentType === InvestmentType.STOCK && (
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Select Stock Instrument
                </label>
                <select
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 text-[#082348] text-sm focus:outline-none focus:bg-white focus:border-[#C5A880] focus:ring-2 focus:ring-[#C5A880]/20 transition-all font-semibold cursor-pointer"
                  onChange={(e) => {
                    const stock = topStock.find(
                      (ts) => ts.name === e.target.value
                    );
                    setValue("symbol", stock?.symbol ?? "");
                    setValue("name", stock?.name ?? "");
                  }}
                >
                  <option value="">Select Equity Security</option>
                  {topStock.map((e) => (
                    <option value={e.name} key={e.name}>
                      {e.name} ({e.symbol})
                    </option>
                  ))}
                </select>
                {errors.symbol && (
                  <p className="text-xs text-rose-500 mt-1 font-medium">
                    {errors.symbol.message}
                  </p>
                )}
              </div>
            )}

            {invermentType === InvestmentType.BOND && (
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Select Bond Security
                </label>
                <select
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 text-[#082348] text-sm focus:outline-none focus:bg-white focus:border-[#C5A880] focus:ring-2 focus:ring-[#C5A880]/20 transition-all font-semibold cursor-pointer"
                  onChange={(e) => {
                    const bond = bondData?.data.find(
                      (ts) => ts.name === e.target.value
                    );
                    setValue("symbol", bond?.isin ?? "");
                    setValue("name", bond?.name ?? "");
                    setValue("unitPrice", bond?.unitPrice ?? 0);
                    setValue("annualCouponRate", bond?.annualCouponRate ?? 0);
                  }}
                >
                  <option value="">Select Bond Instrument</option>
                  {bondData?.data.map((e) => (
                    <option value={e.name} key={e.name}>
                      {e.name} ({e.isin})
                    </option>
                  ))}
                </select>
                {errors.symbol && (
                  <p className="text-xs text-rose-500 mt-1 font-medium">
                    {errors.symbol.message}
                  </p>
                )}
              </div>
            )}

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Unit Par Price ($)
              </label>
              <input
                type="number"
                placeholder="e.g., 105"
                className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 text-[#082348] placeholder:text-slate-400 text-sm focus:outline-none focus:bg-white focus:border-[#C5A880] focus:ring-2 focus:ring-[#C5A880]/20 transition-all font-semibold"
                {...register("unitPrice")}
              />
              {errors.unitPrice && (
                <p className="text-xs text-rose-500 mt-1 font-medium">
                  {errors.unitPrice.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Units / Quantity
              </label>
              <input
                type="number"
                placeholder="e.g., 20"
                className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 text-[#082348] placeholder:text-slate-400 text-sm focus:outline-none focus:bg-white focus:border-[#C5A880] focus:ring-2 focus:ring-[#C5A880]/20 transition-all font-semibold"
                {...register("quantity")}
              />
              {errors.quantity && (
                <p className="text-xs text-rose-500 mt-1 font-medium">
                  {errors.quantity.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Total Transaction Capital
              </label>
              <div className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-[#082348] text-[#C5A880] font-serif font-bold text-base flex items-center shadow-2xs">
                {fCurrency(((unitPrice as number) * (quantity as number)) as number) ?? "$0.00"}
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Optional Buy Back Date
              </label>
              <input
                type="date"
                className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 text-[#082348] text-sm focus:outline-none focus:bg-white focus:border-[#C5A880] focus:ring-2 focus:ring-[#C5A880]/20 transition-all font-semibold cursor-pointer"
                {...register("buyBackDate")}
              />
            </div>
          </div>
        </div>

        {errors.root && (
          <p className="text-xs text-rose-500 font-medium">{errors.root.message}</p>
        )}

        <button
          type="submit"
          className="gold-gradient-bg text-slate-950 font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-md cursor-pointer hover:opacity-95 transition-opacity"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Executing Capital Placement..." : "Execute Investment Placement"}
        </button>
      </form>
    </div>
  );
}
