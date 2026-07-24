import React from 'react'
import Investment from './Investment'

export default function InvestmentsPage() {
  return (
    <div className="space-y-6 font-inter">
      <div>
        <h1 className="text-2xl lg:text-3xl font-serif font-bold text-[#082348]">
          Direct Client Capital Allocation
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
          Execute manual investment placements for registered accounts across stocks, bonds, and crypto
        </p>
      </div>

      <div className="space-y-6">
        <Investment />
      </div>
    </div>
  );
}
