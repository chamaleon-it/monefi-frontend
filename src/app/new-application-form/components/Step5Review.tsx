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
      const el = document.getElementById('declaration-box');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    onNext();
  };

  const renderRow = (label: string, value?: string | null) => (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3.5 border-b border-slate-100 last:border-b-0 text-sm sm:text-base gap-2">
      <span className="text-gray-500 font-medium">{label}</span>
      <span className="text-corporate-black font-semibold text-right break-all">
        {value || '—'}
      </span>
    </div>
  );

  const renderCardHeader = (title: string, stepNumber: number) => (
    <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
      <div className="flex items-center gap-3">
        <div className="w-1.5 h-7 bg-corporate-charcoal rounded-full" />
        <h2 className="text-xl sm:text-2xl font-bold text-corporate-charcoal">
          {title}
        </h2>
      </div>
      {onJumpToStep && (
        <button
          type="button"
          onClick={() => onJumpToStep(stepNumber)}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-slate-200 hover:border-corporate-charcoal bg-slate-50 hover:bg-slate-100 text-xs sm:text-sm font-semibold text-slate-700 transition-all cursor-pointer shadow-2xs"
        >
          <Edit2 className="w-4 h-4" />
          <span>Edit</span>
        </button>
      )}
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-fade-in font-general w-full">
      {/* Top Step Header */}
      <div className="text-center mb-10 sm:mb-14 flex flex-col items-center">
        <span className="inline-block bg-slate-200/80 text-slate-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-3">
          Step 5 of 6
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-corporate-charcoal tracking-tight mb-2">
          Review & submit
        </h1>
        <p className="text-gray-500 text-sm sm:text-base max-w-xl">
          Please review your details before submitting your application.
        </p>
      </div>

      <div className="space-y-8 sm:space-y-10">
        {/* Card 1: Personal Information (Step 2 in Container) */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/40 border border-slate-100 p-6 sm:p-10">
          {renderCardHeader('Personal Information', 2)}
          <div className="divide-y divide-slate-100">
            {renderRow('Title', personalDetails.title)}
            {renderRow('First name', personalDetails.firstName)}
            {personalDetails.middleName && renderRow('Middle name', personalDetails.middleName)}
            {renderRow('Last name', personalDetails.lastName)}
            {renderRow('Date of birth', personalDetails.dateOfBirth)}
            {renderRow('Occupation', personalDetails.occupation)}
            {renderRow('Address', residentialAddress.address)}
            {renderRow('Street', residentialAddress.streetName)}
            {renderRow('Country', residentialAddress.country)}
            {renderRow('State', residentialAddress.state)}
            {renderRow('City', residentialAddress.city)}
            {renderRow('Postcode', residentialAddress.postcode)}
            {contactDetails.homePhone && renderRow('Home phone', contactDetails.homePhone)}
            {renderRow('Mobile', contactDetails.mobilePhone)}
            {renderRow('Email', contactDetails.emailAddress)}
          </div>
        </div>

        {/* Card 2: Identification (Step 3 in Container) */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/40 border border-slate-100 p-6 sm:p-10">
          {renderCardHeader('Identification', 3)}
          <div className="divide-y divide-slate-100">
            {renderRow(
              'Identity verification',
              documents.identityVerificationFile
                ? `Uploaded: ${documents.identityVerificationFile}`
                : documents.identityVerificationEmailLater
                ? 'Will email documents'
                : 'Pending'
            )}
            {renderRow(
              'Proof of address',
              documents.proofOfAddressFile
                ? `Uploaded: ${documents.proofOfAddressFile}`
                : documents.proofOfAddressEmailLater
                ? 'Will email documents'
                : 'Pending'
            )}
            {renderRow(
              'Source of funds',
              documents.sourceOfFundsFile
                ? `Uploaded: ${documents.sourceOfFundsFile}`
                : documents.sourceOfFundsEmailLater
                ? 'Will email documents'
                : 'Pending'
            )}
          </div>
        </div>

        {/* Card 3: Additional Information (Step 4 in Container) */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/40 border border-slate-100 p-6 sm:p-10">
          {renderCardHeader('Additional Information', 4)}
          <div className="divide-y divide-slate-100">
            {renderRow('Financial adviser?', additionalQuestions.financialAdviser)}
            {renderRow('Source of funds', additionalQuestions.sourceOfFunds)}
            {renderRow('Purpose of account', additionalQuestions.purposeOfAccount)}
          </div>
        </div>

        {/* Card 4: Settlement Details (Step 5 in Container) */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/40 border border-slate-100 p-6 sm:p-10">
          {renderCardHeader('Settlement Details', 5)}
          <div className="divide-y divide-slate-100">
            {renderRow('Account name', settlementDetails.beneficiaryAccountName)}
            {renderRow('Bank name', settlementDetails.nameOfBank)}
            {renderRow('Account number', settlementDetails.accountNumber)}
            {renderRow('Sort code', settlementDetails.sortCode)}
          </div>
        </div>

        {/* Card 5: Application Declaration */}
        <div id="declaration-box" className="bg-white rounded-2xl shadow-xl shadow-slate-200/40 border border-slate-100 p-6 sm:p-10">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
            <div className="w-1.5 h-7 bg-corporate-charcoal rounded-full" />
            <h2 className="text-xl sm:text-2xl font-bold text-corporate-charcoal">
              Application Declaration
            </h2>
          </div>

          <div className="text-sm sm:text-base text-gray-600 space-y-4 leading-relaxed">
            <p>
              This application is made to <strong>Monefi</strong> for the purpose of establishing and maintaining an investment and/or custody relationship.
            </p>
            <p>
              Please read our <a href="#" className="underline font-semibold text-corporate-black hover:text-corporate-gold">Terms of Business</a> before submitting.
            </p>

            <div>
              <h3 className="font-bold text-corporate-black mb-1 text-base">Parties to the Agreement</h3>
              <p className="text-gray-500">
                The parties to this agreement are the applicant (Investment Entity / Client) and Monefi.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-corporate-black mb-1 text-base">Consent and Authority</h3>
              <p className="text-gray-500">
                By submitting this application, the applicant confirms that all information provided is true, complete, and accurate to the best of their knowledge. I/We authorise Monefi to collect, use, and disclose the information provided in this application to third parties where reasonably necessary for identity verification, regulatory compliance, risk assessment, administration, and the ongoing operation of the account.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-corporate-black mb-1 text-base">Acknowledgement and Agreement</h3>
              <p className="text-gray-500">
                This declaration is executed as an agreement by the Investment Entity / Client.
              </p>
            </div>
          </div>

          {/* Checkbox Box */}
          <div
            onClick={handleToggleTerms}
            className={`mt-8 p-5 sm:p-6 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-4 ${
              agreedToTerms
                ? 'border-corporate-charcoal bg-slate-50'
                : error
                ? 'border-red-500 bg-red-50/20'
                : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
            }`}
          >
            <div
              className={`w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                agreedToTerms
                  ? 'border-corporate-charcoal bg-corporate-charcoal text-white'
                  : 'border-slate-300 bg-white'
              }`}
            >
              {agreedToTerms && <Check className="w-4 h-4 stroke-[3]" />}
            </div>
            <span className="text-sm sm:text-base font-medium text-corporate-black select-none">
              I/We confirm that I/we have read and understood this application and agree to be bound by the terms governing our relationship with Monefi.
            </span>
          </div>
          {error && <p className="text-red-500 text-xs mt-2 font-medium flex items-center gap-1.5"><AlertCircle className="w-4 h-4" />{error}</p>}
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="w-full sm:w-auto bg-slate-200 hover:bg-slate-300 active:scale-[0.99] text-slate-800 font-semibold py-4 px-8 rounded-xl transition-all text-center cursor-pointer order-2 sm:order-1 text-base"
        >
          Back
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          className="w-full sm:w-auto bg-corporate-charcoal hover:bg-corporate-charcoal/90 active:scale-[0.99] text-white font-semibold py-4 px-10 rounded-xl shadow-lg shadow-corporate-charcoal/20 transition-all flex items-center justify-center gap-2.5 cursor-pointer order-1 sm:order-2 text-base"
        >
          <span>Submit Application</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
