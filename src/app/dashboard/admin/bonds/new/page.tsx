import React from "react";
import CreateBond from "./CreateBond";

export default function CreateBondPage() {
  return (
    <div className="space-y-6 font-inter">
      <div>
        <h1 className="text-2xl lg:text-3xl font-serif font-bold text-[#082348]">
          Issue Sovereign / Corporate Bond
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
          Configure yield coupon frequency, ISIN identifier, maturity terms, and public visibility
        </p>
      </div>

      <div className="space-y-6">
        <CreateBond />
      </div>
    </div>
  );
}
