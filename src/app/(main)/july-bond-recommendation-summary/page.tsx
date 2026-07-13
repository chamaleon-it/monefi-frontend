import { Metadata } from "next";
import BondClientPage from "./BondClientPage";

export const metadata: Metadata = {
  title: "Bond Recommendation Summary | Baker Jones Holdings",
  description: "Review personalized secondary market bond opportunities selected to match your specific investment objectives.",
  robots: {
    index: true,
    follow: true,
    noarchive: false,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noarchive: false,
      nocache: false,
    },
  },
};

export default function Page() {
  return <BondClientPage />;
}
