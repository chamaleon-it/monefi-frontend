import { Metadata } from "next";
import BondClientPage from "./BondClientPage";

export const metadata: Metadata = {
  title: "Bond Recommendation Summary | Baker Jones Holdings",
  description: "Review personalized secondary market bond opportunities selected to match your specific investment objectives.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noarchive: true,
      nocache: true,
    },
  },
};

export default function Page() {
  return <BondClientPage />;
}
