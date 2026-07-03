"use client";

import React, { useState } from 'react';
import { User, MapPin, Phone, AlertCircle, ArrowRight } from 'lucide-react';
import { format, parse } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon } from 'lucide-react';
import { StepProps } from './types';

const COUNTRIES = [
  "United States", "United Kingdom", "Canada", "Australia", "Afghanistan", "Albania", "Algeria",
  "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Austria", "Azerbaijan",
  "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
  "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso",
  "Burundi", "Côte d'Ivoire", "Cabo Verde", "Cambodia", "Cameroon", "Central African Republic", "Chad",
  "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)", "Costa Rica", "Croatia", "Cuba",
  "Cyprus", "Czechia (Czech Republic)", "Democratic Republic of the Congo", "Denmark", "Djibouti",
  "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea",
  "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia",
  "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti",
  "Holy See", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland",
  "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait",
  "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania",
  "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands",
  "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro",
  "Morocco", "Mozambique", "Myanmar (formerly Burma)", "Namibia", "Nauru", "Nepal", "Netherlands",
  "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman",
  "Pakistan", "Palau", "Palestine State", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines",
  "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia",
  "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia",
  "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands",
  "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname",
  "Sweden", "Switzerland", "Syria", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga",
  "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine",
  "United Arab Emirates", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

const COUNTRY_CODES = [
  { code: '+1', label: '+1 (US/CA)' }, { code: '+7', label: '+7 (RU/KZ)' },
  { code: '+20', label: '+20 (EG)' }, { code: '+27', label: '+27 (ZA)' },
  { code: '+30', label: '+30 (GR)' }, { code: '+31', label: '+31 (NL)' },
  { code: '+32', label: '+32 (BE)' }, { code: '+33', label: '+33 (FR)' },
  { code: '+34', label: '+34 (ES)' }, { code: '+39', label: '+39 (IT)' },
  { code: '+44', label: '+44 (UK)' }, { code: '+45', label: '+45 (DK)' },
  { code: '+46', label: '+46 (SE)' }, { code: '+49', label: '+49 (DE)' },
  { code: '+55', label: '+55 (BR)' }, { code: '+61', label: '+61 (AU)' },
  { code: '+65', label: '+65 (SG)' }, { code: '+81', label: '+81 (JP)' },
  { code: '+86', label: '+86 (CN)' }, { code: '+91', label: '+91 (IN)' },
  { code: '+92', label: '+92 (PK)' }, { code: '+971', label: '+971 (AE)' },
  { code: '+966', label: '+966 (SA)' }, { code: '+972', label: '+972 (IL)' },
];

// --- Shared design tokens (consistent across all steps) ---
const FIELD_LABEL = "block text-[11px] font-semibold tracking-[0.1em] uppercase text-slate-600 mb-2";
const INPUT_BASE = "w-full px-4 py-2.5 rounded-lg border text-[14px] font-normal text-slate-800 placeholder:text-slate-300 transition-all outline-none";
const INPUT_NORMAL = `${INPUT_BASE} border-slate-300 bg-white hover:border-slate-400 focus:border-corporate-charcoal focus:ring-2 focus:ring-corporate-charcoal/10 shadow-sm`;
const INPUT_ERROR = `${INPUT_BASE} border-red-400 bg-red-50/60 focus:border-red-500 focus:ring-2 focus:ring-red-400/15`;
const SECTION_CARD = "bg-white rounded-2xl border border-slate-200 shadow-[0_2px_20px_rgba(0,0,0,0.06)] p-8 sm:p-10";
const SECTION_ICON = "w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 shrink-0";
const SECTION_TITLE = "text-[17px] font-semibold text-slate-900";
const SECTION_DESC = "text-[13px] text-slate-500 mt-1";
const ERROR_MSG = "text-[12px] text-red-600 mt-2 flex items-center gap-1";

const inputClass = (err?: string) => err ? INPUT_ERROR : INPUT_NORMAL;

export default function Step1AboutYou({ formData, updateFormData, onNext, onBack }: StepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { personalDetails, residentialAddress, contactDetails } = formData;

  const handlePersonalChange = (field: keyof typeof personalDetails, value: string) => {
    updateFormData('personalDetails', { ...personalDetails, [field]: value });
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleAddressChange = (field: keyof typeof residentialAddress, value: string) => {
    updateFormData('residentialAddress', { ...residentialAddress, [field]: value });
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleContactChange = (field: keyof typeof contactDetails, value: string) => {
    updateFormData('contactDetails', { ...contactDetails, [field]: value });
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validateAndNext = () => {
    const newErrors: Record<string, string> = {};
    if (!personalDetails.title) newErrors.title = 'Title is required';
    if (!personalDetails.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!personalDetails.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!personalDetails.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!personalDetails.occupation.trim()) newErrors.occupation = 'Occupation is required';
    if (!residentialAddress.addressLine1?.trim()) newErrors.addressLine1 = 'Address Line 1 is required';
    if (!residentialAddress.city?.trim()) newErrors.city = 'City/Town is required';
    if (!residentialAddress.postcode?.trim()) newErrors.postcode = 'Postcode/ZIP is required';
    if (!contactDetails.mobilePhone.trim()) newErrors.mobilePhone = 'Mobile phone is required';
    if (!contactDetails.emailAddress.trim() || !contactDetails.emailAddress.includes('@')) {
      newErrors.emailAddress = 'Valid email is required';
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstKey = Object.keys(newErrors)[0];
      document.getElementById(`field-${firstKey}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    onNext();
  };

  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-10 py-10 sm:py-14 font-inter w-full">
      {/* Page header */}
      <div className="mb-10">
        <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-slate-400 mb-3">Step 1 of 6</p>
        <h1 className="text-[1.875rem] sm:text-[2.125rem] font-semibold text-slate-900 tracking-tight leading-tight mb-2">
          Tell us about yourself
        </h1>
        <p className="text-[15px] text-slate-600 leading-relaxed">
          Please provide your personal, address, and contact details.
        </p>
      </div>

      <div className="space-y-6">
        {/* Personal Details */}
        <div className={SECTION_CARD}>
          <div className="flex items-start gap-4 mb-8 pb-6 border-b border-slate-100">
            <div className={SECTION_ICON}>
              <User className="w-4.5 h-4.5" strokeWidth={1.5} />
            </div>
            <div>
              <p className={SECTION_TITLE}>Personal Details</p>
              <p className={SECTION_DESC}>Your full name and demographic information</p>
            </div>
          </div>

          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div id="field-title">
                <label className={FIELD_LABEL}>Title *</label>
                <select value={personalDetails.title} onChange={(e) => handlePersonalChange('title', e.target.value)} className={inputClass(errors.title)}>
                  <option value="">Select...</option>
                  <option value="Mr">Mr</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Ms">Ms</option>
                  <option value="Miss">Miss</option>
                  <option value="Dr">Dr</option>
                  <option value="Prof">Prof</option>
                  <option value="Other">Other</option>
                </select>
                {errors.title && <p className={ERROR_MSG}><AlertCircle className="w-3.5 h-3.5" strokeWidth={1.5} />{errors.title}</p>}
              </div>
              <div id="field-firstName">
                <label className={FIELD_LABEL}>First name *</label>
                <input type="text" placeholder="First name" value={personalDetails.firstName} onChange={(e) => handlePersonalChange('firstName', e.target.value)} className={inputClass(errors.firstName)} />
                {errors.firstName && <p className={ERROR_MSG}><AlertCircle className="w-3.5 h-3.5" strokeWidth={1.5} />{errors.firstName}</p>}
              </div>
              <div id="field-lastName">
                <label className={FIELD_LABEL}>Last name *</label>
                <input type="text" placeholder="Last name" value={personalDetails.lastName} onChange={(e) => handlePersonalChange('lastName', e.target.value)} className={inputClass(errors.lastName)} />
                {errors.lastName && <p className={ERROR_MSG}><AlertCircle className="w-3.5 h-3.5" strokeWidth={1.5} />{errors.lastName}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div id="field-dateOfBirth">
                <label className={FIELD_LABEL}>Date of birth *</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full px-4 py-2.5 h-auto rounded-lg border flex items-center justify-start text-left font-normal text-[14px] shadow-sm transition-all",
                        !personalDetails.dateOfBirth && "text-slate-300",
                        errors.dateOfBirth ? "border-red-400 bg-red-50/40" : "border-slate-200 bg-white hover:border-slate-300"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-3.5 w-3.5 text-slate-400" strokeWidth={1.5} />
                      {personalDetails.dateOfBirth
                        ? format(parse(personalDetails.dateOfBirth, 'yyyy-MM-dd', new Date()), "PPP")
                        : <span>Date of birth</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      captionLayout="dropdown"
                      startMonth={new Date(1900, 0)}
                      endMonth={new Date()}
                      selected={personalDetails.dateOfBirth ? parse(personalDetails.dateOfBirth, 'yyyy-MM-dd', new Date()) : undefined}
                      onSelect={(date) => handlePersonalChange('dateOfBirth', date ? format(date, 'yyyy-MM-dd') : '')}
                      disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                    />
                  </PopoverContent>
                </Popover>
                {errors.dateOfBirth && <p className={ERROR_MSG}><AlertCircle className="w-3.5 h-3.5" strokeWidth={1.5} />{errors.dateOfBirth}</p>}
              </div>
              <div id="field-occupation">
                <label className={FIELD_LABEL}>Occupation *</label>
                <input type="text" placeholder="Occupation" value={personalDetails.occupation} onChange={(e) => handlePersonalChange('occupation', e.target.value)} className={inputClass(errors.occupation)} />
                {errors.occupation && <p className={ERROR_MSG}><AlertCircle className="w-3.5 h-3.5" strokeWidth={1.5} />{errors.occupation}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Residential Address */}
        <div className={SECTION_CARD}>
          <div className="flex items-start gap-4 mb-8 pb-6 border-b border-slate-100">
            <div className={SECTION_ICON}>
              <MapPin className="w-4.5 h-4.5" strokeWidth={1.5} />
            </div>
            <div>
              <p className={SECTION_TITLE}>Residential Address</p>
              <p className={SECTION_DESC}>Where you currently reside</p>
            </div>
          </div>

          <div className="space-y-4">
            <div id="field-addressLine1">
              <label className={FIELD_LABEL}>Address Line 1 *</label>
              <input type="text" placeholder="street name and house/building number" value={residentialAddress.addressLine1} onChange={(e) => handleAddressChange('addressLine1', e.target.value)} className={inputClass(errors.addressLine1)} />
              {errors.addressLine1 && <p className={ERROR_MSG}><AlertCircle className="w-3.5 h-3.5" strokeWidth={1.5} />{errors.addressLine1}</p>}
            </div>
            <div id="field-addressLine2">
              <label className={FIELD_LABEL}>Address Line 2</label>
              <input type="text" placeholder="apartment, suite, building, floor – optional" value={residentialAddress.addressLine2 || ''} onChange={(e) => handleAddressChange('addressLine2', e.target.value)} className={inputClass(errors.addressLine2)} />
              {errors.addressLine2 && <p className={ERROR_MSG}><AlertCircle className="w-3.5 h-3.5" strokeWidth={1.5} />{errors.addressLine2}</p>}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div id="field-city">
                <label className={FIELD_LABEL}>City / Town *</label>
                <input type="text" placeholder="City / Town" value={residentialAddress.city} onChange={(e) => handleAddressChange('city', e.target.value)} className={inputClass(errors.city)} />
                {errors.city && <p className={ERROR_MSG}><AlertCircle className="w-3.5 h-3.5" strokeWidth={1.5} />{errors.city}</p>}
              </div>
              <div id="field-postcode">
                <label className={FIELD_LABEL}>Postal Code / ZIP Code *</label>
                <input type="text" placeholder="Postal Code / ZIP Code" value={residentialAddress.postcode} onChange={(e) => handleAddressChange('postcode', e.target.value)} className={inputClass(errors.postcode)} />
                {errors.postcode && <p className={ERROR_MSG}><AlertCircle className="w-3.5 h-3.5" strokeWidth={1.5} />{errors.postcode}</p>}
              </div>
            </div>
            <div id="field-country">
              <label className={FIELD_LABEL}>Country</label>
              <select value={residentialAddress.country} onChange={(e) => handleAddressChange('country', e.target.value)} className={inputClass(errors.country)}>
                <option value="">Select country...</option>
                {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              {errors.country && <p className={ERROR_MSG}><AlertCircle className="w-3.5 h-3.5" strokeWidth={1.5} />{errors.country}</p>}
            </div>
          </div>
        </div>

        {/* Contact Details */}
        <div className={SECTION_CARD}>
          <div className="flex items-start gap-4 mb-8 pb-6 border-b border-slate-100">
            <div className={SECTION_ICON}>
              <Phone className="w-4.5 h-4.5" strokeWidth={1.5} />
            </div>
            <div>
              <p className={SECTION_TITLE}>Contact Details</p>
              <p className={SECTION_DESC}>How we can reach you</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div id="field-homePhone">
                <label className={FIELD_LABEL}>Home phone</label>
                <div className="flex items-center rounded-lg border border-slate-200 bg-white hover:border-slate-300 focus-within:border-corporate-charcoal focus-within:ring-1 focus-within:ring-corporate-charcoal/20 transition-all overflow-hidden shadow-sm">
                  <select
                    value={contactDetails.homePhoneCode || '+1'}
                    onChange={(e) => handleContactChange('homePhoneCode', e.target.value)}
                    className="w-[100px] px-3 py-2.5 bg-transparent outline-none text-[13px] text-slate-600 border-r border-slate-200 cursor-pointer shrink-0"
                  >
                    {COUNTRY_CODES.map(c => <option key={`home-${c.code}`} value={c.code}>{c.label}</option>)}
                  </select>
                  <input
                    type="tel"
                    placeholder="Home phone (optional)"
                    value={contactDetails.homePhone || ''}
                    onChange={(e) => handleContactChange('homePhone', e.target.value)}
                    className="flex-1 px-3 py-2.5 bg-transparent outline-none text-[14px] text-slate-800 placeholder:text-slate-300"
                  />
                </div>
              </div>

              <div id="field-mobilePhone">
                <label className={FIELD_LABEL}>Mobile phone *</label>
                <div className={`flex items-center rounded-lg border bg-white transition-all overflow-hidden shadow-sm ${errors.mobilePhone ? 'border-red-400' : 'border-slate-200 hover:border-slate-300 focus-within:border-corporate-charcoal focus-within:ring-1 focus-within:ring-corporate-charcoal/20'}`}>
                  <select
                    value={contactDetails.mobilePhoneCode || '+1'}
                    onChange={(e) => handleContactChange('mobilePhoneCode', e.target.value)}
                    className="w-[100px] px-3 py-2.5 bg-transparent outline-none text-[13px] text-slate-600 border-r border-slate-200 cursor-pointer shrink-0"
                  >
                    {COUNTRY_CODES.map(c => <option key={`mobile-${c.code}`} value={c.code}>{c.label}</option>)}
                  </select>
                  <input
                    type="tel"
                    placeholder="Mobile phone"
                    value={contactDetails.mobilePhone}
                    onChange={(e) => handleContactChange('mobilePhone', e.target.value)}
                    className="flex-1 px-3 py-2.5 bg-transparent outline-none text-[14px] text-slate-800 placeholder:text-slate-300"
                  />
                </div>
                {errors.mobilePhone && <p className={ERROR_MSG}><AlertCircle className="w-3.5 h-3.5" strokeWidth={1.5} />{errors.mobilePhone}</p>}
              </div>
            </div>

            <div id="field-emailAddress">
              <label className={FIELD_LABEL}>Email address *</label>
              <input type="email" placeholder="Email address" value={contactDetails.emailAddress} onChange={(e) => handleContactChange('emailAddress', e.target.value)} className={inputClass(errors.emailAddress)} />
              {errors.emailAddress && <p className={ERROR_MSG}><AlertCircle className="w-3.5 h-3.5" strokeWidth={1.5} />{errors.emailAddress}</p>}
            </div>
          </div>
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
          onClick={validateAndNext}
          className="w-full sm:w-auto bg-corporate-charcoal hover:bg-[#12144A] active:scale-[0.99] text-white text-[14px] font-semibold py-3.5 px-10 rounded-xl shadow-lg shadow-corporate-charcoal/25 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
        >
          <span>Continue to Documents</span>
          <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
