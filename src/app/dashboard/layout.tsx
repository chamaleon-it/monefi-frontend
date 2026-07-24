"use client";
import { useAuth } from "@/auth/useAuth";
import usePaths from "@/hooks/usePaths";
import Aside from "@/layout/dashboard/Aside";
import Header from "@/layout/Header";
import { useRouter } from "next/navigation";

import React, { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const paths = usePaths();

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      router.replace(paths.home);
    }
  }, [isAuthenticated, loading, paths.home, router]);

  if (!isAuthenticated || loading) return null;

  return (
    <div className="bg-[#F9F9F7] text-slate-800 font-inter antialiased min-h-screen flex flex-col lg:flex-row">
      {/* Left Column: Full-Height Sidebar starting from left edge top to bottom */}
      <Aside />

      {/* Right Column: Header starting AFTER sidebar + Main Page Content */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <Header />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
