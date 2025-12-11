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
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-[#232323] mb-1">
          New Investment
        </h2>
        <p className="text-gray-600">Add a new investment to the system</p>
      </div>
      <form onSubmit={submit} className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Investment Type
              </label>
              <select
                {...register("investmentType")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#86BBD8]"
              >
                <option value="">Select Investment Type</option>
                {Object.values(InvestmentType).map((op) => (
                  <option value={op} key={op}>
                    {op}
                  </option>
                ))}
              </select>
              {errors.investmentType && (
                <p className="text-sm text-red-500">
                  {errors.investmentType.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                User
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#86BBD8]"
                {...register("user")}
              >
                <option value="">Select user</option>
                {userData?.data.map(
                  (user) =>
                    user.role === UserRoles.USER && (
                      <option key={user._id} value={user._id}>
                        {user.name || user?.email}
                      </option>
                    )
                )}
              </select>
              {errors.user && (
                <p className="text-sm text-red-500">{errors.user.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {invermentType === InvestmentType.STOCK && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Select Stock
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#86BBD8]"
                  onChange={(e) => {
                    const stock = topStock.find(
                      (ts) => ts.name === e.target.value
                    );
                    setValue("symbol", stock?.symbol ?? "");
                    setValue("name", stock?.name ?? "");
                  }}
                >
                  <option value="">Select Stock</option>
                  {topStock.map((e) => (
                    <option value={e.name} key={e.name}>
                      {e.name}
                    </option>
                  ))}
                </select>
                {errors.symbol && (
                  <p className="text-sm text-red-500">
                    {errors.symbol.message}
                  </p>
                )}
              </div>
            )}

            {invermentType === InvestmentType.CRYPTO && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Select Crypto
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#86BBD8]"
                  onChange={(e) => {
                    const crypto = topCrypto.find(
                      (ts) => ts.name === e.target.value
                    );
                    setValue("symbol", crypto?.symbol ?? "");
                    setValue("name", crypto?.name ?? "");
                  }}
                >
                  <option value="">Select Crypto</option>
                  {topCrypto.map((e) => (
                    <option value={e.name} key={e.name}>
                      {e.name}
                    </option>
                  ))}
                </select>
                {errors.symbol && (
                  <p className="text-sm text-red-500">
                    {errors.symbol.message}
                  </p>
                )}
              </div>
            )}

            {invermentType === InvestmentType.BOND && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Select Bond
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#86BBD8]"
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
                  <option value="">Select Bond</option>
                  {bondData?.data.map((e) => (
                    <option value={e.name} key={e.name}>
                      {e.name}
                    </option>
                  ))}
                </select>
                {errors.symbol && (
                  <p className="text-sm text-red-500">
                    {errors.symbol.message}
                  </p>
                )}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Unit Price
              </label>
              <input
                type="number"
                placeholder="e.g., 105"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#86BBD8]"
                {...register("unitPrice")}
              />
              {errors.unitPrice && (
                <p className="text-sm text-red-500">
                  {errors.unitPrice.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Quanity
              </label>
              <input
                type="number"
                placeholder="e.g., 20"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#86BBD8]"
                {...register("quantity")}
              />
              {errors.quantity && (
                <p className="text-sm text-red-500">
                  {errors.quantity.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Total Value
              </label>
              <div className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#86BBD8]">
                {fCurrency(((unitPrice as number) * (quantity as number)) as number) ?? ""}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Buy Back Date
              </label>
              <input
                type="date"
                placeholder="e.g., 20"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#86BBD8]"
                {...register("buyBackDate")}
              />
              {errors.quantity && (
                <p className="text-sm text-red-500">
                  {errors.quantity.message}
                </p>
              )}
            </div>
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
          {isSubmitting ? "Investing..." : "Invest"}
        </button>
      </form>
    </div>
  );
}
