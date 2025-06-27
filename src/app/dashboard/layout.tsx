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
  }, [isAuthenticated, loading,paths.home,router]);

  if (!isAuthenticated || loading) return null;

  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-150px)] max-w-[95%] lg:max-w-[83%] mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-10 w-full">
          <Aside />
          <div className="max-w-full lg:max-w-[calc(100%-400px-40px)] w-full p-2.5">
            {children}
          </div>
        </div>
      </main>
    </>
  );
}
