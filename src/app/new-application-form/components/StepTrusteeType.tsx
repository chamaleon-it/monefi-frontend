"use client";

import React from 'react';
import { ArrowRight, UserCog } from 'lucide-react';
import { StepProps } from './types';

export default function StepTrusteeType({ formData, updateFormData, onNext, onBack }: StepProps) {
  const details = formData.trustDetails || { trusteeType: '', trustName: '', trustType: '', taxReference: '', countryEstablished: '', natureOfTrust: '', taxClassification: '', hasGIIN: '' };

  const handleSelect = (type: 'Individual' | 'Corporate') => {
    updateFormData('trustDetails', { ...details, trusteeType: type });
    onNext();
  };

  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-10 py-10 sm:py-14 font-inter w-full">
      <div className="mb-10">
        <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-slate-400 mb-3">Trust Application</p>
        <h1 className="text-[1.875rem] sm:text-[2.125rem] font-semibold text-slate-900 tracking-tight leading-tight mb-2">Trustee Type</h1>
        <p className="text-[15px] text-slate-600 leading-relaxed">Are you an individual trustee or a corporate trustee?</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
        <div
          onClick={() => handleSelect('Individual')}
          className={`bg-white rounded-2xl border ${details.trusteeType === 'Individual' ? 'border-corporate-charcoal ring-2 ring-corporate-charcoal/10' : 'border-slate-200'} shadow-[0_2px_20px_rgba(0,0,0,0.06)] p-8 sm:p-10 cursor-pointer hover:border-corporate-charcoal transition-all flex flex-col items-center justify-center text-center gap-4`}
        >
          <UserCog className="w-10 h-10 text-corporate-charcoal" strokeWidth={1.5} />
          <div>
            <p className="text-[17px] font-semibold text-slate-900">Individual Trustee</p>
            <p className="text-[13px] text-slate-500 mt-1">A private individual acting as trustee.</p>
          </div>
        </div>

        <div
          onClick={() => handleSelect('Corporate')}
          className={`bg-white rounded-2xl border ${details.trusteeType === 'Corporate' ? 'border-corporate-charcoal ring-2 ring-corporate-charcoal/10' : 'border-slate-200'} shadow-[0_2px_20px_rgba(0,0,0,0.06)] p-8 sm:p-10 cursor-pointer hover:border-corporate-charcoal transition-all flex flex-col items-center justify-center text-center gap-4`}
        >
          <UserCog className="w-10 h-10 text-corporate-charcoal" strokeWidth={1.5} />
          <div>
            <p className="text-[17px] font-semibold text-slate-900">Corporate Trustee</p>
            <p className="text-[13px] text-slate-500 mt-1">A registered company acting as trustee.</p>
          </div>
        </div>
      </div>

      <div className="flex justify-start pt-7 border-t border-slate-200">
        <button type="button" onClick={onBack} className="w-full sm:w-auto text-[14px] font-medium text-slate-600 hover:text-slate-900 px-6 py-3 rounded-xl border border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-all cursor-pointer bg-white">Back</button>
      </div>
    </div>
  );
}
