const getConfig = () => ({
  backendURL: process.env.NEXT_PUBLIC_BASE_URL,
  twelveDataApiKey :process.env.NEXT_PUBLIC_TWELVE_DATA_API_KEY,
  exchangeRateUSDtoGBP :0.73
});

export default getConfig;
