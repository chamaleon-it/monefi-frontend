"use client";

import React, { useState } from 'react';
import { User, MapPin, Phone, Mail, AlertCircle, ArrowRight } from 'lucide-react';
import { StepProps } from './types';

export default function Step1AboutYou({ formData, updateFormData, onNext, onBack }: StepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { personalDetails, residentialAddress, contactDetails } = formData;

  const handlePersonalChange = (field: keyof typeof personalDetails, value: string) => {
    updateFormData('personalDetails', {
      ...personalDetails,
      [field]: value,
    });
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleAddressChange = (field: keyof typeof residentialAddress, value: string) => {
    updateFormData('residentialAddress', {
      ...residentialAddress,
      [field]: value,
    });
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleContactChange = (field: keyof typeof contactDetails, value: string) => {
    updateFormData('contactDetails', {
      ...contactDetails,
      [field]: value,
    });
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validateAndNext = () => {
    const newErrors: Record<string, string> = {};

    if (!personalDetails.title) newErrors.title = 'Title is required';
    if (!personalDetails.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!personalDetails.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!personalDetails.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!personalDetails.occupation.trim()) newErrors.occupation = 'Occupation is required';

    if (!residentialAddress.address.trim()) newErrors.address = 'Address is required';
    if (!residentialAddress.streetName.trim()) newErrors.streetName = 'Street name is required';
    if (!residentialAddress.country.trim()) newErrors.country = 'Country is required';
    if (!residentialAddress.state.trim()) newErrors.state = 'State is required';
    if (!residentialAddress.city.trim()) newErrors.city = 'City is required';
    if (!residentialAddress.postcode.trim()) newErrors.postcode = 'Postcode is required';

    if (!contactDetails.mobilePhone.trim()) newErrors.mobilePhone = 'Mobile phone is required';
    if (!contactDetails.emailAddress.trim() || !contactDetails.emailAddress.includes('@')) {
      newErrors.emailAddress = 'Valid email is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Scroll to top-most error
      const firstErrorKey = Object.keys(newErrors)[0];
      const el = document.getElementById(`field-${firstErrorKey}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    onNext();
  };

  const inputClass = (err?: string) =>
    `w-full px-4 py-3.5 rounded-xl border ${
      err ? 'border-red-500 bg-red-50/20' : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50'
    } focus:bg-white focus:border-corporate-charcoal focus:ring-4 focus:ring-corporate-charcoal/10 outline-none transition-all text-sm sm:text-base font-medium text-corporate-black placeholder:text-gray-400`;

  const labelClass = "block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider";

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-fade-in font-general w-full">
      {/* Top Step Header */}
      <div className="text-center mb-10 sm:mb-14 flex flex-col items-center">
        <span className="inline-block bg-slate-200/80 text-slate-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-3">
          Step 1 of 6
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-corporate-charcoal tracking-tight mb-2">
          Tell us about yourself
        </h1>
        <p className="text-gray-500 text-sm sm:text-base max-w-xl">
          Please provide your personal details, residential address, and contact information.
        </p>
      </div>

      <div className="space-y-8 sm:space-y-10">
        {/* Card 1: Personal Details */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/40 border border-slate-100 p-6 sm:p-10">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100">
            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-corporate-charcoal">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-corporate-charcoal">
                Personal Details
              </h2>
              <p className="text-xs sm:text-sm text-gray-500">Your full name and demographic information</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5">
            <div id="field-title">
              <label className={labelClass}>Title *</label>
              <select
                value={personalDetails.title}
                onChange={(e) => handlePersonalChange('title', e.target.value)}
                className={inputClass(errors.title)}
              >
                <option value="">Select...</option>
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Ms">Ms</option>
                <option value="Miss">Miss</option>
                <option value="Dr">Dr</option>
                <option value="Prof">Prof</option>
                <option value="Other">Other</option>
              </select>
              {errors.title && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.title}</p>}
            </div>

            <div id="field-firstName" className="sm:col-span-2">
              <label className={labelClass}>First name *</label>
              <input
                type="text"
                placeholder="First name *"
                value={personalDetails.firstName}
                onChange={(e) => handlePersonalChange('firstName', e.target.value)}
                className={inputClass(errors.firstName)}
              />
              {errors.firstName && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.firstName}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <div id="field-middleName">
              <label className={labelClass}>Middle name</label>
              <input
                type="text"
                placeholder="Middle name (optional)"
                value={personalDetails.middleName || ''}
                onChange={(e) => handlePersonalChange('middleName', e.target.value)}
                className={inputClass()}
              />
            </div>

            <div id="field-lastName">
              <label className={labelClass}>Last name *</label>
              <input
                type="text"
                placeholder="Last name *"
                value={personalDetails.lastName}
                onChange={(e) => handlePersonalChange('lastName', e.target.value)}
                className={inputClass(errors.lastName)}
              />
              {errors.lastName && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.lastName}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div id="field-dateOfBirth">
              <label className={labelClass}>Date of birth *</label>
              <input
                type="date"
                value={personalDetails.dateOfBirth}
                onChange={(e) => handlePersonalChange('dateOfBirth', e.target.value)}
                className={inputClass(errors.dateOfBirth)}
              />
              {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.dateOfBirth}</p>}
            </div>

            <div id="field-occupation">
              <label className={labelClass}>Occupation *</label>
              <input
                type="text"
                placeholder="Occupation *"
                value={personalDetails.occupation}
                onChange={(e) => handlePersonalChange('occupation', e.target.value)}
                className={inputClass(errors.occupation)}
              />
              {errors.occupation && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.occupation}</p>}
            </div>
          </div>
        </div>

        {/* Card 2: Residential Address */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/40 border border-slate-100 p-6 sm:p-10">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100">
            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-corporate-charcoal">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-corporate-charcoal">
                Residential Address
              </h2>
              <p className="text-xs sm:text-sm text-gray-500">Where you currently reside</p>
            </div>
          </div>

          <div className="space-y-5">
            <div id="field-address">
              <label className={labelClass}>Address *</label>
              <input
                type="text"
                placeholder="Address line 1 *"
                value={residentialAddress.address}
                onChange={(e) => handleAddressChange('address', e.target.value)}
                className={inputClass(errors.address)}
              />
              {errors.address && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.address}</p>}
            </div>

            <div id="field-streetName">
              <label className={labelClass}>Street name *</label>
              <input
                type="text"
                placeholder="Street name *"
                value={residentialAddress.streetName}
                onChange={(e) => handleAddressChange('streetName', e.target.value)}
                className={inputClass(errors.streetName)}
              />
              {errors.streetName && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.streetName}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div id="field-country">
                <label className={labelClass}>Country *</label>
                <input
                  type="text"
                  placeholder="Country *"
                  value={residentialAddress.country}
                  onChange={(e) => handleAddressChange('country', e.target.value)}
                  className={inputClass(errors.country)}
                />
                {errors.country && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.country}</p>}
              </div>

              <div id="field-state">
                <label className={labelClass}>State / Province *</label>
                <input
                  type="text"
                  placeholder="State / Province *"
                  value={residentialAddress.state}
                  onChange={(e) => handleAddressChange('state', e.target.value)}
                  className={inputClass(errors.state)}
                />
                {errors.state && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.state}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div id="field-city">
                <label className={labelClass}>City / Town *</label>
                <input
                  type="text"
                  placeholder="City / Town *"
                  value={residentialAddress.city}
                  onChange={(e) => handleAddressChange('city', e.target.value)}
                  className={inputClass(errors.city)}
                />
                {errors.city && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.city}</p>}
              </div>

              <div id="field-postcode">
                <label className={labelClass}>Postcode / ZIP *</label>
                <input
                  type="text"
                  placeholder="Postcode / ZIP *"
                  value={residentialAddress.postcode}
                  onChange={(e) => handleAddressChange('postcode', e.target.value)}
                  className={inputClass(errors.postcode)}
                />
                {errors.postcode && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.postcode}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Contact Details */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/40 border border-slate-100 p-6 sm:p-10">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100">
            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-corporate-charcoal">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-corporate-charcoal">
                Contact Details
              </h2>
              <p className="text-xs sm:text-sm text-gray-500">How we can get in touch with you</p>
            </div>
          </div>

          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div id="field-homePhone">
                <label className={labelClass}>Home phone</label>
                <input
                  type="tel"
                  placeholder="Home phone (optional)"
                  value={contactDetails.homePhone || ''}
                  onChange={(e) => handleContactChange('homePhone', e.target.value)}
                  className={inputClass()}
                />
              </div>

              <div id="field-mobilePhone">
                <label className={labelClass}>Mobile phone *</label>
                <input
                  type="tel"
                  placeholder="Mobile phone *"
                  value={contactDetails.mobilePhone}
                  onChange={(e) => handleContactChange('mobilePhone', e.target.value)}
                  className={inputClass(errors.mobilePhone)}
                />
                {errors.mobilePhone && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.mobilePhone}</p>}
              </div>
            </div>

            <div id="field-emailAddress">
              <label className={labelClass}>Email address *</label>
              <input
                type="email"
                placeholder="Email address *"
                value={contactDetails.emailAddress}
                onChange={(e) => handleContactChange('emailAddress', e.target.value)}
                className={inputClass(errors.emailAddress)}
              />
              {errors.emailAddress && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.emailAddress}</p>}
            </div>
          </div>
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
          onClick={validateAndNext}
          className="w-full sm:w-auto bg-corporate-charcoal hover:bg-corporate-charcoal/90 active:scale-[0.99] text-white font-semibold py-4 px-10 rounded-xl shadow-lg shadow-corporate-charcoal/20 transition-all flex items-center justify-center gap-2.5 cursor-pointer order-1 sm:order-2 text-base"
        >
          <span>Continue to Documents</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
