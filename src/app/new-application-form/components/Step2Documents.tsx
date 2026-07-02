"use client";

import React, { useState } from 'react';
import { Upload, Mail, CheckCircle2, X, ArrowRight, ShieldCheck, FileText, DollarSign, AlertCircle } from 'lucide-react';
import { StepProps } from './types';

export default function Step2Documents({ formData, updateFormData, onNext, onBack }: StepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { documents } = formData;

  const handleFileUpload = (field: 'identityVerificationFile' | 'proofOfAddressFile' | 'sourceOfFundsFile', file: File | null) => {
    if (file) {
      updateFormData('documents', {
        ...documents,
        [field]: file.name,
        ...(field === 'identityVerificationFile' ? { identityVerificationEmailLater: false } : {}),
        ...(field === 'proofOfAddressFile' ? { proofOfAddressEmailLater: false } : {}),
        ...(field === 'sourceOfFundsFile' ? { sourceOfFundsEmailLater: false } : {}),
      });
      const errorKey = field.replace('File', '');
      if (errors[errorKey]) setErrors(prev => ({ ...prev, [errorKey]: '' }));
    } else {
      updateFormData('documents', {
        ...documents,
        [field]: null,
      });
    }
  };

  const handleEmailLaterToggle = (field: 'identityVerificationEmailLater' | 'proofOfAddressEmailLater' | 'sourceOfFundsEmailLater') => {
    const currentVal = !!documents[field];
    const newDocs = {
      ...documents,
      [field]: !currentVal,
    };
    if (!currentVal) {
      if (field === 'identityVerificationEmailLater') newDocs.identityVerificationFile = null;
      if (field === 'proofOfAddressEmailLater') newDocs.proofOfAddressFile = null;
      if (field === 'sourceOfFundsEmailLater') newDocs.sourceOfFundsFile = null;
    }
    updateFormData('documents', newDocs);
    const errorKey = field.replace('EmailLater', '');
    if (newDocs[field] && errors[errorKey]) setErrors(prev => ({ ...prev, [errorKey]: '' }));
  };

  const validateAndNext = () => {
    const newErrors: Record<string, string> = {};

    if (!documents.identityVerificationFile && !documents.identityVerificationEmailLater) {
      newErrors.identityVerification = 'Please upload a file or select "email later"';
    }
    if (!documents.proofOfAddressFile && !documents.proofOfAddressEmailLater) {
      newErrors.proofOfAddress = 'Please upload a file or select "email later"';
    }
    if (!documents.sourceOfFundsFile && !documents.sourceOfFundsEmailLater) {
      newErrors.sourceOfFunds = 'Please upload a file or select "email later"';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Scroll to first error
      const firstErrorKey = Object.keys(newErrors)[0];
      const el = document.getElementById(`doc-${firstErrorKey}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    onNext();
  };

  const renderUploadCard = ({
    title,
    icon,
    description,
    subtext,
    fileField,
    emailField,
    emailLabel,
    errorKey,
  }: {
    title: string;
    icon: React.ReactNode;
    description: string;
    subtext: string;
    fileField: 'identityVerificationFile' | 'proofOfAddressFile' | 'sourceOfFundsFile';
    emailField: 'identityVerificationEmailLater' | 'proofOfAddressEmailLater' | 'sourceOfFundsEmailLater';
    emailLabel: string;
    errorKey: string;
  }) => {
    const fileName = documents[fileField];
    const isEmailLater = !!documents[emailField];
    const errorMsg = errors[errorKey];

    return (
      <div id={`doc-${errorKey}`} className={`bg-white rounded-xl border shadow-[0_2px_16px_rgba(0,0,0,0.04)] p-7 sm:p-8 transition-all ${errorMsg ? 'border-red-400' : 'border-slate-100'
        }`}>
        <div className="flex items-start gap-4 mb-8 pb-6 border-b border-slate-100">
          <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
            {icon}
          </div>
          <div>
            <p className="text-[17px] font-semibold text-slate-900">
              {title}
            </p>
            <p className="text-[13px] text-slate-500 mt-1">Official document verification</p>
          </div>
        </div>

        <p className="text-[14px] text-slate-500 font-light mb-6 leading-relaxed">
          {description}
        </p>

        {/* Upload Box */}
        <label
          className={`relative block w-full rounded-2xl border-2 border-dashed p-8 sm:p-10 text-center transition-all duration-200 cursor-pointer group ${fileName
              ? 'border-emerald-400 bg-emerald-50/30'
              : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
        >
          <input
            type="file"
            className="hidden"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              handleFileUpload(fileField, file);
            }}
          />

          {fileName ? (
            <div className="flex flex-col items-center justify-center animate-fade-in">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
                <CheckCircle2 className="w-7 h-7" strokeWidth={1.5} />
              </div>
              <p className="font-normal text-base text-corporate-black mb-1">
                File uploaded successfully
              </p>
              <p className="text-xs sm:text-sm font-mono text-emerald-700 bg-emerald-100/60 px-4 py-1.5 rounded-full border border-emerald-200/60 mb-2">
                {fileName}
              </p>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  handleFileUpload(fileField, null);
                }}
                className="text-xs sm:text-sm text-red-500 hover:text-red-700 font-medium inline-flex items-center gap-1 mt-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
                <span>Remove file</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <div className="w-14 h-14 rounded-xl bg-slate-200/80 group-hover:bg-corporate-gold/20 text-corporate-charcoal flex items-center justify-center mb-4 transition-colors">
                <Upload className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <p className="font-normal text-base text-corporate-black mb-1 group-hover:text-corporate-charcoal transition-colors">
                Drag & drop or click to upload
              </p>
              <p className="text-xs sm:text-sm text-gray-400">
                {subtext}
              </p>
            </div>
          )}
        </label>

        {/* Or Divider */}
        <div className="relative my-6 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-100" />
          </div>
          <span className="relative bg-white px-4 text-xs font-normal text-gray-400 uppercase tracking-widest">
            or
          </span>
        </div>

        {/* Email Later Button */}
        <button
          type="button"
          onClick={() => handleEmailLaterToggle(emailField)}
          className={`w-full py-3.5 px-5 rounded-lg border flex items-center justify-center gap-3 text-[14px] font-normal transition-all cursor-pointer ${isEmailLater
              ? 'border-corporate-charcoal bg-corporate-charcoal/5 text-corporate-charcoal'
              : 'border-slate-200 hover:border-slate-300 bg-white text-slate-500'
            }`}
        >
          <Mail className={`w-5 h-5 ${isEmailLater ? 'text-corporate-charcoal' : 'text-slate-400'}`} />
          <span>{emailLabel}</span>
          {isEmailLater && <CheckCircle2 className="w-5 h-5 text-corporate-charcoal ml-auto" strokeWidth={1.5} />}
        </button>

        {errorMsg && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600 animate-fade-in">
            <AlertCircle className="w-4 h-4" strokeWidth={1.5} />
            <span className="text-sm font-normal">{errorMsg}</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-10 py-10 sm:py-14 font-inter w-full">
      {/* Page header */}
      <div className="mb-10">
        <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-slate-400 mb-3">Step 2 of 6</p>
        <h1 className="text-[1.875rem] sm:text-[2.125rem] font-semibold text-slate-900 tracking-tight leading-tight mb-2">
          Verify your identity
        </h1>
        <p className="text-[15px] text-slate-600 leading-relaxed">
          Upload your identity documents or choose to email them later.
        </p>
      </div>

      <div className="space-y-5">
        {renderUploadCard({
          title: 'Identity Verification',
          icon: <ShieldCheck className="w-4.5 h-4.5" strokeWidth={1.5} />,
          description: 'We need a copy of your identification. We accept: International travel document — a current passport or other identification documentation issued by the government.',
          subtext: 'High resolution image — JPG, PNG or PDF',
          fileField: 'identityVerificationFile',
          emailField: 'identityVerificationEmailLater',
          emailLabel: 'I will email my identity documents later',
          errorKey: 'identityVerification',
        })}

        {renderUploadCard({
          title: 'Proof Of Address',
          icon: <FileText className="w-4.5 h-4.5" strokeWidth={1.5} />,
          description: 'Please provide proof of your address. We accept: Bank statement or utility bill (dated within the last 3 months).',
          subtext: 'Bank statement or utility bill',
          fileField: 'proofOfAddressFile',
          emailField: 'proofOfAddressEmailLater',
          emailLabel: 'I will email my proof of address later',
          errorKey: 'proofOfAddress',
        })}

        {renderUploadCard({
          title: 'Source of Funds',
          icon: <DollarSign className="w-4.5 h-4.5" strokeWidth={1.5} />,
          description: 'Please provide evidence of the source of funds for your investment. Bank statement showing the funds available (dated within the last 3 months).',
          subtext: 'Bank statement showing source of funds',
          fileField: 'sourceOfFundsFile',
          emailField: 'sourceOfFundsEmailLater',
          emailLabel: 'I will email my source of funds later',
          errorKey: 'sourceOfFunds',
        })}
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
          onClick={validateAndNext}
          className="w-full sm:w-auto bg-corporate-charcoal hover:bg-[#12144A] active:scale-[0.99] text-white text-[14px] font-semibold py-3.5 px-10 rounded-xl shadow-lg shadow-corporate-charcoal/25 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
        >
          <span>Continue to Questions</span>
          <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
