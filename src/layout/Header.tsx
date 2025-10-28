"use client";

import usePaths from "@/hooks/usePaths";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
// import LoginButton from "./LoginButton";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const isDashboard = useMemo(
    () => pathname.includes("/dashboard"),
    [pathname]
  );
  const paths = usePaths();
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems:{href:string,label:string}[] = [
    // { href: paths.home, label: "Home" },
    // { href: paths.insurance, label: "Insurance" },
    // { href: paths.loans, label: "Loan Types" },
    // // { href: paths.resources, label: "Resources" },
    // { href: paths.mortgages, label: "Mortgages" },
    // // { href: paths.financialplanning, label: "Financial Planning" },
    // { href: paths.aboutUs, label: "About Us" },
    // { href: paths.contactUs, label: "Contact Us" },
  ];

  return (
    <>
      <div className="bg-monefi-black text-center py-2.5 text-white sticky z-50 top-0">
        {" "}
        🚧 Website is currently under maintenance.{" "}
      </div>
      <header
        className={`sticky z-40 top-11 transition-all duration-300 ${
          isDashboard
            ? "bg-white/95 backdrop-blur-md py-4 top-0 border-b border-gray-200/50 shadow-sm"
            : "bg-monefi-black/95 backdrop-blur-md pb-4 pt-4 2xl:py-10  -top-1 border-b border-white/10"
        }`}
      >
        <div className="mac:max-w-[83%] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link
              href={paths.home}
              aria-label="Home Page"
              title="Monefi. Home Page"
              className="flex-shrink-0 transition-transform hover:scale-105 duration-200"
            >
              <Image
                src={isDashboard ? "/logo-2.png" : "/logo.png"}
                width={164}
                height={40}
                alt="Monefi logo"
                className="hidden sm:block"
              />
              <Image
                src={isDashboard ? "/logo-2.png" : "/logo.png"}
                width={120}
                height={30}
                alt="Monefi logo"
                className="sm:hidden"
              />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1">
              <ul className="flex items-center space-x-1">
                {navigationItems.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href}>
                      <button
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 hover:scale-105 mac:text-lg ${
                          isDashboard
                            ? "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                            : "text-white/90 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        {item.label}
                      </button>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Desktop Login Button */}
            <div className="hidden lg:flex items-center ml-8">
              {/* <LoginButton isDashboard={isDashboard} /> */}
            </div>

            {/* Mobile Menu */}
            <div className="lg:hidden flex items-center space-x-3">
              {/* Mobile Login Button */}
              <div className="block">
                {/* <LoginButton isDashboard={isDashboard} /> */}
              </div>

              {/* Mobile Menu Toggle */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  {/* <Button
                  variant="ghost"
                  size="icon"
                  className={`relative  rounded-lg transition-all duration-200 hover:scale-105 ${
                    isDashboard
                      ? "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                      : "text-white hover:text-white hover:bg-white/10"
                  }`}
                > */}
                  <Menu
                    width={30}
                    height={30}
                    className={`relative  rounded-lg transition-all duration-200 hover:scale-105 ${
                      isDashboard
                        ? "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                        : "text-white hover:text-white hover:bg-white/10"
                    }`}
                  />

                  {/* </Button> */}
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className={`w-full sm:w-[400px] p-0 border-0 ${
                    isDashboard ? "bg-white" : "bg-monefi-black"
                  }`}
                >
                  <div className="flex flex-col h-full">
                    {/* Mobile Menu Header */}
                    <div
                      className={`flex items-center justify-between p-6 border-b ${
                        isDashboard ? "border-gray-200" : "border-white/10"
                      }`}
                    >
                      <Link
                        href={paths.home}
                        onClick={() => setIsOpen(false)}
                        aria-label="Home Page"
                        className="transition-transform hover:scale-105 duration-200"
                      >
                        <Image
                          src={isDashboard ? "/logo-2.png" : "/logo.png"}
                          width={140}
                          height={35}
                          alt="Monefi logo"
                        />
                      </Link>
                      <SheetClose asChild>
                        <X
                          onClick={() => setIsOpen(false)}
                          width={30}
                          height={30}
                          className={` rounded-lg shrink-0 cursor-pointer ${
                            isDashboard
                              ? "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                              : "text-white hover:text-white hover:bg-white/10"
                          }`}
                        />
                      </SheetClose>
                    </div>

                    {/* Mobile Navigation Links */}
                    <nav className="flex-1 p-6">
                      <ul className="space-y-2">
                        {navigationItems.map((item, index) => (
                          <li key={item.label}>
                            <Link
                              href={item.href}
                              onClick={() => setIsOpen(false)}
                              className={`block px-4 py-3 rounded-lg font-medium text-base transition-all duration-200 hover:scale-[1.02] ${
                                isDashboard
                                  ? "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                                  : "text-white/90 hover:text-white hover:bg-white/10"
                              }`}
                              style={{
                                animationDelay: `${index * 50}ms`,
                              }}
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </nav>

                    {/* Mobile Menu Footer */}
                    <div
                      className={`p-6 border-t ${
                        isDashboard ? "border-gray-200" : "border-white/10"
                      }`}
                    >
                      <div className="space-y-4">
                        <div className="sm:hidden">
                          {/* <LoginButton isDashboard={isDashboard} /> */}
                        </div>
                        <div
                          className={`text-xs text-center ${
                            isDashboard ? "text-gray-500" : "text-white/60"
                          }`}
                        >
                          © {new Date().getFullYear()} Monefi. All rights
                          reserved.
                        </div>
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
