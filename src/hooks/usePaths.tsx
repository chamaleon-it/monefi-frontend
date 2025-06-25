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
        newBond:'/dashboard/admin/bonds/new',
        bonds: "/dashboard/admin/bonds",
        investments: "/dashboard/admin/investments",
        users: "/dashboard/admin/users",
      },
      user: {
        transactions: "/dashboard/user/transactions",
        tradeStock: "/dashboard/user/trade-stock",
        tradeCrypto: "/dashboard/user/trade-crypto",
        bonds: "/dashboard/user/bonds",
        balance: "/dashboard/user/balance",
        myPortfolio: "/dashboard/user/my-portfolio",
      },
    },
  };

  return path;
}
