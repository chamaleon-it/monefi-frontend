"use client";

import React from 'react';
import { Upload, Mail, CheckCircle2, X, ArrowRight, ShieldCheck, FileText, DollarSign } from 'lucide-react';
import { StepProps } from './types';

export default function Step2Documents({ formData, updateFormData, onNext, onBack }: StepProps) {
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
  };

  const renderUploadCard = ({
    title,
    icon,
    description,
    subtext,
    fileField,
    emailField,
    emailLabel,
  }: {
    title: string;
    icon: React.ReactNode;
    description: string;
    subtext: string;
    fileField: 'identityVerificationFile' | 'proofOfAddressFile' | 'sourceOfFundsFile';
    emailField: 'identityVerificationEmailLater' | 'proofOfAddressEmailLater' | 'sourceOfFundsEmailLater';
    emailLabel: string;
  }) => {
    const fileName = documents[fileField];
    const isEmailLater = !!documents[emailField];

    return (
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/40 border border-slate-100 p-6 sm:p-10 transition-all">
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100">
          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-corporate-charcoal">
            {icon}
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-corporate-charcoal">
              {title}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">Official document verification</p>
          </div>
        </div>

        <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed">
          {description}
        </p>

        {/* Upload Box */}
        <label
          className={`relative block w-full rounded-2xl border-2 border-dashed p-8 sm:p-10 text-center transition-all duration-200 cursor-pointer group ${
            fileName
              ? 'border-emerald-500 bg-emerald-50/20'
              : 'border-slate-200 hover:border-corporate-gold bg-slate-50/50 hover:bg-slate-50'
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
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <p className="font-bold text-base text-corporate-black mb-1">
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
                <Upload className="w-6 h-6" />
              </div>
              <p className="font-bold text-base text-corporate-black mb-1 group-hover:text-corporate-charcoal transition-colors">
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
          <span className="relative bg-white px-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
            or
          </span>
        </div>

        {/* Email Later Button */}
        <button
          type="button"
          onClick={() => handleEmailLaterToggle(emailField)}
          className={`w-full py-4 px-6 rounded-xl border flex items-center justify-center gap-3 text-sm sm:text-base font-medium transition-all cursor-pointer ${
            isEmailLater
              ? 'border-corporate-charcoal bg-slate-100 text-corporate-charcoal font-semibold shadow-2xs'
              : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700'
          }`}
        >
          <Mail className={`w-5 h-5 ${isEmailLater ? 'text-corporate-charcoal' : 'text-slate-400'}`} />
          <span>{emailLabel}</span>
          {isEmailLater && <CheckCircle2 className="w-5 h-5 text-corporate-charcoal ml-auto" />}
        </button>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-fade-in font-general w-full">
      {/* Top Step Header */}
      <div className="text-center mb-10 sm:mb-14 flex flex-col items-center">
        <span className="inline-block bg-slate-200/80 text-slate-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-3">
          Step 2 of 6
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-corporate-charcoal tracking-tight mb-2">
          Verify your identity
        </h1>
        <p className="text-gray-500 text-sm sm:text-base max-w-xl">
          Upload your identity documents or choose to email them later.
        </p>
      </div>

      <div className="space-y-8 sm:space-y-10">
        {renderUploadCard({
          title: 'Identity Verification',
          icon: <ShieldCheck className="w-6 h-6" />,
          description: 'We need a copy of your identification. We accept: International travel document — a current passport or other identification documentation issued by the government.',
          subtext: 'High resolution image — JPG, PNG or PDF',
          fileField: 'identityVerificationFile',
          emailField: 'identityVerificationEmailLater',
          emailLabel: 'I will email my identity documents later',
        })}

        {renderUploadCard({
          title: 'Proof Of Address',
          icon: <FileText className="w-6 h-6" />,
          description: 'Please provide proof of your address. We accept: Bank statement or utility bill (dated within the last 3 months).',
          subtext: 'Bank statement or utility bill',
          fileField: 'proofOfAddressFile',
          emailField: 'proofOfAddressEmailLater',
          emailLabel: 'I will email my proof of address later',
        })}

        {renderUploadCard({
          title: 'Source of Funds',
          icon: <DollarSign className="w-6 h-6" />,
          description: 'Please provide evidence of the source of funds for your investment. Bank statement showing the funds available (dated within the last 3 months).',
          subtext: 'Bank statement showing source of funds',
          fileField: 'sourceOfFundsFile',
          emailField: 'sourceOfFundsEmailLater',
          emailLabel: 'I will email my source of funds later',
        })}
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
          onClick={onNext}
          className="w-full sm:w-auto bg-corporate-charcoal hover:bg-corporate-charcoal/90 active:scale-[0.99] text-white font-semibold py-4 px-10 rounded-xl shadow-lg shadow-corporate-charcoal/20 transition-all flex items-center justify-center gap-2.5 cursor-pointer order-1 sm:order-2 text-base"
        >
          <span>Continue to Questions</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
