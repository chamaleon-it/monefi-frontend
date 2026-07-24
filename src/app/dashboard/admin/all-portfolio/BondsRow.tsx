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
    <tr className="hover:bg-slate-50/80 transition-colors whitespace-nowrap">
      <td className="py-4 px-5 text-xs text-slate-400 font-mono">{i + 1}</td>
      <td className="py-4 px-5 text-sm">
        <p className="font-bold text-[#082348]">{tx.user.name}</p>
        <p className="text-xs text-slate-400">{tx.user.email}</p>
      </td>
      <td className="py-4 px-5 text-sm">
        <p className="font-bold text-[#082348]">{bond?.name}</p>
        <p className="text-xs font-mono text-slate-400">{bond?.isin}</p>
      </td>
      <td className="py-4 px-5 text-sm font-semibold text-slate-700">{tx.quantity}</td>
      <td className="py-4 px-5 text-sm font-medium text-slate-600">
        {fCurrency(tx.unitPrice)}
      </td>
      <td className="py-4 px-5 text-sm font-bold text-[#082348]">
        {fCurrency(tx.totalValue)}
      </td>

      <td className="py-4 px-5 text-xs">
        <RadioGroup
          className="flex gap-4"
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
                  loading: "Updating buyback...",
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
          <div className="flex items-center gap-1.5">
            <RadioGroupItem value={"Yes"} id={`r1-${tx._id}`} />
            <Label htmlFor={`r1-${tx._id}`} className="text-xs font-semibold text-slate-700 cursor-pointer">Yes</Label>
          </div>
          <div className="flex items-center gap-1.5">
            <RadioGroupItem value={"No"} id={`r2-${tx._id}`} />
            <Label htmlFor={`r2-${tx._id}`} className="text-xs font-semibold text-slate-700 cursor-pointer">No</Label>
          </div>
        </RadioGroup>
      </td>

      <td className="py-4 px-5 text-xs text-slate-500 font-mono">
        {tx.transaction.buyBackDate ? fDate(tx.transaction.buyBackDate) : "-"}
      </td>

      <td className="py-4 px-5 text-xs">
        <InterestUpdate tx={tx} portfolioMutate={portfolioMutate} />
      </td>

      <td className="py-4 px-5 text-xs">
        <div className="flex gap-2 items-center">
          <div className="gold-gradient-bg text-slate-950 font-bold text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-2xs cursor-pointer flex items-center justify-center relative">
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={uploadCertificate}
            />
            {tx.certificate ? "Re-upload Document" : "Upload Document"}
          </div>

          {tx?.certificate && (
            <a
              href={getConfig().backendURL + tx.certificate}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-slate-200 text-[#082348] font-bold text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors"
            >
              View Document
            </a>
          )}
        </div>
      </td>
      <td className="py-4 px-5 text-xs text-slate-500 font-mono">{fDate(tx.transaction.createdAt)}</td>
      <td className="py-4 px-5 text-sm font-bold text-[#C5A880]">
        {bond?.annualCouponRate} %
      </td>
      <td className="py-4 px-5 text-xs font-semibold text-slate-600">
        {bond?.couponFrequency}
      </td>
      <td className="py-4 px-5 text-xs">
        <span className="inline-block px-2.5 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider bg-slate-100 text-[#082348] border border-slate-200">
          {bond?.couponType}
        </span>
      </td>
      <td className="py-4 px-5 text-xs text-slate-500 font-mono">
        {bond?.meturityDate ? fDate(bond?.meturityDate) : "-"}
      </td>
    </tr>
  );
}
