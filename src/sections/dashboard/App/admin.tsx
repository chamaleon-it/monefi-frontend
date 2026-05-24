import { InvestmentType } from "@/enum/investment-type.enum";
import { TradeAction } from "@/enum/trade-action.enum";
import { TransactionStatus } from "@/enum/transaction-status.enum";
import { UserStatus } from "@/enum/user-status.enum";
import { UserRoles } from "@/enum/user.enum";
import { fAgo, fDate, fDateAndTime } from "@/utility/dateFormatters.ts";
import { fCurrency } from "@/utility/numberFormatters";
import React from "react";
import useSWR from "swr";

export default function AdminDashboard() {
  const { data: transactionData, isLoading } = useSWR<{
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

  const transaction = transactionData?.data ?? [];

  const { data:userData  } = useSWR<{
    data:{
       _id: string
        email: string
        name:string
        role: UserRoles
        status: UserStatus
        lastLogin: Date
        createdAt: Date,
        balance:number
    }[]
  }>('/users')

  const users = userData?.data ?? []


  const {data:portfolioStatistics} = useSWR<{message:string,data:{
    bondValue:number,
    stockValue:number,
    cryptoValue:number
  }}>('/portfolio/statastics')

  const {data:fullBalanceData} = useSWR<{message:string,data:number}>('/users/get_full_balance')


  return (
    <div className="space-y-5">

       <div className="space-y-2.5">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-bakerjonesholdings-black">Portfolio</h1>
              </div>
      
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <SummaryCard
                  label="Available Balance"
                  value={fCurrency(fullBalanceData?.data ?? 0)}
                />
                <SummaryCard
                  label="Stock Value"
                  value={fCurrency(portfolioStatistics?.data.stockValue ?? 0)}
                />
                <SummaryCard
                  label="Crypto Value"
                  value={fCurrency(portfolioStatistics?.data.cryptoValue ??0)}
                />
                <SummaryCard
                  label="Bond Value"
                  value={fCurrency(portfolioStatistics?.data.bondValue ?? 0)}
                />
              </div>
            </div>

      <div className="space-y-2.5">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-bakerjonesholdings-black">
            Recent Transactions
          </h1>
        </div>

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-sm font-medium text-gray-600 bg-bakerjonesholdings-off-pink">
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
                      <tr key={tx._id} className="border-b bg-bakerjonesholdings-off-pink">
                        <td className="py-3 px-4 text-sm">{i + 1}</td>
                        <td className="py-3 px-4 text-sm font-medium text-gray-800">
                          <p className="font-bold"> {tx.name}</p>
                  <p className="text-sm">{tx.symbol}</p>
                          
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
                          {fDate(tx.createdAt)}
                        </td>
                        <td className={`py-3 px-4 text-xs`}>
                          <p
                            className={`
                                        ${
                                          (tx.status ===
                                            TransactionStatus.PENDING &&
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


      <div className="space-y-2.5">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-bakerjonesholdings-black">
            New Users
          </h1>
        </div>

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-sm font-medium text-gray-600 bg-bakerjonesholdings-off-pink">
                 <th className="py-4 px-4 text-left">SL.No</th>
                <th className="py-4 px-4 text-left">User</th>
                <th className="py-4 px-4 text-left">Status</th>
                <th className="py-4 px-4 text-left">Balance</th>
                <th className="py-4 px-4 text-left">Registration Date</th>
                <th className="py-4 px-4 text-left">Last Login</th>
                </tr>
              </thead>
              <tbody>
                {!isLoading && transaction.length > 0 && (
                  <>
                      {users.map((user, index) => (
                                       <tr
                                         key={user._id}
                                         className="bg-bakerjonesholdings-off-pink transition-colors duration-150 border-b border-gray-100 last:border-b-0"
                                       >
                                         <td className="py-3 px-4 text-bakerjonesholdings-black">{ index + 1}</td>
                                         <td className="py-3 px-4 text-bakerjonesholdings-black font-medium">
                                          <p className="font-bold">{user?.name}</p>
                                          <p className="text-sm">{user.email}</p>
                                          </td>
                   
                                         <td className="py-3 px-4">
                                           <span
                                             className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize ${
                                               (user.status === UserStatus.ACTIVE && "bg-green-100 text-green-800") ||
                                               (user.status === UserStatus.INACTIVE && "bg-yellow-100 text-yellow-800") ||
                                               (user.status === UserStatus.DELETED && "bg-red-100 text-red-800") ||
                                               "bg-yellow-100 text-yellow-800"
                                             }`}
                                           >
                                             {user.status}
                                           </span>
                                         </td>
                                         <td className="py-3 px-4 text-gray-600">{fCurrency(user.balance)}</td>
                                         <td className="py-3 px-4 text-gray-600">{fDateAndTime(user.createdAt)}</td>
                                         <td className="py-3 px-4 text-gray-600">{user.lastLogin ? fAgo(user.lastLogin) : "Never"}</td>
                                         
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
  <div className="bg-bakerjonesholdings-off-pink rounded-xl p-4 shadow-sm">
    <p className="text-sm text-bakerjonesholdings-dark-gray font-medium">{label}</p>
    <p className="text-xl font-semibold text-bakerjonesholdings-black mt-1">{value}</p>
  </div>
);
