"use client";

import { useAuth } from "@/auth/useAuth";
import { InvestmentType } from "@/enum/investment-type.enum";
import { fDateAndTime } from "@/utility/dateFormatters.ts";
import { fCurrency } from "@/utility/numberFormatters";
import useSWR from "swr";
import BondsRow from "./BondsRow";

export default function TransactionsTable() {
  const { user } = useAuth();
  const {
    data: portfolioData,
    isLoading,
    mutate: portfolioMutate,
  } = useSWR<{
    message: string;
    data: {
      _id: string;
      symbol: string;
      name: string;
      quantity: number;
      unitPrice: number;
      totalValue: number;
      investmentType: InvestmentType;
      transaction: string;
      createdAt: Date;
      buyBack: null | "Yes" | "No";
      user: {
        name: string;
        email: string;
      };
    }[];
  }>("/portfolio", { revalidateOnFocus: true, revalidateOnMount: true });

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

  const bonds = portfolio.filter(
    (tx) => tx.investmentType === InvestmentType.BOND
  );
  const crypto = portfolio.filter(
    (tx) => tx.investmentType === InvestmentType.CRYPTO
  );
  const stock = portfolio.filter(
    (tx) => tx.investmentType === InvestmentType.STOCK
  );

  const SkeletonRow = () => (
    <tr className="animate-pulse">
      {Array.from({ length: 9 }).map((_, i) => (
        <td key={i} className="py-3 px-4">
          <div className="h-4 bg-gray-300 rounded w-20 mx-auto"></div>
        </td>
      ))}
    </tr>
  );

  return (
    <div className="w-full space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-monefi-black">All Portfolio</h1>
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
      {bonds.length !== 0 && (
        <>
          <h1 className="text-xl font-bold text-monefi-black">Bonds</h1>

          <div className="bg-white rounded-xl shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full whitespace-nowrap">
                <thead>
                  <tr className="border-b text-left text-sm font-medium text-gray-600 bg-monefi-off-pink">
                    <th className="py-3 px-4">#</th>
                    <th className="py-3 px-4">User</th>
                    <th className="py-3 px-4">Symbol</th>
                    <th className="py-3 px-4">Quantity</th>
                    <th className="py-3 px-4">Unit Price</th>
                    <th className="py-3 px-4">Total Value</th>
                    <th className="py-3 px-4">Investment</th>
                    <th className="py-3 px-4">Buyback</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Annual Coupon Rate</th>
                    <th className="py-3 px-4">Coupon Frequency</th>
                    <th className="py-3 px-4">Coupon Type</th>
                    <th className="py-3 px-4">Maturity Date</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading &&
                    Array.from({ length: 10 }).map((_, i) => (
                      <SkeletonRow key={i} />
                    ))}

                  {!isLoading && portfolio.length > 0 && (
                    <>
                      {bonds.map((tx, i) => (
                        <BondsRow
                          key={tx._id}
                          i={i}
                          tx={tx}
                          portfolioMutate={portfolioMutate}
                        />
                      ))}
                    </>
                  )}

                  {!isLoading && portfolio.length === 0 && (
                    <tr>
                      <td
                        colSpan={9}
                        className="text-center py-10 text-gray-500"
                      >
                        No transactions found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {stock.length !== 0 && (
        <>
          <h1 className="text-xl font-bold text-monefi-black">Stock</h1>

          <div className="bg-white rounded-xl shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left text-sm font-medium text-gray-600 bg-monefi-off-pink">
                    <th className="py-3 px-4">#</th>
                    <th className="py-3 px-4">User</th>
                    <th className="py-3 px-4">Symbol</th>
                    <th className="py-3 px-4">Quantity</th>
                    <th className="py-3 px-4">Unit Price</th>
                    <th className="py-3 px-4">Total Value</th>
                    <th className="py-3 px-4">Investment</th>
                    <th className="py-3 px-4">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading &&
                    Array.from({ length: 10 }).map((_, i) => (
                      <SkeletonRow key={i} />
                    ))}

                  {!isLoading && portfolio.length > 0 && (
                    <>
                      {stock.map((tx, i) => (
                        <tr
                          key={tx._id}
                          className="border-b bg-monefi-off-pink"
                        >
                          <td className="py-3 px-4 text-sm">{i + 1}</td>
                          <td className="py-3 px-4 font-medium">
                            <p className="font-bold">{tx.user.name}</p>
                            <p className="text-sm">{tx.user.email}</p>
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
                            {tx.investmentType}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">
                            {fDateAndTime(tx.createdAt)}
                          </td>
                        </tr>
                      ))}
                    </>
                  )}

                  {!isLoading && portfolio.length === 0 && (
                    <tr>
                      <td
                        colSpan={9}
                        className="text-center py-10 text-gray-500"
                      >
                        No transactions found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {crypto.length !== 0 && (
        <>
          <h1 className="text-xl font-bold text-monefi-black"> Crypto</h1>

          <div className="bg-white rounded-xl shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left text-sm font-medium text-gray-600 bg-monefi-off-pink">
                    <th className="py-3 px-4">#</th>
                    <th className="py-3 px-4">User</th>
                    <th className="py-3 px-4">Symbol</th>
                    <th className="py-3 px-4">Quantity</th>
                    <th className="py-3 px-4">Unit Price</th>
                    <th className="py-3 px-4">Total Value</th>
                    <th className="py-3 px-4">Investment</th>
                    <th className="py-3 px-4">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading &&
                    Array.from({ length: 10 }).map((_, i) => (
                      <SkeletonRow key={i} />
                    ))}

                  {!isLoading && portfolio.length > 0 && (
                    <>
                      {crypto.map((tx, i) => (
                        <tr
                          key={tx._id}
                          className="border-b bg-monefi-off-pink"
                        >
                          <td className="py-3 px-4 text-sm">{i + 1}</td>
                          <td className="py-3 px-4 font-medium">
                            <p className="font-bold">{tx.user.name}</p>
                            <p className="text-sm">{tx.user.email}</p>
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
                            {tx.investmentType}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">
                            {fDateAndTime(tx.createdAt)}
                          </td>
                        </tr>
                      ))}
                    </>
                  )}

                  {!isLoading && portfolio.length === 0 && (
                    <tr>
                      <td
                        colSpan={9}
                        className="text-center py-10 text-gray-500"
                      >
                        No transactions found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const SummaryCard = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-monefi-off-pink rounded-xl p-4 shadow-sm">
    <p className="text-sm text-monefi-dark-gray font-medium">{label}</p>
    <p className="text-xl font-semibold text-monefi-black mt-1">{value}</p>
  </div>
);
