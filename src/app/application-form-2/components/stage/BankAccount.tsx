import React from "react";
import { FormDataType, StageType } from "../Form";
import toast from "react-hot-toast";

interface AccountTypeProps {
  setStage: React.Dispatch<React.SetStateAction<StageType>>;
  formData: FormDataType;
    setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
}

export default function BankAccount({ setStage,formData,setFormData }: AccountTypeProps) {
  return (
    <div className="h-full w-full lg:w-1/2 bg-monefi-pink py-10 px-5  text-monefi-black flex flex-col gap-5 overflow-auto">
      <h2 className="text-2xl font-semibold">Existing Bank Account</h2>
      <p className="text-sm">
        If you need our assistance to complete the account opening process we
        are happy to help. Simply contact us on 02080028761 or email
        hello@monefi.co.uk
      </p>
      <div className="flex flex-col gap-5">
        {[
          "Provide Existing Bank Account Details",
          "Email Existing Bank Account Details",
        ].map((type) => (
          <label
            key={type}
            className={`cursor-pointer px-4 py-2 rounded-md border ${
              formData.bankAccount === type
                ? "bg-monefi-black text-monefi-off-white border-monefi-black"
                : "border-monefi-off-white text-monefi-off-white"
            }`}
          >
            <input
              type="radio"
              name="accountType"
              value={type}
              checked={formData.bankAccount === type}
              className="hidden"
              onChange={()=>{
                setFormData(prev => ({
                  ...prev,
                  bankAccount: type as "Provide Existing Bank Account Details" | "Email Existing Bank Account Details"
                }));
              }}
            />
            {type}
          </label>
        ))}
      </div>

      {formData.bankAccount === "Provide Existing Bank Account Details" && <div className="grid lg:grid-cols-2 gap-5">
        <input
          type="text"
          placeholder="Bank Name"
          className="border-b outline-none px-2 py-1 border-monefi-off-white text-monefi-off-white"
          value={formData?.bankAccountDetails?.bankName}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            bankAccountDetails: {
              ...prev.bankAccountDetails,
              bankName: e.target.value
            }
          }))}
        />
        <input
          type="text"
          placeholder="Branch"
          className="border-b outline-none px-2 py-1 border-monefi-off-white text-monefi-off-white"
          value={formData?.bankAccountDetails?.branchName}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            bankAccountDetails: {
              ...prev.bankAccountDetails,
              branchName: e.target.value
            }
          }))}
        />
        <input
          type="text"
          placeholder="Account Name"
          className="border-b outline-none px-2 py-1 border-monefi-off-white text-monefi-off-white col-span-full"
          value={formData?.bankAccountDetails?.accountName}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            bankAccountDetails: {
              ...prev.bankAccountDetails,
              accountName: e.target.value
            }
          }))}
        />
        <input
          type="text"
          placeholder="BIC/Swift"
          className="border-b outline-none px-2 py-1 border-monefi-off-white text-monefi-off-white"
          value={formData?.bankAccountDetails?.bic_swift}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            bankAccountDetails: {
              ...prev.bankAccountDetails,
              bic_swift: e.target.value
            }
          }))}
        />
        <input
          type="text"
          placeholder="IBAN"
          className="border-b outline-none px-2 py-1 border-monefi-off-white text-monefi-off-white"
          value={formData?.bankAccountDetails?.iban}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            bankAccountDetails: {
              ...prev.bankAccountDetails,
              iban: e.target.value
            }
          }))}
        />
      </div>}

      <div className="flex justify-between items-start">
        <button
          className="cursor-pointer px-3 hover:px-3.5 py-1 hover:opacity-90 duration-300 border  text-monefi-off-white rounded-md"
          onClick={() => setStage("Purpose of Account")}
        >
          Previous
        </button>
        <button
          className="cursor-pointer px-3 hover:px-3.5 py-1 hover:opacity-90 duration-300 rounded-md text-monefi-pink bg-monefi-black"
          onClick={() => {
            if(formData.bankAccount === "Provide Existing Bank Account Details"){
              if(!formData?.bankAccountDetails?.bankName || !formData?.bankAccountDetails?.branchName || !formData?.bankAccountDetails?.accountName || !formData?.bankAccountDetails?.bic_swift || !formData?.bankAccountDetails?.iban){
               toast.error("Please fill in all the bank account details.");
                return;
              }
            }
            setStage("Next of Kin")
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
