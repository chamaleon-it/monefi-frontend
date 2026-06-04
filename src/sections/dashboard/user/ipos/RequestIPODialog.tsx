"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "@/services/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { fCurrency } from "@/utility/numberFormatters";

interface Ipo {
  _id: string;
  name: string;
  price: number;
  issueSize: number;
  lotSize: number;
}

interface RequestIPODialogProps {
  ipo: Ipo;
}

export default function RequestIPODialog({ ipo }: RequestIPODialogProps) {
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Use ipo.price if available, otherwise fallback to 0 to avoid NaN
  const price = ipo.price || 0;
  const totalAmount = quantity * price;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (quantity < 1) {
      toast.error("Quantity must be at least 1");
      return;
    }
    if (quantity > ipo.issueSize) {
      toast.error(`Quantity cannot exceed issue size (${ipo.issueSize})`);
      return;
    }

    setIsSubmitting(true);
    try {
      await toast.promise(api.post(`/ipos/${ipo._id}/request`, { quantity }), {
        loading: "Submitting request...",
        success: "IPO requested successfully!",
        error: "Failed to request IPO or already requested.",
      });
      setOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="px-4 py-2 bg-bakerjonesholdings-pink hover:bg-bakerjonesholdings-pink/90 text-white rounded-xl text-sm transition-all shadow-sm font-medium">
          Request IPO
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px] p-0 max-h-[85vh] overflow-hidden bg-white text-bakerjonesholdings-black rounded-2xl shadow-2xl border-0 flex flex-col">
        <DialogHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/30 shrink-0">
          <DialogTitle className="text-xl font-bold">Request IPO</DialogTitle>
          <DialogDescription className="text-gray-500 mt-1">
            Choose the quantity you want to request for <strong>{ipo.name}</strong>.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
            <div className="space-y-4 bg-gray-50/50 p-5 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-500">Price per unit:</span>
                <span className="font-bold text-gray-900">{fCurrency(price)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-500">Available units:</span>
                <span className="font-bold text-gray-900">{ipo.issueSize?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-500">Lot size:</span>
                <span className="font-bold text-gray-900">{ipo.lotSize?.toLocaleString()}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity (Units)</label>
              <input
                type="number"
                min={1}
                max={ipo.issueSize}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#86BBD8] focus:border-transparent outline-none transition-all text-gray-900"
                required
              />
              <p className="text-xs text-gray-500 mt-2">Enter how many units you wish to purchase.</p>
            </div>

            <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-blue-900">Total Amount to Pay:</span>
                <span className="text-2xl font-black text-blue-600">{fCurrency(totalAmount)}</span>
              </div>
            </div>
          </div>

          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/30 flex justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || quantity < 1 || quantity > ipo.issueSize}
              className="px-5 py-2.5 text-sm font-medium text-white bg-bakerjonesholdings-pink hover:bg-bakerjonesholdings-pink/90 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              {isSubmitting ? "Processing..." : "Confirm Request"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
