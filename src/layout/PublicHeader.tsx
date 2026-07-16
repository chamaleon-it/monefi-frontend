"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ChevronDown, ArrowUpRight, Menu, X } from 'lucide-react';

export default function PublicHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  const getLinkClass = (path: string) => {
    const base = "text-[14px] transition-colors pb-1 border-b-2";
    if (isActive(path)) {
      return `${base} font-bold text-[#082348] border-[#082348]`;
    }
    return `${base} font-medium text-slate-500 hover:text-[#082348] border-transparent hover:border-slate-300`;
  };

  const productPaths = [
    '/capital-markets',
    '/private-equity',
    '/structured-holdings',
    '/digital-assets'
  ];
  const isProductsActive = productPaths.some(path => pathname.startsWith(path));

  return (
    <>
      <header className={`sticky top-0 bg-white/95 backdrop-blur-md border-b transition-all duration-300 z-[100] ${scrolled ? 'py-3 border-gray-200 shadow-sm' : 'py-4 lg:py-5 border-transparent'}`}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 flex justify-between items-center">
          <Link href="/" className="flex-shrink-0">
            <Image src="/logo/logo.svg" width={180} height={45} alt="Baker Jones Holdings logo" className="w-[140px] sm:w-[180px]" />
          </Link>

          <nav className="hidden lg:flex items-center space-x-9">
            <Link href="/" className={getLinkClass('/')}>Home</Link>
            <Link href="/about-us" className={getLinkClass('/about-us')}>About Us</Link>
            
            {/* Desktop Products Dropdown */}
            <div 
              className="relative py-2"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button className={`flex items-center text-[14px] transition-colors cursor-pointer outline-none ${isProductsActive ? 'font-bold text-[#082348]' : 'font-medium text-slate-500 hover:text-[#082348]'}`}>
                Financial Products <ChevronDown className={`ml-1 w-3.5 h-3.5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute left-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-slate-100 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <Link href="/capital-markets" className={`block px-5 py-2.5 text-[14px] transition-colors hover:bg-slate-50 ${pathname === '/capital-markets' ? 'text-[#082348] font-semibold bg-slate-50/50' : 'text-slate-600 hover:text-[#082348]'}`}>
                    Capital Markets
                  </Link>
                  <Link href="/private-equity" className={`block px-5 py-2.5 text-[14px] transition-colors hover:bg-slate-50 ${pathname === '/private-equity' ? 'text-[#082348] font-semibold bg-slate-50/50' : 'text-slate-600 hover:text-[#082348]'}`}>
                    Private Equity
                  </Link>
                  <Link href="/structured-holdings" className={`block px-5 py-2.5 text-[14px] transition-colors hover:bg-slate-50 ${pathname === '/structured-holdings' ? 'text-[#082348] font-semibold bg-slate-50/50' : 'text-slate-600 hover:text-[#082348]'}`}>
                    Structured Holdings
                  </Link>
                  <Link href="/digital-assets" className={`block px-5 py-2.5 text-[14px] transition-colors hover:bg-slate-50 ${pathname === '/digital-assets' ? 'text-[#082348] font-semibold bg-slate-50/50' : 'text-slate-600 hover:text-[#082348]'}`}>
                    Digital Assets
                  </Link>
                </div>
              )}
            </div>

            <Link href="/login" className={getLinkClass('/login')}>Investment Platform</Link>
            <Link href="/our-approach" className={getLinkClass('/our-approach')}>Our Approach</Link>
            <Link href="/contact-us" className={getLinkClass('/contact-us')}>Contact Us</Link>
          </nav>

          <div className="hidden lg:flex items-center space-x-3">
            <Link href="/login" className="px-6 py-2 rounded-full border border-slate-300 text-[#082348] text-[14px] font-bold hover:border-[#082348] transition-all">
              Log In
            </Link>
            <Link href="/application-form" className="px-6 py-2 rounded-full bg-[#082348] text-white text-[14px] font-bold hover:bg-[#051630] transition-all flex items-center">
              Register <ArrowUpRight className="ml-1 w-3.5 h-3.5 stroke-[2.5]" />
            </Link>
          </div>

          <button 
            className="lg:hidden p-2 text-slate-500 hover:text-[#082348] transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 pt-[80px] z-[90] bg-white lg:hidden flex flex-col overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col px-6 py-8 space-y-6">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className={`text-xl font-bold ${isActive('/') ? 'text-[#082348]' : 'text-slate-600'}`}>Home</Link>
            <Link href="/about-us" onClick={() => setIsMobileMenuOpen(false)} className={`text-xl font-bold ${isActive('/about-us') ? 'text-[#082348]' : 'text-slate-600'}`}>About Us</Link>
            
            <div className="flex flex-col space-y-4">
              <span className={`text-xl font-bold ${isProductsActive ? 'text-[#082348]' : 'text-slate-600'} flex items-center justify-between`}>
                Financial Products
              </span>
              <div className="pl-4 flex flex-col space-y-4 border-l-2 border-slate-100">
                <Link href="/capital-markets" onClick={() => setIsMobileMenuOpen(false)} className={`text-lg font-medium ${pathname === '/capital-markets' ? 'text-[#082348] font-bold' : 'text-slate-500'}`}>
                  Capital Markets
                </Link>
                <Link href="/private-equity" onClick={() => setIsMobileMenuOpen(false)} className={`text-lg font-medium ${pathname === '/private-equity' ? 'text-[#082348] font-bold' : 'text-slate-500'}`}>
                  Private Equity
                </Link>
                <Link href="/structured-holdings" onClick={() => setIsMobileMenuOpen(false)} className={`text-lg font-medium ${pathname === '/structured-holdings' ? 'text-[#082348] font-bold' : 'text-slate-500'}`}>
                  Structured Holdings
                </Link>
                <Link href="/digital-assets" onClick={() => setIsMobileMenuOpen(false)} className={`text-lg font-medium ${pathname === '/digital-assets' ? 'text-[#082348] font-bold' : 'text-slate-500'}`}>
                  Digital Assets
                </Link>
              </div>
            </div>

            <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className={`text-xl font-bold ${isActive('/login') ? 'text-[#082348]' : 'text-slate-600'}`}>Investment Platform</Link>
            <Link href="/our-approach" onClick={() => setIsMobileMenuOpen(false)} className={`text-xl font-bold ${isActive('/our-approach') ? 'text-[#082348]' : 'text-slate-600'}`}>Our Approach</Link>
            <Link href="/contact-us" onClick={() => setIsMobileMenuOpen(false)} className={`text-xl font-bold ${isActive('/contact-us') ? 'text-[#082348]' : 'text-slate-600'}`}>Contact Us</Link>
            
            <div className="pt-8 mt-4 border-t border-slate-100 flex flex-col space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300 delay-100">
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-4 text-center rounded-full border-2 border-[#082348] text-[#082348] text-[16px] font-bold hover:bg-slate-50 transition-colors">
                Log In
              </Link>
              <Link href="/application-form" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-4 text-center rounded-full bg-[#082348] text-white text-[16px] font-bold flex items-center justify-center hover:bg-[#051630] transition-colors">
                Register <ArrowUpRight className="ml-2 w-4 h-4 stroke-[2.5]" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
