"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  FileText,
  Upload,
  Home,
  Shield,
  CheckCircle2,
  Info,
  Loader2,
  Clock,
  XCircle,
} from "lucide-react";
import clsx from "clsx";
import toast from "react-hot-toast";
import api from "@/services/api";
import useSWR from "swr";

type DocKind = "address" | "identity";

const MAX_SIZE_MB = 10;

export default function KycPage() {
  const {
    data: kycStatusData,
    isLoading: KycStatusLoading,
    mutate: kycStatusMutate,
  } = useSWR<{
    data: "Not submitted" | "Pending" | "Completed" | "Expired" | "Rejected";
  }>("/users/kyc_status");
  const kycStatus = kycStatusData?.data || "Not submitted";
  // form state
  const [addressProof, setAddressProof] = useState<string>("");
  const [identityProof, setIdentityProof] = useState<string>("");

  const [addressUpload, setAddressUpload] = useState<string | null>(null);
  const [identityUpload, setIdentityUpload] = useState<string | null>(null);

  async function validateAndSet(kind: DocKind, f: File | null) {
    if (!f) return;
    let err: string | null = null;


    if (!err && f.size > MAX_SIZE_MB * 1024 * 1024) {
      err = `Max file size is ${MAX_SIZE_MB} MB.`;
    }

    const form = new FormData();
    form.append("file", f);
    try {
      const { data } = await toast.promise(api.post("/uploads", form), {
        loading: "Uploading...",
        success: "File uploaded successfully!",
        error: "Upload failed. Please try again.",
      });

      if (kind === "address") setAddressUpload(data.data);
      if (kind === "identity") setIdentityUpload(data.data);
    } catch (error) {
      console.log(error);
    }
  }


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await toast.promise(
        api.post("/users/kyc", {
          identityVerification: {
            proof: identityProof,
            file: identityUpload,
          },
          proofOfAddress: {
            proof: addressProof,
            file: addressUpload,
          },
        }),
        {
          loading: "Submitting....",
          success: ({ data }) => data.message,
          error: ({ response }) => response.data.message,
        }
      );
      kycStatusMutate();
    } catch (error) {
      console.log(error);
    }
  }

  const baseCard =
    "flex flex-col items-center justify-center p-10 rounded-2xl shadow-lg transition-all duration-300";

  if (KycStatusLoading) {
    return (
      <div className={`${baseCard} bg-gradient-to-br from-gray-50 to-gray-100`}>
        <Loader2 className="animate-spin w-20 h-20 mb-6 text-gray-500" />
        <h2 className="text-2xl font-bold text-gray-700">
          Checking your KYC status...
        </h2>
      </div>
    );
  }

  if (kycStatus === "Pending") {
    return (
      <div
        className={`${baseCard} bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200`}
      >
        <Clock className="w-24 h-24 mb-6 text-yellow-500 animate-pulse" />
        <h2 className="text-3xl font-extrabold text-yellow-700 mb-2">
          KYC Under Review
        </h2>
        <p className="text-lg text-yellow-600 text-center">
          Please wait, we are reviewing your KYC. <br /> This may take up to 24
          hours.
        </p>
      </div>
    );
  }

  if (kycStatus === "Completed") {
    return (
      <div
        className={`${baseCard} bg-gradient-to-br from-green-50 to-green-100 border border-green-200`}
      >
        <CheckCircle2 className="w-24 h-24 mb-6 text-green-500 animate-bounce" />
        <h2 className="text-3xl font-extrabold text-green-700 mb-2">
          KYC Completed ✅
        </h2>
        <p className="text-lg text-green-600 text-center">
          Congratulations! Your KYC verification is successful.
        </p>
      </div>
    );
  }

  if (kycStatus === "Rejected") {
    return (
      <div
        className={`${baseCard} bg-gradient-to-br from-red-50 to-red-100 border border-red-200`}
      >
        <XCircle className="w-24 h-24 mb-6 text-red-500 animate-shake" />
        <h2 className="text-3xl font-extrabold text-red-700 mb-2">
          KYC Rejected ❌
        </h2>
        <p className="text-lg text-red-600 text-center">
          Your KYC was rejected. <br /> Please re-upload your documents.
        </p>
      </div>
    );
  }

  if (kycStatus === "Not submitted")
    return (
      <div className="w-full space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-bakerjonesholdings-black flex items-center gap-2">
            <Shield className="h-6 w-6" />
            Know Your Customer (KYC)
          </h1>
          <p className="text-sm text-slate-600">
            Help us verify your identity and address to keep your account
            secure.
          </p>
        </div>

        {/* Help card */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="p-5 flex items-start gap-3">
            <Info className="h-5 w-5 mt-0.5 text-slate-500" />
            <p className="text-sm text-slate-700">
              Need assistance? Call <b>020 8002 8761</b>{" "}
              or email <b>hello@bakerjonesholdings.com</b>
            </p>
          </div>
        </div>

        {/* Main form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-slate-200 bg-white shadow-sm"
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-5 py-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              <h2 className="text-lg font-semibold text-bakerjonesholdings-black">
                Verification Details
              </h2>
            </div>
            {addressUpload && identityUpload ? (
              <div className="flex items-center gap-2 text-emerald-600 text-sm">
                <CheckCircle2 className="h-5 w-5" />
                Ready to submit
              </div>
            ) : (
              <div className="text-xs text-slate-500">
                Select document types & upload files
              </div>
            )}
          </div>
          <Separator />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-5">
            {/* Address Proof */}
            <section className="rounded-2xl border border-slate-100 bg-slate-50/40 p-5">
              <div className="flex items-center gap-2 mb-4">
                <Home className="h-5 w-5" />
                <h3 className="text-base font-semibold text-bakerjonesholdings-black">
                  Proof of Address
                </h3>
              </div>

              <div className="space-y-3">
                <div className="flex flex-col gap-1">
                  <Label htmlFor="address-proof">Document Type</Label>
                  <Select
                    onValueChange={(v) => setAddressProof(v)}
                    value={addressProof || undefined}
                  >
                    <SelectTrigger id="address-proof">
                      <SelectValue placeholder="Select Proof of Address" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup className="bg-white">
                        <SelectLabel>Proof of Address</SelectLabel>
                        <SelectItem value="Utility Bill">
                          Utility Bill
                        </SelectItem>
                        <SelectItem value="Driving Licence">
                          Driving Licence
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-slate-500">
                    Must show full name & current address, dated within the last
                    3 months.
                  </p>
                </div>

                {/* Upload appears once selected */}
                {addressProof && (
                  <UploadBlock
                    kind="address"
                    current={addressUpload}
                    onFile={(f) => validateAndSet("address", f)}

                  />
                )}
              </div>
            </section>

            {/* Identity Proof */}
            <section className="rounded-2xl border border-slate-100 bg-slate-50/40 p-5">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-5 w-5" />
                <h3 className="text-base font-semibold text-bakerjonesholdings-black">
                  Identity Verification
                </h3>
              </div>

              <div className="space-y-3">
                <div className="flex flex-col gap-1">
                  <Label htmlFor="identity-proof">Document Type</Label>
                  <Select
                    onValueChange={(v) => setIdentityProof(v)}
                    value={identityProof || undefined}
                  >
                    <SelectTrigger id="identity-proof">
                      <SelectValue placeholder="Select Identity Verification" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup className="bg-white">
                        <SelectLabel>Identity Verification</SelectLabel>
                        <SelectItem value="International travel document">
                          International travel document (Passport)
                        </SelectItem>
                        <SelectItem value="Driving Licence">
                          Driving Licence
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-slate-500">
                    Must be valid and unexpired. Ensure details are clearly
                    visible.
                  </p>
                </div>

                {/* Upload appears once selected */}
                {identityProof && (
                  <UploadBlock
                    kind="identity"
                    current={identityUpload}
                    onFile={(f) => validateAndSet("identity", f)}

                  />
                )}
              </div>
            </section>
          </div>

          <Separator />
          <div className="flex items-center justify-end p-5">
            <Button
              type="submit"
              disabled={!addressUpload || !identityUpload}
              className={clsx(
                "font-semibold text-black",
                "bg-bakerjonesholdings-off-pink hover:bg-bakerjonesholdings-off-pink"
              )}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    );
}

/** -------- Upload Block (re-usable) -------- */
function UploadBlock({
  kind,
  current,
  onFile,
}: {
  kind: DocKind;
  current: string | null;
  onFile: (file: File | null) => void;
}) {
  const inputId = `${kind}-upload`;

  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-white/80 p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <Upload className="h-5 w-5 mt-0.5" />
          <div>
            <div className="text-sm font-medium">
              {current ? "File uploaded successfully" : "Upload document"}
            </div>
            <p className="text-xs text-slate-500">
              Accepted: Max 10MB
            </p>
          </div>
        </div>

        {!current && (
          <label htmlFor={inputId} className="relative">
            <Input
              id={inputId}
              type="file"
              className="absolute inset-0 w-full h-full opacity-0"
              onChange={(e) => onFile(e.target.files?.[0] ?? null)}
            />
            <Button type="button" variant="secondary" className="font-medium">
              Choose file
            </Button>
          </label>
        )}
      </div>

      {/* File chip / error */}
      {!current && (
        <div className="mt-3">
          <p className="text-xs text-slate-500">No file selected yet.</p>
        </div>
      )}
    </div>
  );
}
