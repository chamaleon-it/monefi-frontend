"use client";

import usePaths from "@/hooks/usePaths";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import LoginButton from "./LoginButton";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import useDashboardLinks from "@/layout/dashboard/useDashboardLinks";
import { Icon } from "@iconify/react";
import { useAuth } from "@/auth/useAuth";

export default function Header() {
  const pathname = usePathname();
  const isDashboard = useMemo(
    () => pathname.includes("/dashboard"),
    [pathname]
  );
  const paths = usePaths();
  const [isOpen, setIsOpen] = useState(false);
  const dashboardLinks = useDashboardLinks();
  const { logout } = useAuth();

  const navigationItems: { href: string; label: string }[] = [
    { href: paths.home, label: "Home" },
    { href: paths.financialplanning, label: "Financial Planning" },
    { href: paths.aboutUs, label: "About Us" },
    { href: paths.contactUs, label: "Contact Us" },
  ];

  return (
    <>
      <header
        className={`sticky z-40 top-0 transition-all duration-300 ${
          isDashboard
            ? "bg-[#F9F9F7]/95 backdrop-blur-xl py-3.5 top-0 border-b border-slate-200/80 shadow-xs"
            : "bg-bakerjonesholdings-off-white backdrop-blur-md pb-4 pt-4 2xl:py-10 -top-1 border-b border-white/10"
        }`}
      >
        <div className={`${isDashboard ? "w-full" : "max-w-[1400px] mx-auto"} px-4 sm:px-6 lg:px-8 xl:px-10`}>
          <div className="flex justify-between items-center">
            {/* Logo (Hidden on Desktop Dashboard since it is in the Left Sidebar) */}
            <div className={isDashboard ? "lg:hidden" : ""}>
              <Link
                href={paths.home}
                aria-label="Home Page"
                title="Baker Jones Holdings. Home Page"
                className="flex-shrink-0 transition-transform hover:scale-[1.02] duration-200 block"
              >
                <Image
                  src="/logo/logo.svg"
                  width={164}
                  height={40}
                  alt="Baker Jones Holdings logo"
                  className="hidden sm:block h-9 w-auto object-contain"
                />
                <Image
                  src="/logo/logo.svg"
                  width={120}
                  height={30}
                  alt="Baker Jones Holdings logo"
                  className="sm:hidden h-8 w-auto object-contain"
                />
              </Link>
            </div>

            {/* Desktop Navigation Links (Public pages only) */}
            {!isDashboard && (
              <nav className="hidden lg:flex items-center space-x-1">
                <ul className="flex items-center space-x-1">
                  {navigationItems.map((item) => (
                    <li key={item.label}>
                      <Link href={item.href}>
                        <button
                          className="px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 hover:scale-105 mac:text-lg text-black cursor-pointer"
                        >
                          {item.label}
                        </button>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            {/* Desktop Login / Profile Button */}
            <div className={`hidden lg:flex items-center ${isDashboard ? "ml-auto" : "ml-8"}`}>
              <LoginButton isDashboard={isDashboard} />
            </div>

            {/* Mobile Menu & Action Container */}
            <div className="lg:hidden flex items-center space-x-3 ml-auto sm:ml-0">
              {/* Mobile Login / Avatar Button */}
              <div className="block">
                <LoginButton isDashboard={isDashboard} />
              </div>

              {/* Mobile Menu Toggle */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                  >
                    <Menu width={26} height={26} className="text-[#082348]" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className={`w-full sm:w-[380px] p-0 border-0 ${
                    isDashboard ? "bg-white" : "bg-bakerjonesholdings-black"
                  }`}
                >
                  <div className="flex flex-col h-full font-inter">
                    {/* Mobile Menu Header */}
                    <div
                      className={`flex items-center justify-between p-5 border-b ${
                        isDashboard ? "border-slate-100" : "border-white/10"
                      }`}
                    >
                      <Link
                        href={paths.home}
                        onClick={() => setIsOpen(false)}
                        aria-label="Home Page"
                        className="transition-transform hover:scale-105 duration-200"
                      >
                        <Image
                          src={isDashboard ? "/logo/logo.svg" : "/logo/logo.svg"}
                          width={140}
                          height={35}
                          alt="Baker Jones Holdings logo"
                          className={isDashboard ? "h-8 w-auto" : "h-8 w-auto invert"}
                        />
                      </Link>
                      <SheetClose asChild>
                        <X
                          onClick={() => setIsOpen(false)}
                          width={26}
                          height={26}
                          className={`rounded-lg shrink-0 cursor-pointer ${
                            isDashboard
                              ? "text-slate-700 hover:bg-slate-100"
                              : "text-white hover:bg-white/10"
                          }`}
                        />
                      </SheetClose>
                    </div>

                    {/* Mobile Navigation Links */}
                    <nav className="flex-1 p-5 overflow-y-auto">
                      {isDashboard ? (
                        <ul className="space-y-1.5">
                          {dashboardLinks.map((link) => {
                            const active = pathname === link.path;
                            return (
                              <li key={link.title}>
                                <Link
                                  href={link.path}
                                  onClick={() => setIsOpen(false)}
                                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                                    active
                                      ? "bg-[#082348] text-white shadow-sm"
                                      : "text-slate-700 hover:bg-slate-50"
                                  }`}
                                >
                                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                                    active ? "gold-gradient-bg text-slate-950" : "bg-slate-100 text-slate-500"
                                  }`}>
                                    <Icon icon={link.icon} width={18} height={18} />
                                  </div>
                                  <span className="truncate">{link.title}</span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      ) : (
                        <ul className="space-y-2">
                          {navigationItems.map((item) => (
                            <li key={item.label}>
                              <Link
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="block px-4 py-3 rounded-lg font-medium text-base text-white/90 hover:text-white hover:bg-white/10"
                              >
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </nav>

                    {/* Mobile Menu Footer */}
                    <div
                      className={`p-5 border-t ${
                        isDashboard ? "border-slate-100" : "border-white/10"
                      }`}
                    >
                      {isDashboard ? (
                        <button
                          onClick={() => {
                            setIsOpen(false);
                            logout();
                          }}
                          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer mb-3"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out Session</span>
                        </button>
                      ) : null}

                      <div
                        className={`text-xs text-center ${
                          isDashboard ? "text-slate-400" : "text-white/60"
                        }`}
                      >
                        © {new Date().getFullYear()} Baker Jones Holdings. All rights reserved.
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
