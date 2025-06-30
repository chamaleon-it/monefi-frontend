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

export type StageType = "Start" | "Account type" | "Individual details" | "Address" | "Identity Verification" | "Proof of Address" | "Purpose of Account" | "Bank Account"  | "Next of Kin" | "Application Form Completed";
export interface FormDataType {
    email:string;
    accountType:"Individual" | "Joint" | "Company";
    title: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    occupation: string;
    occupationCategory:string;
    homePhone: string;
    mobilePhone: string;
    password: string;
    confirmPassword: string;
    country: string;
    houseNumberOrName: string;
    streetName: string;
    town:string;
    region: string;
    postcode: string;
    identityVerification: "International travel document" | "Driving Licence" | "Email Identification"
    proofOfAddress: "Utility Bill" | "Driving Licence" | "Email Proof of Address";
    purposeOfAccount: "Savings" | "Growth" | "Income" | "Retirement" | "Business account" | "Other";
    bankAccount:"Provide Existing Bank Account Details" | "Email Existing Bank Account Details";
    bankAccountDetails: {
            bankName: string;
            branchName: string;
            accountName: string;
            bic_swift: string;
            iban: string;
    }
    nextOfKinName:{
        name: string;
        homePhone: string;
        mobilePhone: string;
        email: string;
    };
}


export default function Form() {
  const [stage, setStage] = useState<StageType>("Start");
  const [formData, setFormData] = useState<FormDataType>({
    email: "test@gmail.com",
    accountType: "Individual",
    title: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    occupation: "",
    occupationCategory: "",
    homePhone: "",
    mobilePhone: "",
    password: "",
    confirmPassword: "",
    country: "",
    houseNumberOrName: "",
    streetName: "",
    town: "",
    region: "",
    postcode: "",
    identityVerification: "Email Identification",
    proofOfAddress: "Email Proof of Address",
    purposeOfAccount: "Savings",
    bankAccount: "Email Existing Bank Account Details",
    bankAccountDetails: {
      bankName: "",
      branchName: "",
      accountName: "",
      bic_swift: "",
      iban: ""
    },
    nextOfKinName:{
      name:"",
      homePhone:"",
      mobilePhone:"",
      email:""
    }
  });

  return (
    <div className="flex w-[95vw] lg:w-[75vw] h-[90vh] lg:h-[75vh] rounded-xl overflow-hidden shadow-2xl shadow-monefi-black/40 font-poppins">
      <div className=" h-full w-1/2 bg-monefi-off-white py-10 px-5 hidden lg:flex items-center justify-center">
        <h1 className="font-semibold text-4xl text-center text-monefi-pink">
          Apply for an Online <br /> Account in minutes
        </h1>
      </div>
      {stage === "Start" && <Start setStage={setStage} formData={formData} setFormData={setFormData}/>}
      {
        stage === "Account type" && <AccountType setStage={setStage} formData={formData} setFormData={setFormData}/>
      }
      {
        stage === "Individual details" && <IndividualDetails setStage={setStage} formData={formData} setFormData={setFormData}/>
      }
      {
        stage === "Address" && <Address setStage={setStage} formData={formData} setFormData={setFormData}/>
      }
      {
        stage === "Identity Verification" && <IdentityVerification setStage={setStage} formData={formData} setFormData={setFormData}/>
      }
      {
        stage === "Proof of Address" && <ProofofAddress setStage={setStage} formData={formData} setFormData={setFormData}/>
      }
      {
        stage === "Purpose of Account" && <PurposeofAccount setStage={setStage} formData={formData} setFormData={setFormData} />
      }
      {
        stage === "Bank Account" && <BankAccount setStage={setStage} formData={formData} setFormData={setFormData}/>
      }
      {
        stage === "Next of Kin" && <NextOfKin setStage={setStage} formData={formData} setFormData={setFormData}/>
      }
      {
        stage === "Application Form Completed" && <ApplicationFormCompleted setStage={setStage} formData={formData}/>
      }
    </div>
  );
}
