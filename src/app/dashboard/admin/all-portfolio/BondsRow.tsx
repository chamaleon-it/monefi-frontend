import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import getConfig from "@/config/configuration";
import api from "@/services/api";
import { fDate } from "@/utility/dateFormatters.ts";
import { fCurrency } from "@/utility/numberFormatters";
import React from "react";
import toast from "react-hot-toast";
import useSWR from "swr";
import InterestUpdate from "./InterestUpdate";

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
    },
    investmentType: string;
    createdAt: Date;
    buyBack: null | "Yes" | "No";
    user: {
      email: string;
      name: string;
    };
    certificate?: string | null;
     interest:{
        date:Date,
        amount:number,
        _id:string,
      }[];
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

  const uploadCertificate = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const form = new FormData();
    if (!e.target.files?.length) {
      toast.error("Please select any files.");
      return;
    }

    form.append("file", e.target.files[0]);

    try {
      const { data } = await toast.promise(api.post("/uploads", form), {
        loading: "Uploading...",
        success: "File uploaded successfully!",
        error: "Upload failed. Please try again.",
      });
      const file = data.data;
      const body = {
        file,
        id: tx._id,
      };
      await toast.promise(api.patch("/portfolio/update_certificate", body), {
        loading: "Updating the certificate...",
        success: ({ data }) => data.message,
      });
      portfolioMutate();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <tr className="border-b bg-bakerjonesholdings-off-pink">
      <td className="py-3 px-4 text-sm">{i + 1}</td>
      <td className="py-3 px-4 font-medium">
        <p className="font-bold">{tx.user.name}</p>
        <p className="text-sm">{tx.user.email}</p>
      </td>
      <td className="py-3 px-4 text-sm font-medium text-gray-800">
        <p className="font-bold">{bond?.name}</p>
        <p className="text-sm">{bond?.isin}</p>
      </td>
      <td className="py-3 px-4 text-sm text-bakerjonesholdings-black">{tx.quantity}</td>
      <td className="py-3 px-4 text-sm text-bakerjonesholdings-black">
        {fCurrency(tx.unitPrice)}
      </td>
      <td className="py-3 px-4 text-sm text-bakerjonesholdings-black">
        {fCurrency(tx.totalValue)}
      </td>

      <td className="py-3 px-4 text-sm text-bakerjonesholdings-black">
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

  <td className="py-3 px-4 text-sm text-bakerjonesholdings-black">
    {tx.transaction.buyBackDate ? fDate(tx.transaction.buyBackDate) : "-"}
  </td>

      <td className="py-3 px-4 text-sm text-bakerjonesholdings-black">
        <InterestUpdate tx={tx} portfolioMutate={portfolioMutate} />
      </td>

      <td className="py-3 px-4 text-sm text-bakerjonesholdings-black">
        <div className="flex gap-2.5 items-center justify-center">
          <div className="px-2.5 py-1 bg-green-500 text-black/70 rounded-md font-semibold cursor-pointer w-[120px] h-9 flex justify-center items-center text-center relative">
            <input
              type="file"
              className="absolute h-full w-full inset-0 mx-auto z-10 opacity-0 cursor-pointer"
              onChange={uploadCertificate}
            />
            {tx.certificate ? "Re Upload" : "Upload"}
          </div>

          {tx?.certificate && (
            <a
              href={getConfig().backendURL + tx.certificate}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 bg-green-500 text-black/70 rounded-md font-semibold cursor-pointer w-[120px] h-9 flex justify-center items-center text-center"
            >
              View
            </a>
          )}
        </div>
      </td>
       <td className="py-3 px-4 text-sm text-bakerjonesholdings-black">{fDate(tx.transaction.createdAt)}</td>
      <td className="py-3 px-4 text-sm text-bakerjonesholdings-black">
        {bond?.annualCouponRate} %
      </td>
      <td className="py-3 px-4 text-sm text-bakerjonesholdings-black">
        {bond?.couponFrequency}
      </td>
      <td className="py-3 px-4 text-sm text-bakerjonesholdings-black">{bond?.couponType}</td>
      <td className="py-3 px-4 text-sm text-bakerjonesholdings-black">
        {bond?.meturityDate ? fDate(bond?.meturityDate) : "-"}
      </td>
    </tr>
  );
}
