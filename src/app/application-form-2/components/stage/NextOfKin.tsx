import React from "react";
import { FormDataType, StageType } from "../Form";
import toast from "react-hot-toast";

interface AddressProps {
  setStage: React.Dispatch<React.SetStateAction<StageType>>;
  formData: FormDataType;
      setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
}

export default function NextOfKin({ setStage,formData,setFormData }: AddressProps) {
  return (
    <div className="h-full w-full lg:w-1/2 bg-bakerjonesholdings-pink py-10 px-5  text-bakerjonesholdings-black flex flex-col gap-5">
      <h2 className="text-2xl font-semibold">Next Of Kin</h2>
      <p className="text-sm">
        If you need our assistance to complete the account opening process we
        are happy to help. Simply contact us on  020 8002 8761 or email
        hello@bakerjonesholdings.com
      </p>
      <div className="grid grid-cols-2 gap-5">
        <input
          type="text"
          placeholder="Contact Name:"
          className="border-b outline-none px-2 py-1 border-bakerjonesholdings-off-white text-bakerjonesholdings-off-white"
          value={formData.nextOfKinName.name}
            onChange={(e) =>setFormData((prev) => ({...prev, nextOfKinName: { ...prev.nextOfKinName, name: e.target.value } }))}
        />
        <input
          type="text"
          placeholder="Home Phone:"
          className="border-b outline-none px-2 py-1 border-bakerjonesholdings-off-white text-bakerjonesholdings-off-white"
          value={formData.nextOfKinName.homePhone}
            onChange={(e) =>setFormData((prev) => ({...prev, nextOfKinName: { ...prev.nextOfKinName, homePhone: e.target.value } }))}
        />
        <input
          type="text"
          placeholder="Mobile Phone:"
          className="border-b outline-none px-2 py-1 border-bakerjonesholdings-off-white text-bakerjonesholdings-off-white"
           value={formData.nextOfKinName.mobilePhone}
            onChange={(e) =>setFormData((prev) => ({...prev, nextOfKinName: { ...prev.nextOfKinName, mobilePhone: e.target.value } }))}
        />
        <input
          type="text"
          placeholder="Email address:"
          className="border-b outline-none px-2 py-1 border-bakerjonesholdings-off-white text-bakerjonesholdings-off-white"
           value={formData.nextOfKinName.email}
            onChange={(e) =>setFormData((prev) => ({...prev, nextOfKinName: { ...prev.nextOfKinName, email: e.target.value } }))}
        />
      </div>

      <div className="flex justify-between items-start">
        <button
          className="cursor-pointer px-3 hover:px-3.5 py-1 hover:opacity-90 duration-300 border  text-bakerjonesholdings-off-white rounded-md"
          onClick={() => setStage("Bank Account")}
        >
          Previous
        </button>
        <button
          className="cursor-pointer px-3 hover:px-3.5 py-1 hover:opacity-90 duration-300 rounded-md text-bakerjonesholdings-pink bg-bakerjonesholdings-black"
          onClick={() => {
            if(!formData.nextOfKinName.name ||
              !formData.nextOfKinName.homePhone ||
              !formData.nextOfKinName.mobilePhone ||
              !formData.nextOfKinName.email) {
              toast.error("Please fill in all Next of Kin fields.");
              return;
            }
            setStage("Application Form Completed")}}
        >
          Next
        </button>
      </div>
    </div>
  );
}
