import React from "react";
import ChangePassword from "./ChangePassword";

export default function SettingPage() {
  return (
    <div className="">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#232323] mb-2">Settings</h1>
        <p className="text-bakerjonesholdings-black">
          Manage your account settings and preferences
        </p>
      </div>
      <div className="space-y-8">
        <ChangePassword />
      </div>
    </div>
  );
}
