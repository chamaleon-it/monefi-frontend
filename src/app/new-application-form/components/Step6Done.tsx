"use client";

import React from 'react';
import { Check, Home, Mail, Phone } from 'lucide-react';
import { StepProps } from './types';
import Link from 'next/link';

export default function Step6Done({ formData }: StepProps) {
  const refNum = formData.referenceNumber || 'SE3977W';

  return (
    <div className="max-w-2xl mx-auto px-5 sm:px-8 lg:px-10 py-14 sm:py-20 font-inter text-center w-full">
      {/* Success icon */}
      <div className="relative w-20 h-20 mx-auto mb-8 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-emerald-100 animate-ping opacity-50" />
        <div className="relative w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/30">
          <Check className="w-7 h-7" strokeWidth={2} />
        </div>
      </div>

      {/* Headline */}
      <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-slate-400 mb-3">
        Application Submitted
      </p>
      <h1 className="text-[2rem] sm:text-[2.5rem] font-light text-corporate-charcoal tracking-[-0.02em] mb-3">
        We&apos;ve received your application
      </h1>
      <p className="text-[15px] text-slate-600 leading-relaxed max-w-md mx-auto mb-2">
        Your reference number is{' '}
        <span className="font-mono text-[13px] text-corporate-charcoal bg-slate-100 px-2 py-0.5 rounded">
          {refNum}
        </span>
        . Please keep this for your records.
      </p>

      {/* What happens next */}
      <div className="mt-10 bg-white rounded-2xl border border-slate-200 shadow-[0_2px_20px_rgba(0,0,0,0.06)] p-8 sm:p-10 text-left">
        <p className="text-[15px] font-medium text-slate-800 mb-6 pb-4 border-b border-slate-100">
          What happens next?
        </p>

        <div className="space-y-6">
          {[
            {
              num: '1',
              title: 'Application review',
              body: 'Our compliance and onboarding team has received your application. We will review your details within 1–2 business days.',
            },
            {
              num: '2',
              title: 'Identity validation',
              body: (
                <>
                  If you opted to email documents later, please send high-resolution scans to{' '}
                  <a href="mailto:info@bakerjonesholdings.com" className="text-corporate-charcoal underline hover:text-corporate-gold transition-colors">
                    info@bakerjonesholdings.com
                  </a>{' '}
                  quoting reference{' '}
                  <span className="font-mono text-[12px] text-corporate-charcoal bg-slate-100 px-1.5 py-0.5 rounded">{refNum}</span>.
                </>
              ),
            },
            {
              num: '3',
              title: 'Account activation',
              body: 'Once verification is complete, you will receive login credentials for the client portal and instructions for funding your portfolio.',
            },
          ].map((item) => (
            <div key={item.num} className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 text-[11px] font-medium flex items-center justify-center shrink-0 mt-0.5">
                {item.num}
              </div>
              <div>
                <p className="text-[14px] font-medium text-slate-700 mb-1">{item.title}</p>
                <p className="text-[13px] text-slate-400 font-light leading-relaxed">{item.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact strip */}
        <div className="mt-7 pt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-[13px] text-slate-400 font-light">
            <Mail className="w-3.5 h-3.5 text-slate-300" strokeWidth={1.5} />
            info@bakerjonesholdings.com
          </div>
          <div className="flex items-center gap-2 text-[13px] text-slate-400 font-light">
            <Phone className="w-3.5 h-3.5 text-slate-300" strokeWidth={1.5} />
            +44 203 355 0894
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-corporate-charcoal hover:bg-corporate-charcoal/90 active:scale-[0.99] text-white text-[14px] font-normal py-3 px-8 rounded-lg shadow-sm transition-all cursor-pointer"
        >
          <Home className="w-4 h-4" strokeWidth={1.5} />
          Return to Homepage
        </Link>
      </div>

      <p className="mt-8 text-[12px] text-slate-300 font-light">
        &copy; {new Date().getFullYear()} Baker Jones Holdings. All rights reserved.
      </p>
    </div>
  );
}
