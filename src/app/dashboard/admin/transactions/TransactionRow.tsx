import { InvestmentType } from "@/enum/investment-type.enum";
import { TradeAction } from "@/enum/trade-action.enum";
import { TransactionStatus } from "@/enum/transaction-status.enum";
import api from "@/services/api";
import { fDate } from "@/utility/dateFormatters.ts";
import { fCurrency } from "@/utility/numberFormatters";
import React, { useCallback, useState } from "react";
import toast from "react-hot-toast";

interface Transaction {
  user: {
    email: string;
    _id: string;
    name?: string;
  };
  _id: string;
  symbol: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalValue: number;
  tradeAction: TradeAction;
  investmentType: InvestmentType;
  status: TransactionStatus;
  createdAt: string;
}

export default function TransactionRow({
  tx,
  filter,
  i,
  mutate,
}: {
  tx: Transaction;
  filter: {
    page: number;
    limit: number;
  };
  i: number;
  mutate: () => void;
}) {
  const [showDateModal, setShowDateModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const updateStatus = useCallback(
    async (id: string, status: TransactionStatus) => {
      try {
        await toast.promise(api.patch("/transactions/status", { id, status }), {
          loading: "Transaction is updating...",
          error: (err) => err.response.data.message,
          success: "Transaction is updated.",
        });
        mutate();
      } catch (error) {
        console.log(error);
      }
    },
    [mutate]
  );

  const changeDate = useCallback(async () => {
    if (!selectedDate) {
      toast.error("Please select a valid date");
      return;
    }
    const payload = {
      id: tx._id,
      date: new Date(selectedDate),
    };

    try {
      await toast.promise(api.patch("/transactions/update_date", payload), {
        loading: "Updating the transaction date...",
        success: ({ data }) => data.message,
        error: ({response}) => response.data.message,
      });
      setShowDateModal(false);
      mutate()
    } catch (error) {
      console.log(error);
    }
  }, [selectedDate,mutate,tx._id]);

  return (
    <>
      <tr className="border-b bg-monefi-off-pink">
        <td className="py-3 px-4 text-sm">
          {(filter.page - 1) * filter.limit + i + 1}
        </td>
        <td className="py-3 px-4 text-sm">
          <p className="font-bold">{tx.user?.name}</p>
          <p className="text-sm">{tx.user.email}</p>
        </td>
        <td className="py-3 px-4 text-sm font-medium text-gray-800">
          <p className="font-bold"> {tx.name}</p>
          <p className="text-sm">{tx.symbol}</p>
        </td>
        <td className="py-3 px-4 text-sm text-gray-600">{tx.quantity}</td>
        <td className="py-3 px-4 text-sm text-gray-600">
          {fCurrency(tx.unitPrice)}
        </td>
        <td className="py-3 px-4 text-sm text-gray-600">
          {fCurrency(tx.totalValue)}
        </td>
        <td className="py-3 px-4 text-sm text-gray-600">{tx.tradeAction}</td>
        <td className="py-3 px-4 text-sm text-gray-600">{tx.investmentType}</td>
        <td className="py-3 px-4 text-sm text-gray-600">
          {fDate(tx.createdAt)}
        </td>
        <td className={`py-3 px-4 text-xs`}>
          <p
            className={`
            ${
              (tx.status === TransactionStatus.PENDING &&
                "text-yellow-800 bg-yellow-400") ||
              (tx.status === TransactionStatus.COMPLETED &&
                "text-green-800 bg-green-400") ||
              (tx.status === TransactionStatus.CANCELLED &&
                "text-red-800 bg-red-400")
            }
            px-1 py-0.5 rounded-full
            text-center
                `}
          >
            {tx.status}
          </p>
        </td>
        <td className="py-3 px-4 text-sm text-gray-600">
          <div className="flex gap-2.5">

          {tx.status === TransactionStatus.PENDING && (
            <div className="flex gap-2.5">
              <button
                className="px-2 py-1.5 rounded-md text-white bg-green-600"
                onClick={() =>
                  updateStatus(tx._id, TransactionStatus.COMPLETED)
                }
                >
                Complete
              </button>
              <button
                className="px-2 py-1.5 rounded-md text-white bg-red-600"
                onClick={() =>
                  updateStatus(tx._id, TransactionStatus.CANCELLED)
                }
                >
                Cancel
              </button>
            </div>
          )}
          <button
            className="px-2 py-1.5 rounded-md text-white bg-green-600"
            onClick={() => setShowDateModal(true)}
            >
            Change Transaction Date
          </button>
            </div>
          {showDateModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
              <div className="bg-white p-8 rounded-lg shadow-lg min-w-[340px]">
                <h3 className="mb-3 font-bold text-xl text-gray-800">
                  Change Transaction Date
                </h3>
                <p className="mb-5 text-gray-600">
                  Do you want to change the date of this transaction?
                </p>
                <label className="block mb-4">
                  <span className="text-gray-700 font-medium mb-1 block">
                    Select new date
                  </span>
                  <input
                    type="date"
                    className="border px-3 py-2 rounded w-full focus:outline-none focus:ring focus:border-blue-400"
                    value={selectedDate ?? ""}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </label>
                <div className="flex gap-3 justify-end mt-6">
                  <button
                    className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                    onClick={() => setShowDateModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition disabled:opacity-50"
                    onClick={changeDate}
                    disabled={!selectedDate}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}
        </td>
      </tr>
    </>
  );
}
