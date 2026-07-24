import { topCrypto } from "@/data/top-crypto";
import useGetPrice from "@/hooks/useGetPrice";
import api from "@/services/api";
import { fCurrency } from "@/utility/numberFormatters";
import React, { useMemo, useState } from "react";
import toast from "react-hot-toast";

export default function CryptoForm({ symbol }: { symbol: string }) {
  const [quantity, setQuantity] = useState<number | null>(null);

  const crypto = useMemo(
    () => topCrypto.find((st) => st.symbol === symbol),
    [symbol]
  );
  const { price, loading: prceLoading } = useGetPrice({
    type: "crypto",
    symbol: crypto?.name.toLowerCase().replaceAll(" ", "-") || "",
  });

  const purchasePrice = useMemo(
    () => (price ?? 0) * (quantity ?? 0),
    [price, quantity]
  );


  const buy = async() =>{
    if(!price){
      toast.error("Somthing error on fetching unit price")
      return
    }
    if(!quantity) {
      toast.error("Please enter quantity")
      return
    }
    if(purchasePrice < 5000){
      toast.error("Minimum purchase amount must be greater than "+fCurrency(5000))
      return
    }
    if(!crypto?.symbol) {
      toast.error("Please select any crypto")
      return
    }
    const data = {
      symbol:crypto?.symbol,
      name:crypto?.name,
      unitPrice:price,
      quantity
    }

    try {
      await toast.promise(api.post('/transactions/crypto',data),{
        loading:"Please wait ,Purchasing on progress...",
        error:"Please Check your balance",
        success:"Your request for purchase under verification."
      })
    } catch (error) {
      console.log(error);
    }

    
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-[0_15px_35px_rgba(8,35,72,0.05)] rounded-3xl p-6 space-y-5 border border-slate-200/90 pointer-events-auto relative overflow-hidden font-inter">
      {/* Top Gold Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C5A880] to-transparent"></div>

      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Crypto Asset</span>
          <p className="text-lg font-serif font-bold text-[#082348]">{crypto?.name ?? "Unknown"}</p>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Symbol</span>
          <p className="text-sm font-mono font-bold text-[#C5A880] px-2.5 py-1 rounded-full bg-[#C5A880]/15 inline-block">
            {crypto?.symbol ?? "N/A"}
          </p>
        </div>
      </div>

      <div>
        <label htmlFor="quantity" className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
          Asset Quantity
        </label>
        <input
          type="number"
          id="quantity"
          placeholder="Enter crypto quantity"
          className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 text-[#082348] placeholder:text-slate-400 text-sm focus:outline-none focus:bg-white focus:border-[#C5A880] focus:ring-2 focus:ring-[#C5A880]/20 transition-all font-semibold"
          onChange={(e) => setQuantity(+e.target.value)}
          value={quantity || ""}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3 text-center">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Live Asset Rate</p>
          <p className="text-base font-serif font-bold text-[#082348] mt-0.5">
            {prceLoading ? "Fetching..." : fCurrency(price || 0)}
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3 text-center">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Trade Minimum</p>
          <p className="text-base font-serif font-bold text-[#082348] mt-0.5">{fCurrency(5000)}</p>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-[#082348] text-white text-center shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 h-0.5 left-0 bg-[#C5A880]"></div>
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-300">Total Purchase Capital</p>
        <p className="text-2xl font-serif font-bold text-white mt-0.5">
          {fCurrency(purchasePrice)}
        </p>
      </div>

      <div className="pt-1">
        <button
          type="button"
          className="w-full py-3.5 gold-gradient-bg text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl hover:opacity-95 transition duration-200 shadow-md shadow-[#C5A880]/20 cursor-pointer"
          onClick={buy}
        >
          Execute Crypto Acquisition
        </button>
      </div>
    </div>
  );
}
