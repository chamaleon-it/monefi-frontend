import { ApplicationFormInterface } from "@/interface/ApplicationForm.interface";
import React from "react";

interface PropsType {
  form: ApplicationFormInterface;
}

export default function Stage3({ form }: PropsType) {
  const { gotoPreviousStage, gotoNextStage} = form;

  return (
    <div className="space-y-5 max-w-2xl shadow-2xl p-5 rounded-xl">
      <h2 className="text-3xl font-semibold text-bakerjonesholdings-pink">
        Personal Information
      </h2>
      <p className="text-sm">
        Baker Jones Holdings will use the information below to electronically verify the
        identity of Investors, Trustees, Directors and Authorised Signatories
        where possible. Baker Jones Holdings may request certified ID where this is not
        possible. For company accounts at least two Directors’ or Authorised
        Signatories’ details are required, with the exception of Sole Director
        companies.
      </p>

      <div className="space-y-2.5 w-full shadow-2xl p-2.5 rounded-xl">
        <h3 className="text-lg font-semibold text-bakerjonesholdings-pink">
          Individual details
        </h3>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="">Title</label>
          <select name="" id="" className="border px-4 py-2 rounded w-24">
            <option value="">Ms</option>
            <option value="">Mr</option>
            <option value="">Mrs</option>
            <option value="">Miss</option>
            <option value="">Dr</option>
            <option value="">Other</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm" htmlFor="">
            First Name
          </label>
          <input name="" id="" className="border px-4 py-2 rounded w-full" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm" htmlFor="">
            Middle Name
          </label>
          <input name="" id="" className="border px-4 py-2 rounded w-full" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm" htmlFor="">
            Last Name
          </label>
          <input name="" id="" className="border px-4 py-2 rounded w-full" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm" htmlFor="">
            Last Name
          </label>
          <input
            name=""
            id=""
            className="border px-4 py-2 rounded w-full"
            type="Date"
          />
        </div>

        <div className="grid grid-cols-2 gap-1.5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm" htmlFor="">
              Occupation
            </label>
            <input name="" id="" className="border px-4 py-2 rounded w-full" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm" htmlFor="">
              Occupation Category
            </label>
            <input name="" id="" className="border px-4 py-2 rounded w-full" />
          </div>
        </div>
      </div>

      <div className="space-y-2.5 w-full shadow-2xl p-2.5 rounded-xl">
        <h3 className="text-lg font-semibold text-bakerjonesholdings-pink">
          Residential address information
        </h3>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm" htmlFor="">
            Country
          </label>
          <input name="" id="" className="border px-4 py-2 rounded w-full" />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm" htmlFor="">
            House number or name:
          </label>
          <input name="" id="" className="border px-4 py-2 rounded w-full" />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm" htmlFor="">
            Street Name
          </label>
          <input name="" id="" className="border px-4 py-2 rounded w-full" />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm" htmlFor="">
            Town
          </label>
          <input name="" id="" className="border px-4 py-2 rounded w-full" />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm" htmlFor="">
            County/Region
          </label>
          <input name="" id="" className="border px-4 py-2 rounded w-full" />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm" htmlFor="">
            Postcode
          </label>
          <input name="" id="" className="border px-4 py-2 rounded w-full" />
        </div>
      </div>

       <div className="space-y-2.5 w-full shadow-2xl p-2.5 rounded-xl">
        <h3 className="text-lg font-semibold text-bakerjonesholdings-pink">
          Contact Details
        </h3>

         <div className="flex flex-col gap-1.5">
          <label className="text-sm" htmlFor="">
            Home Phone
          </label>
          <input name="" id="" className="border px-4 py-2 rounded w-full" />
        </div>

         <div className="flex flex-col gap-1.5">
          <label className="text-sm" htmlFor="">
            Mobile Phone
          </label>
          <input name="" id="" className="border px-4 py-2 rounded w-full" />
        </div>

         <div className="flex flex-col gap-1.5">
          <label className="text-sm" htmlFor="">
            Email
          </label>
          <input name="" id="" className="border px-4 py-2 rounded w-full" />
        </div>

        <div className="grid grid-cols-2 gap-1.5">
             <div className="flex flex-col gap-1.5">
          <label className="text-sm" htmlFor="">
            Password
          </label>
          <input name="" id="" className="border px-4 py-2 rounded w-full" />
        </div>

         <div className="flex flex-col gap-1.5">
          <label className="text-sm" htmlFor="">
            Confirm Password
          </label>
          <input name="" id="" className="border px-4 py-2 rounded w-full" />
        </div>
        </div>

        </div>

      <div className="flex justify-between items-center pt-4">
        <button
          className="px-4 py-1.5 rounded-md shadow bg-bakerjonesholdings-black text-bakerjonesholdings-pink font-medium"
          onClick={gotoPreviousStage}
        >
          Previous
        </button>
        <button
          disabled={!false}
          className={`px-4 py-1.5 rounded-md shadow font-medium ${
            false
              ? "bg-bakerjonesholdings-pink text-bakerjonesholdings-black cursor-pointer"
              : "bg-gray-300 text-bakerjonesholdings-black cursor-not-allowed"
          }`}
          onClick={gotoNextStage}
        >
          Next
        </button>
      </div>
    </div>
  );
}
