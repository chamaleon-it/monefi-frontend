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
    <div className="h-full w-full lg:w-1/2 bg-bakerjonesholdings-pink py-10 px-5  text-white flex flex-col gap-5 overflow-scroll">
      <h2 className="text-2xl font-semibold">Company Tax Information</h2>
      <p className="text-sm">
        If you need our assistance to complete the account opening process we
        are happy to help. Simply email
        info@bakerjonesholdings.com
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
                  ? "bg-bakerjonesholdings-black text-bakerjonesholdings-off-white border-bakerjonesholdings-black"
                  : "border-bakerjonesholdings-off-white text-bakerjonesholdings-off-white"
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
          className="cursor-pointer px-3 hover:px-3.5 py-1 hover:opacity-90 duration-300 border  text-bakerjonesholdings-off-white rounded-md"
          onClick={() => setStage("Company Registered Address")}
        >
          Previous
        </button>
        <button
          className="cursor-pointer px-3 hover:px-3.5 py-1 hover:opacity-90 duration-300 rounded-md text-white bg-bakerjonesholdings-black"
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
