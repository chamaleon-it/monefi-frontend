"use client";

import React, { useState } from "react";
import AccountInformation from "./AccountInformation";
import SecuritySettings from "./SecuritySettings";

export default function SettingPage() {
  const [activeTab, setActiveTab] = useState<"account" | "security">("account");

  return (
    <div className="">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#232323] mb-2">Settings</h1>
        <p className="text-bakerjonesholdings-black">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="flex border-b mb-8 gap-6">
        <button
          className={`pb-3 font-semibold transition-colors ${
            activeTab === "account"
              ? "border-b-2 border-emerald-500 text-emerald-600"
              : "text-gray-500 hover:text-gray-800"
          }`}
          onClick={() => setActiveTab("account")}
        >
          Account Information
        </button>
        <button
          className={`pb-3 font-semibold transition-colors ${
            activeTab === "security"
              ? "border-b-2 border-emerald-500 text-emerald-600"
              : "text-gray-500 hover:text-gray-800"
          }`}
          onClick={() => setActiveTab("security")}
        >
          Security
        </button>
      </div>

      <div className="space-y-8">
        {activeTab === "account" && <AccountInformation />}
        {activeTab === "security" && <SecuritySettings />}
      </div>
    </div>
  );
}
