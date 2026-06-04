"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateIpoZod, CreateIpoInput } from "@/validator/create-ipo.zod";
import toast from "react-hot-toast";
import api from "@/services/api";
import { AxiosError } from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSWRConfig } from "swr";

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
  price: number
  companyDescription?: string
  officialWebsite?: string
  status: string
  isPublic: boolean
}

interface UpdateIPODialogProps {
  ipo: Ipo;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const inputStyles = "w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#86BBD8] focus:border-transparent transition-all outline-none text-sm";
const labelStyles = "block text-sm font-semibold text-gray-700 mb-1.5";

export default function UpdateIPODialog({ ipo, open, onOpenChange }: UpdateIPODialogProps) {
  const { mutate } = useSWRConfig();
  
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateIpoInput>({
    resolver: zodResolver(CreateIpoZod),
    defaultValues: {
      name: ipo.name,
      companyName: ipo.companyName,
      stockSymbol: ipo.stockSymbol,
      openDate: ipo.openDate ? new Date(ipo.openDate).toISOString().split('T')[0] : "",
      closeDate: ipo.closeDate ? new Date(ipo.closeDate).toISOString().split('T')[0] : "",
      listingDate: ipo.listingDate ? new Date(ipo.listingDate).toISOString().split('T')[0] : "",
      priceBandMin: ipo.priceBandMin,
      priceBandMax: ipo.priceBandMax,
      lotSize: ipo.lotSize,
      issueSize: ipo.issueSize,
      price: ipo.price || 0,
      companyDescription: ipo.companyDescription || "",
      officialWebsite: ipo.officialWebsite || "",
      status: ipo.status as any,
      isPublic: ipo.isPublic,
    }
  });

  useEffect(() => {
    if (open) {
      reset({
        name: ipo.name,
        companyName: ipo.companyName,
        stockSymbol: ipo.stockSymbol,
        openDate: ipo.openDate ? new Date(ipo.openDate).toISOString().split('T')[0] : "",
        closeDate: ipo.closeDate ? new Date(ipo.closeDate).toISOString().split('T')[0] : "",
        listingDate: ipo.listingDate ? new Date(ipo.listingDate).toISOString().split('T')[0] : "",
        priceBandMin: ipo.priceBandMin,
        priceBandMax: ipo.priceBandMax,
        lotSize: ipo.lotSize,
        issueSize: ipo.issueSize,
        price: ipo.price || 0,
        companyDescription: ipo.companyDescription || "",
        officialWebsite: ipo.officialWebsite || "",
        status: ipo.status as any,
        isPublic: ipo.isPublic,
      });
    }
  }, [open, ipo, reset]);

  const submit = handleSubmit(async (data) => {
    try {
      await toast.promise(api.patch(`/ipos/${ipo._id}`, data), {
        loading: "Updating IPO...",
        success: "IPO updated successfully!",
        error: "Failed to update IPO.",
      });
      onOpenChange(false);
      mutate((key: unknown) => typeof key === "string" && key.startsWith("/ipos"));
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px] p-0 max-h-[85vh] overflow-hidden bg-white text-bakerjonesholdings-black rounded-2xl shadow-2xl border-0 flex flex-col">
        <DialogHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/30 shrink-0">
          <DialogTitle className="text-xl font-bold">Update IPO</DialogTitle>
          <DialogDescription className="text-gray-500 mt-1">
            Update details for <strong>{ipo.name}</strong>.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submit} className="flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
            {/* Basic Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={labelStyles}>IPO Name *</label>
                  <input {...register("name")} className={inputStyles} placeholder="e.g. TechCorp Inc." />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className={labelStyles}>Company Name *</label>
                  <input {...register("companyName")} className={inputStyles} placeholder="e.g. Technology Corporation" />
                  {errors.companyName && <p className="text-xs text-red-500 mt-1">{errors.companyName.message}</p>}
                </div>
                <div className="md:col-span-2">
                  <label className={labelStyles}>Stock Symbol *</label>
                  <input {...register("stockSymbol")} className={inputStyles} placeholder="e.g. TECH" />
                  {errors.stockSymbol && <p className="text-xs text-red-500 mt-1">{errors.stockSymbol.message}</p>}
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Timeline</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className={labelStyles}>Open Date *</label>
                  <input {...register("openDate")} type="date" className={inputStyles} />
                  {errors.openDate && <p className="text-xs text-red-500 mt-1">{errors.openDate.message}</p>}
                </div>
                <div>
                  <label className={labelStyles}>Close Date *</label>
                  <input {...register("closeDate")} type="date" className={inputStyles} />
                  {errors.closeDate && <p className="text-xs text-red-500 mt-1">{errors.closeDate.message}</p>}
                </div>
                <div>
                  <label className={labelStyles}>Listing Date *</label>
                  <input {...register("listingDate")} type="date" className={inputStyles} />
                  {errors.listingDate && <p className="text-xs text-red-500 mt-1">{errors.listingDate.message}</p>}
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Pricing</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={labelStyles}>Price Band Min *</label>
                  <input {...register("priceBandMin", { valueAsNumber: true })} type="number" step="0.01" className={inputStyles} />
                  {errors.priceBandMin && <p className="text-xs text-red-500 mt-1">{errors.priceBandMin.message}</p>}
                </div>
                <div>
                  <label className={labelStyles}>Price Band Max *</label>
                  <input {...register("priceBandMax", { valueAsNumber: true })} type="number" step="0.01" className={inputStyles} />
                  {errors.priceBandMax && <p className="text-xs text-red-500 mt-1">{errors.priceBandMax.message}</p>}
                </div>
                <div>
                  <label className={labelStyles}>Lot Size *</label>
                  <input {...register("lotSize", { valueAsNumber: true })} type="number" className={inputStyles} />
                  {errors.lotSize && <p className="text-xs text-red-500 mt-1">{errors.lotSize.message}</p>}
                </div>
                <div>
                  <label className={labelStyles}>Issue Size *</label>
                  <input {...register("issueSize", { valueAsNumber: true })} type="number" className={inputStyles} />
                  {errors.issueSize && <p className="text-xs text-red-500 mt-1">{errors.issueSize.message}</p>}
                </div>
                <div className="md:col-span-2">
                  <label className={labelStyles}>Price *</label>
                  <input {...register("price", { valueAsNumber: true })} type="number" step="0.01" className={inputStyles} />
                  {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price.message}</p>}
                </div>
              </div>
            </div>

            {/* Status & Visibility */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Status & Visibility</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={labelStyles}>Status</label>
                  <select {...register("status")} className={inputStyles}>
                    <option value="Upcoming">Upcoming</option>
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                    <option value="Listed">Listed</option>
                  </select>
                  {errors.status && <p className="text-xs text-red-500 mt-1">{errors.status.message}</p>}
                </div>
                <div className="flex items-center space-x-3 pt-6">
                  <input
                    type="checkbox"
                    {...register("isPublic")}
                    id="isPublicUpdate"
                    className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition-colors"
                  />
                  <label htmlFor="isPublicUpdate" className="text-sm font-medium text-gray-700 select-none cursor-pointer">
                    Make Public (visible to clients)
                  </label>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Additional Information</h3>
              <div className="grid grid-cols-1 gap-5">
                <div>
                  <label className={labelStyles}>Company Description</label>
                  <textarea {...register("companyDescription")} rows={3} className={`${inputStyles} resize-none`} placeholder="Write a short description..." />
                  {errors.companyDescription && <p className="text-xs text-red-500 mt-1">{errors.companyDescription.message}</p>}
                </div>
                <div>
                  <label className={labelStyles}>Official Website</label>
                  <input {...register("officialWebsite")} type="url" className={inputStyles} placeholder="https://example.com" />
                  {errors.officialWebsite && <p className="text-xs text-red-500 mt-1">{errors.officialWebsite.message}</p>}
                </div>
              </div>
            </div>

            {errors.root && (
              <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
                <p className="text-sm text-red-600 font-medium text-center">{errors.root.message}</p>
              </div>
            )}
          </div>

          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-sm font-medium bg-bakerjonesholdings-pink hover:bg-bakerjonesholdings-pink/90 text-white rounded-xl transition-all disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
