import React from "react";
import CreateBond from "./CreateBond";

export default function CreateBondPage() {
  return (
    <div className="">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#232323] mb-2">
          Create New Bond
        </h1>
        <p className="text-gray-600">Add new bond details to your platform</p>
      </div>
      <div className="space-y-8">
        <CreateBond />
      </div>
    </div>
  );
}
