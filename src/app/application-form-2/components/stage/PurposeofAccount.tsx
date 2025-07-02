import React from "react";
import { FormDataType, StageType } from "../Form";

interface AccountTypeProps {
  setStage: React.Dispatch<React.SetStateAction<StageType>>;
   formData: FormDataType;
        setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
}

export default function PurposeofAccount({ setStage,formData,setFormData }: AccountTypeProps) {
  return (
    <div className="h-full w-full lg:w-1/2 bg-monefi-pink py-10 px-5  text-monefi-black flex flex-col gap-5 overflow-scroll">
      <h2 className="text-2xl font-semibold">Purpose of Account</h2>
      <p className="text-sm">
        If you need our assistance to complete the account opening process we
        are happy to help. Simply contact us on 1111111111 or email
        info@monefi.co.uk
      </p>
      <div className="flex flex-col gap-5">
        {[
          "Savings",
          "Growth",
          "Income",
          "Retirement",
          "Business account",
          "Other",
        ].map((type) => (
          <label
            key={type}
            className={`cursor-pointer px-4 py-2 rounded-md border ${
              formData.purposeOfAccount === type
                ? "bg-monefi-black text-monefi-off-white border-monefi-black"
                : "border-monefi-off-white text-monefi-off-white"
            }`}
          >
            <input
              type="radio"
              name="accountType"
              value={type}
              checked={formData.purposeOfAccount === type}
              onChange={() => {
                setFormData((prev) => ({
                  ...prev,
                  purposeOfAccount: type as
                    | "Savings"
                    | "Growth"
                    | "Income"
                    | "Retirement"
                    | "Business account"
                    | "Other",
                }));
              }}
              className="hidden"
            />
            {type}
          </label>
        ))}
      </div>

      <div className="flex justify-between items-start">
        <button
          className="cursor-pointer px-3 hover:px-3.5 py-1 hover:opacity-90 duration-300 border  text-monefi-off-white rounded-md"
          onClick={() => setStage("Proof of Address")}
        >
          Previous
        </button>
        <button
          className="cursor-pointer px-3 hover:px-3.5 py-1 hover:opacity-90 duration-300 rounded-md text-monefi-pink bg-monefi-black"
          onClick={() => setStage("Bank Account")}
        >
          Next
        </button>
      </div>
    </div>
  );
}
