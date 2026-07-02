"use client";

import React, { useState } from 'react';
import { Users, DollarSign, Target, ArrowRight, AlertCircle } from 'lucide-react';
import { StepProps } from './types';

export default function Step3Additional({ formData, updateFormData, onNext, onBack }: StepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { additionalQuestions } = formData;

  const handleSelect = (field: keyof typeof additionalQuestions, value: string) => {
    updateFormData('additionalQuestions', {
      ...additionalQuestions,
      [field]: value,
    });
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validateAndNext = () => {
    const newErrors: Record<string, string> = {};
    if (!additionalQuestions.financialAdviser) newErrors.financialAdviser = 'Please select Yes or No';
    if (!additionalQuestions.sourceOfFunds) newErrors.sourceOfFunds = 'Please select a source of funds';
    if (!additionalQuestions.purposeOfAccount) newErrors.purposeOfAccount = 'Please select a purpose of account';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Scroll to first error
      const firstErrorKey = Object.keys(newErrors)[0];
      const el = document.getElementById(`card-${firstErrorKey}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    onNext();
  };

  const renderRadioCard = (isSelected: boolean, label: string, onClick: () => void) => (
    <div
      onClick={onClick}
      className={`px-4 py-3 rounded-lg border flex items-center gap-3 transition-all duration-150 cursor-pointer ${isSelected
          ? 'border-corporate-charcoal bg-corporate-charcoal/5 text-corporate-charcoal'
          : 'border-slate-200 hover:border-slate-300 bg-white text-slate-600'
        }`}
    >
      <div
        className={`w-5 h-5 mt-0.5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${isSelected ? 'border-corporate-charcoal bg-corporate-charcoal' : 'border-slate-300 bg-white'
          }`}
      >
        {isSelected && <div className="w-2 h-2 rounded-full bg-white animate-scale-in" />}
      </div>
      <span className="text-[13px] font-normal leading-snug">{label}</span>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-10 py-10 sm:py-14 font-inter w-full">
      {/* Page header */}
      <div className="mb-10">
        <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-slate-400 mb-3">Step 3 of 6</p>
        <h1 className="text-[1.875rem] sm:text-[2.125rem] font-semibold text-slate-900 tracking-tight leading-tight mb-2">
          A few more questions
        </h1>
        <p className="text-[15px] text-slate-600 leading-relaxed">
          Please answer the following in relation to your application.
        </p>
      </div>

      <div className="space-y-5">
        {/* Card 1: Financial Adviser */}
        <div id="card-financialAdviser" className={`bg-white rounded-xl border shadow-[0_2px_16px_rgba(0,0,0,0.04)] p-7 sm:p-8 transition-all ${errors.financialAdviser ? 'border-red-400' : 'border-slate-100'
          }`}>
          <div className="flex items-start gap-4 mb-8 pb-6 border-b border-slate-100">
            <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
              <Users className="w-4.5 h-4.5" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-[17px] font-semibold text-slate-900">
                Financial Adviser
              </p>
              <p className="text-[13px] text-slate-500 mt-1">Adviser representation status</p>
            </div>
          </div>

          <p className="text-[14px] text-slate-600 font-normal mb-5">
            Do you have a financial adviser? *
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {renderRadioCard(additionalQuestions.financialAdviser === 'No', 'No', () => handleSelect('financialAdviser', 'No'))}
            {renderRadioCard(additionalQuestions.financialAdviser === 'Yes', 'Yes', () => handleSelect('financialAdviser', 'Yes'))}
          </div>
          {errors.financialAdviser && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600 animate-fade-in">
              <AlertCircle className="w-4 h-4" strokeWidth={1.5} />
              <span className="text-sm font-normal">{errors.financialAdviser}</span>
            </div>
          )}
        </div>

        {/* Card 2: Source Of Funds */}
        <div id="card-sourceOfFunds" className={`bg-white rounded-xl border shadow-[0_2px_16px_rgba(0,0,0,0.04)] p-7 sm:p-8 transition-all ${errors.sourceOfFunds ? 'border-red-400' : 'border-slate-100'
          }`}>
          <div className="flex items-start gap-4 mb-8 pb-6 border-b border-slate-100">
            <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
              <DollarSign className="w-4.5 h-4.5" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-[17px] font-semibold text-slate-900">
                Source Of Funds
              </p>
              <p className="text-[13px] text-slate-500 mt-1">Origin of investment capital</p>
            </div>
          </div>

          <p className="text-[14px] text-slate-600 font-normal mb-5">
            What is the main source of funds for investment? *
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              'Income (employment, investment, business, other earnings)',
              'One-off payment (matured investment, legal settlement, estate proceeds)',
              'Sale of assets (shares, property)',
              'Windfall (gifts, winnings)',
              'Other',
            ].map((opt) => renderRadioCard(additionalQuestions.sourceOfFunds === opt, opt, () => handleSelect('sourceOfFunds', opt)))}
          </div>
          {errors.sourceOfFunds && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600 animate-fade-in">
              <AlertCircle className="w-4 h-4" strokeWidth={1.5} />
              <span className="text-sm font-normal">{errors.sourceOfFunds}</span>
            </div>
          )}
        </div>

        {/* Card 3: Purpose Of Account */}
        <div id="card-purposeOfAccount" className={`bg-white rounded-xl border shadow-[0_2px_16px_rgba(0,0,0,0.04)] p-7 sm:p-8 transition-all ${errors.purposeOfAccount ? 'border-red-400' : 'border-slate-100'
          }`}>
          <div className="flex items-start gap-4 mb-8 pb-6 border-b border-slate-100">
            <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
              <Target className="w-4.5 h-4.5" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-[17px] font-semibold text-slate-900">
                Purpose Of Account
              </p>
              <p className="text-[13px] text-slate-500 mt-1">Primary goal of this account</p>
            </div>
          </div>

          <p className="text-[14px] text-slate-600 font-normal mb-5">
            What is the purpose of the account? *
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              'Savings',
              'Growth',
              'Income',
              'Retirement',
              'Business account',
              'Other',
            ].map((opt) => renderRadioCard(additionalQuestions.purposeOfAccount === opt, opt, () => handleSelect('purposeOfAccount', opt)))}
          </div>
          {errors.purposeOfAccount && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600 animate-fade-in">
              <AlertCircle className="w-4 h-4" strokeWidth={1.5} />
              <span className="text-sm font-normal">{errors.purposeOfAccount}</span>
            </div>
          )}
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
          <span>Continue to Settlement</span>
          <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
