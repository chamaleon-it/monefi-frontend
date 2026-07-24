import { useAuth } from "@/auth/useAuth";
import { UserRoles } from "@/enum/user.enum";
import usePaths from "@/hooks/usePaths";

export default function useDashboardLinks(): Links[] {
  const { user } = useAuth();
  const paths = usePaths();

  if (!user) return [];

  const adminLinks: Links[] = [
    {
      title: "Dashboard",
      path: paths.dashboard.root,
      icon: "ri:dashboard-line",
    },
    {
      title: "Transactions",
      path: paths.dashboard.admin.transactions,
      icon: "hugeicons:invoice",
    },
    {
      title: "New Bond",
      path: paths.dashboard.admin.newBond,
      icon: "mingcute:paper-line",
    },
    {
      title: "Bonds",
      path: paths.dashboard.admin.bonds,
      icon: "mingcute:paper-line",
    },
    {
      title: "Investments",
      path: paths.dashboard.admin.investments,
      icon: "ant-design:stock-outlined",
    },
    {
      title: "All Portfolio",
      path: paths.dashboard.admin.allPortfolio,
      icon: "bytesize:portfolio",
    },
    {
      title: "Customers",
      path: paths.dashboard.admin.users,
      icon: "iconamoon:profile-circle-duotone",
    },
    {
      title: "Applications",
      path: paths.dashboard.admin.applications,
      icon: "mdi:form-outline",
    },
    // {
    //   title: "IPOs",
    //   path: paths.dashboard.admin.ipos,
    //   icon: "mdi:bank-outline",
    // },
    // {
    //   title: "IPO Requests",
    //   path: paths.dashboard.admin.ipoRequests,
    //   icon: "mdi:clipboard-text-outline",
    // },
    {
      title: "Regulatory Information",
      path: paths.dashboard.regulatoryInformation,
      icon: "mdi:shield-check-outline",
    },
    {
      title: "Support",
      path: paths.dashboard.support,
      icon: "material-symbols:support-agent",
    },
  ];

  const userLinks: Links[] = [
    {
      title: "Dashboard",
      path: paths.dashboard.root,
      icon: "ri:dashboard-line",
    },
    {
      title: "Transactions",
      path: paths.dashboard.user.transactions,
      icon: "hugeicons:invoice",
    },
    {
      title: "Markets",
      path: paths.dashboard.user.tradeStock,
      icon: "mingcute:stock-line",
    },
    {
      title: "Crypto",
      path: paths.dashboard.user.tradeCrypto,
      icon: "bx:bitcoin",
    },
    {
      title: "Bonds",
      path: paths.dashboard.user.bonds,
      icon: "mingcute:paper-line",
    },
    {
      title: "My Portfolio",
      path: paths.dashboard.user.myPortfolio,
      icon: "bytesize:portfolio",
    },
    {
      title: "KYC",
      path: paths.dashboard.user.kyc,
      icon: "mingcute:user-search-line",
    },
    {
      title: "Regulatory Information",
      path: paths.dashboard.regulatoryInformation,
      icon: "mdi:shield-check-outline",
    },
    {
      title: "Support",
      path: paths.dashboard.support,
      icon: "material-symbols:support-agent",
    },
  ];

  return user.role === UserRoles.ADMIN ? adminLinks : userLinks;
}

interface Links {
  title: string;
  path: string;
  icon: string;
}
