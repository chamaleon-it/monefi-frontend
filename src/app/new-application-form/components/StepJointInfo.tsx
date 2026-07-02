"use client";

import React from 'react';
import { ArrowRight, Users } from 'lucide-react';
import { StepProps } from './types';

export default function StepJointInfo({ formData, onNext, onBack }: StepProps) {
  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-10 py-10 sm:py-14 font-inter w-full">
      <div className="mb-10">
        <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-slate-400 mb-3">Joint Application</p>
        <h1 className="text-[1.875rem] sm:text-[2.125rem] font-semibold text-slate-900 tracking-tight leading-tight mb-2">Secondary applicant</h1>
        <p className="text-[15px] text-slate-600 leading-relaxed">Provide details for the second account holder.</p>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_2px_20px_rgba(0,0,0,0.06)] p-8 sm:p-10">
        <div className="flex items-start gap-4 mb-8 pb-6 border-b border-slate-100">
          <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
            <Users className="w-5 h-5" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-[17px] font-semibold text-slate-900">Joint Applicant Info</p>
            <p className="text-[13px] text-slate-500 mt-1">Their details and contact information.</p>
          </div>
        </div>
        <p className="text-slate-500 text-[14px]">Details for secondary applicant (Placeholder)</p>
      </div>
      <div className="mt-10 flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-7 border-t border-slate-200">
        <button type="button" onClick={onBack} className="w-full sm:w-auto text-[14px] font-medium text-slate-600 hover:text-slate-900 px-6 py-3 rounded-xl border border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-all cursor-pointer bg-white">Back</button>
        <button type="button" onClick={onNext} className="w-full sm:w-auto bg-corporate-charcoal hover:bg-[#12144A] active:scale-[0.99] text-white text-[14px] font-semibold py-3.5 px-10 rounded-xl shadow-lg shadow-corporate-charcoal/25 transition-all flex items-center justify-center gap-2.5 cursor-pointer">Continue <ArrowRight className="w-4 h-4" strokeWidth={1.5} /></button>
      </div>
    </div>
  );
}
