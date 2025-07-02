
import React from 'react'
import { FormDataType, StageType } from '../Form';
import toast from 'react-hot-toast';


interface Props {
  setStage: React.Dispatch<React.SetStateAction<StageType>>;
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
}
export default function RegisteredOfficeAddress({ setStage, formData, setFormData }: Props) {
  return (
   <div className="h-full w-full lg:w-1/2 bg-monefi-pink py-10 px-5  text-monefi-black flex flex-col gap-5 overflow-scroll">
      <h2 className="text-2xl font-semibold">Company Registered Address</h2>
      <p className="text-sm">
        If you need our assistance to complete the account opening process we
        are happy to help. Simply contact us on 1111111111 or email
        info@monefi.co.uk
      </p>
      <div className="grid lg:grid-cols-2 gap-5">
        <input
          type="text"
          placeholder="Address"
          className="border-b outline-none px-2 py-1 border-monefi-off-white text-monefi-off-white"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, company: { ...prev.company, address: e.target.value } }))
          }
          value={formData.company.address}
        />
        <input
          type="text"
          placeholder="Street Name"
          className="border-b outline-none px-2 py-1 border-monefi-off-white text-monefi-off-white"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, company: { ...prev.company, streetName: e.target.value } }))
          }
          value={formData.company.streetName}
        />
        <input
          type="text"
          placeholder="Town"
          className="border-b outline-none px-2 py-1 border-monefi-off-white text-monefi-off-white"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, company: { ...prev.company, town: e.target.value } }))
          }
          value={formData.company.town}
        />
        <input
          type="text"
          placeholder="Region"
          className="border-b outline-none px-2 py-1 border-monefi-off-white text-monefi-off-white"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, company: { ...prev.company, region: e.target.value } }))
          }
          value={formData.company.region}
        />
        <input
          type="text"
          placeholder="Postcode"
          className="border-b outline-none px-2 py-1 border-monefi-off  -white text-monefi-off-white"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, company: { ...prev.company, postcode: e.target.value } }))
          }
          value={formData.company.postcode}
        />
        <input
          type="text"
          placeholder="Country"
          className="border-b outline-none px-2 py-1 border-monefi-off-white text-monefi-off-white"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, company: { ...prev.company, country: e.target.value } }))
          }
          value={formData.company.country}
        />
      </div>

      <div className="flex justify-between items-start">
        <button
          className="cursor-pointer px-3 hover:px-3.5 py-1 hover:opacity-90 duration-300 border  text-monefi-off-white rounded-md"
          onClick={() => setStage("Company Category")}
        >
          Previous
        </button>
        <button
          className="cursor-pointer px-3 hover:px-3.5 py-1 hover:opacity-90 duration-300 rounded-md text-monefi-pink bg-monefi-black"
          onClick={() => {
           if(!formData.company.address || !formData.company.streetName || !formData.company.town || !formData.company.region || !formData.company.postcode || !formData.company.country) {
              toast.error("Please fill in all address fields.");
              return;
            }
            setStage("Company Tax Information");
          }}
        >
          Next
        </button>
      </div>
      </div>
  )
}
