"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, ArrowUpRight, Menu, X } from 'lucide-react';

export default function Home2Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`sticky top-0 bg-white/95 backdrop-blur-md border-b transition-all duration-300 z-[100] ${scrolled ? 'py-3 border-gray-200 shadow-sm' : 'py-4 lg:py-5 border-transparent'}`}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 flex justify-between items-center">
          <Link href="/home-2" className="flex-shrink-0">
            <Image src="/logo/logo.svg" width={180} height={45} alt="Baker Jones Holdings logo" className="w-[140px] sm:w-[180px]" />
          </Link>

          <nav className="hidden lg:flex items-center space-x-9">
            <Link href="/home-2" className="text-[14px] font-bold text-[#082348] pb-1 border-b-2 border-[#082348]">Home</Link>
            <Link href="/about" className="text-[14px] font-medium text-slate-500 hover:text-[#082348] transition-colors">About Us</Link>
            <div className="flex items-center text-[14px] font-medium text-slate-500 hover:text-[#082348] transition-colors cursor-pointer">
              Financial Products <ChevronDown className="ml-1 w-3.5 h-3.5" />
            </div>
            <Link href="#" className="text-[14px] font-medium text-slate-500 hover:text-[#082348] transition-colors">Investment Platform</Link>
            <Link href="/how-it-works" className="text-[14px] font-medium text-slate-500 hover:text-[#082348] transition-colors">How It Works</Link>
            <Link href="/contact" className="text-[14px] font-medium text-slate-500 hover:text-[#082348] transition-colors">Contact Us</Link>
          </nav>

          <div className="hidden lg:flex items-center space-x-3">
            <Link href="/login" className="px-6 py-2 rounded-full border border-slate-300 text-[#082348] text-[14px] font-bold hover:border-[#082348] transition-all">
              Log In
            </Link>
            <Link href="/new-application-form" className="px-6 py-2 rounded-full bg-[#082348] text-white text-[14px] font-bold hover:bg-[#051630] transition-all flex items-center">
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
            <Link href="/home-2" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold text-[#082348]">Home</Link>
            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-medium text-slate-600">About Us</Link>
            <div className="flex flex-col space-y-4">
              <span className="text-xl font-medium text-slate-600 flex items-center justify-between">
                Financial Products <ChevronDown className="w-5 h-5 text-slate-400" />
              </span>
              <div className="pl-4 flex flex-col space-y-4 border-l-2 border-slate-100">
                <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-slate-500">Stocks & Shares</Link>
                <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-slate-500">Fixed Income</Link>
                <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-slate-500">Pre-IPO</Link>
              </div>
            </div>
            <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-medium text-slate-600">Investment Platform</Link>
            <Link href="/how-it-works" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-medium text-slate-600">How It Works</Link>
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-medium text-slate-600">Contact Us</Link>
            
            <div className="pt-8 mt-4 border-t border-slate-100 flex flex-col space-y-4">
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-4 text-center rounded-full border-2 border-[#082348] text-[#082348] text-[16px] font-bold">
                Log In
              </Link>
              <Link href="/new-application-form" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-4 text-center rounded-full bg-[#082348] text-white text-[16px] font-bold flex items-center justify-center">
                Register <ArrowUpRight className="ml-2 w-4 h-4 stroke-[2.5]" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
