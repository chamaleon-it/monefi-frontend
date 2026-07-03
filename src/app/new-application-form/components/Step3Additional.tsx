"use client";

import React, { useState } from 'react';
import { Users, DollarSign, Shield, ArrowRight, AlertCircle, Briefcase } from 'lucide-react';
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

  const handleInputChange = (field: keyof typeof additionalQuestions, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    updateFormData('additionalQuestions', {
      ...additionalQuestions,
      [field]: e.target.value,
    });
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const inputClass = (error?: string) =>
    `w-full px-4 py-3.5 rounded-xl border bg-white outline-none text-[15px] text-slate-700 transition-all shadow-sm ${error
      ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10'
      : 'border-slate-200 hover:border-slate-300 focus:border-corporate-charcoal focus:ring-4 focus:ring-corporate-charcoal/10'
    }`;
  const FIELD_LABEL = "block text-[13px] font-semibold text-slate-700 mb-2 uppercase tracking-wide";

  const validateAndNext = () => {
    const newErrors: Record<string, string> = {};
    if (!additionalQuestions.financialAdviser) newErrors.financialAdviser = 'Please select Yes or No';
    if (!additionalQuestions.employmentStatus) newErrors.employmentStatus = 'Please select an employment status';
    if (!additionalQuestions.occupation) newErrors.occupation = 'Occupation is required';
    if (!additionalQuestions.annualIncomeRange) newErrors.annualIncomeRange = 'Annual income range is required';
    if (!additionalQuestions.netWorth) newErrors.netWorth = 'Net worth is required';
    if (!additionalQuestions.liquidAssets) newErrors.liquidAssets = 'Liquid assets information is required';
    if (!additionalQuestions.expectedInvestmentAmount) newErrors.expectedInvestmentAmount = 'Expected investment amount is required';
    if (!additionalQuestions.sourceOfFunds) newErrors.sourceOfFunds = 'Please select a source of funds';
    if (!additionalQuestions.pep) newErrors.pep = 'Please select Yes or No';
    if (!additionalQuestions.pepFamily) newErrors.pepFamily = 'Please select Yes or No';

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

        {/* Card 1.5: Employment & Financial Information */}
        <div id="card-employmentStatus" className={`bg-white rounded-xl border shadow-[0_2px_16px_rgba(0,0,0,0.04)] p-7 sm:p-8 transition-all ${(errors.employmentStatus || errors.occupation || errors.annualIncomeRange || errors.netWorth || errors.liquidAssets || errors.expectedInvestmentAmount) ? 'border-red-400' : 'border-slate-100'
          }`}>
          <div className="flex items-start gap-4 mb-8 pb-6 border-b border-slate-100">
            <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
              <Briefcase className="w-4.5 h-4.5" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-[17px] font-semibold text-slate-900">
                Employment & Financial Information
              </p>
              <p className="text-[13px] text-slate-500 mt-1">Employment and financial information for regulatory assessment.</p>
            </div>
          </div>

          <div className="space-y-8">
            {/* Employment Information */}
            <div>
              <h3 className="text-[15px] font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-100">Employment Information</h3>
              
              <div className="space-y-5">
                <div id="card-employmentStatus">
                  <p className="text-[14px] text-slate-600 font-normal mb-3">
                    Employment Status *
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {['Employed', 'Self-employed', 'Retired', 'Unemployed', 'Student', 'Homemaker'].map((opt) => 
                      renderRadioCard(additionalQuestions.employmentStatus === opt, opt, () => handleSelect('employmentStatus', opt))
                    )}
                  </div>
                  {errors.employmentStatus && (
                    <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600 animate-fade-in">
                      <AlertCircle className="w-4 h-4" strokeWidth={1.5} />
                      <span className="text-sm font-normal">{errors.employmentStatus}</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                  <div id="card-occupation">
                    <label className={FIELD_LABEL}>Occupation *</label>
                    <input type="text" value={additionalQuestions.occupation} onChange={(e) => handleInputChange('occupation', e)} className={inputClass(errors.occupation)} />
                    {errors.occupation && <p className={ERROR_MSG}><AlertCircle className="w-3.5 h-3.5" strokeWidth={1.5} />{errors.occupation}</p>}
                  </div>
                  <div>
                    <label className={FIELD_LABEL}>Employer Name</label>
                    <input type="text" value={additionalQuestions.employerName} onChange={(e) => handleInputChange('employerName', e)} className={inputClass()} />
                  </div>
                  <div>
                    <label className={FIELD_LABEL}>Industry / Sector</label>
                    <input type="text" value={additionalQuestions.industrySector} onChange={(e) => handleInputChange('industrySector', e)} className={inputClass()} />
                  </div>
                </div>
              </div>
            </div>

            {/* Financial Information */}
            <div>
              <h3 className="text-[15px] font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-100">Financial Information</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div id="card-annualIncomeRange">
                  <label className={FIELD_LABEL}>Annual Income Range *</label>
                  <select value={additionalQuestions.annualIncomeRange} onChange={(e) => handleInputChange('annualIncomeRange', e)} className={inputClass(errors.annualIncomeRange)}>
                    <option value="">Select range...</option>
                    <option value="Under £25,000">Under £25,000</option>
                    <option value="£25,000 - £49,999">£25,000 - £49,999</option>
                    <option value="£50,000 - £99,999">£50,000 - £99,999</option>
                    <option value="£100,000 - £249,999">£100,000 - £249,999</option>
                    <option value="£250,000 or more">£250,000 or more</option>
                  </select>
                  {errors.annualIncomeRange && <p className={ERROR_MSG}><AlertCircle className="w-3.5 h-3.5" strokeWidth={1.5} />{errors.annualIncomeRange}</p>}
                </div>
                <div id="card-netWorth">
                  <label className={FIELD_LABEL}>Net Worth (excluding main residence) *</label>
                  <select value={additionalQuestions.netWorth} onChange={(e) => handleInputChange('netWorth', e)} className={inputClass(errors.netWorth)}>
                    <option value="">Select range...</option>
                    <option value="Under £50,000">Under £50,000</option>
                    <option value="£50,000 - £249,999">£50,000 - £249,999</option>
                    <option value="£250,000 - £999,999">£250,000 - £999,999</option>
                    <option value="£1,000,000 - £4,999,999">£1,000,000 - £4,999,999</option>
                    <option value="£5,000,000 or more">£5,000,000 or more</option>
                  </select>
                  {errors.netWorth && <p className={ERROR_MSG}><AlertCircle className="w-3.5 h-3.5" strokeWidth={1.5} />{errors.netWorth}</p>}
                </div>
                <div id="card-liquidAssets">
                  <label className={FIELD_LABEL}>Liquid Assets Available for Investment *</label>
                  <select value={additionalQuestions.liquidAssets} onChange={(e) => handleInputChange('liquidAssets', e)} className={inputClass(errors.liquidAssets)}>
                    <option value="">Select range...</option>
                    <option value="Under £10,000">Under £10,000</option>
                    <option value="£10,000 - £49,999">£10,000 - £49,999</option>
                    <option value="£50,000 - £249,999">£50,000 - £249,999</option>
                    <option value="£250,000 or more">£250,000 or more</option>
                  </select>
                  {errors.liquidAssets && <p className={ERROR_MSG}><AlertCircle className="w-3.5 h-3.5" strokeWidth={1.5} />{errors.liquidAssets}</p>}
                </div>
                <div id="card-expectedInvestmentAmount">
                  <label className={FIELD_LABEL}>Expected Initial Investment Amount *</label>
                  <input type="text" placeholder="e.g. 50000" value={additionalQuestions.expectedInvestmentAmount} onChange={(e) => handleInputChange('expectedInvestmentAmount', e)} className={inputClass(errors.expectedInvestmentAmount)} />
                  {errors.expectedInvestmentAmount && <p className={ERROR_MSG}><AlertCircle className="w-3.5 h-3.5" strokeWidth={1.5} />{errors.expectedInvestmentAmount}</p>}
                </div>
              </div>
            </div>
          </div>
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
                Source Of Funds/Wealth
              </p>
              <p className="text-[13px] text-slate-500 mt-1">Origin of investment capital</p>
            </div>
          </div>

          <p className="text-[14px] text-slate-600 font-normal mb-5">
            What is the main source of funds for investment? *
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              'Salary',
              'Savings Account',
              'Investment Proceeds',
              'Inheritance',
              'Property Sale',
              'Pension Lump Sum',
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

        {/* Card 3: Politically Exposed Person (PEP) */}
        <div id="card-pep" className={`bg-white rounded-xl border shadow-[0_2px_16px_rgba(0,0,0,0.04)] p-7 sm:p-8 transition-all ${(errors.pep || errors.pepFamily) ? 'border-red-400' : 'border-slate-100'
          }`}>
          <div className="flex items-start gap-4 mb-8 pb-6 border-b border-slate-100">
            <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
              <Shield className="w-4.5 h-4.5" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-[17px] font-semibold text-slate-900">
                Politically Exposed Person (PEP)
              </p>
              <p className="text-[13px] text-slate-500 mt-1">Regulatory compliance information</p>
            </div>
          </div>

          <div className="space-y-6">
            <div id="card-pep">
              <p className="text-[14px] text-slate-600 font-normal mb-3">
                Are you a politically exposed person? *
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {renderRadioCard(additionalQuestions.pep === 'Yes', 'Yes', () => handleSelect('pep', 'Yes'))}
                {renderRadioCard(additionalQuestions.pep === 'No', 'No', () => handleSelect('pep', 'No'))}
              </div>
              {errors.pep && (
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600 animate-fade-in">
                  <AlertCircle className="w-4 h-4" strokeWidth={1.5} />
                  <span className="text-sm font-normal">{errors.pep}</span>
                </div>
              )}
            </div>

            <div id="card-pepFamily">
              <p className="text-[14px] text-slate-600 font-normal mb-3">
                Are you a family member or close associate of a politically exposed person? *
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {renderRadioCard(additionalQuestions.pepFamily === 'Yes', 'Yes', () => handleSelect('pepFamily', 'Yes'))}
                {renderRadioCard(additionalQuestions.pepFamily === 'No', 'No', () => handleSelect('pepFamily', 'No'))}
              </div>
              {errors.pepFamily && (
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600 animate-fade-in">
                  <AlertCircle className="w-4 h-4" strokeWidth={1.5} />
                  <span className="text-sm font-normal">{errors.pepFamily}</span>
                </div>
              )}
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
          <span>Continue to Settlement</span>
          <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
