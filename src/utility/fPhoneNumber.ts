import { CountryCode, parsePhoneNumberFromString } from 'libphonenumber-js';

export const fPhoneNumber = (
  phoneNumber: string,
  defaultCountry?: CountryCode, // explicitly type as CountryCode or undefined
  international: boolean = true
): string => {
  if (!phoneNumber) return '';

  try {
    const phoneObj = parsePhoneNumberFromString(
      phoneNumber,
      defaultCountry ?? 'IN'
    );
    if (!phoneObj) return phoneNumber;

    return international
      ? phoneObj.formatInternational()
      : phoneObj.formatNational();
  } catch {
    return phoneNumber;
  }
};