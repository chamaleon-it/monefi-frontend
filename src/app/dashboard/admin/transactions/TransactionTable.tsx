"use client";

import { useState } from "react";
import SharesTable from "./SharesTable";
import BondsTable from "./BondsTable";
import CryptoTable from "./CryptoTable";
import IpoTable from "./IpoTable";

export default function TransactionsTable() {
  const [activeTab, setActiveTab] = useState<"shares" | "bonds" | "crypto" | "ipos">("shares");

  return (
    <div className="w-full space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-bakerjonesholdings-black">Transactions</h1>
      </div>

      <div className="flex space-x-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("shares")}
          className={`py-2 px-4 font-semibold text-sm transition-colors border-b-2 ${
            activeTab === "shares"
              ? "border-bakerjonesholdings-pink text-bakerjonesholdings-pink"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Shares
        </button>
        <button
          onClick={() => setActiveTab("bonds")}
          className={`py-2 px-4 font-semibold text-sm transition-colors border-b-2 ${
            activeTab === "bonds"
              ? "border-bakerjonesholdings-pink text-bakerjonesholdings-pink"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Bonds
        </button>
        <button
          onClick={() => setActiveTab("crypto")}
          className={`py-2 px-4 font-semibold text-sm transition-colors border-b-2 ${
            activeTab === "crypto"
              ? "border-bakerjonesholdings-pink text-bakerjonesholdings-pink"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Crypto
        </button>
        <button
          onClick={() => setActiveTab("ipos")}
          className={`py-2 px-4 font-semibold text-sm transition-colors border-b-2 ${
            activeTab === "ipos"
              ? "border-bakerjonesholdings-pink text-bakerjonesholdings-pink"
              : "border-transparent text-gray-500 hover:text-gray-700"
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
