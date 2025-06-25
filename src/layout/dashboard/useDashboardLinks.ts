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
      icon: "material-symbols:dashboard-rounded",
    },
    {
      title: "Transactions",
      path: paths.dashboard.admin.transactions,
      icon: "hugeicons:invoice",
    },
     {
      title: "New Bond",
      path: paths.dashboard.admin.newBond,
      icon: "mingcute:paper-fill",
    },
    {
      title: "Bonds",
      path: paths.dashboard.admin.bonds,
      icon: "mingcute:paper-fill",
    },
    {
      title: "Investments",
      path: paths.dashboard.admin.investments,
      icon: "ant-design:stock-outlined",
    },
    {
      title: "Customers",
      path: paths.dashboard.admin.users,
      icon: "ix:user-profile-filled",
    },
    {
      title: "Settings",
      path: paths.dashboard.settings,
      icon: "material-symbols:settings-rounded",
    },
  ];

  const userLinks: Links[] = [
    {
      title: "Dashboard",
      path: paths.dashboard.root,
      icon: "material-symbols:dashboard-rounded",
    },
    {
      title: "Transactions",
      path: paths.dashboard.user.transactions,
      icon: "hugeicons:invoice",
    },
    {
      title: "Trade Stock",
      path: paths.dashboard.user.tradeStock,
      icon: "ri:stock-fill",
    },
    {
      title: "Trade Crypto",
      path: paths.dashboard.user.tradeCrypto,
      icon: "mdi:bitcoin",
    },
    {
      title: "Bonds",
      path: paths.dashboard.user.bonds,
      icon: "mingcute:paper-fill",
    },
    {
      title: "Balance",
      path: paths.dashboard.user.balance,
      icon: "game-icons:cash",
    },
    {
      title: "My Portfolio",
      path: paths.dashboard.user.myPortfolio,
      icon: "zondicons:portfolio",
    },
    {
      title: "Settings",
      path: paths.dashboard.settings,
      icon: "material-symbols:settings-rounded",
    },
  ];

  return user.role === UserRoles.ADMIN ? adminLinks : userLinks;
}

interface Links {
  title: string;
  path: string;
  icon: string;
}
