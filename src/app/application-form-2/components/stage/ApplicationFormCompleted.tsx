import React, { useCallback } from "react";
import { FormDataType } from "../Form";
import toast from "react-hot-toast";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import usePaths from "@/hooks/usePaths";

interface StartProps {
  formData: FormDataType;
}

export default function ApplicationFormCompleted({ formData }: StartProps) {
  const router = useRouter()
  const paths = usePaths()

  const completeApplicationForm = useCallback(
    async (data:FormDataType) => {
      try {
        await toast.promise(api.post("/application_form",data),{
          loading:"Application is submitting...",
          error:"Application submission has some errors",
          success:"Your application has been submitted. Please wait while we review and verify it."
        })
        router.push(paths.home)
      } catch (error) {
        console.log(error);
      }
    },
    [paths.home,router],
  )
  
  return (
    <div className="h-full w-full lg:w-1/2 bg-monefi-pink py-10 px-5 flex flex-col items-center justify-center gap-5 text-monefi-black">
      <h2 className="text-2xl font-semibold text-center">Application form completed</h2>
      <p className="text-center">Review and submit your application.</p>

      <button className="text-monefi-pink px-4 py-2 rounded-lg bg-monefi-black hover:px-5 duration-200 cursor-pointer hover:opacity-90" onClick={()=>completeApplicationForm(formData)}>
        Submit
      </button>
    </div>
  );
}
