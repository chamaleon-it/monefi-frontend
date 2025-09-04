import React from "react";
import { FormDataType, StageType } from "../Form";
import toast from "react-hot-toast";

interface AddressProps {
  setStage: React.Dispatch<React.SetStateAction<StageType>>;
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
}

export default function CompanyOwnership({
  setStage,
  formData,
  setFormData,
}: AddressProps) {
  return (
    <div className="h-full w-full lg:w-1/2 bg-monefi-pink py-10 px-5  text-monefi-black flex flex-col gap-5 overflow-scroll">
      <h2 className="text-2xl font-semibold">Company Ownership</h2>
      <p className="text-sm">
        If you need our assistance to complete the account opening process we
        are happy to help. Simply contact us on  020 8002 8761 / 016 1563 0904 or email
        hello@monefi.co.uk
      </p>
       <div className="col-span-full flex flex-col gap-5">
          {["Yes" , "No"].map((type) => (
            <label
              key={type}
              className={`cursor-pointer px-4 py-2 rounded-md border ${
                formData.company?.companyOwnership === type
                  ? "bg-monefi-black text-monefi-off-white border-monefi-black"
                  : "border-monefi-off-white text-monefi-off-white"
              }`}
            >
              <input
                type="radio"
                name="accountType"
                value={type}
                checked={formData.company?.companyOwnership === type}
                onChange={() => {
                  setFormData((prev) => ({
                    ...prev,
                    company: {
                      ...prev.company,
                      companyOwnership: type as "Yes" | "No",
                    },
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
          onClick={() => setStage("Company Tax Information")}
        >
          Previous
        </button>
        <button
          className="cursor-pointer px-3 hover:px-3.5 py-1 hover:opacity-90 duration-300 rounded-md text-monefi-pink bg-monefi-black"
          onClick={() => {
            // Validate address fields before proceeding
            if (!formData.company?.companyOwnership) {
              toast.error("Select any options.");
              return;
            }
            setStage("Individual details");
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
