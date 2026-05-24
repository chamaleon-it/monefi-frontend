import { useAuth } from "@/auth/useAuth";
import { CircleUser } from "lucide-react";
import Link from "next/link";
import React from "react";
import useDashboardLinks from "./useDashboardLinks";
import { Icon } from "@iconify/react";

export default function Aside() {
  const { user } = useAuth();
  const links = useDashboardLinks();
  return (
    <aside className="max-w-[400px] w-full p-5 bg-bakerjonesholdings-off-pink rounded-4xl mt-2.5">
      <div className="flex gap-5 items-center">
        <div className="">
          <CircleUser width={40} height={40} />
        </div>
        <h2 className="capitalize font-poppins font-medium text-2xl">
          Hi, {user?.name || user?.email.split("@")[0]}
        </h2>
      </div>
      <div className="mt-8">
        <ul className="grid grid-cols-3 lg:grid-cols-1 gap-2.5 lg:gap-5">
          {links.map((link) => (
            <li key={link.title}>
              <Link
                href={link.path}
                className="flex flex-col lg:flex-row gap-2.5 items-center"
              >
                <div className="">
                  <Icon icon={link.icon} width={30} height={30} />
                </div>
                <p className="font-poppins text-sm lg:text-lg font-medium whitespace-nowrap">{link.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
