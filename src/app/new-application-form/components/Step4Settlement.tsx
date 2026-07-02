"use client";

import React, { useState } from 'react';
import { CreditCard, AlertCircle, ArrowRight } from 'lucide-react';
import { StepProps } from './types';

export default function Step4Settlement({ formData, updateFormData, onNext, onBack }: StepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { settlementDetails } = formData;

  const handleChange = (field: keyof typeof settlementDetails, value: string) => {
    updateFormData('settlementDetails', {
      ...settlementDetails,
      [field]: value,
    });
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validateAndNext = () => {
    const newErrors: Record<string, string> = {};
    if (!settlementDetails.beneficiaryAccountName.trim()) {
      newErrors.beneficiaryAccountName = 'Beneficiary Account Name is required';
    }
    if (!settlementDetails.nameOfBank.trim()) {
      newErrors.nameOfBank = 'Name of Bank is required';
    }
    if (!settlementDetails.accountNumber.trim()) {
      newErrors.accountNumber = 'Account Number is required';
    }
    if (!settlementDetails.sortCode.trim()) {
      newErrors.sortCode = 'Sort Code is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstErrorKey = Object.keys(newErrors)[0];
      const el = document.getElementById(`field-${firstErrorKey}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    onNext();
  };

  const inputClass = (err?: string) =>
    `w-full px-4 py-3 rounded-xl border text-[15px] font-normal text-slate-900 placeholder:text-slate-400 transition-all outline-none ${err
      ? 'border-red-400 bg-red-50/60 focus:border-red-500 focus:ring-2 focus:ring-red-400/15'
      : 'border-slate-300 bg-white hover:border-slate-400 focus:border-corporate-charcoal focus:ring-2 focus:ring-corporate-charcoal/10'
    }`;

  const labelClass = "block text-[11px] font-semibold tracking-[0.1em] uppercase text-slate-600 mb-2";

  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-10 py-10 sm:py-14 font-inter w-full">
      {/* Page header */}
      <div className="mb-10">
        <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-slate-400 mb-3">Step 4 of 6</p>
        <h1 className="text-[1.875rem] sm:text-[2.125rem] font-semibold text-slate-900 tracking-tight leading-tight mb-2">
          Settlement details
        </h1>
        <p className="text-[15px] text-slate-600 leading-relaxed">
          Provide the bank account details for settlement instructions.
        </p>
      </div>

      <div className="space-y-5">
        {/* Bank Account Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_2px_20px_rgba(0,0,0,0.06)] p-8 sm:p-10">
          <div className="flex items-start gap-4 mb-8 pb-6 border-b border-slate-100">
            <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
              <CreditCard className="w-4.5 h-4.5" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-[17px] font-semibold text-slate-900">
                Bank Account
              </p>
              <p className="text-xs sm:text-sm text-gray-500">Designated account for transfers and disbursements</p>
            </div>
          </div>

          {/* Alert Banner */}
          <div className="bg-amber-50/60 border border-amber-200/60 p-4 rounded-lg flex items-center gap-3 text-[13px] text-amber-700 mb-7 font-normal">
            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" strokeWidth={1.5} />
            <span>The account name must match the name on this application.</span>
          </div>

          <div className="space-y-5">
            {/* Beneficiary Account Name */}
            <div id="field-beneficiaryAccountName">
              <label className={labelClass}>Beneficiary Account Name *</label>
              <input
                type="text"
                placeholder="Beneficiary Account Name *"
                value={settlementDetails.beneficiaryAccountName}
                onChange={(e) => handleChange('beneficiaryAccountName', e.target.value)}
                className={inputClass(errors.beneficiaryAccountName)}
              />
              {errors.beneficiaryAccountName && <p className="text-[12px] text-red-600 mt-2">{errors.beneficiaryAccountName}</p>}
            </div>

            {/* Name of Bank */}
            <div id="field-nameOfBank">
              <label className={labelClass}>Name of Bank *</label>
              <input
                type="text"
                placeholder="Name of Bank *"
                value={settlementDetails.nameOfBank}
                onChange={(e) => handleChange('nameOfBank', e.target.value)}
                className={inputClass(errors.nameOfBank)}
              />
              {errors.nameOfBank && <p className="text-[12px] text-red-600 mt-2">{errors.nameOfBank}</p>}
            </div>

            {/* Account Number & Sort Code */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div id="field-accountNumber">
                <label className={labelClass}>Account Number *</label>
                <input
                  type="text"
                  placeholder="Account Number *"
                  value={settlementDetails.accountNumber}
                  onChange={(e) => handleChange('accountNumber', e.target.value)}
                  className={inputClass(errors.accountNumber)}
                />
                {errors.accountNumber && <p className="text-[12px] text-red-600 mt-2">{errors.accountNumber}</p>}
              </div>

              <div id="field-sortCode">
                <label className={labelClass}>Sort Code *</label>
                <input
                  type="text"
                  placeholder="Sort Code *"
                  value={settlementDetails.sortCode}
                  onChange={(e) => handleChange('sortCode', e.target.value)}
                  className={inputClass(errors.sortCode)}
                />
                {errors.sortCode && <p className="text-[12px] text-red-600 mt-2">{errors.sortCode}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action bar */}
      <div className="mt-10 flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-7 border-t border-slate-200">
        <button
          type="button"
          onClick={onBack}
          className="w-full sm:w-auto text-[14px] font-medium text-slate-600 hover:text-slate-900 px-6 py-3 rounded-xl border border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-all cursor-pointer bg-white"
        >
          Back
        </button>
        <button
          type="button"
          onClick={validateAndNext}
          className="w-full sm:w-auto bg-corporate-charcoal hover:bg-[#12144A] active:scale-[0.99] text-white text-[14px] font-semibold py-3.5 px-10 rounded-xl shadow-lg shadow-corporate-charcoal/25 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
        >
          <span>Review Application</span>
          <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
