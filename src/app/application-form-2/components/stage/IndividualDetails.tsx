import React from "react";
import { FormDataType, StageType } from "../Form";
import toast from "react-hot-toast";

interface AccountTypeProps {
  setStage: React.Dispatch<React.SetStateAction<StageType>>;
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
}

export default function IndividualDetails({
  setStage,
  formData,
  setFormData,
}: AccountTypeProps) {
  return (
    <div className="h-full w-full lg:w-1/2 bg-monefi-pink py-10 px-5  text-monefi-black flex flex-col gap-5 overflow-scroll">
      <h2 className="text-2xl font-semibold">Personal Information</h2>
      <p className="text-sm">
        If you need our assistance to complete the account opening process we
        are happy to help. Simply contact us on 02080028761 or email
        hello@monefi.co.uk
      </p>
      <div className="grid lg:grid-cols-2 gap-5">
        <select
          className="border-b outline-none px-2 py-1 border-monefi-off-white text-monefi-off-white"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
          value={formData.title}
        >
          <option className="bg-monefi-pink" value="">
            Title
          </option>
          <option className="bg-monefi-pink" value="Mr">
            Mr
          </option>
          <option className="bg-monefi-pink" value="Mrs">
            Mrs
          </option>
          <option className="bg-monefi-pink" value="Miss">
            Miss
          </option>
          <option className="bg-monefi-pink" value="Ms">
            Ms
          </option>
          <option className="bg-monefi-pink" value="Dr">
            Dr
          </option>
          <option className="bg-monefi-pink" value="Prof">
            Prof
          </option>
          <option className="bg-monefi-pink" value="Other">
            Other
          </option>
        </select>
        <div className=""></div>
        <input
          type="text"
          placeholder="First Name"
          className="border-b outline-none px-2 py-1 border-monefi-off-white text-monefi-off-white"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, firstName: e.target.value }))
          }
          value={formData.firstName}
        />
        <input
          type="text"
          placeholder="Last Name"
          className="border-b outline-none px-2 py-1 border-monefi-off-white text-monefi-off-white"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, lastName: e.target.value }))
          }
          value={formData.lastName}
        />
        <div className="w-full">
<label htmlFor="" className="text-monefi-off-white text-sm">Date Of Birth</label>
        <input
          type="date"
          placeholder="Date of Birth"
          className="border-b outline-none px-2 py-1 border-monefi-off-white text-monefi-off-white accent-monefi-off-white w-full"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, dateOfBirth: e.target.value }))
          }
          value={formData.dateOfBirth}
          />
          </div>
        <input
          type="text"
          placeholder="Occupation"
          className="border-b outline-none px-2 py-1 border-monefi-off-white text-monefi-off-white"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, occupation: e.target.value }))
          }
          value={formData.occupation}
        />
        <input
          type="text"
          placeholder="Occupation Category"
          className="border-b outline-none px-2 py-1 border-monefi-off-white text-monefi-off-white"
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              occupationCategory: e.target.value,
            }))
          }
          value={formData.occupationCategory}
        />
        <div className=""></div>

        <input
          type="text"
          placeholder="Home Phone"
          className="border-b outline-none px-2 py-1 border-monefi-off-white text-monefi-off-white"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, homePhone: e.target.value }))
          }
          value={formData.homePhone}
        />
        <input
          type="text"
          placeholder="Mobile Phone"
          className="border-b outline-none px-2 py-1 border-monefi-off-white text-monefi-off-white"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, mobilePhone: e.target.value }))
          }
          value={formData.mobilePhone}
        />
        <input
          type="text"
          placeholder="Password"
          className="border-b outline-none px-2 py-1 border-monefi-off-white text-monefi-off-white"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, password: e.target.value }))
          }
          value={formData.password}
        />
        <input
          type="text"
          placeholder="Confirm Password"
          className="border-b outline-none px-2 py-1 border-monefi-off-white text-monefi-off-white"
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              confirmPassword: e.target.value,
            }))
          }
          value={formData.confirmPassword}
        />
      </div>

      <div className="flex justify-between items-start">
        <button
          className="cursor-pointer px-3 hover:px-3.5 py-1 hover:opacity-90 duration-300 border  text-monefi-off-white rounded-md"
          onClick={() =>{
            if(formData.accountType === "Company") {
             setStage("Company Ownership")
            }
            else {
              setStage("Account type");
            }
          }}
        >
          Previous
        </button>
        <button
          className="cursor-pointer px-3 hover:px-3.5 py-1 hover:opacity-90 duration-300 rounded-md text-monefi-pink bg-monefi-black"
          onClick={() => {
            if (!formData.title) {
              toast.error("Please select a title");
              return;
            }
            if (!formData.firstName) {
              toast.error("Please enter your first name");
              return;
            }
            if (!formData.lastName) {
              toast.error("Please enter your last name");
              return;
            }
            if (!formData.dateOfBirth) {
              toast.error("Please enter your date of birth");
              return;
            }
            if (!formData.occupation) {
              toast.error("Please enter your occupation");
              return;
            }
            if (!formData.occupationCategory) {
              toast.error("Please enter your occupation category");
              return;
            }
            if (!formData.homePhone) {
              toast.error("Please enter your home phone");
              return;
            }
            if (!formData.mobilePhone) {
              toast.error("Please enter your mobile phone");
              return;
            }
            if (!formData.password) {
              toast.error("Please enter your password");
              return;
            }
            if(!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(formData.password)){
              toast.error("Password must be at least 8 characters, include one letter and one number");
              return
            }
            if (!formData.confirmPassword) {
              toast.error("Please confirm your password");
              return;
            }
            if (formData.password !== formData.confirmPassword) {
              toast.error("Passwords do not match");
              return;
            }
            // If all validations pass, proceed to the next stage
            setStage("Address");
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
