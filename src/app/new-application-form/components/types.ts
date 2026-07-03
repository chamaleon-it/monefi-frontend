export type AccountTypeOption = 'Individual' | 'Joint' | 'Company' | 'Trust';

export interface PersonalDetails {
  title: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: string;
  occupation: string;
  role?: string;
}

export interface ResidentialAddress {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postcode: string;
  country: string;
}

export interface ContactDetails {
  homePhoneCode?: string;
  homePhone?: string;
  mobilePhoneCode: string;
  mobilePhone: string;
  emailAddress: string;
}

export interface DocumentsDetails {
  identityVerificationFile?: string | null;
  identityVerificationEmailLater?: boolean;
  proofOfAddressFile?: string | null;
  proofOfAddressEmailLater?: boolean;
  sourceOfFundsFile?: string | null;
  sourceOfFundsEmailLater?: boolean;
  // Company specific
  certificateOfIncorporationFile?: string | null;
  certificateOfIncorporationEmailLater?: boolean;
  proofOfRegisteredAddressFile?: string | null;
  proofOfRegisteredAddressEmailLater?: boolean;
  // Trust specific
  trustDeedFile?: string | null;
  trustDeedEmailLater?: boolean;
}

export interface AdditionalQuestions {
  financialAdviser: 'Yes' | 'No' | '';
  sourceOfFunds: string;
  purposeOfAccount: string;
}

export interface SettlementDetails {
  beneficiaryAccountName: string;
  nameOfBank: string;
  accountNumber: string;
  sortCode: string;
}

// Company specific
export interface CompanyDetails {
  companyName: string;
  registrationNumber: string;
  vatNumber?: string;
  dateOfIncorporation: string;
  natureOfBusiness: string;
  registeredAddress: ResidentialAddress;
  companyClassification: string;
  taxClassification: string;
  officers: PersonalDetails[];
  owns25Percent: 'Yes' | 'No' | '';
}

// Joint specific
export interface JointDetails {
  personalDetails: PersonalDetails;
  residentialAddress: ResidentialAddress;
  contactDetails: ContactDetails;
  documents: DocumentsDetails; // Joint ID
}

// Trust specific
export interface TrustDetails {
  trusteeType: 'Individual' | 'Corporate' | '';
  trustName: string;
  trustType: string;
  vatNumber?: string;
  taxReference: string;
  countryEstablished: string;
  natureOfTrust: string;
  taxClassification: string;
  hasGIIN: 'Yes' | 'No' | '';
  giinValue?: string;
}

export interface ApplicationFormData {
  referenceNumber: string;
  accountType: AccountTypeOption;
  personalDetails: PersonalDetails;
  residentialAddress: ResidentialAddress;
  contactDetails: ContactDetails;
  documents: DocumentsDetails;
  additionalQuestions: AdditionalQuestions;
  settlementDetails: SettlementDetails;
  agreedToTerms: boolean;
  
  companyDetails?: CompanyDetails;
  jointDetails?: JointDetails;
  trustDetails?: TrustDetails;
}

export interface StepProps {
  formData: ApplicationFormData;
  updateFormData: (section: keyof ApplicationFormData | Partial<ApplicationFormData>, value?: any) => void;
  onNext: () => void;
  onBack?: () => void;
  onJumpToStep?: (step: number) => void;
}
