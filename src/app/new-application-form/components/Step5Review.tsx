"use client";

import React, { useState } from 'react';
import { Edit2, Check, AlertCircle, ArrowRight } from 'lucide-react';
import { StepProps } from './types';

export default function Step5Review({ formData, updateFormData, onNext, onBack, onJumpToStep }: StepProps) {
  const [error, setError] = useState<string>('');
  const { personalDetails, residentialAddress, contactDetails, documents, additionalQuestions, settlementDetails, agreedToTerms } = formData;

  const handleToggleTerms = () => {
    updateFormData('agreedToTerms', !agreedToTerms);
    if (error) setError('');
  };

  const handleSubmit = () => {
    if (!agreedToTerms) {
      setError('You must read and agree to the declaration before submitting your application.');
      document.getElementById('declaration-box')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    onNext();
  };

  const renderRow = (label: string, value?: string | null) => (
    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between py-3 border-b border-slate-50 last:border-b-0 gap-1">
      <span className="text-[13px] text-slate-400 font-light shrink-0 min-w-[140px]">{label}</span>
      <span className="text-[14px] text-slate-700 font-normal text-right break-all">
        {value || <span className="text-slate-300">—</span>}
      </span>
    </div>
  );

  const renderCardHeader = (title: string, stepNumber: number) => (
    <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-100">
      <p className="text-[15px] font-medium text-slate-800">{title}</p>
      {onJumpToStep && (
        <button
          type="button"
          onClick={() => onJumpToStep(stepNumber)}
          className="inline-flex items-center gap-1 text-[12px] font-normal text-slate-400 hover:text-corporate-charcoal transition-colors cursor-pointer"
        >
          <Edit2 className="w-3 h-3" strokeWidth={1.5} />
          <span>Edit</span>
        </button>
      )}
    </div>
  );

  const CARD = "bg-white rounded-xl border border-slate-100 shadow-[0_2px_16px_rgba(0,0,0,0.04)] p-6 sm:p-8";

  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-10 py-10 sm:py-14 font-inter w-full">
      {/* Page header */}
      <div className="mb-10">
        <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-slate-400 mb-3">Step 5 of 6</p>
        <h1 className="text-[1.875rem] sm:text-[2.125rem] font-semibold text-slate-900 tracking-tight leading-tight mb-2">
          Review &amp; submit
        </h1>
        <p className="text-[15px] text-slate-600 leading-relaxed">
          Please review your details carefully before submitting your application.
        </p>
      </div>

      <div className="space-y-4">
        {/* Personal Information */}
        <div className={CARD}>
          {renderCardHeader('Personal Information', 2)}
          <div>
            {renderRow('Title', personalDetails.title)}
            {renderRow('First name', personalDetails.firstName)}
            {renderRow('Last name', personalDetails.lastName)}
            {renderRow('Date of birth', personalDetails.dateOfBirth)}
            {renderRow('Occupation', personalDetails.occupation)}
            {renderRow('Address Line 1', residentialAddress.addressLine1)}
            {residentialAddress.addressLine2 && renderRow('Address Line 2', residentialAddress.addressLine2)}
            {renderRow('City / Town', residentialAddress.city)}
            {renderRow('Postal Code / ZIP Code', residentialAddress.postcode)}
            {renderRow('Country', residentialAddress.country)}
            {contactDetails.homePhone && renderRow('Home phone', `${contactDetails.homePhoneCode || ''} ${contactDetails.homePhone}`.trim())}
            {renderRow('Mobile', `${contactDetails.mobilePhoneCode || ''} ${contactDetails.mobilePhone}`.trim())}
            {renderRow('Email', contactDetails.emailAddress)}
          </div>
        </div>

        {/* Identification */}
        <div className={CARD}>
          {renderCardHeader('Identification Documents', 3)}
          <div>
            {renderRow('Identity verification', documents.identityVerificationFile ? `Uploaded: ${documents.identityVerificationFile}` : documents.identityVerificationEmailLater ? 'Will email later' : 'Pending')}
            {renderRow('Proof of address', documents.proofOfAddressFile ? `Uploaded: ${documents.proofOfAddressFile}` : documents.proofOfAddressEmailLater ? 'Will email later' : 'Pending')}
          </div>
        </div>

        {/* Additional */}
        <div className={CARD}>
          {renderCardHeader('Additional Information', 4)}
          <div>
            {renderRow('Financial adviser?', additionalQuestions.financialAdviser)}
            {renderRow('Employment status', additionalQuestions.employmentStatus)}
            {renderRow('Occupation', additionalQuestions.occupation)}
            {additionalQuestions.employerName && renderRow('Employer name', additionalQuestions.employerName)}
            {additionalQuestions.industrySector && renderRow('Industry/Sector', additionalQuestions.industrySector)}
            {renderRow('Annual income', additionalQuestions.annualIncomeRange)}
            {renderRow('Net worth', additionalQuestions.netWorth)}
            {renderRow('Liquid assets', additionalQuestions.liquidAssets)}
            {renderRow('Expected investment', additionalQuestions.expectedInvestmentAmount)}
            {renderRow('Source of funds', additionalQuestions.sourceOfFunds)}
            {renderRow('Politically exposed person?', additionalQuestions.pep)}
            {renderRow('PEP family member/associate?', additionalQuestions.pepFamily)}
          </div>
        </div>

        {/* Settlement */}
        <div className={CARD}>
          {renderCardHeader('Settlement Details', 5)}
          <div>
            {renderRow('Account name', settlementDetails.beneficiaryAccountName)}
            {renderRow('Bank name', settlementDetails.nameOfBank)}
            {renderRow('Account number', settlementDetails.accountNumber)}
            {renderRow('Sort code', settlementDetails.sortCode)}
          </div>
        </div>

        {/* Declaration */}
        <div id="declaration-box" className={CARD}>
          <div className="mb-5 pb-4 border-b border-slate-100">
            <p className="text-[15px] font-medium text-slate-800">Application Declaration</p>
          </div>

          <div className="text-[14px] text-slate-500 font-light space-y-3 leading-[1.7] mb-6">
            <p>
              This application is made to <span className="text-slate-700 font-normal">Baker Jones Holdings</span> for the purpose of establishing and maintaining an investment and/or custody relationship.
            </p>
            <p>
              Please read our <a href="#" className="text-corporate-charcoal underline hover:text-corporate-gold transition-colors">Terms of Business</a> before submitting.
            </p>
            <p className="text-[13px]">
              By submitting, you confirm all information provided is true and accurate, and authorise Baker Jones Holdings to collect and use this information for regulatory compliance and account administration.
            </p>
          </div>

          {/* Checkbox */}
          <div
            onClick={handleToggleTerms}
            className={`p-4 rounded-lg border transition-all cursor-pointer flex items-start gap-3.5 ${agreedToTerms
                ? 'border-corporate-charcoal bg-slate-50'
                : error
                  ? 'border-red-400 bg-red-50/30'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
          >
            <div
              className={`w-5 h-5 rounded border-[1.5px] flex items-center justify-center shrink-0 mt-0.5 transition-colors ${agreedToTerms
                  ? 'border-corporate-charcoal bg-corporate-charcoal text-white'
                  : 'border-slate-300 bg-white'
                }`}
            >
              {agreedToTerms && <Check className="w-3 h-3" strokeWidth={2.5} />}
            </div>
            <span className="text-[13px] font-normal text-slate-600 select-none leading-relaxed">
              I/We confirm that I/we have read and understood this application and agree to be bound by the terms governing our relationship with Baker Jones Holdings.
            </span>
          </div>
          {error && (
            <p className="text-[12px] text-red-500 mt-2 flex items-center gap-1.5 font-normal">
              <AlertCircle className="w-3.5 h-3.5" strokeWidth={1.5} />{error}
            </p>
          )}
        </div>
      </div>

      {/* Action bar */}
      <div className="mt-10 flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-7 border-t border-slate-200">
        <button
          type="button"
          onClick={onBack}
          className="w-full sm:w-auto text-[14px] font-medium text-slate-600 hover:text-slate-900 px-6 py-3 rounded-xl border border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-all cursor-pointer bg-white"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full sm:w-auto bg-corporate-charcoal hover:bg-[#12144A] active:scale-[0.99] text-white text-[14px] font-semibold py-3.5 px-10 rounded-xl shadow-lg shadow-corporate-charcoal/25 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
        >
          <span>Submit Application</span>
          <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
