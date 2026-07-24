"use client";

import { useState } from "react";
import SharesTable from "./SharesTable";
import BondsTable from "./BondsTable";
import CryptoTable from "./CryptoTable";
import IpoTable from "./IpoTable";

export default function TransactionsTable() {
  const [activeTab, setActiveTab] = useState<"shares" | "bonds" | "crypto" | "ipos">("shares");

  return (
    <div className="w-full space-y-6 font-inter">
      <div>
        <h1 className="text-2xl lg:text-3xl font-serif font-bold text-[#082348]">
          Transaction Records
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
          Filtered audit ledger for shares, bonds, digital assets, and capital subscriptions
        </p>
      </div>

      <div className="flex space-x-2 border-b border-slate-200/90">
        <button
          onClick={() => setActiveTab("shares")}
          className={`py-3 px-5 font-bold text-xs uppercase tracking-wider transition-all duration-200 border-b-2 cursor-pointer ${
            activeTab === "shares"
              ? "border-[#C5A880] text-[#082348] bg-slate-50/50"
              : "border-transparent text-slate-500 hover:text-[#082348]"
          }`}
        >
          Shares & Equities
        </button>
        <button
          onClick={() => setActiveTab("bonds")}
          className={`py-3 px-5 font-bold text-xs uppercase tracking-wider transition-all duration-200 border-b-2 cursor-pointer ${
            activeTab === "bonds"
              ? "border-[#C5A880] text-[#082348] bg-slate-50/50"
              : "border-transparent text-slate-500 hover:text-[#082348]"
          }`}
        >
          Fixed Income Bonds
        </button>
        <button
          onClick={() => setActiveTab("crypto")}
          className={`py-3 px-5 font-bold text-xs uppercase tracking-wider transition-all duration-200 border-b-2 cursor-pointer ${
            activeTab === "crypto"
              ? "border-[#C5A880] text-[#082348] bg-slate-50/50"
              : "border-transparent text-slate-500 hover:text-[#082348]"
          }`}
        >
          Crypto Assets
        </button>
        <button
          onClick={() => setActiveTab("ipos")}
          className={`py-3 px-5 font-bold text-xs uppercase tracking-wider transition-all duration-200 border-b-2 cursor-pointer ${
            activeTab === "ipos"
              ? "border-[#C5A880] text-[#082348] bg-slate-50/50"
              : "border-transparent text-slate-500 hover:text-[#082348]"
          }`}
        >
          IPOs
        </button>
      </div>

      <div className="mt-4">
        {activeTab === "shares" && <SharesTable />}
        {activeTab === "bonds" && <BondsTable />}
        {activeTab === "crypto" && <CryptoTable />}
        {activeTab === "ipos" && <IpoTable />}
      </div>
    </div>
  );
}
