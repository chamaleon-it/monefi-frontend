import { ApplicationFormInterface } from "@/interface/ApplicationForm.interface";
import React from "react";

interface PropsType {
  form: ApplicationFormInterface;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


export default function Stage1({ form }: PropsType) {
  const { setFormDate, formDate,setStage } = form;

  const handleStartApplication = () => {
    if (emailRegex.test(formDate.email || "")) {
      setStage(2); 
    } else {
      alert("Please enter a valid email address.");
    }
  };

  return (
    <div className="space-y-5 flex flex-col items-center justify-center h-full w-full min-h-[calc(100vh-40vh)] p-5">
      <h2 className="text-3xl font-semibold text-monefi-pink">
        Account Application
      </h2>
      <p className="text-lg text-center">
        Please enter your registered email address below and click start
        application.
      </p>
      <input
        type="email"
        placeholder="Enter your email"
        className="border p-2 rounded w-full mb-4 max-w-80 block"
        onChange={(e) =>
          setFormDate((prev) => ({ ...prev, email: e.target.value }))
        }
        value={formDate.email || ""}
      />
      <button className="bg-monefi-pink px-4 py-2 rounded-lg text-monefi-off-white" onClick={handleStartApplication}>
        Start Application
      </button>
    </div>
  );
}
