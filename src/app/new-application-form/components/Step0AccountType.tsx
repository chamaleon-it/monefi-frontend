"use client";

import React from 'react';
import { User, Users, Building2, ShieldCheck, Check, ArrowLeft, FileText } from 'lucide-react';
import { AccountTypeOption, StepProps } from './types';
import Image from 'next/image';

export default function Step0AccountType({ formData, updateFormData, onNext, onBack }: StepProps) {
  const options: { id: AccountTypeOption; label: string; description: string; icon: React.ReactNode }[] = [
    {
      id: 'Individual',
      label: 'Individual',
      description: 'For personal investment accounts',
      icon: <User className="w-6 h-6" />,
    },
    {
      id: 'Joint',
      label: 'Joint',
      description: 'For shared investment accounts',
      icon: <Users className="w-6 h-6" />,
    },
    {
      id: 'Company',
      label: 'Company',
      description: 'For corporate investment accounts',
      icon: <Building2 className="w-6 h-6" />,
    },
    {
      id: 'Trust',
      label: 'Trust',
      description: 'For trust accounts',
      icon: <ShieldCheck className="w-6 h-6" />,
    },
  ];

  const handleSelect = (id: AccountTypeOption) => {
    updateFormData('accountType', id);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-fade-in font-general w-full">
      {/* Top Welcome Section */}
      <div className="text-center mb-10 flex flex-col items-center">
        <div className="w-16 h-16 bg-corporate-charcoal rounded-2xl flex items-center justify-center shadow-lg mb-4 text-white p-3">
          <Image src="/logo.png" width={56} height={56} alt="Logo" className="w-auto h-9 object-contain" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-corporate-charcoal mb-2 tracking-tight">
          Client Portal
        </h1>
        <p className="text-gray-500 text-base sm:text-lg max-w-lg mx-auto mb-5">
          Apply for an Online Account in minutes
        </p>
        
        {/* Reference Badge */}
        <div className="inline-flex items-center gap-2 bg-gray-100/80 border border-gray-200 px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-gray-700 shadow-3xs">
          <FileText className="w-4 h-4 text-gray-500" />
          <span>Reference: <strong className="font-mono font-bold text-corporate-black">{formData.referenceNumber || 'SE3977W'}</strong></span>
        </div>
      </div>

      {/* Main Selection Card - Expanded to max-w-5xl */}
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 sm:p-12 transition-all w-full">
        <div className="mb-8 text-center sm:text-left">
          <h2 className="text-2xl font-bold text-corporate-charcoal">
            Choose your account type
          </h2>
          <p className="text-sm sm:text-base text-gray-500 mt-1">
            Select the type of account you&apos;d like to open to begin your tailored application
          </p>
        </div>

        {/* 4-Column Grid on Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {options.map((opt) => {
            const isSelected = formData.accountType === opt.id;
            return (
              <div
                key={opt.id}
                onClick={() => handleSelect(opt.id)}
                className={`relative p-6 sm:p-7 rounded-xl border-2 transition-all duration-200 cursor-pointer flex flex-col items-center text-center group ${
                  isSelected
                    ? 'border-corporate-charcoal bg-slate-50/80 shadow-md scale-[1.01]'
                    : 'border-slate-200 hover:border-corporate-gold hover:bg-slate-50/40 bg-white shadow-2xs'
                }`}
              >
                {/* Selection Checkmark Badge */}
                {isSelected && (
                  <div className="absolute top-3 right-3 w-6 h-6 bg-corporate-charcoal text-white rounded-full flex items-center justify-center shadow-sm animate-scale-in">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}

                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-200 ${
                  isSelected ? 'bg-corporate-charcoal text-white' : 'bg-slate-100 text-corporate-charcoal group-hover:bg-corporate-gold/20'
                }`}>
                  {opt.icon}
                </div>

                {/* Title */}
                <h3 className="font-bold text-lg text-corporate-charcoal mb-1.5">
                  {opt.label}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  {opt.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Continue Button */}
        <button
          type="button"
          onClick={onNext}
          className="w-full sm:max-w-md mx-auto bg-corporate-charcoal hover:bg-corporate-charcoal/90 active:scale-[0.99] text-white font-semibold py-4 px-8 rounded-xl shadow-lg shadow-corporate-charcoal/20 transition-all flex items-center justify-center gap-2 cursor-pointer text-base"
        >
          <span>Continue</span>
        </button>

        {/* Back to registration button */}
        {onBack && (
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-gray-500 hover:text-corporate-charcoal transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to registration</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
