"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { ApplicationFormData, StepProps } from './types';
import { Shield, Lock, Mail, Phone } from 'lucide-react';
import Image from 'next/image';
import StepperHeader from './StepperHeader';
import Step0Register from './Step0Register';
import Step0AccountType from './Step0AccountType';
import Step1AboutYou from './Step1AboutYou';
import Step2Documents from './Step2Documents';
import Step3Additional from './Step3Additional';
import Step4Settlement from './Step4Settlement';
import Step5Review from './Step5Review';
import Step6Done from './Step6Done';
import StepCompanyDetails from './StepCompanyDetails';
import StepJointInfo from './StepJointInfo';
import StepJointDocuments from './StepJointDocuments';
import StepTrusteeType from './StepTrusteeType';
import StepTrustDetails from './StepTrustDetails';
import StepTrustTaxInfo from './StepTrustTaxInfo';

export default function ApplicationFormContainer() {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [formData, setFormData] = useState<ApplicationFormData>({
    referenceNumber: 'SE3977W',
    accountType: 'Individual',
    personalDetails: { title: '', firstName: '', lastName: '', dateOfBirth: '', occupation: '' },
    residentialAddress: { addressLine1: '', addressLine2: '', city: '', postcode: '', country: 'United Kingdom' },
    contactDetails: { homePhoneCode: '+1', homePhone: '', mobilePhoneCode: '+1', mobilePhone: '', emailAddress: '' },
    documents: {
      identityVerificationFile: null, identityVerificationEmailLater: false,
      proofOfAddressFile: null, proofOfAddressEmailLater: false,
      sourceOfFundsFile: null, sourceOfFundsEmailLater: false,
      certificateOfIncorporationFile: null, certificateOfIncorporationEmailLater: false,
      proofOfRegisteredAddressFile: null, proofOfRegisteredAddressEmailLater: false,
      trustDeedFile: null, trustDeedEmailLater: false
    },
    additionalQuestions: { financialAdviser: '', sourceOfFunds: '', purposeOfAccount: '' },
    settlementDetails: { beneficiaryAccountName: '', nameOfBank: '', accountNumber: '', sortCode: '' },
    agreedToTerms: false,

    // Default initializers
    companyDetails: {
      companyName: '', registrationNumber: '', dateOfIncorporation: '', natureOfBusiness: '',
      registeredAddress: { addressLine1: '', addressLine2: '', city: '', postcode: '', country: 'United Kingdom' },
      companyClassification: '', taxClassification: '', officers: [], owns25Percent: ''
    },
    jointDetails: {
      personalDetails: { title: '', firstName: '', lastName: '', dateOfBirth: '', occupation: '' },
      residentialAddress: { addressLine1: '', addressLine2: '', city: '', postcode: '', country: 'United Kingdom' },
      contactDetails: { mobilePhoneCode: '+1', mobilePhone: '', emailAddress: '' },
      documents: {}
    },
    trustDetails: {
      trusteeType: '', trustName: '', trustType: '', taxReference: '', countryEstablished: '', natureOfTrust: '', taxClassification: '', hasGIIN: ''
    }
  });

  useEffect(() => {
    const randomRef = 'SE' + Math.floor(1000 + Math.random() * 9000) + 'W';
    setFormData((prev) => ({ ...prev, referenceNumber: randomRef }));
  }, []);

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [currentStepIndex]);

  const updateFormData: StepProps['updateFormData'] = (section, value) => {
    if (typeof section === 'string') {
      setFormData((prev) => ({ ...prev, [section]: value }));
    } else {
      setFormData((prev) => ({ ...prev, ...section }));
    }
  };

  const stepsFlow = useMemo(() => {
    const baseBefore = ['Register', 'AccountType'];
    const baseAfter = ['Additional', 'Settlement', 'Review', 'Done'];
    if (formData.accountType === 'Company') return [...baseBefore, 'CompanyDetails', 'AboutYou', 'Documents', ...baseAfter];
    if (formData.accountType === 'Joint') return [...baseBefore, 'AboutYou', 'Documents', 'JointInfo', 'JointDocuments', ...baseAfter];
    if (formData.accountType === 'Trust') return [...baseBefore, 'TrusteeType', 'TrustDetails', 'TrustTaxInfo', 'AboutYou', 'Documents', ...baseAfter];
    return [...baseBefore, 'AboutYou', 'Documents', ...baseAfter]; // Individual
  }, [formData.accountType]);

  const handleNext = () => setCurrentStepIndex((prev) => Math.min(prev + 1, stepsFlow.length - 1));
  const handleBack = () => setCurrentStepIndex((prev) => Math.max(prev - 1, 0));
  const handleJumpToStep = (step: number) => {
    if (step >= 0 && step <= stepsFlow.length - 1) {
      setCurrentStepIndex(step);
    }
  };

  const currentStepName = stepsFlow[currentStepIndex];

  const stepProps: StepProps = {
    formData, updateFormData, onNext: handleNext, onBack: handleBack, onJumpToStep: handleJumpToStep,
  };

  return (
    <div className={`min-h-screen bg-[#F5F4F2] text-corporate-black flex flex-col font-inter ${currentStepIndex < 2 ? 'lg:h-screen lg:overflow-hidden' : ''}`}>
      {currentStepIndex >= 2 && (
        <StepperHeader currentStepIndex={currentStepIndex} stepsFlow={stepsFlow} formData={formData} onJumpToStep={handleJumpToStep} />
      )}
      <main className={`flex-1 flex flex-col justify-center ${currentStepIndex >= 2 ? '' : 'h-full'}`}>
        {currentStepName === 'Register' && <Step0Register {...stepProps} />}
        {currentStepName === 'AccountType' && <Step0AccountType {...stepProps} />}
        {currentStepName === 'AboutYou' && <Step1AboutYou {...stepProps} />}
        {currentStepName === 'Documents' && <Step2Documents {...stepProps} />}
        {currentStepName === 'Additional' && <Step3Additional {...stepProps} />}
        {currentStepName === 'Settlement' && <Step4Settlement {...stepProps} />}
        {currentStepName === 'Review' && <Step5Review {...stepProps} />}
        {currentStepName === 'Done' && <Step6Done {...stepProps} />}
        {currentStepName === 'CompanyDetails' && <StepCompanyDetails {...stepProps} />}
        {currentStepName === 'JointInfo' && <StepJointInfo {...stepProps} />}
        {currentStepName === 'JointDocuments' && <StepJointDocuments {...stepProps} />}
        {currentStepName === 'TrusteeType' && <StepTrusteeType {...stepProps} />}
        {currentStepName === 'TrustDetails' && <StepTrustDetails {...stepProps} />}
        {currentStepName === 'TrustTaxInfo' && <StepTrustTaxInfo {...stepProps} />}
      </main>

      {currentStepIndex >= 1 && (
        <footer className="bg-corporate-charcoal text-white font-inter mt-auto">
          {/* Main footer content */}
          <div className="max-w-6xl mx-auto px-6 sm:px-10 py-10 sm:py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">

              {/* Column 1: Brand */}
              <div className="lg:col-span-1">
                <Image
                  src="/logo/logo-white.svg"
                  width={140}
                  height={44}
                  alt="Baker Jones Holdings"
                  className="h-6 w-auto object-contain  mb-4"
                />
                <p className="text-[13px] text-white/50 leading-relaxed">
                  Institutional-grade fixed-income solutions for private and corporate investors.
                </p>
              </div>

              {/* Column 2: Contact */}
              <div>
                <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-white/40 mb-4">Contact</p>
                <div className="space-y-3">
                  <a href="mailto:info@bakerjonesholdings.com" className="flex items-center gap-2.5 text-[13px] text-white/70 hover:text-white transition-colors">
                    <Mail className="w-3.5 h-3.5 text-corporate-gold/60 shrink-0" strokeWidth={1.5} />
                    info@bakerjonesholdings.com
                  </a>
                  <a href="tel:+442033550894" className="flex items-center gap-2.5 text-[13px] text-white/70 hover:text-white transition-colors">
                    <Phone className="w-3.5 h-3.5 text-corporate-gold/60 shrink-0" strokeWidth={1.5} />
                    +44 203 355 0894
                  </a>
                </div>
              </div>

              {/* Column 3: Legal */}
              <div>
                <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-white/40 mb-4">Legal</p>
                <div className="space-y-2.5">
                  {['Privacy Policy', 'Terms of Business', 'Cookie Policy', 'Regulatory Information'].map(link => (
                    <a key={link} href="#" className="block text-[13px] text-white/60 hover:text-white transition-colors">
                      {link}
                    </a>
                  ))}
                </div>
              </div>

              {/* Column 4: Security */}
              <div>
                <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-white/40 mb-4">Security</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5">
                    <Shield className="w-4 h-4 text-corporate-gold/50 shrink-0" strokeWidth={1.5} />
                    <span className="text-[13px] text-white/60">FCA Regulated</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Lock className="w-4 h-4 text-corporate-gold/50 shrink-0" strokeWidth={1.5} />
                    <span className="text-[13px] text-white/60">256-bit SSL Encryption</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/10">
            <div className="max-w-6xl mx-auto px-6 sm:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-[12px] text-white/40">
                &copy; {new Date().getFullYear()} Baker Jones Holdings. All rights reserved.
              </p>
              <p className="text-[11px] text-white/30 text-center sm:text-right max-w-md">
                Baker Jones Holdings is authorised and regulated by the Financial Conduct Authority.
              </p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
