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
      path: paths.dashboard.users.transactions,
      icon: "hugeicons:invoice",
    },
    {
      title: "Trade Stock",
      path: paths.dashboard.users.tradeStock,
      icon: "ri:stock-fill",
    },
    {
      title: "Trade Crypto",
      path: paths.dashboard.users.tradeCrypto,
      icon: "mdi:bitcoin",
    },
    {
      title: "Bonds",
      path: paths.dashboard.users.bonds,
      icon: "mingcute:paper-fill",
    },
    {
      title: "Balance",
      path: paths.dashboard.users.balance,
      icon: "game-icons:cash",
    },
    {
      title: "My Portfolio",
      path: paths.dashboard.users.myPortfolio,
      icon: "zondicons:portfolio",
    },
  ];

  return user.role === UserRoles.ADMIN ? adminLinks : userLinks;
}

interface Links {
  title: string;
  path: string;
  icon: string;
}
