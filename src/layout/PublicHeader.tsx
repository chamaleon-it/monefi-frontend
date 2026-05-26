"use client";

import usePaths from "@/hooks/usePaths";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import LoginButton from "./LoginButton";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function PublicHeader() {
  const paths = usePaths();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
    { href: paths.home, label: "Home" },
    { href: paths.insurance, label: "Insurance" },
    { href: paths.loans, label: "Loan Types" },
    { href: paths.mortgages, label: "Mortgages" },
    { href: paths.financialplanning, label: "Financial Planning" },
    { href: paths.aboutUs, label: "About Us" },
    { href: paths.contactUs, label: "Contact Us" },
  ];

  return (
    <>
      <header className="fixed z-50 top-0 left-0 w-full bg-corporate-charcoal/95 backdrop-blur-xl border-b border-white/10 py-4 shadow-xl">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link
              href={paths.home}
              aria-label="Home Page"
              className="flex-shrink-0 transition-opacity hover:opacity-80"
            >
              <Image
                src="/logo.png"
                width={164}
                height={40}
                alt="Baker Jones Holdings logo"
                className="hidden sm:block invert"
              />
              <Image
                src="/logo.png"
                width={120}
                height={30}
                alt="Baker Jones Holdings logo"
                className="sm:hidden"
              />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-2 bg-white/5 backdrop-blur-md px-6 py-2.5 rounded-full border border-white/10">
              <ul className="flex items-center space-x-1">
                {navigationItems.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href}>
                      <span className="px-4 py-2 rounded-full font-medium text-sm text-white/80 transition-all duration-300 hover:text-white hover:bg-white/10">
                        {item.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Desktop Right Actions */}
            <div className="hidden lg:flex items-center space-x-6">
              <Link href={paths.contactUs} className="text-sm font-medium text-white/80 hover:text-white transition-colors">
                Partner With Us
              </Link>
              <LoginButton isDashboard={false} />
            </div>

            {/* Mobile Menu */}
            <div className="lg:hidden flex items-center space-x-3">
              <div className="block">
                <LoginButton isDashboard={false} />
              </div>

              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                    <Menu width={24} height={24} />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:w-[400px] p-0 border-0 bg-corporate-charcoal">
                  <div className="flex flex-col h-full text-white">
                    <div className="flex items-center justify-between p-6 border-b border-white/10">
                      <Link
                        href={paths.home}
                        onClick={() => setIsOpen(false)}
                        className="flex-shrink-0"
                      >
                        <Image
                          src="/logo.png"
                          width={140}
                          height={35}
                          alt="Baker Jones Holdings logo"
                        />
                      </Link>
                      <SheetClose asChild>
                        <X onClick={() => setIsOpen(false)} width={24} height={24} className="cursor-pointer text-white/80 hover:text-white" />
                      </SheetClose>
                    </div>

                    <nav className="flex-1 p-6 overflow-y-auto">
                      <ul className="space-y-4">
                        {navigationItems.map((item, index) => (
                          <li key={item.label}>
                            <Link
                              href={item.href}
                              onClick={() => setIsOpen(false)}
                              className="block px-4 py-3 rounded-lg font-medium text-lg text-white/90 hover:text-white hover:bg-white/10 transition-all"
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </nav>

                    <div className="p-6 border-t border-white/10">
                      <div className="text-sm text-white/60 text-center">
                        © {new Date().getFullYear()} Baker Jones Holdings.
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
