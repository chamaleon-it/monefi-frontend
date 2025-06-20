"use client";

import usePaths from "@/hooks/usePaths";
import {
  ChevronDown,
  Heart,
  Cross,
  Home,
  Car,
  FileText,
  BarChart3,
  Calculator,
  User,
  GraduationCap,
  Lightbulb,
  Zap,
  Droplets,
  Wifi,
  Headphones,
  HelpCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const paths = usePaths();

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (item: string | null) => {
    setActiveDropdown((prev) => (prev === item ? null : item));
  };

  return (
    <header className="bg-monefi-black pb-7 pt-[74px] sticky -top-11 z-50">
      <div className="max-w-[83%] mx-auto flex justify-between items-center relative">
        {/* Logo */}
        <Link
          href={paths.home}
          aria-label="Home Page"
          title="Monefi. Home Page"
        >
          <Image
            src="/logo.png"
            width={164}
            height={40}
            alt="Monefi logo"
            className="hidden lg:block"
          />
          <Image
            src="/logo.png"
            width={134}
            height={40}
            alt="Monefi logo"
            className="lg:hidden"
          />
        </Link>

        {/* Navigation Links */}
        <ul className="hidden lg:flex gap-8 font-inter text-white mac:text-lg relative">
          <li className="relative"   onMouseEnter={() => toggleDropdown("insurance")}
              onMouseLeave={()=>toggleDropdown(null)}>
            <button
            
              className="flex gap-0.5 items-center cursor-pointer"
            >
              {" "}
              Insurance <ChevronDown width={20} />
            </button>
            {activeDropdown === "insurance" && (
              <>
              <div className="absolute top-full h-2 left-0  w-[400px]"></div>
              <div className="absolute top-full mt-2 left-0 grid grid-cols-2 gap-6 p-6 bg-white text-black rounded-b-2xl shadow-lg z-50 w-[400px]">
                <div>
                  <h4 className="font-semibold mb-2">Insurance Types</h4>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link
                        href="/insurance/life"
                        className="flex items-center text-gray-500 hover:text-blue-600 group"
                      >
                        <Heart className="w-3 h-3 me-2 text-gray-400 group-hover:text-blue-600" />
                        Life Insurance
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/insurance/health"
                        className="flex items-center text-gray-500 hover:text-blue-600 group"
                      >
                        <Cross className="w-3 h-3 me-2 text-gray-400 group-hover:text-blue-600" />
                        Health Insurance
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/insurance/home"
                        className="flex items-center text-gray-500 hover:text-blue-600 group"
                      >
                        <Home className="w-3 h-3 me-2 text-gray-400 group-hover:text-blue-600" />
                        Home Insurance
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/insurance/vehicle"
                        className="flex items-center text-gray-500 hover:text-blue-600 group"
                      >
                        <Car className="w-3 h-3 me-2 text-gray-400 group-hover:text-blue-600" />
                        Vehicle Insurance
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Resources</h4>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link
                        href="/resources/claims"
                        className="flex items-center text-gray-500 hover:text-blue-600 group"
                      >
                        <FileText className="w-3 h-3 me-2 text-gray-400 group-hover:text-blue-600" />
                        Claim Guide
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/resources/policies"
                        className="flex items-center text-gray-500 hover:text-blue-600 group"
                      >
                        <BarChart3 className="w-3 h-3 me-2 text-gray-400 group-hover:text-blue-600" />
                        Compare Policies
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/contact"
                        className="flex items-center text-gray-500 hover:text-blue-600 group"
                      >
                        <Calculator className="w-3 h-3 me-2 text-gray-400 group-hover:text-blue-600" />
                        Get a Quote
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              </>
            )}
          </li>

          <li className="relative"
            onMouseEnter={() => toggleDropdown("loans")}
              onMouseLeave={()=>toggleDropdown(null)}
          >
            <button
            
              className="flex gap-0.5 items-center cursor-pointer"
            >
              Loans <ChevronDown width={20} />
            </button>
            {activeDropdown === "loans" && (
              <>
              <div className="absolute top-full h-2 left-0  w-[400px]"></div>
              <div className="absolute top-full mt-2 left-0 grid grid-cols-2 gap-6 p-6 bg-white text-black rounded-b-2xl shadow-lg z-50 w-[400px]">
                <div>
                  <h4 className="font-semibold mb-2">Loan Types</h4>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link
                        href="/loans/personal"
                        className="flex items-center text-gray-500 hover:text-blue-600 group"
                      >
                        <User className="w-3 h-3 me-2 text-gray-400 group-hover:text-blue-600" />
                        Personal Loan
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/loans/home"
                        className="flex items-center text-gray-500 hover:text-blue-600 group"
                      >
                        <Home className="w-3 h-3 me-2 text-gray-400 group-hover:text-blue-600" />
                        Home Loan
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/loans/auto"
                        className="flex items-center text-gray-500 hover:text-blue-600 group"
                      >
                        <Car className="w-3 h-3 me-2 text-gray-400 group-hover:text-blue-600" />
                        Auto Loan
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/loans/student"
                        className="flex items-center text-gray-500 hover:text-blue-600 group"
                      >
                        <GraduationCap className="w-3 h-3 me-2 text-gray-400 group-hover:text-blue-600" />
                        Student Loan
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Loan Tools</h4>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link
                        href="/tools/loan-calculator"
                        className="flex items-center text-gray-500 hover:text-blue-600 group"
                      >
                        <Calculator className="w-3 h-3 me-2 text-gray-400 group-hover:text-blue-600" />
                        Loan Calculator
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/resources/loan-tips"
                        className="flex items-center text-gray-500 hover:text-blue-600 group"
                      >
                        <Lightbulb className="w-3 h-3 me-2 text-gray-400 group-hover:text-blue-600" />
                        Loan Tips
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              </>
            )}
          </li>

          <li>
            <Link href={paths.mortgages}>Mortgages</Link>
          </li>

          <li className="relative" onMouseEnter={() => toggleDropdown("utilities")}
              onMouseLeave={()=>toggleDropdown(null)}>
            <button
              
              className="flex gap-0.5 items-center cursor-pointer"
            >
              Utilities <ChevronDown width={20} />
            </button>
            {activeDropdown === "utilities" && (
              <>
              <div className="absolute top-full h-2 left-0  w-[400px]"></div>
              <div className="absolute top-full mt-2 left-0 grid grid-cols-2 gap-6 p-6 bg-white text-black rounded-b-2xl shadow-lg z-50 w-[400px]">
                <div>
                  <h4 className="font-semibold mb-2">Services</h4>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link
                        href="/utilities/electricity"
                        className="flex items-center text-gray-500 hover:text-blue-600 group"
                      >
                        <Zap className="w-3 h-3 me-2 text-gray-400 group-hover:text-blue-600" />
                        Electricity
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/utilities/water"
                        className="flex items-center text-gray-500 hover:text-blue-600 group"
                      >
                        <Droplets className="w-3 h-3 me-2 text-gray-400 group-hover:text-blue-600" />
                        Water
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/utilities/internet"
                        className="flex items-center text-gray-500 hover:text-blue-600 group"
                      >
                        <Wifi className="w-3 h-3 me-2 text-gray-400 group-hover:text-blue-600" />
                        Internet
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Help & Support</h4>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link
                        href="/contact"
                        className="flex items-center text-gray-500 hover:text-blue-600 group"
                      >
                        <Headphones className="w-3 h-3 me-2 text-gray-400 group-hover:text-blue-600" />
                        Customer Support
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/faqs"
                        className="flex items-center text-gray-500 hover:text-blue-600 group"
                      >
                        <HelpCircle className="w-3 h-3 me-2 text-gray-400 group-hover:text-blue-600" />
                        FAQs
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              </>
            )}
          </li>

          <li>
            <Link href={paths.estatePlanning}>Estate Planning</Link>
          </li>
        </ul>

        {/* Login Button */}
        <Link
          href={paths.auth.login}
          className="px-6 py-3 rounded-full font-poppins bg-monefi-off-white text-monefi-black mac:text-lg"
        >
          Login
        </Link>
      </div>
    </header>
  );
}
