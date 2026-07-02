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
    `w-full px-4 py-3.5 rounded-xl border ${
      err ? 'border-red-500 bg-red-50/20' : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50'
    } focus:bg-white focus:border-corporate-charcoal focus:ring-4 focus:ring-corporate-charcoal/10 outline-none transition-all text-sm sm:text-base font-medium text-corporate-black placeholder:text-gray-400`;

  const labelClass = "block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider";

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-fade-in font-general w-full">
      {/* Top Step Header */}
      <div className="text-center mb-10 sm:mb-14 flex flex-col items-center">
        <span className="inline-block bg-slate-200/80 text-slate-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-3">
          Step 4 of 6
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-corporate-charcoal tracking-tight mb-2">
          Settlement details
        </h1>
        <p className="text-gray-500 text-sm sm:text-base max-w-xl">
          Provide the bank account details for settlement instructions.
        </p>
      </div>

      <div className="space-y-8 sm:space-y-10">
        {/* Bank Account Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/40 border border-slate-100 p-6 sm:p-10">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100">
            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-corporate-charcoal">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-corporate-charcoal">
                Bank Account
              </h2>
              <p className="text-xs sm:text-sm text-gray-500">Designated account for transfers and disbursements</p>
            </div>
          </div>

          {/* Alert Banner */}
          <div className="bg-slate-100/80 border border-slate-200/60 p-5 rounded-xl flex items-center gap-3.5 text-sm sm:text-base text-slate-700 mb-8 font-medium">
            <AlertCircle className="w-6 h-6 text-slate-500 shrink-0" />
            <span>The account name must match the name on this application.</span>
          </div>

          <div className="space-y-6">
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
              {errors.beneficiaryAccountName && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.beneficiaryAccountName}</p>}
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
              {errors.nameOfBank && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.nameOfBank}</p>}
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
                {errors.accountNumber && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.accountNumber}</p>}
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
                {errors.sortCode && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.sortCode}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="w-full sm:w-auto bg-slate-200 hover:bg-slate-300 active:scale-[0.99] text-slate-800 font-semibold py-4 px-8 rounded-xl transition-all text-center cursor-pointer order-2 sm:order-1 text-base"
        >
          Back
        </button>

        <button
          type="button"
          onClick={validateAndNext}
          className="w-full sm:w-auto bg-corporate-charcoal hover:bg-corporate-charcoal/90 active:scale-[0.99] text-white font-semibold py-4 px-10 rounded-xl shadow-lg shadow-corporate-charcoal/20 transition-all flex items-center justify-center gap-2.5 cursor-pointer order-1 sm:order-2 text-base"
        >
          <span>Review Application</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
