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
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-[#232323] mb-1">New Bond</h2>
        <p className="text-gray-600">Add a new bond to the system</p>
      </div>
      <form onSubmit={submit} className="p-6 space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bond Name
            </label>
            <input
              {...register("name")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#86BBD8]"
              placeholder="Bond Name"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              ISIN
            </label>
            <input
              {...register("isin")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#86BBD8]"
              placeholder="ISIN Code"
            />
            {errors.isin && (
              <p className="text-sm text-red-500">{errors.isin.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Coupon Frequency
              </label>
              <select
                {...register("couponFrequency")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#86BBD8]"
              >
                <option value="">Select Frequency</option>
                {Object.values(CouponFrequency).map((freq) => (
                  <option key={freq} value={freq}>
                    {freq}
                  </option>
                ))}
              </select>
              {errors.couponFrequency && (
                <p className="text-sm text-red-500">
                  {errors.couponFrequency.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Coupon Type
              </label>
              <select
                {...register("couponType")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#86BBD8]"
              >
                <option value="">Select Type</option>
                {Object.values(CouponType).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.couponType && (
                <p className="text-sm text-red-500">
                  {errors.couponType.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Annual Coupon Rate (%)
              </label>
              <input
                {...register("annualCouponRate", { valueAsNumber: true })}
                type="number"
                step="0.01"
                placeholder="e.g., 6.5"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#86BBD8]"
              />
              {errors.annualCouponRate && (
                <p className="text-sm text-red-500">
                  {errors.annualCouponRate.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Unit Price
              </label>
              <input
                {...register("unitPrice", { valueAsNumber: true })}
                type="number"
                step="0.01"
                placeholder="e.g., 1000"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#86BBD8]"
              />
              {errors.unitPrice && (
                <p className="text-sm text-red-500">
                  {errors.unitPrice.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Maturity Date
            </label>
            <input
              {...register("meturityDate")}
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#86BBD8]"
            />
            {errors.meturityDate && (
              <p className="text-sm text-red-500">
                {errors.meturityDate.message}
              </p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <input
              {...register("isPublic")}
              type="checkbox"
              id="isPublic"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label htmlFor="isPublic" className="text-sm text-gray-700">
              Make bond public
            </label>
          </div>
        </div>

        {errors.root && (
          <p className="text-sm text-red-500">{errors.root.message}</p>
        )}

        <button
          type="submit"
          className="px-4 py-2 bg-monefi-pink hover:bg-monefi-pink/90 text-white rounded-md"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Create Bond"}
        </button>
      </form>
    </div>
  );
}
