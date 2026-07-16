"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, AlertCircle } from 'lucide-react';
import { StepProps } from './types';

// ── Shared design tokens ────────────────────────────────────────────────
const LABEL = "block text-[11px] font-semibold tracking-[0.1em] uppercase text-slate-600 mb-2";
const INPUT_OK = "w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-[15px] font-normal text-slate-900 placeholder:text-slate-400 outline-none transition-all hover:border-slate-400 focus:border-corporate-charcoal focus:ring-2 focus:ring-corporate-charcoal/10";
const INPUT_ERR = "w-full px-4 py-3 rounded-xl border border-red-400 bg-red-50/60 text-[15px] font-normal text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-red-500 focus:ring-2 focus:ring-red-400/15";
const ERROR_MSG = "text-[12px] text-red-600 mt-2 flex items-center gap-1";
// ────────────────────────────────────────────────────────────────────────

export default function Step0Register({ formData, updateFormData, onNext }: StepProps) {
  const [errors, setErrors] = useState<{ firstName?: string; lastName?: string; emailAddress?: string }>({});
  const { personalDetails, contactDetails } = formData;

  const handleContinue = () => {
    const newErrors: typeof errors = {};
    if (!personalDetails.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!personalDetails.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!contactDetails.emailAddress.trim() || !contactDetails.emailAddress.includes('@'))
      newErrors.emailAddress = 'Valid email address is required';
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    onNext();
  };

  const ic = (err?: string) => err ? INPUT_ERR : INPUT_OK;

  return (
    <div className="min-h-screen lg:h-full w-full flex flex-col lg:flex-row font-inter bg-[#F5F4F2]">
      {/* ── Left panel ── */}
      <div className="w-full lg:w-[44%] xl:w-[40%] bg-corporate-charcoal text-white  flex-col justify-between p-6 sm:p-10 lg:p-14 relative overflow-hidden shrink-0 h-[100px] sm:h-[180px] lg:h-full hidden lg:flex">
        <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-corporate-gold/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-20 -left-10 w-[350px] h-[350px] bg-white/3 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10">
          <Link href="/"><Image src="/logo/logo-white.svg" width={180} height={56} alt="Baker Jones Holdings" className="h-8 w-auto object-contain" /></Link>
        </div>

        <div className="relative z-10 my-auto py-8 lg:py-0">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-corporate-gold/80 mb-4 hidden lg:block">Account Registration</p>
          <h1 className="text-[2.25rem] lg:text-[3rem] font-semibold text-white leading-[1.1] tracking-tight mb-4 hidden lg:block">
            Start your<br /><span className="text-corporate-gold">investment <br /> journey.</span>
          </h1>
          <p className="text-slate-400 text-[14px] leading-[1.8] hidden lg:block">
            Access our fixed-income bond portfolio with institutional-grade security and compliance.
          </p>
          <div className="mt-8 space-y-2.5 hidden lg:block">
            {['FCA Regulated & Compliant', '256-bit SSL Encryption', 'Institutional-Grade Security'].map(t => (
              <div key={t} className="flex items-center gap-2.5">
                <div className="w-1 h-1 rounded-full bg-corporate-gold/60 shrink-0" />
                <span className="text-[13px] text-slate-400">{t}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 hidden lg:block border-t border-white/10 pt-5">
          <p className="text-[11px] text-slate-500 uppercase tracking-widest mb-1 font-semibold">Need assistance?</p>
          <a href="mailto:info@bakerjonesholdings.com" className="text-[14px] text-slate-300 hover:text-white transition-colors">info@bakerjonesholdings.com</a>
        </div>
      </div>

      {/* ── Right panel ── */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10 lg:p-14 lg:overflow-y-auto">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_4px_32px_rgba(0,0,0,0.08)] p-8 sm:p-10">
            {/* Mobile Logo */}
            <div className="mb-8 lg:hidden flex justify-center border-b border-slate-100 pb-6">
              <Link href="/">
                <Image src="/logo/logo.svg" width={160} height={40} alt="Baker Jones Holdings" className="h-8 w-auto object-contain" />
              </Link>
            </div>
            
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-slate-400 mb-3">New Account</p>
            <h2 className="text-[1.875rem] font-semibold text-slate-900 tracking-tight leading-tight mb-2">Create your account</h2>
            <p className="text-[15px] text-slate-600 mb-8">Enter your details to begin your application.</p>

            <form onSubmit={(e) => { e.preventDefault(); handleContinue(); }} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={LABEL}>First name</label>
                  <input type="text" placeholder="John" value={personalDetails.firstName} onChange={e => updateFormData('personalDetails', { ...personalDetails, firstName: e.target.value })} className={ic(errors.firstName)} />
                  {errors.firstName && <p className={ERROR_MSG}><AlertCircle className="w-3.5 h-3.5" strokeWidth={1.5} />{errors.firstName}</p>}
                </div>
                <div>
                  <label className={LABEL}>Last name</label>
                  <input type="text" placeholder="Smith" value={personalDetails.lastName} onChange={e => updateFormData('personalDetails', { ...personalDetails, lastName: e.target.value })} className={ic(errors.lastName)} />
                  {errors.lastName && <p className={ERROR_MSG}><AlertCircle className="w-3.5 h-3.5" strokeWidth={1.5} />{errors.lastName}</p>}
                </div>
              </div>
              <div>
                <label className={LABEL}>Email address</label>
                <input type="email" placeholder="you@example.com" value={contactDetails.emailAddress} onChange={e => updateFormData('contactDetails', { ...contactDetails, emailAddress: e.target.value })} className={ic(errors.emailAddress)} />
                {errors.emailAddress && <p className={ERROR_MSG}><AlertCircle className="w-3.5 h-3.5" strokeWidth={1.5} />{errors.emailAddress}</p>}
              </div>

              <button type="submit" className="w-full mt-2 bg-corporate-charcoal hover:bg-[#12144A] active:scale-[0.99] text-white text-[15px] font-semibold py-4 px-8 rounded-xl transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-lg shadow-corporate-charcoal/25">
                Continue <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </button>
            </form>

            <div className="mt-7 pt-5 border-t border-slate-100 text-center">
              <p className="text-[13px] text-slate-500">Already have an account?{' '}
                <Link href="/" className="text-corporate-charcoal font-semibold hover:underline">Sign in</Link>
              </p>
            </div>
          </div>
          <p className="mt-5 text-center text-[12px] text-slate-400">&copy; {new Date().getFullYear()} Baker Jones Holdings. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
