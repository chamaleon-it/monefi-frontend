"use client";

import React, { useState } from 'react';
import { Edit2, Check, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';
import { StepProps } from './types';
import api from '@/services/api';

export default function Step5Review({ formData, updateFormData, onNext, onBack, onJumpToStep }: StepProps) {
  const [error, setError] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const {
    accountType,
    personalDetails,
    residentialAddress,
    contactDetails,
    documents,
    additionalQuestions,
    settlementDetails,
    agreedToTerms,
    companyDetails,
    jointDetails,
    trustDetails,
  } = formData;

  const handleToggleTerms = () => {
    updateFormData('agreedToTerms', !agreedToTerms);
    if (error) setError('');
  };

  const getCleanFileName = (path: string | null | undefined) => {
    if (!path) return '';
    return path.substring(path.lastIndexOf('/') + 1);
  };

  const handleSubmit = async () => {
    if (!agreedToTerms) {
      setError('You must read and agree to the declaration before submitting your application.');
      document.getElementById('declaration-box')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    try {
      setSubmitting(true);
      setError('');

      await api.post('/application_form', formData);

      onNext();
    } catch (err: any) {
      setError(err?.response?.data?.message || 'An error occurred while submitting your application. Please try again.');
    } finally {
      setSubmitting(false);
    }
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
          disabled={submitting}
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
        {/* Account Type */}
        <div className={CARD}>
          {renderCardHeader('Account Type', 1)}
          <div>
            {renderRow('Account Type Chosen', accountType)}
          </div>
        </div>

        {/* Personal Information */}
        <div className={CARD}>
          {renderCardHeader('Personal Information', 2)}
          <div>
            {renderRow('Title', personalDetails.title)}
            {renderRow('First name', personalDetails.firstName)}
            {personalDetails.middleName && renderRow('Middle name', personalDetails.middleName)}
            {renderRow('Last name', personalDetails.lastName)}
            {renderRow('Date of birth', personalDetails.dateOfBirth)}
            {renderRow('Occupation', personalDetails.occupation)}
            {personalDetails.role && renderRow('Role / Capacity', personalDetails.role)}
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

        {/* Company Details (Only if Company) */}
        {accountType === 'Company' && companyDetails && (
          <div className={CARD}>
            {renderCardHeader('Company Information', 2)}
            <div>
              {renderRow('Company Name', companyDetails.companyName)}
              {renderRow('Registration Number', companyDetails.registrationNumber)}
              {companyDetails.vatNumber && renderRow('VAT Number', companyDetails.vatNumber)}
              {renderRow('Date of Incorporation', companyDetails.dateOfIncorporation)}
              {renderRow('Nature of Business', companyDetails.natureOfBusiness)}
              {renderRow('Registered Address 1', companyDetails.registeredAddress.addressLine1)}
              {companyDetails.registeredAddress.addressLine2 && renderRow('Registered Address 2', companyDetails.registeredAddress.addressLine2)}
              {renderRow('City', companyDetails.registeredAddress.city)}
              {renderRow('Postcode', companyDetails.registeredAddress.postcode)}
              {renderRow('Country', companyDetails.registeredAddress.country)}
              {renderRow('Classification', companyDetails.companyClassification)}
              {renderRow('Tax Classification', companyDetails.taxClassification)}
              {renderRow('Shareholder owns 25% or more?', companyDetails.owns25Percent)}
            </div>

            {companyDetails.officers && companyDetails.officers.length > 0 && (
              <div className="mt-6 pt-5 border-t border-slate-100">
                <p className="text-[13px] font-semibold text-slate-800 mb-3">Company Officers &amp; Directors</p>
                <div className="space-y-4">
                  {companyDetails.officers.map((officer, index) => (
                    <div key={index} className="bg-slate-50 p-4 rounded-lg">
                      <p className="text-[12px] font-semibold text-slate-600 mb-2">Officer #{index + 1}</p>
                      {renderRow('Name', `${officer.title} ${officer.firstName} ${officer.lastName}`)}
                      {renderRow('DOB', officer.dateOfBirth)}
                      {renderRow('Occupation', officer.occupation)}
                      {officer.role && renderRow('Role / Capacity', officer.role)}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Joint Holder Details (Only if Joint) */}
        {accountType === 'Joint' && jointDetails && (
          <div className={CARD}>
            {renderCardHeader('Joint Applicant Details', 4)}
            <div>
              {renderRow('Title', jointDetails.personalDetails.title)}
              {renderRow('First name', jointDetails.personalDetails.firstName)}
              {jointDetails.personalDetails.middleName && renderRow('Middle name', jointDetails.personalDetails.middleName)}
              {renderRow('Last name', jointDetails.personalDetails.lastName)}
              {renderRow('Date of birth', jointDetails.personalDetails.dateOfBirth)}
              {renderRow('Occupation', jointDetails.personalDetails.occupation)}
              {renderRow('Address Line 1', jointDetails.residentialAddress.addressLine1)}
              {jointDetails.residentialAddress.addressLine2 && renderRow('Address Line 2', jointDetails.residentialAddress.addressLine2)}
              {renderRow('City / Town', jointDetails.residentialAddress.city)}
              {renderRow('Postal Code', jointDetails.residentialAddress.postcode)}
              {renderRow('Country', jointDetails.residentialAddress.country)}
              {renderRow('Mobile', `${jointDetails.contactDetails.mobilePhoneCode || ''} ${jointDetails.contactDetails.mobilePhone}`.trim())}
              {renderRow('Email', jointDetails.contactDetails.emailAddress)}
            </div>
          </div>
        )}

        {/* Trust Details (Only if Trust) */}
        {accountType === 'Trust' && trustDetails && (
          <div className={CARD}>
            {renderCardHeader('Trust Information', 3)}
            <div>
              {renderRow('Trustee Type', trustDetails.trusteeType)}
              {renderRow('Trust Name', trustDetails.trustName)}
              {renderRow('Trust Type', trustDetails.trustType)}
              {trustDetails.vatNumber && renderRow('VAT Number', trustDetails.vatNumber)}
              {renderRow('Tax Reference / UTR', trustDetails.taxReference)}
              {renderRow('Country Established', trustDetails.countryEstablished)}
              {renderRow('Nature of Trust / Activities', trustDetails.natureOfTrust)}
              {renderRow('Tax Classification', trustDetails.taxClassification)}
              {renderRow('Has GIIN?', trustDetails.hasGIIN)}
              {trustDetails.giinValue && renderRow('GIIN Code', trustDetails.giinValue)}
            </div>
          </div>
        )}

        {/* Identification Documents */}
        <div className={CARD}>
          {renderCardHeader('Identification Documents', 3)}
          <div>
            {renderRow('Identity verification', documents.identityVerificationFile ? `Uploaded: ${getCleanFileName(documents.identityVerificationFile)}` : documents.identityVerificationEmailLater ? 'Will email later' : 'Pending')}
            {renderRow('Proof of address', documents.proofOfAddressFile ? `Uploaded: ${getCleanFileName(documents.proofOfAddressFile)}` : documents.proofOfAddressEmailLater ? 'Will email later' : 'Pending')}
            {accountType === 'Company' && (
              <>
                {renderRow('Certificate of Incorporation', documents.certificateOfIncorporationFile ? `Uploaded: ${getCleanFileName(documents.certificateOfIncorporationFile)}` : documents.certificateOfIncorporationEmailLater ? 'Will email later' : 'Pending')}
                {renderRow('Proof of Registered Address', documents.proofOfRegisteredAddressFile ? `Uploaded: ${getCleanFileName(documents.proofOfRegisteredAddressFile)}` : documents.proofOfRegisteredAddressEmailLater ? 'Will email later' : 'Pending')}
              </>
            )}
            {accountType === 'Trust' && (
              <>
                {renderRow('Trust Deed', documents.trustDeedFile ? `Uploaded: ${getCleanFileName(documents.trustDeedFile)}` : documents.trustDeedEmailLater ? 'Will email later' : 'Pending')}
              </>
            )}
          </div>
        </div>

        {/* Additional Information */}
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
            {renderRow('Source of funds/wealth', additionalQuestions.sourceOfFunds)}
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
              Please read our <a target="_blank" href="/terms" className="text-corporate-charcoal underline hover:text-corporate-gold transition-colors">Terms of Business</a> before submitting.
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
                : 'border-slate-200 hover:border-slate-300 bg-white'
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
            <p className="text-[12px] text-red-500 mt-2 flex items-center gap-1.5 font-normal animate-fade-in">
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
          disabled={submitting}
          className="w-full sm:w-auto text-[14px] font-medium text-slate-600 hover:text-slate-900 px-6 py-3 rounded-xl border border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-all cursor-pointer bg-white disabled:opacity-50"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full sm:w-auto bg-corporate-charcoal hover:bg-[#12144A] active:scale-[0.99] text-white text-[14px] font-semibold py-3.5 px-10 rounded-xl shadow-lg shadow-corporate-charcoal/25 transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <span>Submit Application</span>
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
