"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, AlertCircle } from 'lucide-react';
import { StepProps } from './types';

export default function Step0Register({ formData, updateFormData, onNext }: StepProps) {
  const [errors, setErrors] = useState<{ firstName?: string; lastName?: string; emailAddress?: string }>({});

  const { personalDetails, contactDetails } = formData;

  const handleFirstNameChange = (val: string) => {
    updateFormData('personalDetails', { ...personalDetails, firstName: val });
    if (errors.firstName) setErrors((prev) => ({ ...prev, firstName: undefined }));
  };

  const handleLastNameChange = (val: string) => {
    updateFormData('personalDetails', { ...personalDetails, lastName: val });
    if (errors.lastName) setErrors((prev) => ({ ...prev, lastName: undefined }));
  };

  const handleEmailChange = (val: string) => {
    updateFormData('contactDetails', { ...contactDetails, emailAddress: val });
    if (errors.emailAddress) setErrors((prev) => ({ ...prev, emailAddress: undefined }));
  };

  const handleContinue = () => {
    const newErrors: typeof errors = {};
    if (!personalDetails.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!personalDetails.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!contactDetails.emailAddress.trim() || !contactDetails.emailAddress.includes('@')) {
      newErrors.emailAddress = 'Valid email address is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onNext();
  };

  const inputClass = (err?: string) =>
    `w-full px-4 py-3.5 rounded-xl border ${
      err ? 'border-red-500 bg-red-50/20' : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50'
    } focus:bg-white focus:border-corporate-charcoal focus:ring-4 focus:ring-corporate-charcoal/10 outline-none transition-all text-base font-medium text-corporate-black placeholder:text-gray-400`;

  const labelClass = "block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider";

  return (
    <div className="h-screen w-full flex flex-col lg:flex-row bg-[#f9f9f7] animate-fade-in overflow-hidden font-general">
      {/* Left Sidebar - Corporate Charcoal Branding */}
      <div className="w-full lg:w-5/12 xl:w-1/2 bg-corporate-charcoal text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden h-auto lg:h-screen shrink-0">
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-corporate-gold/10 rounded-full blur-3xl pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-corporate-gold/5 rounded-full blur-3xl pointer-events-none transform -translate-x-1/3 translate-y-1/3" />

        {/* Top Official Logo */}
        <div className="relative z-10">
          <Link href="/" className="inline-block">
            <Image
              src="/logo-2.png"
              width={180}
              height={56}
              alt="Monefi / Baker Jones Holdings Logo"
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Center Content - Official Typography */}
        <div className="relative z-10 my-auto py-8 max-w-lg">
          <span className="block text-xs font-bold uppercase tracking-[0.25em] text-corporate-gold mb-4">
            Account Registration
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.15] mb-6">
            Start your <br />
            <span className="text-corporate-gold">investment journey.</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Create your account to access our fixed-income bond portfolio and manage your investments securely with institutional-grade tools.
          </p>
        </div>

        {/* Bottom Help Section */}
        <div className="relative z-10 border-t border-white/10 pt-6">
          <span className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">
            Need Help?
          </span>
          <a
            href="mailto:info@monefi.com"
            className="text-white font-medium text-sm sm:text-base hover:text-corporate-gold hover:underline transition-colors"
          >
            info@monefi.com
          </a>
        </div>
      </div>

      {/* Right Side - Expanded Form Card */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-10 lg:p-16 h-auto lg:h-screen overflow-y-auto">
        <div className="w-full max-w-xl my-auto">
          {/* Main Card - Increased width to max-w-xl (576px) */}
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 sm:p-12 transition-all">
            <span className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
              New Account
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-corporate-charcoal mb-2 tracking-tight">
              Create your account
            </h2>
            <p className="text-slate-500 text-sm sm:text-base mb-8">
              Enter your details below to begin your application.
            </p>

            {/* Form Fields */}
            <form onSubmit={(e) => { e.preventDefault(); handleContinue(); }} className="space-y-6">
              {/* First Name & Last Name Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>First name</label>
                  <input
                    type="text"
                    placeholder="John"
                    value={personalDetails.firstName}
                    onChange={(e) => handleFirstNameChange(e.target.value)}
                    className={inputClass(errors.firstName)}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1.5 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label className={labelClass}>Last name</label>
                  <input
                    type="text"
                    placeholder="Smith"
                    value={personalDetails.lastName}
                    onChange={(e) => handleLastNameChange(e.target.value)}
                    className={inputClass(errors.lastName)}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1.5 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className={labelClass}>Email address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={contactDetails.emailAddress}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  className={inputClass(errors.emailAddress)}
                />
                {errors.emailAddress && (
                  <p className="text-red-500 text-xs mt-1.5 font-medium flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.emailAddress}
                  </p>
                )}
              </div>

              {/* Continue Button */}
              <button
                type="submit"
                className="w-full bg-corporate-charcoal hover:bg-corporate-charcoal/90 active:scale-[0.99] text-white font-semibold py-4 px-8 rounded-xl shadow-lg shadow-corporate-charcoal/20 transition-all flex items-center justify-center gap-2.5 mt-4 cursor-pointer text-base"
              >
                <span>Continue</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>

            {/* Sign in Link */}
            <div className="mt-8 text-center pt-5 border-t border-slate-100">
              <span className="text-sm text-slate-500">
                Already have an account?{' '}
                <Link href="/" className="text-corporate-charcoal font-bold underline hover:text-corporate-gold transition-colors ml-1">
                  Sign in
                </Link>
              </span>
            </div>
          </div>

          {/* Copyright Footer */}
          <div className="mt-6 text-center">
            <p className="text-xs text-slate-400">
              &copy; {new Date().getFullYear()} Baker Jones Holdings. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
