import React from "react";
import { FormDataType, StageType } from "../Form";
import toast from "react-hot-toast";

interface AccountTypeProps {
  setStage: React.Dispatch<React.SetStateAction<StageType>>;
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
}

export default function JointDetails({
  setStage,
  formData,
  setFormData,
}: AccountTypeProps) {
  return (
    <div className="h-full w-full lg:w-1/2 bg-bakerjonesholdings-pink py-10 px-5  text-bakerjonesholdings-black flex flex-col gap-5 overflow-scroll">
      <h2 className="text-2xl font-semibold">Personal Information (Joint)</h2>
      <p className="text-sm">
        If you need our assistance to complete the account opening process we
        are happy to help. Simply email
        info@bakerjonesholdings.com
      </p>
      <div className="grid lg:grid-cols-2 gap-5">
        <select
          className="border-b outline-none px-2 py-1 border-bakerjonesholdings-off-white text-bakerjonesholdings-off-white"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, jointHolder: { ...prev.jointHolder, title: e.target.value } }))
          }
          value={formData?.jointHolder?.title}
        >
          <option className="bg-bakerjonesholdings-pink" value="">
            Title
          </option>
          <option className="bg-bakerjonesholdings-pink" value="Mr">
            Mr
          </option>
          <option className="bg-bakerjonesholdings-pink" value="Mrs">
            Mrs
          </option>
          <option className="bg-bakerjonesholdings-pink" value="Miss">
            Miss
          </option>
          <option className="bg-bakerjonesholdings-pink" value="Ms">
            Ms
          </option>
          <option className="bg-bakerjonesholdings-pink" value="Dr">
            Dr
          </option>
          <option className="bg-bakerjonesholdings-pink" value="Prof">
            Prof
          </option>
          <option className="bg-bakerjonesholdings-pink" value="Other">
            Other
          </option>
        </select>
        <div className=""></div>
        <input
          type="text"
          placeholder="First Name"
          className="border-b outline-none px-2 py-1 border-bakerjonesholdings-off-white text-bakerjonesholdings-off-white"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, jointHolder:{...prev.jointHolder,firstName:e.target.value} }))
          }
          value={formData?.jointHolder?.firstName}
        />
        <input
          type="text"
          placeholder="Last Name"
          className="border-b outline-none px-2 py-1 border-bakerjonesholdings-off-white text-bakerjonesholdings-off-white"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, jointHolder:{...prev.jointHolder,lastName:e.target.value} }))
          }
          value={formData?.jointHolder?.lastName}
        />
        <div className="w-full">
<label htmlFor="" className="text-bakerjonesholdings-off-white text-sm">Date Of Birth</label>
        <input
          type="date"
          placeholder="Date of Birth"
          className="border-b outline-none px-2 py-1 border-bakerjonesholdings-off-white text-bakerjonesholdings-off-white accent-bakerjonesholdings-off-white w-full"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, jointHolder:{...prev.jointHolder,dateOfBirth:e.target.value} }))
          }
          value={formData?.jointHolder?.dateOfBirth}
        />
        </div>
        <input
          type="text"
          placeholder="Occupation"
          className="border-b outline-none px-2 py-1 border-bakerjonesholdings-off-white text-bakerjonesholdings-off-white"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, jointHolder:{...prev.jointHolder,occupation:e.target.value} }))
          }
          value={formData?.jointHolder?.occupation}
        />
        <input
          type="text"
          placeholder="Occupation Category"
          className="border-b outline-none px-2 py-1 border-bakerjonesholdings-off-white text-bakerjonesholdings-off-white"
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              jointHolder:{...prev.jointHolder,occupationCategory:e.target.value}
            }))
          }
          value={formData?.jointHolder?.occupationCategory}
        />
       

        <input
          type="text"
          placeholder="Home Phone"
          className="border-b outline-none px-2 py-1 border-bakerjonesholdings-off-white text-bakerjonesholdings-off-white"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, jointHolder:{...prev.jointHolder,homePhone:e.target.value} }))
          }
          value={formData?.jointHolder?.homePhone}
        />
        <input
          type="text"
          placeholder="Mobile Phone"
          className="border-b outline-none px-2 py-1 border-bakerjonesholdings-off-white text-bakerjonesholdings-off-white"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, jointHolder:{...prev.jointHolder,mobilePhone:e.target.value} }))
          }
          value={formData?.jointHolder?.mobilePhone}
        />
        
      </div>

      <div className="flex justify-between items-start">
        <button
          className="cursor-pointer px-3 hover:px-3.5 py-1 hover:opacity-90 duration-300 border  text-bakerjonesholdings-off-white rounded-md"
          onClick={() => setStage("Address")}
        >
          Previous
        </button>
        <button
          className="cursor-pointer px-3 hover:px-3.5 py-1 hover:opacity-90 duration-300 rounded-md text-bakerjonesholdings-pink bg-bakerjonesholdings-black"
          onClick={() => {
            if (!formData?.jointHolder?.title) {
              toast.error("Please select a title");
              return;
            }
            if (!formData?.jointHolder?.firstName) {
              toast.error("Please enter your first name");
              return;
            }
            if (!formData?.jointHolder?.lastName) {
              toast.error("Please enter your last name");
              return;
            }
            if (!formData?.jointHolder?.dateOfBirth) {
              toast.error("Please enter your date of birth");
              return;
            }
            if (!formData?.jointHolder?.occupation) {
              toast.error("Please enter your occupation");
              return;
            }
            if (!formData?.jointHolder?.occupationCategory) {
              toast.error("Please enter your occupation category");
              return;
            }
            if (!formData?.jointHolder?.homePhone) {
              toast.error("Please enter your home phone");
              return;
            }
            if (!formData?.jointHolder?.mobilePhone) {
              toast.error("Please enter your mobile phone");
              return;
            }
           
            // If all validations pass, proceed to the next stage
            setStage("Joint address");
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
