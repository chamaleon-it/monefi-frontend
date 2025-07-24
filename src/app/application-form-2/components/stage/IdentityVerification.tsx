import React, { useCallback, useState } from "react";
import { FormDataType, StageType } from "../Form";
import { CheckCircle, ImageUp } from "lucide-react";
import toast from "react-hot-toast";
import api from "@/services/api";
import getConfig from "@/config/configuration";

interface AccountTypeProps {
  setStage: React.Dispatch<React.SetStateAction<StageType>>;
  formData: FormDataType;
    setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
}

export default function IdentityVerification({ setStage,formData,setFormData }: AccountTypeProps) {
  return (
    <div className="h-full w-full lg:w-1/2 bg-monefi-pink py-10 px-5  text-monefi-black flex flex-col gap-5 overflow-auto">
      <h2 className="text-2xl font-semibold">Identity Verification</h2>
      <p className="text-sm">
        If you need our assistance to complete the account opening process we
        are happy to help. Simply contact us on 02080028761 or email
        hello@monefi.co.uk
      </p>
      <div className="flex flex-col gap-5">
        {[
          "International travel document",
          "Driving Licence",
          "Email Identification",
        ].map((type) => (
          <label
            key={type}
            className={`cursor-pointer px-4 py-2 rounded-md border ${
              formData.identityVerification === type
                ? "bg-monefi-black text-monefi-off-white border-monefi-black"
                : "border-monefi-off-white text-monefi-off-white"
            }`}
          >
            <input
              type="radio"
              name="accountType"
              value={type}
              checked={formData.identityVerification === type}
              onChange={()=>{
                setFormData(prev=>({...prev, identityVerification: type as "International travel document" | "Driving Licence" | "Email Identification",identityVerificationFile:""}));
                
              }}
              className="hidden"
            />
            {type}
          </label>
        ))}
      </div>

      {formData.identityVerification !== "Email Identification" && <UploadIdentity formData={formData} setFormData={setFormData}/>}

      <div className="flex justify-between items-start">
        <button
          className="cursor-pointer px-3 hover:px-3.5 py-1 hover:opacity-90 duration-300 border  text-monefi-off-white rounded-md"
          onClick={() => setStage("Address")}
        >
          Previous
        </button>
        <button
          className="cursor-pointer px-3 hover:px-3.5 py-1 hover:opacity-90 duration-300 rounded-md text-monefi-pink bg-monefi-black"
          onClick={() => {
            if(formData.identityVerification !== "Email Identification"){
              if(!formData.identityVerificationFile){
                toast.error("Please upload identity proof")
                return
              }
            }
            setStage("Proof of Address")
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}


const UploadIdentity = ({
  formData,
  setFormData,
}: {
  formData: FormDataType
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>
}) => {
  const [progress, setProgress] = useState<number>(0)
  const [uploadDone, setUploadDone] = useState<boolean>(false)

  const upload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const form = new FormData()
      if (!e.target.files?.length) {
        toast.error("Please select any files.")
        return
      }

      form.append("file", e.target.files[0])
      setProgress(0)
      setUploadDone(false)

      try {
        const { data } = await toast.promise(
          api.post("/uploads", form, {
            onUploadProgress: (event) => {
              const percent = Math.round((event.loaded * 100) / (event.total || 1))
              setProgress(percent)
            },
          }),
          {
            loading: "Uploading...",
            success: "File uploaded successfully!",
            error: "Upload failed. Please try again.",
          }
        )

        setFormData((prev) => ({ ...prev, identityVerificationFile: data.data }))
        setUploadDone(true)
      } catch (error) {
        setProgress(0)
      }
    },
    [setFormData]
  )

  return (
    <div className="border p-5 rounded-md border-monefi-off-white relative cursor-pointer flex flex-col justify-center items-center gap-5">
      <input
        type="file"
        className="absolute h-full w-full opacity-0 inset-0 z-10 cursor-pointer"
        onChange={upload}
      />

      {/* Status circle */}
      <div className="flex items-center justify-center w-20 h-20 relative">
        {uploadDone ? (
          <CheckCircle className="text-green-500 w-10 h-10" />
        ) : progress > 0 ? (
          <>
            <svg className="absolute w-full h-full">
              <circle
                cx="40"
                cy="40"
                r="35"
                stroke="#ccc"
                strokeWidth="5"
                fill="none"
              />
              <circle
                cx="40"
                cy="40"
                r="35"
                stroke="#3b82f6"
                strokeWidth="5"
                fill="none"
                strokeDasharray={2 * Math.PI * 35}
                strokeDashoffset={2 * Math.PI * 35 * (1 - progress / 100)}
                strokeLinecap="round"
                transform="rotate(-90 40 40)"
              />
            </svg>
            <span className="text-white font-medium z-10">{progress}%</span>
          </>
        ) : (
          <ImageUp width={50} height={50} className="text-monefi-off-white" />
        )}
      </div>

      <p className="text-monefi-off-white">
        Upload {formData.identityVerification}
      </p>
    </div>
  )
}