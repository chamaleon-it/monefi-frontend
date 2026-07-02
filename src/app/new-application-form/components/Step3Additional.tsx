"use client";

import React, { useState } from 'react';
import { Users, DollarSign, Target, ArrowRight } from 'lucide-react';
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
      className={`p-5 sm:p-6 rounded-xl border-2 flex items-center gap-4 transition-all duration-150 cursor-pointer ${
        isSelected
          ? 'border-corporate-charcoal bg-slate-50 text-corporate-black font-bold shadow-sm'
          : 'border-slate-200 hover:border-corporate-gold bg-white hover:bg-slate-50/50 text-slate-700'
      }`}
    >
      <div
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
          isSelected ? 'border-corporate-charcoal bg-corporate-charcoal' : 'border-slate-300 bg-white'
        }`}
      >
        {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-white animate-scale-in" />}
      </div>
      <span className="text-sm sm:text-base">{label}</span>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-fade-in font-general w-full">
      {/* Top Step Header */}
      <div className="text-center mb-10 sm:mb-14 flex flex-col items-center">
        <span className="inline-block bg-slate-200/80 text-slate-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-3">
          Step 3 of 6
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-corporate-charcoal tracking-tight mb-2">
          A few more questions
        </h1>
        <p className="text-gray-500 text-sm sm:text-base max-w-xl">
          Please answer the following in relation to your application.
        </p>
      </div>

      <div className="space-y-8 sm:space-y-10">
        {/* Card 1: Financial Adviser */}
        <div id="card-financialAdviser" className="bg-white rounded-2xl shadow-xl shadow-slate-200/40 border border-slate-100 p-6 sm:p-10">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-corporate-charcoal">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-corporate-charcoal">
                Financial Adviser
              </h2>
              <p className="text-xs sm:text-sm text-gray-500">Adviser representation status</p>
            </div>
          </div>

          <p className="text-sm sm:text-base text-gray-600 mb-6 font-medium">
            Do you have a financial adviser?
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {renderRadioCard(additionalQuestions.financialAdviser === 'No', 'No', () => handleSelect('financialAdviser', 'No'))}
            {renderRadioCard(additionalQuestions.financialAdviser === 'Yes', 'Yes', () => handleSelect('financialAdviser', 'Yes'))}
          </div>
          {errors.financialAdviser && <p className="text-red-500 text-xs mt-2 font-medium">{errors.financialAdviser}</p>}
        </div>

        {/* Card 2: Source Of Funds */}
        <div id="card-sourceOfFunds" className="bg-white rounded-2xl shadow-xl shadow-slate-200/40 border border-slate-100 p-6 sm:p-10">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-corporate-charcoal">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-corporate-charcoal">
                Source Of Funds
              </h2>
              <p className="text-xs sm:text-sm text-gray-500">Origin of investment capital</p>
            </div>
          </div>

          <p className="text-sm sm:text-base text-gray-600 mb-6 font-medium">
            What is the main source of funds for investment?
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              'Income (employment, investment, business, other earnings)',
              'One-off payment (matured investment, legal settlement, estate proceeds)',
              'Sale of assets (shares, property)',
              'Windfall (gifts, winnings)',
              'Other',
            ].map((opt) => renderRadioCard(additionalQuestions.sourceOfFunds === opt, opt, () => handleSelect('sourceOfFunds', opt)))}
          </div>
          {errors.sourceOfFunds && <p className="text-red-500 text-xs mt-2 font-medium">{errors.sourceOfFunds}</p>}
        </div>

        {/* Card 3: Purpose Of Account */}
        <div id="card-purposeOfAccount" className="bg-white rounded-2xl shadow-xl shadow-slate-200/40 border border-slate-100 p-6 sm:p-10">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-corporate-charcoal">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-corporate-charcoal">
                Purpose Of Account
              </h2>
              <p className="text-xs sm:text-sm text-gray-500">Primary goal of this account</p>
            </div>
          </div>

          <p className="text-sm sm:text-base text-gray-600 mb-6 font-medium">
            What is the purpose of the account?
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              'Savings',
              'Growth',
              'Income',
              'Retirement',
              'Business account',
              'Other',
            ].map((opt) => renderRadioCard(additionalQuestions.purposeOfAccount === opt, opt, () => handleSelect('purposeOfAccount', opt)))}
          </div>
          {errors.purposeOfAccount && <p className="text-red-500 text-xs mt-2 font-medium">{errors.purposeOfAccount}</p>}
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
          <span>Continue to Settlement</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
