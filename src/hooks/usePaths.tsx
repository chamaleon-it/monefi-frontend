export default function usePaths() {
  const path = {
    home: "/",
    aboutUs: "/about-us",
    insurance: "/insurance",
    loans: "/loans",
    mortgages: "/mortgages",
    utilities: "/utilities",
    estatePlanning: "/estate-planning",
    auth: {
      login: "/login",
      register: "/register",
    },
    dashboard: {
      root: "/dashboard",
      settings: "/dashboard/settings",
      admin: {
        transactions: "/dashboard/admin/transactions",
        bonds: "/dashboard/admin/bonds",
        investments: "/dashboard/admin/investments",
        users: "/dashboard/admin/users",
      },
      users: {
        transactions: "/dashboard/users/transactions",
        tradeStock: "/dashboard/users/trade-stock",
        tradeCrypto: "/dashboard/users/trade-crypto",
        bonds: "/dashboard/users/bonds",
        balance: "/dashboard/users/balance",
        myPortfolio: "/dashboard/users/my-portfolio",
      },
    },
  };

  return path;
}
