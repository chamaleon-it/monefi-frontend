import React from "react";
import { FormDataType, StageType } from "../Form";
import toast from "react-hot-toast";

interface AddressProps {
  setStage: React.Dispatch<React.SetStateAction<StageType>>;
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
}

export default function CompanyInformation({
  setStage,
  formData,
  setFormData,
}: AddressProps) {
  return (
    <div className="h-full w-full lg:w-1/2 bg-monefi-pink py-10 px-5  text-monefi-black flex flex-col gap-5 overflow-scroll">
      <h2 className="text-2xl font-semibold">Company Information</h2>
      <p className="text-sm">
        If you need our assistance to complete the account opening process we
        are happy to help. Simply contact us on 02080028761 or email
        hello@monefi.co.uk
      </p>
      <div className="grid lg:grid-cols-2 gap-5">
        <input
          type="text"
          placeholder="Company Name"
          className="border-b outline-none px-2 py-1 border-monefi-off-white text-monefi-off-white"
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              company: { ...prev.company, name: e.target.value },
            }))
          }
          value={formData.company?.name}
        />
        <div className="col-span-full flex flex-col gap-2.5">
            <p className="font-semibold text-white">Select Company Type</p>
          {["Public", "Proprietary"].map((type) => (
            <label
              key={type}
              className={`cursor-pointer px-4 py-2 rounded-md border ${
                formData.company?.companyType === type
                  ? "bg-monefi-black text-monefi-off-white border-monefi-black"
                  : "border-monefi-off-white text-monefi-off-white"
              }`}
            >
              <input
                type="radio"
                name="accountType"
                value={type}
                checked={formData.company?.companyType === type}
                onChange={() => {
                  setFormData((prev) => ({
                    ...prev,
                    company: {
                      ...prev.company,
                      companyType: type as "Public" | "Proprietary",
                    },
                  }));
                }}
                className="hidden"
              />
              {type}
            </label>
          ))}
        </div>


 <input
          type="text"
          placeholder="Company number"
          className="border-b outline-none px-2 py-1 border-monefi-off-white text-monefi-off-white"
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              company: { ...prev.company, companyNumber: e.target.value },
            }))
          }
          value={formData.company?.companyNumber}
        />
        <input
          type="text"
          placeholder="tax code"
          className="border-b outline-none px-2 py-1 border-monefi-off-white text-monefi-off-white"
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              company: { ...prev.company, taxCode: e.target.value },
            }))
          }
          value={formData.company?.taxCode}
        />

        <div className="col-span-full flex flex-col gap-2.5">
            <p className="font-semibold text-white">Tax Exemption</p>
          {["Yes" , "No"].map((type) => (
            <label
              key={type}
              className={`cursor-pointer px-4 py-2 rounded-md border ${
                formData.company?.taxCodeExemption === type
                  ? "bg-monefi-black text-monefi-off-white border-monefi-black"
                  : "border-monefi-off-white text-monefi-off-white"
              }`}
            >
              <input
                type="radio"
                name="accountType"
                value={type}
                checked={formData.company?.taxCodeExemption === type}
                onChange={() => {
                  setFormData((prev) => ({
                    ...prev,
                    company: {
                      ...prev.company,
                      taxCodeExemption: type as "Yes" | "No",
                    },
                  }));
                }}
                className="hidden"
              />
              {type}
            </label>
          ))}
        </div>
<div className="w-full">
<label htmlFor="" className="text-monefi-off-white text-sm">Date of Registration</label>
        <input
          type="date"
          placeholder="Date of Registration"
          className="border-b outline-none px-2 py-1 border-monefi-off-white text-monefi-off-white w-full"
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              company: { ...prev.company, dateOfRegistration: e.target.value },
            }))
          }
          value={formData.company?.dateOfRegistration}
        />
</div>
         <input
          type="text"
          placeholder="Nature of Business"
          className="border-b outline-none px-2 py-1 border-monefi-off-white text-monefi-off-white"
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              company: { ...prev.company, natureOfBusiness: e.target.value },
            }))
          }
          value={formData.company?.natureOfBusiness}
        />





      </div>

      <div className="flex justify-between items-start">
        <button
          className="cursor-pointer px-3 hover:px-3.5 py-1 hover:opacity-90 duration-300 border  text-monefi-off-white rounded-md"
          onClick={() => setStage("Account type")}
        >
          Previous
        </button>
        <button
          className="cursor-pointer px-3 hover:px-3.5 py-1 hover:opacity-90 duration-300 rounded-md text-monefi-pink bg-monefi-black"
          onClick={() => {
            // Validate address fields before proceeding
            if (!formData.company?.name ||!formData.company.companyType || !formData.company?.companyNumber || !formData.company?.taxCode || !formData.company.taxCodeExemption || !formData.company?.dateOfRegistration || !formData.company?.natureOfBusiness) {
              toast.error("Please fill in all address fields.");
              return;
            }
            setStage("Company Category");
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
