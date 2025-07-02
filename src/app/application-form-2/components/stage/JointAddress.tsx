import React from "react";
import { FormDataType, StageType } from "../Form";
import toast from "react-hot-toast";

interface AddressProps {
  setStage: React.Dispatch<React.SetStateAction<StageType>>;
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
}

export default function JointAddress({
  setStage,
  formData,
  setFormData,
}: AddressProps) {
  return (
    <div className="h-full w-full lg:w-1/2 bg-monefi-pink py-10 px-5  text-monefi-black flex flex-col gap-5">
      <h2 className="text-2xl font-semibold">
        Residential address information (Joint)
      </h2>
      <p className="text-sm">
        If you need our assistance to complete the account opening process we
        are happy to help. Simply contact us on 1111111111 or email
        info@monefi.co.uk
      </p>
      <div className="grid lg:grid-cols-2 gap-5">
        <input
          type="text"
          placeholder="Country"
          className="border-b outline-none px-2 py-1 border-monefi-off-white text-monefi-off-white"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, jointHolder: { ...prev.jointHolder, country: e.target.value } }))
          }
          value={formData.jointHolder.country}
        />
        <input
          type="text"
          placeholder="House number or name:"
          className="border-b outline-none px-2 py-1 border-monefi-off-white text-monefi-off-white"
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              jointHolder: { ...prev.jointHolder, houseNumberOrName: e.target.value },
            }))
          }
          value={formData.jointHolder.houseNumberOrName}
        />
        <input
          type="text"
          placeholder="Street Name"
          className="border-b outline-none px-2 py-1 border-monefi-off-white text-monefi-off-white"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, jointHolder: { ...prev.jointHolder, streetName: e.target.value } }))
          }
          value={formData.jointHolder.streetName}
        />
        <input
          type="text"
          placeholder="Town"
          className="border-b outline-none px-2 py-1 border-monefi-off-white text-monefi-off-white"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, jointHolder: { ...prev.jointHolder, town: e.target.value } }))
          }
          value={formData.jointHolder.town}
        />
        <input
          type="text"
          placeholder="County/Region"
          className="border-b outline-none px-2 py-1 border-monefi-off-white text-monefi-off-white"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, jointHolder: { ...prev.jointHolder, region: e.target.value } }))
          }
          value={formData.jointHolder.region}
        />
        <input
          type="text"
          placeholder="Postcode"
          className="border-b outline-none px-2 py-1 border-monefi-off-white text-monefi-off-white"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, jointHolder: { ...prev.jointHolder, postcode: e.target.value } }))
          }
          value={formData.jointHolder.postcode}
        />
      </div>

      <div className="flex justify-between items-start">
        <button
          className="cursor-pointer px-3 hover:px-3.5 py-1 hover:opacity-90 duration-300 border  text-monefi-off-white rounded-md"
          onClick={() => setStage("Joint details")}
        >
          Previous
        </button>
        <button
          className="cursor-pointer px-3 hover:px-3.5 py-1 hover:opacity-90 duration-300 rounded-md text-monefi-pink bg-monefi-black"
          onClick={() => {
            // Validate address fields before proceeding
            if (
              !formData.jointHolder.country ||
              !formData.jointHolder.houseNumberOrName ||
              !formData.jointHolder.streetName ||
              !formData.jointHolder.town ||
              !formData.jointHolder.region ||
              !formData.jointHolder.postcode
            ) {
              toast.error("Please fill in all address fields.");
              return;
            }
            setStage("Identity Verification");
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
