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
          Global Platform Transactions
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
          Audit ledger for all client trades across equities, bonds, crypto assets, and IPO requests
        </p>
      </div>

      <div className="flex space-x-4 border-b border-slate-200/90 overflow-x-auto whitespace-nowrap">
        <button
          onClick={() => setActiveTab("shares")}
          className={`pb-3 px-1 font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer ${
            activeTab === "shares"
              ? "border-b-2 border-[#C5A880] text-[#082348]"
              : "border-transparent text-slate-500 hover:text-[#082348]"
          }`}
        >
          Equities & Shares
        </button>
        <button
          onClick={() => setActiveTab("bonds")}
          className={`pb-3 px-1 font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer ${
            activeTab === "bonds"
              ? "border-b-2 border-[#C5A880] text-[#082348]"
              : "border-transparent text-slate-500 hover:text-[#082348]"
          }`}
        >
          Fixed Income Bonds
        </button>
        <button
          onClick={() => setActiveTab("crypto")}
          className={`pb-3 px-1 font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer ${
            activeTab === "crypto"
              ? "border-b-2 border-[#C5A880] text-[#082348]"
              : "border-transparent text-slate-500 hover:text-[#082348]"
          }`}
        >
          Crypto Reserves
        </button>
        <button
          onClick={() => setActiveTab("ipos")}
          className={`pb-3 px-1 font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer ${
            activeTab === "ipos"
              ? "border-b-2 border-[#C5A880] text-[#082348]"
              : "border-transparent text-slate-500 hover:text-[#082348]"
          }`}
        >
          IPO Allocations
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
