"use client";

import React from 'react';
import { Check, Home, Phone, Mail } from 'lucide-react';
import { StepProps } from './types';
import Link from 'next/link';

export default function Step6Done({ formData }: StepProps) {
  const refNum = formData.referenceNumber || 'SE3977W';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 animate-fade-in font-general text-center w-full">
      {/* Animated Green Checkmark Icon */}
      <div className="relative w-24 h-24 mx-auto mb-8 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-emerald-100 animate-ping opacity-75" />
        <div className="relative w-20 h-20 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30">
          <Check className="w-10 h-10 stroke-[3]" />
        </div>
      </div>

      {/* Main Titles */}
      <h1 className="text-3xl sm:text-5xl font-extrabold text-corporate-charcoal tracking-tight mb-4">
        Application Submitted — {refNum}
      </h1>
      <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
        Thank you for submitting your application. Your reference number is <strong className="font-mono text-corporate-black">{refNum}</strong>. Please keep this for your records.
      </p>

      {/* Information Card */}
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 sm:p-12 text-left max-w-3xl mx-auto mb-12">
        <h2 className="text-xl sm:text-2xl font-bold text-corporate-charcoal mb-4 pb-4 border-b border-slate-100">
          What happens next?
        </h2>

        <div className="space-y-6 text-gray-600 text-sm sm:text-base leading-relaxed">
          <div>
            <h3 className="font-bold text-corporate-black text-base sm:text-lg mb-1.5">1. Application Review</h3>
            <p>
              Our compliance and onboarding team has received your application. We will review your personal details and settlement instructions within 1-2 business days.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-corporate-black text-base sm:text-lg mb-1.5">2. Important identification validation</h3>
            <p>
              If you opted to email your identity or proof of address documents later, please send high-resolution scans or photos to <a href="mailto:onboarding@monefi.com" className="text-corporate-charcoal font-bold underline hover:text-corporate-gold">onboarding@monefi.com</a>, quoting your reference number (<strong className="font-mono text-corporate-black">{refNum}</strong>) in the subject line.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-corporate-black text-base sm:text-lg mb-1.5">3. Account Activation</h3>
            <p>
              Once identity verification is complete, you will receive an email with your account confirmation, login credentials for the client portal, and instructions for funding your fixed-income portfolio.
            </p>
          </div>
        </div>

        {/* Contact Info Footer inside card */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs sm:text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-corporate-charcoal shrink-0" />
            <span>Support: <strong className="text-corporate-black">support@monefi.com</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-corporate-charcoal shrink-0" />
            <span>Phone: <strong className="text-corporate-black">+44 (0) 20 7123 4567</strong></span>
          </div>
        </div>
      </div>

      {/* Return Home Button */}
      <div className="flex justify-center">
        <Link
          href="/"
          className="bg-corporate-charcoal hover:bg-corporate-charcoal/90 active:scale-[0.99] text-white font-semibold py-4 px-10 rounded-xl shadow-lg shadow-corporate-charcoal/20 transition-all inline-flex items-center gap-2.5 cursor-pointer text-base"
        >
          <Home className="w-5 h-5" />
          <span>Return to Homepage</span>
        </Link>
      </div>
    </div>
  );
}
