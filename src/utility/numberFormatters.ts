// Format number as currency (default: USD)
export const fCurrency = (
  amount: number,
  currency: string = "GBP",
  locale: string = "en-GB"
): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
};


// Format large number with commas (e.g., 1,000,000)
export const fDigit = (number: number, locale: string = "en-US"): string => {
  return new Intl.NumberFormat(locale).format(number);
};

// Format file size from bytes to KB/MB/GB/etc.
export const fFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

// Format number as percentage (e.g., 0.876 → 87.6%)
export const fPercentage = (value: number, digits: number = 1): string => {
  return `${(value * 100).toFixed(digits)}%`;
};
