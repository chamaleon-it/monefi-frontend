"use client";

import React, { useState } from 'react';
import { ArrowRight, Building2, AlertCircle } from 'lucide-react';
import { StepProps } from './types';

const LABEL = "block text-[11px] font-semibold tracking-[0.1em] uppercase text-slate-600 mb-2";
const INPUT_OK = "w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-[15px] font-normal text-slate-900 placeholder:text-slate-400 outline-none transition-all hover:border-slate-400 focus:border-corporate-charcoal focus:ring-2 focus:ring-corporate-charcoal/10";
const INPUT_ERR = "w-full px-4 py-3 rounded-xl border border-red-400 bg-red-50/60 text-[15px] font-normal text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-red-500 focus:ring-2 focus:ring-red-400/15";
const ERROR_MSG = "text-[12px] text-red-600 mt-2 flex items-center gap-1";

export default function StepCompanyDetails({ formData, updateFormData, onNext, onBack }: StepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const details = formData.companyDetails || { companyName: '', registrationNumber: '', dateOfIncorporation: '', natureOfBusiness: '', registeredAddress: { address: '', streetName: '', country: '', state: '', city: '', postcode: '' }, companyClassification: '', taxClassification: '', officers: [], owns25Percent: '' };

  const handleChange = (field: string, value: string) => {
    updateFormData('companyDetails', { ...details, [field]: value });
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validateAndNext = () => {
    const newErrors: Record<string, string> = {};
    if (!details.companyName.trim()) newErrors.companyName = 'Company name is required';
    if (!details.registrationNumber.trim()) newErrors.registrationNumber = 'Registration number is required';
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    onNext();
  };

  const ic = (err?: string) => err ? INPUT_ERR : INPUT_OK;

  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-10 py-10 sm:py-14 font-inter w-full">
      <div className="mb-10">
        <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-slate-400 mb-3">Company Application</p>
        <h1 className="text-[1.875rem] sm:text-[2.125rem] font-semibold text-slate-900 tracking-tight leading-tight mb-2">Company details</h1>
        <p className="text-[15px] text-slate-600 leading-relaxed">Provide information about the corporate entity.</p>
      </div>

      <div className="space-y-5">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_2px_20px_rgba(0,0,0,0.06)] p-8 sm:p-10">
          <div className="flex items-start gap-4 mb-8 pb-6 border-b border-slate-100">
            <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
              <Building2 className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-[17px] font-semibold text-slate-900">Entity Information</p>
              <p className="text-[13px] text-slate-500 mt-1">Official registered company details</p>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label className={LABEL}>Company Name *</label>
              <input type="text" placeholder="e.g. Acme Corporation Ltd" value={details.companyName} onChange={e => handleChange('companyName', e.target.value)} className={ic(errors.companyName)} />
              {errors.companyName && <p className={ERROR_MSG}><AlertCircle className="w-3.5 h-3.5" strokeWidth={1.5} />{errors.companyName}</p>}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={LABEL}>Registration Number *</label>
                <input type="text" placeholder="CRN" value={details.registrationNumber} onChange={e => handleChange('registrationNumber', e.target.value)} className={ic(errors.registrationNumber)} />
                {errors.registrationNumber && <p className={ERROR_MSG}><AlertCircle className="w-3.5 h-3.5" strokeWidth={1.5} />{errors.registrationNumber}</p>}
              </div>
              <div>
                <label className={LABEL}>Date of Incorporation *</label>
                <input type="date" value={details.dateOfIncorporation} onChange={e => handleChange('dateOfIncorporation', e.target.value)} className={ic(errors.dateOfIncorporation)} />
              </div>
            </div>
            <div>
              <label className={LABEL}>Nature of Business *</label>
              <input type="text" placeholder="Industry or primary activity" value={details.natureOfBusiness} onChange={e => handleChange('natureOfBusiness', e.target.value)} className={ic(errors.natureOfBusiness)} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-7 border-t border-slate-200">
        <button type="button" onClick={onBack} className="w-full sm:w-auto text-[14px] font-medium text-slate-600 hover:text-slate-900 px-6 py-3 rounded-xl border border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-all cursor-pointer bg-white">Back</button>
        <button type="button" onClick={validateAndNext} className="w-full sm:w-auto bg-corporate-charcoal hover:bg-[#12144A] active:scale-[0.99] text-white text-[14px] font-semibold py-3.5 px-10 rounded-xl shadow-lg shadow-corporate-charcoal/25 transition-all flex items-center justify-center gap-2.5 cursor-pointer">
          Continue <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
