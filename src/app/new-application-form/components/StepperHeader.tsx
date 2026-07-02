"use client";

import React from 'react';
import Image from 'next/image';
import { Check, HeadphonesIcon } from 'lucide-react';
import { ApplicationFormData } from './types';

interface StepperHeaderProps {
  currentStepIndex: number;
  stepsFlow: string[];
  formData: ApplicationFormData;
  onJumpToStep: (step: number) => void;
}

const formatStepName = (name: string) => {
  const map: Record<string, string> = {
    AboutYou: 'About You',
    Documents: 'Documents',
    Additional: 'Additional',
    Settlement: 'Settlement',
    Review: 'Review',
    Done: 'Done',
    CompanyDetails: 'Company Details',
    JointInfo: 'Joint Info',
    JointDocuments: 'Joint ID',
    TrusteeType: 'Trustee Type',
    TrustDetails: 'Trust Details',
    TrustTaxInfo: 'Trust Tax Info'
  };
  return map[name] || name;
};

export default function StepperHeader({ currentStepIndex, stepsFlow, formData, onJumpToStep }: StepperHeaderProps) {
  const stepperSteps = stepsFlow.slice(2).map((stepName, i) => ({
    number: i + 1,
    label: formatStepName(stepName),
    targetStep: i + 2
  }));

  const stepperIndex = currentStepIndex - 1; // e.g. at index 2 (first stepper step), stepperIndex is 1. Wait.
  // actually, if currentStepIndex is 2, it corresponds to stepperSteps[0] (which is number 1).
  // so if we are at step number 1, active is number 1.
  const currentStepNumber = currentStepIndex - 1;

  const totalSteps = stepperSteps.length;
  // If we are at index 2, completedCount = 0.
  const completedCount = Math.max(0, currentStepIndex - 2);
  const pct = Math.round((completedCount / totalSteps) * 100);

  return (
    <header className="w-full sticky top-0 z-40 font-inter">

      {/* ── Primary nav bar ─────────────────────────────────── */}
      <div className="bg-corporate-charcoal border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 h-[68px] flex items-center justify-between">

          {/* Left: logo + context */}
          <div className="flex items-center gap-5">
            <Image
              src="/logo/logo-white.svg"
              width={140}
              height={44}
              alt="Baker Jones Holdings"
              className="h-7 w-auto object-contain "
            />
            <div className="h-5 w-px bg-white/25 hidden sm:block" />
            <span className="text-[13px] text-white/80 font-normal hidden sm:block">
              {formData.accountType || 'Individual'} Application
            </span>
          </div>

          {/* Right: progress + help */}
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex flex-col items-end gap-1">
              <span className="text-[11px] text-white/60 uppercase tracking-widest font-medium">Progress</span>
              <div className="flex items-center gap-2.5">
                <div className="w-24 h-[3px] bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-corporate-gold rounded-full transition-all duration-700"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-[12px] text-white/70 tabular-nums">{pct}%</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => alert('Support: +44 203 355 0894 | info@bakerjonesholdings.com')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-[13px] font-medium text-white/90 hover:text-white transition-all cursor-pointer"
            >
              <HeadphonesIcon className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span className="hidden sm:inline">Support</span>
            </button>
          </div>

        </div>
      </div>

      {/* ── Stepper bar ─────────────────────────────────────── */}
      {currentStepIndex >= 2 && (
        <div className="bg-white border-b border-slate-200 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
          <div className="mx-auto px-6 sm:px-10 py-4 overflow-x-auto w-min">
            <div className="flex items-center min-w-[560px] sm:min-w-0">
              {stepperSteps.map((step, idx) => {
                const done = currentStepNumber > step.number;
                const active = currentStepNumber === step.number;
                const isDoneStep = step.label === 'Done';
                const click = done && stepsFlow[currentStepIndex] !== 'Done';

                return (
                  <React.Fragment key={step.number}>
                    <div
                      onClick={() => click && onJumpToStep(step.targetStep)}
                      className={`flex items-center gap-2.5 shrink-0 transition-opacity ${click ? 'cursor-pointer hover:opacity-70' : ''}`}
                    >
                      {/* Circle */}
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-semibold transition-all ${done
                        ? 'bg-corporate-charcoal text-white shadow-sm'
                        : active
                          ? 'bg-white border-2 border-corporate-charcoal text-corporate-charcoal'
                          : 'bg-slate-100 text-slate-500 border border-slate-200'
                        }`}>
                        {done ? <Check className="w-3.5 h-3.5" strokeWidth={2.5} /> : step.number}
                      </div>
                      {/* Label */}
                      <span className={`text-[13px] font-semibold whitespace-nowrap ${active ? 'text-slate-900' : done ? 'text-slate-700' : 'text-slate-500'
                        }`}>
                        {step.label}
                      </span>
                    </div>

                    {idx < stepperSteps.length - 1 && (
                      <div className={`flex-1 mx-4 h-px rounded-full min-w-[20px] ${done ? 'bg-corporate-charcoal/30' : 'bg-slate-200'}`} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      )}

    </header>
  );
}
