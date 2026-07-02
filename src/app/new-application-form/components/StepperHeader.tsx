"use client";

import React from 'react';
import Image from 'next/image';
import { Check, HelpCircle } from 'lucide-react';
import { ApplicationFormData } from './types';

interface StepperHeaderProps {
  currentStep: number; // 0 (Register), 1 (Account Type), 2 to 7 (Steps 1 to 6)
  formData: ApplicationFormData;
  onJumpToStep: (step: number) => void;
}

const steps = [
  { number: 1, label: 'About You', targetStep: 2 },
  { number: 2, label: 'Documents', targetStep: 3 },
  { number: 3, label: 'Additional', targetStep: 4 },
  { number: 4, label: 'Settlement', targetStep: 5 },
  { number: 5, label: 'Review', targetStep: 6 },
  { number: 6, label: 'Done', targetStep: 7 },
];

export default function StepperHeader({ currentStep, formData, onJumpToStep }: StepperHeaderProps) {
  // Stepper progress index (1 to 6)
  const stepperIndex = currentStep - 1;

  const getPercentage = () => {
    if (currentStep <= 2) return '0%';
    if (currentStep === 3) return '20%';
    if (currentStep === 4) return '40%';
    if (currentStep === 5) return '60%';
    if (currentStep === 6) return '80%';
    return '100%';
  };

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-40 shadow-xs">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-corporate-charcoal">
            <Image src="/logo.png" width={110} height={36} alt="Monefi Logo" className="h-8 w-auto object-contain" />
          </div>
          <div className="h-5 w-px bg-gray-200 hidden sm:block" />
          <span className="text-gray-500 font-medium text-sm sm:text-base hidden sm:block">
            {formData.accountType || 'Individual'} Application
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-200 font-semibold text-xs text-corporate-black bg-gray-50/50">
            {getPercentage()}
          </div>
          <button
            type="button"
            onClick={() => alert('For assistance, please contact our support team at +44 203 355 0894 or email info@bakerjonesholdings.com')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-sm font-medium text-gray-700 transition-all shadow-2xs cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 text-gray-500" />
            <span>Need help?</span>
          </button>
        </div>
      </div>

      {/* Stepper Bar (Only shown on Steps 1 to 6, i.e., currentStep >= 2) */}
      {currentStep >= 2 && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 overflow-x-auto">
          <div className="flex items-center justify-between min-w-[600px] sm:min-w-0">
            {steps.map((step, index) => {
              const isCompleted = stepperIndex > step.number;
              const isActive = stepperIndex === step.number;
              const isClickable = isCompleted && currentStep !== 7;

              return (
                <React.Fragment key={step.number}>
                  {/* Step Item */}
                  <div
                    onClick={() => isClickable && onJumpToStep(step.targetStep)}
                    className={`flex items-center gap-2 group ${
                      isClickable ? 'cursor-pointer hover:opacity-80' : ''
                    } transition-all`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                        isCompleted
                          ? 'bg-emerald-500 text-white shadow-xs'
                          : isActive
                          ? 'bg-white text-corporate-black border-2 border-corporate-black ring-4 ring-gray-100'
                          : 'bg-gray-100 text-gray-400 border border-gray-200'
                      }`}
                    >
                      {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : step.number}
                    </div>
                    <span
                      className={`text-xs sm:text-sm font-medium transition-colors ${
                        isActive
                          ? 'text-corporate-black font-semibold'
                          : isCompleted
                          ? 'text-gray-700'
                          : 'text-gray-400'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>

                  {/* Connecting Line */}
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 mx-2 sm:mx-4 h-[2px] rounded-full transition-colors duration-300 ${
                        stepperIndex > step.number ? 'bg-emerald-500' : 'bg-gray-100'
                      }`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
