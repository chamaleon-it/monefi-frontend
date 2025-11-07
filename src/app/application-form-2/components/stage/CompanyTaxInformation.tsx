import React from 'react'
import { FormDataType, StageType } from '../Form';
import toast from 'react-hot-toast';



interface Props {
  setStage: React.Dispatch<React.SetStateAction<StageType>>;
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
}

export default function CompanyTaxInformation({formData,setFormData,setStage}: Props) {
  return (
    <div className="h-full w-full lg:w-1/2 bg-monefi-pink py-10 px-5  text-monefi-black flex flex-col gap-5 overflow-scroll">
      <h2 className="text-2xl font-semibold">Company Tax Information</h2>
      <p className="text-sm">
        If you need our assistance to complete the account opening process we
        are happy to help. Simply contact us on  020 8002 8761 or email
        hello@monefi.co.uk
      </p>
      <div className="col-span-full flex flex-col gap-5">
          {[ "Financial Institution"
      , "Public Listed Company, Majority owned subsidiary of a Public Listed Company or a Registered Charity"
      , " Active Non-Financial Entity (NFE)"
      , "None of the above"

    ].map((type) => (
            <label
              key={type}
              className={`cursor-pointer px-4 py-2 rounded-md border ${
                formData.company?.companyTaxInformation === type
                  ? "bg-monefi-black text-monefi-off-white border-monefi-black"
                  : "border-monefi-off-white text-monefi-off-white"
              }`}
            >
              <input
                type="radio"
                name="accountType"
                value={type}
                checked={formData.company?.companyTaxInformation === type}
                onChange={() => {
                  setFormData((prev) => ({
                    ...prev,
                    company: {
                      ...prev.company,
                      companyTaxInformation: type as "Financial Institution"
                        | "Public Listed Company, Majority owned subsidiary of a Public Listed Company or a Registered Charity"
                        | " Active Non-Financial Entity (NFE)"
                        | "None of the above",
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
          onClick={() => setStage("Company Registered Address")}
        >
          Previous
        </button>
        <button
          className="cursor-pointer px-3 hover:px-3.5 py-1 hover:opacity-90 duration-300 rounded-md text-monefi-pink bg-monefi-black"
          onClick={() => {
        if(!formData.company?.companyTaxInformation){
          toast.error("Select any tax information")
          return
        }
            setStage("Company Ownership");
          }}
        >
          Next
        </button>
      </div>
      </div>
  )
}
