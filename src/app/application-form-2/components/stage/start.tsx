import React from "react";
import { FormDataType, StageType } from "../Form";
import toast from "react-hot-toast";

interface StartProps {
  setStage: React.Dispatch<React.SetStateAction<StageType>>;
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Start({ setStage, formData, setFormData }: StartProps) {
  return (
    <div className="h-full w-full lg:w-1/2 bg-monefi-pink py-10 px-5 flex flex-col items-center justify-center gap-5 text-monefi-black">
      <h2 className="text-2xl font-semibold">Account Application</h2>
      <p className="text-center">
        Please enter your registered email address <br /> below and click start
        application.
      </p>
      <input
        type="email"
        className="px-3 py-2 border rounded-md"
        placeholder="Enter your email address"
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, email: e.target.value }))
        }
        value={formData.email || ""}
      />
      <button
        className="text-monefi-pink px-4 py-2 rounded-lg bg-monefi-black hover:px-5 duration-200 cursor-pointer hover:opacity-90"
        onClick={() => {
          if (emailRegex.test(formData.email || "")) {
            setStage("Account type");
          } else {
            toast.error("Please enter a valid email address.");
          }
        }}
      >
        Start Application
      </button>
    </div>
  );
}
