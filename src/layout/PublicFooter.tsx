"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function PublicFooter() {
  return (
    <footer className="bg-corporate-white border-t border-gray-200 pt-16">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 mb-12">
          <div className="md:col-span-5 lg:col-span-6">
            <Link href="/" className="inline-block mb-4">
              <Image src="/logo/logo.svg" width={160} height={40} alt="Baker Jones Holdings logo" />
            </Link>
            <p className="text-[12px] text-slate-500 leading-relaxed max-w-[280px]">
              Building long-term value through strategic investments and digital infrastructure.
            </p>
          </div>
          <div className="md:col-span-2 lg:col-span-2">
            <h4 className="text-[13px] font-bold text-[#082348] mb-4">Products</h4>
            <ul className="space-y-3">
              <li><Link href="/capital-markets" className="text-[12px] font-medium text-slate-500 hover:text-[#082348]">Capital Markets</Link></li>
              <li><Link href="/private-equity" className="text-[12px] font-medium text-slate-500 hover:text-[#082348]">Private Equity</Link></li>
              <li><Link href="/structured-holdings" className="text-[12px] font-medium text-slate-500 hover:text-[#082348]">Structured Holdings</Link></li>
              <li><Link href="/digital-assets" className="text-[12px] font-medium text-slate-500 hover:text-[#082348]">Digital Assets</Link></li>
            </ul>
          </div>
          <div className="md:col-span-2 lg:col-span-2">
            <h4 className="text-[13px] font-bold text-[#082348] mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><Link href="/terms" className="text-[12px] font-medium text-slate-500 hover:text-[#082348]">Terms of Use</Link></li>
              <li><Link href="/privacy" className="text-[12px] font-medium text-slate-500 hover:text-[#082348]">Privacy Policy</Link></li>
              <li><Link href="/cookie-policy" className="text-[12px] font-medium text-slate-500 hover:text-[#082348]">Cookie Policy</Link></li>
              <li><Link href="/regulatory-information" className="text-[12px] font-medium text-slate-500 hover:text-[#082348]">Regulatory Info</Link></li>
            </ul>
          </div>
          <div className="md:col-span-3 lg:col-span-2">
            <h4 className="text-[13px] font-bold text-[#082348] mb-4">Company</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-[12px] font-medium text-slate-500 hover:text-[#082348]">Home</Link></li>
              <li><Link href="/about-us" className="text-[12px] font-medium text-slate-500 hover:text-[#082348]">About Us</Link></li>
              <li><Link href="/login" className="text-[12px] font-medium text-slate-500 hover:text-[#082348]">Platform</Link></li>
              <li><Link href="/contact-us" className="text-[12px] font-medium text-slate-500 hover:text-[#082348]">Contact</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="py-6 border-t border-slate-100 text-center">
        <p className="text-[11px] text-slate-400 font-medium">
          ©{new Date().getFullYear()} Baker Jones Holdings Ltd. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
