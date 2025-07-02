export default function usePaths() {
  const path = {
    home: "/",
    aboutUs: "/about-us",
    insurance: "/insurance",
    resources:"/resources",
    financialplanning:"/financial-planning",
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
        applications:'/dashboard/admin/applications'
      },
      user: {
        transactions: "/dashboard/user/transactions",
        tradeStock: "/dashboard/user/trade-stock",
        tradeCrypto: "/dashboard/user/trade-crypto",
        bonds: "/dashboard/user/bonds",
        myPortfolio: "/dashboard/user/my-portfolio",
      },
    },
  };

  return path;
}
