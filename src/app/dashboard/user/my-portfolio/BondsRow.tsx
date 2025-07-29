import { fDateAndTime } from "@/utility/dateFormatters.ts";
import { fCurrency, fPercentage } from "@/utility/numberFormatters";
import React from "react";
import useSWR from "swr";

interface Props {
  tx: {
    _id: string;
    symbol: string;
    quantity: number;
    unitPrice: number;
    totalValue: number;
    investmentType: string;
    createdAt: Date;
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

      <td className="py-3 px-4 text-sm text-gray-600">{tx.investmentType}</td>
      <td className="py-3 px-4 text-sm text-gray-600">
        {fDateAndTime(tx.createdAt)}
      </td>
      <td className="py-3 px-4 text-sm text-gray-600">
        {bond?.annualCouponRate} %
      </td>
      <td className="py-3 px-4 text-sm text-gray-600">
        {bond?.couponFrequency}
      </td>
      <td className="py-3 px-4 text-sm text-gray-600">{bond?.couponType}</td>
      <td className="py-3 px-4 text-sm text-gray-600">
        {bond?.meturityDate ? fDateAndTime(bond?.meturityDate) : "-"}
      </td>
    </tr>
  );
}
