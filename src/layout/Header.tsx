"use client";

import usePaths from "@/hooks/usePaths";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import LoginButton from "./LoginButton";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname()
  const isDashboard = useMemo(() => pathname.includes('/dashboard'), [pathname])
  const paths = usePaths();




  return (
    <header className={`sticky  z-50 ${isDashboard ?"bg-white py-3 top-0 border-b-[1px] border-black/30" : 'bg-monefi-black pb-7 pt-[74px] -top-11'}`}>
      <div className="max-w-[83%] mx-auto flex justify-between items-center relative">
        {/* Logo */}
        <Link
          href={paths.home}
          aria-label="Home Page"
          title="Monefi. Home Page"
        >
          <Image
            src={isDashboard ? "/logo-2.png" : "/logo.png"}
            width={164}
            height={40}
            alt="Monefi logo"
            className="hidden lg:block"
          />
          <Image
            src={isDashboard ? "/logo-2.png" : "/logo.png"}
            width={134}
            height={40}
            alt="Monefi logo"
            className="lg:hidden"
          />
        </Link>

        {/* Navigation Links */}
        <ul className={`hidden lg:flex gap-8 font-inter mac:text-lg relative ${isDashboard ? 'text-black' : "text-white"}`}>
          <li className="relative"   
              >
                
            <Link href={paths.insurance}><button className="flex gap-0.5 items-center cursor-pointer">Insurance</button></Link>
          </li>

          <li className="relative"
           
          ><Link href={paths.loans}>
            <button
            
              className="flex gap-0.5 items-center cursor-pointer"
            >
              loan Types 
            </button>
            </Link>
          </li>
 <li>
            <Link href={paths.resources}>Resources</Link>
          </li>
          <li>
            <Link href={paths.mortgages}>Mortgages</Link>
          </li>

          {/* <li className="relative" onMouseEnter={() => toggleDropdown("utilities")}
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
          </li> */}

          <li>
            <Link href={paths.financialplanning}>Financial Planning</Link>
          </li>
        </ul>

        {/* Login Button */}
       <LoginButton isDashboard={isDashboard}/>
      </div>
    </header>
  );
}
