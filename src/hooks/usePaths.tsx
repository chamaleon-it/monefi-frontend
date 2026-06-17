export default function usePaths() {
  const path = {
    home: "/",
    aboutUs: "/about-us",
    contactUs: "/contact-us",
    insurance: "/insurance",
    resources: "/resources",
    financialplanning: "/financial-planning",
    loans: "/loans",
    mortgages: "/mortgages",
    privacy: "/privacy",
    terms: "/terms",
    utilities: "/utilities",
    estatePlanning: "/estate-planning",
    expertise: "/expertise",
    approach: "/our-approach",
    capabilities: "/capabilities",
    auth: {
      login: "/login",
      register: "/register",
      forgotPassword: "/forgot-password",
      resetPassword: "/reset-password",
    },
    dashboard: {
      root: "/dashboard",
      settings: "/dashboard/settings",
      regulatoryInformation: "/dashboard/regulatory-information",
      support: "/dashboard/support",
      admin: {
        transactions: "/dashboard/admin/transactions",
        newBond: "/dashboard/admin/bonds/new",
        bonds: "/dashboard/admin/bonds",
        investments: "/dashboard/admin/investments",
        allPortfolio: "/dashboard/admin/all-portfolio",
        users: "/dashboard/admin/users",
        applications: "/dashboard/admin/applications",
        ipos: "/dashboard/admin/ipos",
        ipoRequests: "/dashboard/admin/ipos/requests",
      },
      user: {
        transactions: "/dashboard/user/transactions",
        tradeStock: "/dashboard/user/trade-stock",
        tradeCrypto: "/dashboard/user/trade-crypto",
        bonds: "/dashboard/user/bonds",
        myPortfolio: "/dashboard/user/my-portfolio",
        kyc: "/dashboard/user/kyc",
        ipos: "/dashboard/user/ipos",
        ipoRequests: "/dashboard/user/ipos/requests",
      },
    },
  };

  return path;
}
