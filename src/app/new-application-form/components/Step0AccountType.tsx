"use client";

import React from 'react';
import Image from 'next/image';
import { User, Users, Building2, ShieldCheck, Check, ChevronLeft } from 'lucide-react';
import { AccountTypeOption, StepProps } from './types';

const options: { id: AccountTypeOption; label: string; description: string; icon: React.ReactNode }[] = [
  { id: 'Individual', label: 'Individual', description: 'Personal investment accounts for a single investor', icon: <User className="w-5 h-5" strokeWidth={1.5} /> },
  { id: 'Joint',      label: 'Joint',      description: 'Shared accounts held by two or more people',       icon: <Users className="w-5 h-5" strokeWidth={1.5} /> },
  { id: 'Company',    label: 'Company',    description: 'Corporate investment accounts for businesses',      icon: <Building2 className="w-5 h-5" strokeWidth={1.5} /> },
  { id: 'Trust',      label: 'Trust',      description: 'Investment accounts managed under a trust',        icon: <ShieldCheck className="w-5 h-5" strokeWidth={1.5} /> },
];

export default function Step0AccountType({ formData, updateFormData, onNext, onBack }: StepProps) {
  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-8 py-12 sm:py-16 font-inter w-full">
      {/* Header */}
      <div className="text-center mb-10 flex flex-col items-center">
        <Image src="/logo.png" width={1280} height={290} alt="Logo" className="w-auto h-7 object-contain mb-6" />
        <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-slate-400 mb-2">Client Portal</p>
        <h1 className="text-[2rem] sm:text-[2.25rem] font-semibold text-slate-900 tracking-tight mb-2">Choose account type</h1>
        <p className="text-[14px] text-slate-500 max-w-sm leading-relaxed">Select the type of account you&apos;d like to open.</p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        {options.map((opt) => {
          const sel = formData.accountType === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => updateFormData('accountType', opt.id)}
              className={`relative p-6 rounded-xl border text-left flex items-start gap-4 transition-all duration-150 cursor-pointer ${
                sel
                  ? 'border-corporate-charcoal bg-white shadow-[0_4px_20px_rgba(9,10,44,0.12)]'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
              }`}
            >
              {sel && (
                <div className="absolute top-3.5 right-3.5 w-5 h-5 bg-corporate-charcoal text-white rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3" strokeWidth={2.5} />
                </div>
              )}
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${sel ? 'bg-corporate-charcoal text-white' : 'bg-slate-100 text-slate-600'}`}>
                {opt.icon}
              </div>
              <div>
                <p className={`text-[15px] font-semibold mb-0.5 ${sel ? 'text-corporate-charcoal' : 'text-slate-800'}`}>{opt.label}</p>
                <p className="text-[13px] text-slate-500 leading-relaxed">{opt.description}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex flex-col items-center gap-4">
        <button
          type="button"
          onClick={onNext}
          className="w-full sm:w-auto sm:min-w-[240px] bg-corporate-charcoal hover:bg-[#12144A] active:scale-[0.99] text-white text-[14px] font-semibold py-3.5 px-10 rounded-xl shadow-md shadow-corporate-charcoal/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          Continue
        </button>
        {onBack && (
          <button type="button" onClick={onBack} className="inline-flex items-center gap-1.5 text-[13px] text-slate-400 hover:text-slate-700 transition-colors cursor-pointer">
            <ChevronLeft className="w-3.5 h-3.5" strokeWidth={1.5} />Back to registration
          </button>
        )}
      </div>
    </div>
  );
}
