export type AccountTypeOption = 'Individual' | 'Joint' | 'Company' | 'Trust';

export interface PersonalDetails {
  title: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: string;
  occupation: string;
}

export interface ResidentialAddress {
  address: string;
  streetName: string;
  country: string;
  state: string;
  city: string;
  postcode: string;
}

export interface ContactDetails {
  homePhone?: string;
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
}

export interface StepProps {
  formData: ApplicationFormData;
  updateFormData: (section: keyof ApplicationFormData | Partial<ApplicationFormData>, value?: any) => void;
  onNext: () => void;
  onBack?: () => void;
  onJumpToStep?: (step: number) => void;
}
