import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import api from "@/services/api";
import { fDate } from "@/utility/dateFormatters.ts";
import { fCurrency } from "@/utility/numberFormatters";
import React from "react";
import toast from "react-hot-toast";
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
    buyBack: null | "Yes" | "No";
    user: {
      email: string;
      name: string;
    };
  };
  i: number;
  portfolioMutate: () => void;
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

export default function BondsRow({ tx, i, portfolioMutate }: Props) {
  const { data } = useSWR<{
    message: string;
    data: BondType;
  }>(`/bonds/${tx.symbol}`);

  const bond = data?.data;
  return (
    <tr className="border-b bg-monefi-off-pink">
      <td className="py-3 px-4 text-sm">{i + 1}</td>
      <td className="py-3 px-4 font-medium">
        <p className="font-bold">{tx.user.name}</p>
        <p className="text-sm">{tx.user.email}</p>
      </td>
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
        <RadioGroup
          className="flex gap-5"
          value={tx.buyBack}
          onValueChange={async (value) => {
            try {
              const payload = {
                id: tx._id,
                buyBack: value,
              };
              await toast.promise(
                api.patch("/portfolio/change_buyback", payload),
                {
                  loading: "Updating buyback...!",
                  success: ({ data }) => data.message,
                  error: ({ response }) => response.data.message,
                }
              );
              portfolioMutate();
            } catch (error) {
              console.log(error);
            }
          }}
        >
          <div className="flex items-center gap-2.5">
            <RadioGroupItem value={"Yes"} id="r1" />
            <Label htmlFor="r1">Yes</Label>
          </div>
          <div className="flex items-center gap-2.5">
            <RadioGroupItem value={"No"} id="r2" />
            <Label htmlFor="r2">No</Label>
          </div>
        </RadioGroup>
      </td>
      <td className="py-3 px-4 text-sm text-gray-600">{fDate(tx.createdAt)}</td>
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
