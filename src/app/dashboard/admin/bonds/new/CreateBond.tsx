"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateBondZod, CreateBondInput } from "@/validator/create-bond.zod";
import { CouponFrequency } from "@/enum/coupon-frequency.enum";
import { CouponType } from "@/enum/coupon-type.enum";
import toast from "react-hot-toast";
import api from "@/services/api";
import { AxiosError } from "axios";

export default function CreateBond() {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateBondInput>({
    resolver: zodResolver(CreateBondZod),
  });

  const submit = handleSubmit(async (data) => {
    try {
      await toast.promise(api.post("/bonds", data), {
        loading: "Creating bond...",
        success: "Bond created successfully!",
        error: "Failed to create bond.",
      });
      reset();
    } catch (error) {
      let err: string | [string] = "Something went wrong.";
      if (error && typeof error === "object" && (error as AxiosError).isAxiosError) {
        err =
          ((error as AxiosError).response?.data as {message:[string] |string})?.message ||
          "Something went wrong.";
      }
      const message = typeof err === "string" ? err : err[0];
      setError("root", { message });
    }
  });

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-[0_15px_35px_rgba(8,35,72,0.04)] overflow-hidden font-inter">
      <div className="p-6 border-b border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C5A880] to-transparent"></div>
        <h2 className="text-xl font-serif font-bold text-[#082348] mb-0.5">Bond Offering Terms</h2>
        <p className="text-slate-500 text-xs">Configure debt security parameters for market issuance</p>
      </div>
      <form onSubmit={submit} className="p-6 space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Bond Instrument Name
            </label>
            <input
              {...register("name")}
              className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 text-[#082348] placeholder:text-slate-400 text-sm focus:outline-none focus:bg-white focus:border-[#C5A880] focus:ring-2 focus:ring-[#C5A880]/20 transition-all font-semibold"
              placeholder="e.g. UK Sovereign Treasury Yield Note 2029"
            />
            {errors.name && (
              <p className="text-xs text-rose-500 mt-1 font-medium">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              ISIN Code Identifier
            </label>
            <input
              {...register("isin")}
              className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 text-[#082348] placeholder:text-slate-400 text-sm focus:outline-none focus:bg-white focus:border-[#C5A880] focus:ring-2 focus:ring-[#C5A880]/20 transition-all font-mono font-semibold"
              placeholder="e.g. GB00BHBFH458"
            />
            {errors.isin && (
              <p className="text-xs text-rose-500 mt-1 font-medium">{errors.isin.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Coupon Frequency
              </label>
              <select
                {...register("couponFrequency")}
                className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 text-[#082348] text-sm focus:outline-none focus:bg-white focus:border-[#C5A880] focus:ring-2 focus:ring-[#C5A880]/20 transition-all font-semibold cursor-pointer"
              >
                <option value="">Select Frequency</option>
                {Object.values(CouponFrequency).map((freq) => (
                  <option key={freq} value={freq}>
                    {freq}
                  </option>
                ))}
              </select>
              {errors.couponFrequency && (
                <p className="text-xs text-rose-500 mt-1 font-medium">
                  {errors.couponFrequency.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Coupon Type
              </label>
              <select
                {...register("couponType")}
                className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 text-[#082348] text-sm focus:outline-none focus:bg-white focus:border-[#C5A880] focus:ring-2 focus:ring-[#C5A880]/20 transition-all font-semibold cursor-pointer"
              >
                <option value="">Select Type</option>
                {Object.values(CouponType).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.couponType && (
                <p className="text-xs text-rose-500 mt-1 font-medium">
                  {errors.couponType.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Annual Coupon Rate (%)
              </label>
              <input
                {...register("annualCouponRate", { valueAsNumber: true })}
                type="number"
                step="0.001"
                placeholder="e.g., 6.5"
                className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 text-[#082348] placeholder:text-slate-400 text-sm focus:outline-none focus:bg-white focus:border-[#C5A880] focus:ring-2 focus:ring-[#C5A880]/20 transition-all font-semibold"
              />
              {errors.annualCouponRate && (
                <p className="text-xs text-rose-500 mt-1 font-medium">
                  {errors.annualCouponRate.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Unit Par Value ($)
              </label>
              <input
                {...register("unitPrice", { valueAsNumber: true })}
                type="number"
                step="0.001"
                placeholder="e.g., 1000"
                className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 text-[#082348] placeholder:text-slate-400 text-sm focus:outline-none focus:bg-white focus:border-[#C5A880] focus:ring-2 focus:ring-[#C5A880]/20 transition-all font-semibold"
              />
              {errors.unitPrice && (
                <p className="text-xs text-rose-500 mt-1 font-medium">
                  {errors.unitPrice.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Maturity Date
            </label>
            <input
              {...register("meturityDate")}
              type="date"
              className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 text-[#082348] text-sm focus:outline-none focus:bg-white focus:border-[#C5A880] focus:ring-2 focus:ring-[#C5A880]/20 transition-all font-semibold cursor-pointer"
            />
            {errors.meturityDate && (
              <p className="text-xs text-rose-500 mt-1 font-medium">
                {errors.meturityDate.message}
              </p>
            )}
          </div>

          <div className="flex items-center space-x-2.5 pt-2">
            <input
              {...register("isPublic")}
              type="checkbox"
              id="isPublic"
              className="w-4 h-4 rounded border-slate-300 text-[#082348] focus:ring-[#C5A880]"
            />
            <label htmlFor="isPublic" className="text-xs font-semibold text-slate-700 cursor-pointer">
              Publish publicly to all institutional client catalogs
            </label>
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
          {isSubmitting ? "Processing Offering..." : "Publish Bond Offering"}
        </button>
      </form>
    </div>
  );
}
