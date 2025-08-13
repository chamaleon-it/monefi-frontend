import { InvestmentType } from "@/enum/investment-type.enum";
import { TradeAction } from "@/enum/trade-action.enum";
import { TransactionStatus } from "@/enum/transaction-status.enum";
import api from "@/services/api";
import { fDateAndTime } from "@/utility/dateFormatters.ts";
import { fCurrency } from "@/utility/numberFormatters";
import React, { useCallback } from "react";
import toast from "react-hot-toast";

interface Transaction {
  user: {
    email: string;
    _id: string;
    name?:string
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
  mutate
}: {
  tx: Transaction;
  filter: {
    page: number;
    limit: number;
  };
  i: number;
  mutate:()=>void
}) {

  const updateStatus = useCallback(
    async (id: string, status: TransactionStatus) => {
        try {
            await toast.promise(api.patch('/transactions/status',{id,status}),{
                loading:"Transaction is updating...",
                error:err=>err.response.data.message,
                success:"Transaction is updated."
            })
            mutate()
        } catch (error) {
            console.log(error);
        }
    },
    [mutate]
  );

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
          {fDateAndTime(tx.createdAt)}
        </td>
        <td className={`py-3 px-4 text-xs`}>
            <p className={`
            ${
            tx.status === TransactionStatus.PENDING && "text-yellow-800 bg-yellow-400" || 
            tx.status === TransactionStatus.COMPLETED && "text-green-800 bg-green-400" ||
            tx.status === TransactionStatus.CANCELLED && "text-red-800 bg-red-400" 
            }
            px-1 py-0.5 rounded-full
            text-center
                `}>{tx.status}</p>
            </td>
        <td className="py-3 px-4 text-sm text-gray-600">
         {tx.status === TransactionStatus.PENDING && <div className="flex gap-2.5">
            <button className="px-2 py-1.5 rounded-md text-white bg-green-600" onClick={()=>updateStatus(tx._id,TransactionStatus.COMPLETED)}>
              Complete
            </button>
            <button className="px-2 py-1.5 rounded-md text-white bg-red-600" onClick={()=>updateStatus(tx._id,TransactionStatus.CANCELLED)}>
              Cancel
            </button>
          </div>}
        </td>
      </tr>
    </>
  );
}
