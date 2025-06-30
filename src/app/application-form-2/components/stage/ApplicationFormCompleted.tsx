import React from "react";
import { FormDataType, StageType } from "../Form";
import toast from "react-hot-toast";

interface StartProps {
  setStage: React.Dispatch<React.SetStateAction<StageType>>;
  formData: FormDataType;
}

export default function ApplicationFormCompleted({ setStage,formData }: StartProps) {
  return (
    <div className="h-full w-full lg:w-1/2 bg-monefi-pink py-10 px-5 flex flex-col items-center justify-center gap-5 text-monefi-black">
      <h2 className="text-2xl font-semibold">Application form completed</h2>
      <p className="text-center">Review and submit your application.</p>

      <button className="text-monefi-pink px-4 py-2 rounded-lg bg-monefi-black hover:px-5 duration-200 cursor-pointer hover:opacity-90" onClick={()=>{
        toast.success("Application submitted successfully!");
        console.log(formData);
        setStage("Start");
      }}>
        Submit
      </button>
    </div>
  );
}
