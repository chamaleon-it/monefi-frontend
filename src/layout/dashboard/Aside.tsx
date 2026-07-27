"use client";

import { useAuth } from "@/auth/useAuth";
import { User, LogOut } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import useDashboardLinks from "./useDashboardLinks";
import { Icon } from "@iconify/react";
import { usePathname } from "next/navigation";
import usePaths from "@/hooks/usePaths";

export default function Aside() {
  const { user, logout } = useAuth();
  const links = useDashboardLinks();
  const pathname = usePathname();
  const paths = usePaths();

  const isActive = (path: string) => {
    if (pathname === path) return true;
    const hasMoreSpecificMatch = links.some(
      (l) => l.path !== path && l.path.startsWith(path) && pathname.startsWith(l.path)
    );
    if (hasMoreSpecificMatch) return false;
    return pathname.startsWith(path);
  };

  return (
    <aside className="hidden lg:flex w-80 shrink-0 bg-white border-r border-slate-200/90 min-h-screen sticky top-0 h-screen flex-col justify-between p-6 z-30 shadow-xs relative overflow-hidden font-inter">
      <div className="space-y-6 flex-1 flex flex-col overflow-hidden">
        {/* Brand Logo Header */}
        <div className="pt-2 pb-1 border-b border-slate-100 flex items-center justify-between">
          <Link href={paths.home} className="flex items-center gap-2">
            <Image
              src="/logo/logo.svg"
              alt="Baker Jones Holdings Logo"
              width={160}
              height={40}
              className="h-9 w-auto object-contain"
              priority
            />
          </Link>
        </div>

        {/* User Profile Banner Header */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#082348] via-[#0B2A54] to-[#082348] text-white shadow-md relative overflow-hidden shrink-0">
          <div className="absolute -right-8 -bottom-8 w-28 h-28 bg-[#C5A880]/15 rounded-full blur-xl pointer-events-none"></div>
          
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-10 h-10 rounded-xl gold-gradient-bg p-0.5 shrink-0 shadow-md">
              <div className="w-full h-full rounded-[10px] bg-[#082348] flex items-center justify-center text-white">
                <User className="w-5 h-5 text-[#C5A880]" />
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-semibold text-[#F3E5AB] tracking-wider uppercase">
                Welcome back,
              </p>
              <h2 className="font-serif font-bold text-sm text-white truncate capitalize mt-0.5">
                {user?.name || user?.email?.split("@")[0]}
              </h2>
            </div>
          </div>
        </div>

        {/* Sidebar Navigation Links */}
        <nav className="flex-1 overflow-y-auto pr-1">
          <ul className="space-y-1.5">
            {links.map((link) => {
              const active = isActive(link.path);
              return (
                <li key={link.title}>
                  <Link
                    href={link.path}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                      active
                        ? "bg-[#082348] text-white shadow-sm border border-[#082348]"
                        : "text-slate-600 hover:text-[#082348] hover:bg-slate-50 border border-transparent"
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      active ? "gold-gradient-bg text-slate-950" : "bg-slate-100 text-slate-500 group-hover:text-[#082348]"
                    }`}>
                      <Icon icon={link.icon} width={18} height={18} />
                    </div>
                    <span className="truncate">{link.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Logout Action Button */}
      <div className="pt-4 border-t border-slate-100 mt-4 shrink-0">
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out Session</span>
        </button>
      </div>
    </aside>
  );
}

