import getConfig from "@/config/configuration";
import { fDate } from "@/utility/dateFormatters.ts";
import { fCurrency } from "@/utility/numberFormatters";
import React from "react";
import useSWR from "swr";
import InterestView from "./InterestView";

interface Props {
  tx: {
    _id: string;
    symbol: string;
    quantity: number;
    unitPrice: number;
    totalValue: number;
    transaction:{
      createdAt:Date
      buyBackDate?:Date | null
    }
    investmentType: string;
    createdAt: Date;
    buyBack: null | "Yes" | "No";
    certificate?: string | null;
    interest:{
        date:Date,
        amount:number,
        _id:string,
      }[];
  };
  i: number;
}

interface BondType {
  name: string;
  annualCouponRate: number;
  isin: string;
  couponFrequency: string;
  unitPrice: number;
  couponType: string;
  meturityDate?: string;
}

export default function BondsRow({ tx, i }: Props) {
  const { data } = useSWR<{
    message: string;
    data: BondType;
  }>(`/bonds/${tx.symbol}`);

  const bond = data?.data;
  return (
    <tr className="border-b bg-monefi-off-pink">
      <td className="py-3 px-4 text-sm">{i + 1}</td>
      <td className="py-3 px-4 text-sm font-medium text-gray-800">
        <p className="font-bold">{bond?.name}</p>
        <p className="text-sm">{bond?.isin}</p>
      </td>
      <td className="py-3 px-4 text-sm text-gray-600">{tx.quantity}</td>
      <td className="py-3 px-4 text-sm text-gray-600">
        {fCurrency(tx.unitPrice)}
      </td>
      <td className="py-3 px-4 text-sm text-gray-600">
        {fCurrency(tx.totalValue)}
      </td>

     
      <td className="py-3 px-4 text-sm text-gray-600">{tx.buyBack}</td>
        <td className="py-3 px-4 text-sm text-gray-600">
          {tx.transaction.buyBackDate ? fDate(tx.transaction.buyBackDate) : "-"}
        </td>
          <td className="py-3 px-4 text-sm text-gray-600">
          <InterestView tx={tx}/>
          </td>
      <td className="py-3 px-4 text-sm text-gray-600">
        {tx?.certificate ? (
          <a
            href={getConfig().backendURL + tx.certificate}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1 bg-green-500 text-black/70 rounded-md font-semibold cursor-pointer w-[120px] h-9 flex justify-center items-center text-center"
          >
            View
          </a>
        ) : (
          "-"
        )}
      </td>
      <td className="py-3 px-4 text-sm text-gray-600">{fDate(tx.transaction.createdAt)}</td>
      <td className="py-3 px-4 text-sm text-gray-600">
        {bond?.annualCouponRate} %
      </td>
      <td className="py-3 px-4 text-sm text-gray-600">
        {bond?.couponFrequency}
      </td>
      <td className="py-3 px-4 text-sm text-gray-600">{bond?.couponType}</td>
      <td className="py-3 px-4 text-sm text-gray-600">
        {bond?.meturityDate ? fDate(bond?.meturityDate) : "-"}
      </td>
    </tr>
  );
}
