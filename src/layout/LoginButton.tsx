"use client";

import { useAuth } from "@/auth/useAuth";
import usePaths from "@/hooks/usePaths";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { Settings, LogOut, User } from "lucide-react";

export default function LoginButton({ isDashboard = false }: { isDashboard: boolean }) {
  const paths = usePaths();
  const { user, isAuthenticated, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isAuthenticated) {
    if (isDashboard) {
      const nameOrEmail = user?.name || user?.email || "User";
      const initialChar = nameOrEmail.charAt(0).toUpperCase();

      return (
        <div className="relative font-inter" ref={menuRef}>
          {/* Circular Profile Icon Button with Name Initial */}
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            aria-label="User menu"
            className="w-10 h-10 rounded-full gold-gradient-bg p-0.5 shadow-md flex items-center justify-center cursor-pointer transition-transform hover:scale-105 active:scale-95 focus:outline-none"
          >
            <div className="w-full h-full rounded-full bg-[#082348] flex items-center justify-center text-white font-bold text-sm leading-none select-none text-center pt-[0.5px]">
              {initialChar}
            </div>
          </button>

          {/* Profile Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2.5 w-60 bg-white rounded-2xl border border-slate-200 shadow-xl p-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              {/* Profile Card Header */}
              <div className="px-3 py-2.5 bg-slate-50 rounded-xl mb-1.5 border border-slate-100">
                <p className="font-serif font-bold text-xs text-[#082348] truncate capitalize">
                  {user?.name || "Client Account"}
                </p>
                <p className="text-[10px] text-slate-500 truncate font-mono mt-0.5">
                  {user?.email}
                </p>
              </div>

              {/* Menu Items */}
              <div className="space-y-1">
                <Link
                  href={paths.dashboard.settings}
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#082348] transition-colors"
                >
                  <Settings className="w-4 h-4 text-slate-500" />
                  <span>Settings</span>
                </Link>

                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer text-left"
                >
                  <LogOut className="w-4 h-4 text-rose-500" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <Link
          href={paths.dashboard.root}
          className="py-1.5 px-3 lg:px-6 lg:py-3 rounded-full font-poppins bg-bakerjonesholdings-off-white text-bakerjonesholdings-black mac:text-lg"
        >
          Dashboard
        </Link>
      );
    }
  }

  return (
    <Link
      href={paths.auth.login}
      className="py-1.5 px-3 lg:px-6 lg:py-3 rounded-full font-poppins text-bakerjonesholdings-off-white bg-bakerjonesholdings-black mac:text-lg"
    >
      Login
    </Link>
  );
}
