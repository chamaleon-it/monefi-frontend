"use client";

import React, { useState } from "react";
import Start from "./stage/start";
import AccountType from "./stage/AccountType";
import IndividualDetails from "./stage/IndividualDetails";
import Address from "./stage/Address";
import IdentityVerification from "./stage/IdentityVerification";
import ProofofAddress from "./stage/ProofofAddress";
import PurposeofAccount from "./stage/PurposeofAccount";
import BankAccount from "./stage/BankAccount";
import NextOfKin from "./stage/NextOfKin";
import ApplicationFormCompleted from "./stage/ApplicationFormCompleted";
import JointDetails from "./stage/JointDetails";
import JointAddress from "./stage/JointAddress";
import CompanyInformation from "./stage/CompanyInformation";
import CompanyCategory from "./stage/CompanyCategory";
import RegisteredOfficeAddress from "./stage/RegisteredOfficeAddress";
import CompanyTaxInformation from "./stage/CompanyTaxInformation";
import CompanyOwnership from "./stage/CompanyOwnership";

export type StageType =
  "Start"
  | "Account type"
  | "Company Information"
  | "Company Category"
  | "Company Registered Address"
  | "Company Tax Information"
  |"Company Ownership"
  | "Individual details"
  | "Address"
  | "Joint details"
  | "Joint address"
  | "Identity Verification"
  | "Proof of Address"
  | "Purpose of Account"
  | "Bank Account"
  | "Next of Kin"
  | "Application Form Completed";
export interface FormDataType {
  email: string;
  accountType: "Individual" | "Joint" | "Company";
  company?: {
    name?: string;
    companyType?: "Public" | "Proprietary";
    companyNumber?: string;
    taxCode?: string;
    taxCodeExemption?: "Yes" | "No";
    dateOfRegistration?: string;
    natureOfBusiness?: string;
    category?:
       "Limited Company"
      | "Publicly Listed Company"
      | "Majority owned subsidiary of a listed company"
      | "Regulated company"
      | "None of the above";
    address?: string;
    streetName?: string;
    town?: string;
    region?: string;
    postcode?: string;
    country?: string;
    companyTaxInformation?:
      "Financial Institution"
      | "Public Listed Company, Majority owned subsidiary of a Public Listed Company or a Registered Charity"
      | " Active Non-Financial Entity (NFE)"
      | "None of the above";
  
    companyOwnership?: "Yes" | "No";
  };
  title: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  occupation: string;
  occupationCategory: string;
  homePhone: string;
  mobilePhone: string;
  // password: string;
  // confirmPassword: string;
  country: string;
  houseNumberOrName: string;
  streetName: string;
  town: string;
  region: string;
  postcode: string;
  jointHolder?: {
    title?: string;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string;
    occupation?: string;
    occupationCategory?: string;
    homePhone?: string;
    mobilePhone?: string;
    country?: string;
    houseNumberOrName?: string;
    streetName?: string;
    town?: string;
    region?: string;
    postcode?: string;
  };
  identityVerification:
     "International travel document"
    | "Driving Licence"
    | "Email Identification";
    identityVerificationFile:string,
    backIdentityVerificationFile?:string
  proofOfAddress: "Utility Bill" | "Driving Licence" | "Email Proof of Address";
  proofOfAddressFile:string,
  backProofOfAddressFile?:string,
  purposeOfAccount:
     "Savings"
    | "Growth"
    | "Income"
    | "Retirement"
    | "Business account"
    | "Other";
  bankAccount:
     "Provide Existing Bank Account Details"
    | "Email Existing Bank Account Details";
  bankAccountDetails?: {
    bankName?: string;
    branchName?: string;
    accountName?: string;
    accountNumber?: string;
    sortCode?: string;
  };
  nextOfKinName: {
    name: string;
    homePhone: string;
    mobilePhone: string;
    email: string;
  };
}

export default function Form() {
  const [stage, setStage] = useState<StageType>("Start");
  const [formData, setFormData] = useState<FormDataType>({
    email: "",
    accountType: "Individual",
    title: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    occupation: "",
    occupationCategory: "",
    homePhone: "",
    mobilePhone: "",
    // password: "",
    // confirmPassword: "",
    country: "",
    houseNumberOrName: "",
    streetName: "",
    town: "",
    region: "",
    postcode: "",
    identityVerification: "Email Identification",
    identityVerificationFile:"",
    proofOfAddress: "Email Proof of Address",
    proofOfAddressFile:"",
    purposeOfAccount: "Savings",
    bankAccount: "Email Existing Bank Account Details",
    nextOfKinName: {
      name: "",
      homePhone: "",
      mobilePhone: "",
      email: "",
    },
  });

  return (
    <div className="flex w-[95vw] lg:w-[75vw] h-[90vh] lg:h-[75vh] rounded-xl overflow-hidden shadow-2xl shadow-bakerjonesholdings-black/40 font-poppins">
      <div className=" h-full w-1/2 bg-bakerjonesholdings-off-white py-10 px-5 hidden lg:flex items-center justify-center">
        <h1 className="font-semibold text-4xl text-center text-bakerjonesholdings-pink">
          Apply for an Online <br /> Account in minutes
        </h1>
      </div>
      {stage === "Start" && (
        <Start
          setStage={setStage}
          formData={formData}
          setFormData={setFormData}
        />
      )}

       {stage === "Account type" && (
        <AccountType
          setStage={setStage}
          formData={formData}
          setFormData={setFormData}
        />
      )}

      {stage === "Company Information" && (
        <CompanyInformation
          formData={formData}
          setFormData={setFormData}
          setStage={setStage}
        />
      )}

      {stage === "Company Category" && (
        <CompanyCategory
          formData={formData}
          setFormData={setFormData}
          setStage={setStage}
        />
      )}

      {stage === "Company Registered Address" && (
        <RegisteredOfficeAddress
          formData={formData}
          setFormData={setFormData}
          setStage={setStage}
        />
      )}

       {stage === "Company Tax Information" && (
        <CompanyTaxInformation
          formData={formData}
          setFormData={setFormData}
          setStage={setStage}
        />
      )}

      {stage === "Company Ownership" && (
        <CompanyOwnership
          formData={formData}
          setFormData={setFormData}
          setStage={setStage}
        />
      )}

     
      {stage === "Individual details" && (
        <IndividualDetails
          setStage={setStage}
          formData={formData}
          setFormData={setFormData}
        />
      )}

      {stage === "Address" && (
        <Address
          setStage={setStage}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {stage === "Joint details" && (
        <JointDetails
          setStage={setStage}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {stage === "Joint address" && (
        <JointAddress
          setStage={setStage}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {stage === "Identity Verification" && (
        <IdentityVerification
          setStage={setStage}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {stage === "Proof of Address" && (
        <ProofofAddress
          setStage={setStage}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {stage === "Purpose of Account" && (
        <PurposeofAccount
          setStage={setStage}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {stage === "Bank Account" && (
        <BankAccount
          setStage={setStage}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {stage === "Next of Kin" && (
        <NextOfKin
          setStage={setStage}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {stage === "Application Form Completed" && (
        <ApplicationFormCompleted  formData={formData} />
      )}
    </div>
  );
}
