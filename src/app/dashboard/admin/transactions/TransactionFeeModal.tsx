"use client";

import { useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { fCurrency } from "@/utility/numberFormatters";
import api from "@/services/api";
import toast from "react-hot-toast";
import { TransactionStatus } from "@/enum/transaction-status.enum";

interface TransactionInfo {
  _id: string;
  name: string;
  symbol: string;
  quantity: number;
  unitPrice: number;
  totalValue: number;
}

interface TransactionFeeModalProps {
  open: boolean;
  onClose: () => void;
  transaction: TransactionInfo | null;
  onSuccess: () => void;
}

export default function TransactionFeeModal({
  open,
  onClose,
  transaction,
  onSuccess,
}: TransactionFeeModalProps) {
  const [fees, setFees] = useState<string>("0");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const parsedFees = parseFloat(fees) || 0;
  const totalWithFees = (transaction?.totalValue ?? 0) + parsedFees;

  const handleSubmit = useCallback(async () => {
    if (!transaction) return;

    if (parsedFees < 0) {
      toast.error("Fee cannot be negative");
      return;
    }

    setIsSubmitting(true);
    try {
      await toast.promise(
        api.patch("/transactions/status", {
          id: transaction._id,
          status: TransactionStatus.COMPLETED,
          fees: parsedFees,
        }),
        {
          loading: "Completing transaction...",
          error: (err) => err.response?.data?.message || "Error completing transaction",
          success: "Transaction completed successfully!",
        }
      );
      setFees("0");
      onClose();
      onSuccess();
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }, [transaction, parsedFees, onClose, onSuccess]);

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setFees("0");
      onClose();
    }
  };

  if (!transaction) return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[480px] bg-white p-0 overflow-hidden border-0 shadow-2xl">
        {/* Header with gradient accent */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 pt-6 pb-4">
          <DialogHeader>
            <DialogTitle className="text-white text-xl font-bold">
              Complete Transaction
            </DialogTitle>
            <DialogDescription className="text-green-100 text-sm mt-1">
              Enter the transaction fee before completing this transaction.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="px-6 pb-6 pt-2">
          {/* Transaction Summary Card */}
          <div className="bg-gray-50 rounded-xl p-4 mb-5 border border-gray-100">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Transaction Summary
            </h4>
            <div className="space-y-2.5">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Asset</span>
                <span className="text-sm font-semibold text-gray-900">
                  {transaction.name}{" "}
                  <span className="text-gray-400 font-normal">({transaction.symbol})</span>
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Quantity</span>
                <span className="text-sm font-semibold text-gray-900">{transaction.quantity}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Unit Price</span>
                <span className="text-sm font-semibold text-gray-900">
                  {fCurrency(transaction.unitPrice)}
                </span>
              </div>
              <div className="border-t border-gray-200 my-1"></div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Subtotal</span>
                <span className="text-sm font-semibold text-gray-900">
                  {fCurrency(transaction.totalValue)}
                </span>
              </div>
            </div>
          </div>

          {/* Fee Input */}
          <div className="mb-5">
            <label
              htmlFor="transaction-fee-input"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Transaction Fee (£)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-medium text-sm">
                £
              </span>
              <input
                id="transaction-fee-input"
                type="number"
                min="0"
                step="0.01"
                value={fees}
                onChange={(e) => setFees(e.target.value)}
                onFocus={(e) => {
                  if (e.target.value === "0") setFees("");
                }}
                onBlur={(e) => {
                  if (e.target.value === "") setFees("0");
                }}
                className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 bg-white
                  focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500
                  transition-all duration-200
                  placeholder:text-gray-300
                  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Total with Fees */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 mb-6 border border-green-100">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-green-800">Total with Fees</span>
              <span className="text-lg font-bold text-green-700">
                {fCurrency(totalWithFees)}
              </span>
            </div>
            {parsedFees > 0 && (
              <p className="text-xs text-green-600 mt-1.5">
                Includes {fCurrency(parsedFees)} in transaction fees
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <DialogFooter className="gap-3 sm:gap-3">
            <button
              type="button"
              onClick={() => handleOpenChange(false)}
              disabled={isSubmitting}
              className="flex-1 px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-600 bg-gray-100
                hover:bg-gray-200 active:bg-gray-300
                transition-all duration-200
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting || parsedFees < 0}
              className="flex-1 px-5 py-2.5 rounded-xl text-sm font-semibold text-white
                bg-gradient-to-r from-green-600 to-emerald-600
                hover:from-green-700 hover:to-emerald-700
                active:from-green-800 active:to-emerald-800
                shadow-md shadow-green-200 hover:shadow-lg hover:shadow-green-300
                transition-all duration-200
                disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none
                flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing...
                </>
              ) : (
                "Confirm & Complete"
              )}
            </button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
