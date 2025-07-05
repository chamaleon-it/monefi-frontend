import { ApplicationFormInterface } from '@/interface/ApplicationForm.interface';
import React from 'react';

interface PropsType {
  form: ApplicationFormInterface;
}

export default function Stage2({ form }: PropsType) {
  const { gotoPreviousStage, gotoNextStage, setFormDate,formDate } = form;
  
  return (
    <div className="space-y-5 max-w-2xl shadow-2xl p-5 rounded-xl">
      <h2 className="text-3xl font-semibold text-monefi-pink">
        Account Type
      </h2>
      <p className="text-sm">
        If you need our assistance to complete the account opening process we are happy to help. Simply contact us on 02080028761 or email info@monefi.co.uk.
      </p>

      {/* Account Type Options */}
      <div className="flex flex-col gap-3">
        {['Individual', 'Joint', 'Company'].map((type) => (
          <label
            key={type}
            className={`cursor-pointer px-4 py-2 rounded-md border ${
              formDate.accountType === type ? 'bg-monefi-pink text-white border-monefi-pink' : 'border-gray-300'
            }`}
          >
            <input
              type="radio"
              name="accountType"
              value={type}
              checked={formDate.accountType === type}
              onChange={() => setFormDate({ ...formDate, accountType: type })}
              className="hidden"
            />
            {type}
          </label>
        ))}
      </div>

      <div className="flex justify-between items-center pt-4">
        <button
          className="px-4 py-1.5 rounded-md shadow bg-monefi-black text-monefi-pink font-medium"
          onClick={gotoPreviousStage}
        >
          Previous
        </button>
        <button
          disabled={!formDate.accountType}
          className={`px-4 py-1.5 rounded-md shadow font-medium ${
            formDate.accountType
              ? 'bg-monefi-pink text-monefi-black cursor-pointer'
              : 'bg-gray-300 text-gray-600 cursor-not-allowed'
          }`}
          onClick={gotoNextStage}
        >
          Next
        </button>
      </div>
    </div>
  );
}
