"use client";

import React, { useState } from "react";
import AccountInformation from "./AccountInformation";
import SecuritySettings from "./SecuritySettings";

export default function SettingPage() {
  const [activeTab, setActiveTab] = useState<"account" | "security">("account");

  return (
    <div className="space-y-6 font-inter">
      <div>
        <h1 className="text-2xl lg:text-3xl font-serif font-bold text-[#082348]">
          Account & Security Preferences
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
          Manage entity profile, contact details, authentication methods, and 2FA credentials
        </p>
      </div>

      <div className="flex border-b border-slate-200/90 gap-6">
        <button
          className={`pb-3 font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer ${
            activeTab === "account"
              ? "border-b-2 border-[#C5A880] text-[#082348]"
              : "text-slate-500 hover:text-[#082348]"
          }`}
          onClick={() => setActiveTab("account")}
        >
          Account Profile & Entity Info
        </button>
        <button
          className={`pb-3 font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer ${
            activeTab === "security"
              ? "border-b-2 border-[#C5A880] text-[#082348]"
              : "text-slate-500 hover:text-[#082348]"
          }`}
          onClick={() => setActiveTab("security")}
        >
          Password & 2FA Security
        </button>
      </div>

      <div className="space-y-6">
        {activeTab === "account" && <AccountInformation />}
        {activeTab === "security" && <SecuritySettings />}
      </div>
    </div>
  );
}
