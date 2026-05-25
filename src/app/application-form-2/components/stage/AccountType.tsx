import React from "react";
import { FormDataType, StageType } from "../Form";

interface AccountTypeProps {
  setStage: React.Dispatch<React.SetStateAction<StageType>>;
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
}

export default function AccountType({
  setStage,
  formData,
  setFormData,
}: AccountTypeProps) {
  return (
    <div className="h-full w-full lg:w-1/2 bg-bakerjonesholdings-pink py-10 px-5  text-bakerjonesholdings-black flex flex-col gap-5">
      <h2 className="text-2xl font-semibold">Account Type</h2>
      <p className="text-sm">
        If you need our assistance to complete the account opening process we
        are happy to help. Simply email
        info@bakerjonesholdings.com
      </p>
      <div className="flex flex-col gap-5">
        {["Individual", "Joint", "Company"].map((type) => (
          <label
            key={type}
            className={`cursor-pointer px-4 py-2 rounded-md border ${
              formData.accountType === type
                ? "bg-bakerjonesholdings-black text-bakerjonesholdings-off-white border-bakerjonesholdings-black"
                : "border-bakerjonesholdings-off-white text-bakerjonesholdings-off-white"
            }`}
          >
            <input
              type="radio"
              name="accountType"
              value={type}
              checked={formData.accountType === type}
              className="hidden"
              onChange={() =>
                setFormData((prev) => ({
                  ...prev,
                  accountType: type as "Individual" | "Joint" | "Company",
                }))
              } // Update formData when radio button changes
            />
            {type}
          </label>
        ))}
      </div>

      <div className="flex justify-between items-start">
        <button
          className="cursor-pointer px-3 hover:px-3.5 py-1 hover:opacity-90 duration-300 border  text-bakerjonesholdings-off-white rounded-md"
          onClick={() => setStage("Start")}
        >
          Previous
        </button>
        <button
          className="cursor-pointer px-3 hover:px-3.5 py-1 hover:opacity-90 duration-300 rounded-md text-bakerjonesholdings-pink bg-bakerjonesholdings-black"
          onClick={() =>{
            if(formData.accountType === "Company") {
              setStage("Company Information");
            } else {
              setStage("Individual details")
            }
            }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
