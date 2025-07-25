import { useAuth } from "@/auth/useAuth";
import { InvestmentType } from "@/enum/investment-type.enum";
import { TradeAction } from "@/enum/trade-action.enum";
import { TransactionStatus } from "@/enum/transaction-status.enum";
import { fDateAndTime } from "@/utility/dateFormatters.ts";
import { fCurrency } from "@/utility/numberFormatters";
import React from "react";
import useSWR from "swr";

export default function UserDashboard() {
  const {user} = useAuth()
  const { data: portfolioData } = useSWR<{
    message: string;
    data: {
      totalValue: number;
      investmentType: InvestmentType;
    }[];
  }>("/portfolio", { revalidateOnFocus: true, revalidateOnMount: true });

  const { data: transactionData,isLoading } = useSWR<{
    data: {
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
    }[];
  }>("/transactions");

  const transaction = transactionData?.data ?? []

  const portfolio = portfolioData?.data ?? [];

  const stockValue = portfolio.reduce(
    (a, b) =>
      b.investmentType === InvestmentType.STOCK ? a + b.totalValue : a,
    0
  );
  const cryptoValue = portfolio.reduce(
    (a, b) =>
      b.investmentType === InvestmentType.CRYPTO ? a + b.totalValue : a,
    0
  );
  const bondValue = portfolio.reduce(
    (a, b) => (b.investmentType === InvestmentType.BOND ? a + b.totalValue : a),
    0
  );

  return (
    <div className="space-y-5">
      <div className="space-y-2.5">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-monefi-black">My Portfolio</h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <SummaryCard
            label="Available Balance"
            value={fCurrency(user?.balance ?? 0)}
          />
          <SummaryCard
            label="Purchase Stock Value"
            value={fCurrency(stockValue)}
          />
          <SummaryCard
            label="Purchased Crypto Value"
            value={fCurrency(cryptoValue)}
          />
          <SummaryCard
            label="Purchased Bond Value"
            value={fCurrency(bondValue)}
          />
        </div>
      </div>

<div className="space-y-2.5">
    <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-monefi-black">My Recent Transactions</h1>
        </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left text-sm font-medium text-gray-600 bg-monefi-off-pink">
                      <th className="py-3 px-4">#</th>
                      <th className="py-3 px-4">Symbol</th>
                      <th className="py-3 px-4">Quantity</th>
                      <th className="py-3 px-4">Unit Price</th>
                      <th className="py-3 px-4">Total Value</th>
                      <th className="py-3 px-4">Action</th>
                      <th className="py-3 px-4">Investment</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                  
      
                    {!isLoading && transaction.length > 0 && (
                      <>
                        {transaction.map((tx, i) => (
                          <tr key={tx._id} className="border-b bg-monefi-off-pink">
                            <td className="py-3 px-4 text-sm">
                              { i + 1}
                            </td>
                            <td className="py-3 px-4 text-sm font-medium text-gray-800">
                              {tx.symbol}
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-600">
                              {tx.quantity}
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-600">
                              {fCurrency(tx.unitPrice)}
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-600">
                              {fCurrency(tx.totalValue)}
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-600">
                              {tx.tradeAction}
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-600">
                              {tx.investmentType}
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-600">
                              {fDateAndTime(tx.createdAt)}
                            </td>
                            <td className={`py-3 px-4 text-xs`}>
                              <p
                                className={`
                                        ${
                                          (tx.status === TransactionStatus.PENDING &&
                                            "text-yellow-800 bg-yellow-400") ||
                                          (tx.status ===
                                            TransactionStatus.COMPLETED &&
                                            "text-green-800 bg-green-400") ||
                                          (tx.status ===
                                            TransactionStatus.CANCELLED &&
                                            "text-red-800 bg-red-400")
                                        }
                                        px-1 py-0.5 rounded-full
                                        text-center
                                            `}
                              >
                                {tx.status}
                              </p>
                            </td>
                          </tr>
                        ))}
                      </>
                    )}
      
                    {transaction.length === 0 && (
                      <tr>
                        <td colSpan={9} className="text-center py-10 text-gray-500">
                          No transactions found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            </div>
    </div>
  );
}

const SummaryCard = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-monefi-off-pink rounded-xl p-4 shadow-sm">
    <p className="text-sm text-monefi-dark-gray font-medium">{label}</p>
    <p className="text-xl font-semibold text-monefi-black mt-1">{value}</p>
  </div>
);
