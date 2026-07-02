"use client";

import React, { useState, useEffect } from 'react';
import { ApplicationFormData, StepProps } from './types';
import StepperHeader from './StepperHeader';
import Step0Register from './Step0Register';
import Step0AccountType from './Step0AccountType';
import Step1AboutYou from './Step1AboutYou';
import Step2Documents from './Step2Documents';
import Step3Additional from './Step3Additional';
import Step4Settlement from './Step4Settlement';
import Step5Review from './Step5Review';
import Step6Done from './Step6Done';

export default function ApplicationFormContainer() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [formData, setFormData] = useState<ApplicationFormData>({
    referenceNumber: 'SE3977W',
    accountType: 'Individual',
    personalDetails: {
      title: '',
      firstName: '',
      middleName: '',
      lastName: '',
      dateOfBirth: '',
      occupation: '',
    },
    residentialAddress: {
      address: '',
      streetName: '',
      country: '',
      state: '',
      city: '',
      postcode: '',
    },
    contactDetails: {
      homePhone: '',
      mobilePhone: '',
      emailAddress: '',
    },
    documents: {
      identityVerificationFile: null,
      identityVerificationEmailLater: false,
      proofOfAddressFile: null,
      proofOfAddressEmailLater: false,
      sourceOfFundsFile: null,
      sourceOfFundsEmailLater: false,
    },
    additionalQuestions: {
      financialAdviser: '',
      sourceOfFunds: '',
      purposeOfAccount: '',
    },
    settlementDetails: {
      beneficiaryAccountName: '',
      nameOfBank: '',
      accountNumber: '',
      sortCode: '',
    },
    agreedToTerms: false,
  });

  // Generate dynamic reference number on client mount
  useEffect(() => {
    const randomRef = 'SE' + Math.floor(1000 + Math.random() * 9000) + 'W';
    setFormData((prev) => ({ ...prev, referenceNumber: randomRef }));
  }, []);

  // Scroll to top when changing steps
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const updateFormData: StepProps['updateFormData'] = (section, value) => {
    if (typeof section === 'string') {
      setFormData((prev) => ({
        ...prev,
        [section]: value,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        ...section,
      }));
    }
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 7));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleJumpToStep = (step: number) => {
    if (step >= 0 && step <= 7) {
      setCurrentStep(step);
    }
  };

  const stepProps: StepProps = {
    formData,
    updateFormData,
    onNext: handleNext,
    onBack: handleBack,
    onJumpToStep: handleJumpToStep,
  };

  return (
    <div className={`min-h-screen bg-[#f9f9f7] text-corporate-black flex flex-col font-general ${currentStep < 2 ? 'lg:h-screen lg:overflow-hidden' : ''}`}>
      {/* Top Header & Stepper (ONLY Visible for Steps 2 to 7, hidden on starting screens) */}
      {currentStep >= 2 && (
        <StepperHeader
          currentStep={currentStep}
          formData={formData}
          onJumpToStep={handleJumpToStep}
        />
      )}

      {/* Step Content */}
      <main className={`flex-1 flex flex-col justify-center ${currentStep >= 2 ? 'pb-16' : 'h-full'}`}>
        {currentStep === 0 && <Step0Register {...stepProps} />}
        {currentStep === 1 && <Step0AccountType {...stepProps} />}
        {currentStep === 2 && <Step1AboutYou {...stepProps} />}
        {currentStep === 3 && <Step2Documents {...stepProps} />}
        {currentStep === 4 && <Step3Additional {...stepProps} />}
        {currentStep === 5 && <Step4Settlement {...stepProps} />}
        {currentStep === 6 && <Step5Review {...stepProps} />}
        {currentStep === 7 && <Step6Done {...stepProps} />}
      </main>
    </div>
  );
}
