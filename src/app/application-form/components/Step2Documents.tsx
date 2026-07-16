"use client";

import React, { useState } from 'react';
import { Upload, Mail, CheckCircle2, X, ArrowRight, ShieldCheck, FileText, AlertCircle, Loader2 } from 'lucide-react';
import { StepProps } from './types';
import api from '@/services/api';

export default function Step2Documents({ formData, updateFormData, onNext, onBack }: StepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState<Record<string, boolean>>({});
  const [uploadErrors, setUploadErrors] = useState<Record<string, string>>({});
  const { documents, accountType } = formData;

  const getCleanFileName = (path: string | null | undefined) => {
    if (!path) return '';
    return path.substring(path.lastIndexOf('/') + 1);
  };

  const handleFileUpload = async (field: string, file: File | null) => {
    if (file) {
      const allowedExtensions = ['jpg', 'jpeg', 'png', 'pdf'];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
        setUploadErrors(prev => ({ ...prev, [field]: 'Only PDF or image formats (JPG, JPEG, PNG) are allowed.' }));
        return;
      }

      try {
        setUploading(prev => ({ ...prev, [field]: true }));
        setUploadErrors(prev => ({ ...prev, [field]: '' }));

        const formDataObj = new FormData();
        formDataObj.append('file', file);

        const response = await api.post('/upload', formDataObj, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const uploadedFilePath = response.data.data; // `/uploads/...`

        const emailField = field.replace('File', 'EmailLater');

        updateFormData('documents', {
          ...documents,
          [field]: uploadedFilePath,
          [emailField]: false,
        });

        const errorKey = field.replace('File', '');
        if (errors[errorKey]) setErrors(prev => ({ ...prev, [errorKey]: '' }));
      } catch (err: any) {
        setUploadErrors(prev => ({ ...prev, [field]: 'File upload failed. Please try again.' }));
      } finally {
        setUploading(prev => ({ ...prev, [field]: false }));
      }
    } else {
      updateFormData('documents', {
        ...documents,
        [field]: null,
      });
    }
  };

  const handleEmailLaterToggle = (field: string) => {
    const currentVal = !documents[field as keyof typeof documents];
    const fileField = field.replace('EmailLater', 'File');
    const newDocs = {
      ...documents,
      [field]: currentVal,
      ...(currentVal ? { [fileField]: null } : {}),
    };
    updateFormData('documents', newDocs);
    const errorKey = field.replace('EmailLater', '');
    if (currentVal && errors[errorKey]) setErrors(prev => ({ ...prev, [errorKey]: '' }));
  };

  const validateAndNext = () => {
    // Prevent proceeding if any file is still uploading
    const isAnyUploading = Object.values(uploading).some(Boolean);
    if (isAnyUploading) {
      alert('Please wait for all file uploads to complete.');
      return;
    }

    const newErrors: Record<string, string> = {};

    if (!documents.identityVerificationFile && !documents.identityVerificationEmailLater) {
      newErrors.identityVerification = 'Please upload a file or select "email later"';
    }
    if (!documents.proofOfAddressFile && !documents.proofOfAddressEmailLater) {
      newErrors.proofOfAddress = 'Please upload a file or select "email later"';
    }

    if (accountType === 'Company') {
      if (!documents.certificateOfIncorporationFile && !documents.certificateOfIncorporationEmailLater) {
        newErrors.certificateOfIncorporation = 'Please upload a file or select "email later"';
      }
      if (!documents.proofOfRegisteredAddressFile && !documents.proofOfRegisteredAddressEmailLater) {
        newErrors.proofOfRegisteredAddress = 'Please upload a file or select "email later"';
      }
    }

    if (accountType === 'Trust') {
      if (!documents.trustDeedFile && !documents.trustDeedEmailLater) {
        newErrors.trustDeed = 'Please upload a file or select "email later"';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
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
    fileField: keyof typeof documents;
    emailField: keyof typeof documents;
    emailLabel: string;
    errorKey: string;
  }) => {
    const filePath = documents[fileField] as string | null | undefined;
    const isEmailLater = !!documents[emailField];
    const errorMsg = errors[errorKey];
    const isUploading = !!uploading[fileField];
    const uploadError = uploadErrors[fileField];

    return (
      <div id={`doc-${errorKey}`} className={`bg-white rounded-xl border shadow-[0_2px_16px_rgba(0,0,0,0.04)] p-7 sm:p-8 transition-all ${errorMsg ? 'border-red-400' : 'border-slate-100'}`}>
        <div className="flex items-start gap-4 mb-8 pb-6 border-b border-slate-100">
          <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
            {icon}
          </div>
          <div>
            <p className="text-[17px] font-semibold text-slate-900">{title}</p>
            <p className="text-[13px] text-slate-500 mt-1">Official document verification</p>
          </div>
        </div>

        <p className="text-[14px] text-slate-500 font-light mb-6 leading-relaxed">
          {description}
        </p>

        {/* Upload Box */}
        <label
          className={`relative block w-full rounded-2xl border-2 border-dashed p-8 sm:p-10 text-center transition-all duration-200 cursor-pointer group ${filePath
              ? 'border-emerald-400 bg-emerald-50/30'
              : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
        >
          <input
            type="file"
            className="hidden"
            accept=".jpg,.jpeg,.png,.pdf"
            disabled={isUploading}
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              handleFileUpload(fileField, file);
            }}
          />

          {isUploading ? (
            <div className="flex flex-col items-center justify-center">
              <Loader2 className="w-8 h-8 text-corporate-gold animate-spin mb-3" />
              <p className="font-normal text-base text-corporate-black mb-1">
                Uploading document...
              </p>
            </div>
          ) : filePath ? (
            <div className="flex flex-col items-center justify-center animate-fade-in">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
                <CheckCircle2 className="w-7 h-7" strokeWidth={1.5} />
              </div>
              <p className="font-normal text-base text-corporate-black mb-1">
                File uploaded successfully
              </p>
              <p className="text-xs sm:text-sm font-mono text-emerald-700 bg-emerald-100/60 px-4 py-1.5 rounded-full border border-emerald-200/60 mb-2">
                {getCleanFileName(filePath)}
              </p>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleFileUpload(fileField, null);
                }}
                className="text-xs sm:text-sm text-red-500 hover:text-red-700 font-medium inline-flex items-center gap-1 mt-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
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

        {uploadError && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600 animate-fade-in">
            <AlertCircle className="w-4 h-4" strokeWidth={1.5} />
            <span className="text-sm font-normal">{uploadError}</span>
          </div>
        )}

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
          Verify identity
        </h1>
        <p className="text-[15px] text-slate-600 leading-relaxed">
          Upload identification documents or choose to email them later.
        </p>
      </div>

      <div className="space-y-5">
        {renderUploadCard({
          title: 'Identity Verification',
          icon: <ShieldCheck className="w-4.5 h-4.5" strokeWidth={1.5} />,
          description: 'Please upload a clear copy of your valid Passport or Driving Licence. Ensure that all four corners of the document are fully visible and all information is clearly readable.',
          subtext: 'Accepted documents: Passport or Driving Licence (JPG, PNG or PDF).',
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

        {accountType === 'Company' && (
          <>
            {renderUploadCard({
              title: 'Certificate of Incorporation',
              icon: <FileText className="w-4.5 h-4.5" strokeWidth={1.5} />,
              description: 'Please upload the official Certificate of Incorporation for the corporate entity.',
              subtext: 'Certificate of Incorporation (JPG, PNG or PDF)',
              fileField: 'certificateOfIncorporationFile',
              emailField: 'certificateOfIncorporationEmailLater',
              emailLabel: 'I will email the Certificate of Incorporation later',
              errorKey: 'certificateOfIncorporation',
            })}

            {renderUploadCard({
              title: 'Proof of Registered Address',
              icon: <FileText className="w-4.5 h-4.5" strokeWidth={1.5} />,
              description: 'Please upload proof of the registered address of the corporate entity (dated within the last 3 months).',
              subtext: 'Proof of Registered Address (JPG, PNG or PDF)',
              fileField: 'proofOfRegisteredAddressFile',
              emailField: 'proofOfRegisteredAddressEmailLater',
              emailLabel: 'I will email the proof of registered address later',
              errorKey: 'proofOfRegisteredAddress',
            })}
          </>
        )}

        {accountType === 'Trust' && (
          <>
            {renderUploadCard({
              title: 'Trust Deed',
              icon: <FileText className="w-4.5 h-4.5" strokeWidth={1.5} />,
              description: 'Please upload the formal Deed of Trust establishing the legal trust arrangement.',
              subtext: 'Trust Deed document (JPG, PNG or PDF)',
              fileField: 'trustDeedFile',
              emailField: 'trustDeedEmailLater',
              emailLabel: 'I will email the Trust Deed later',
              errorKey: 'trustDeed',
            })}
          </>
        )}
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
