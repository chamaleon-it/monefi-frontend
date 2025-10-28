"use client";

import React from "react";
import Link from "next/link";

export default function MaintenanceBanner() {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-95 flex flex-col items-center justify-center z-[9999] text-center p-6">
      <div className="max-w-xl">
        <h1 className="text-4xl font-bold text-white mb-4">
          🚧 Website Under Maintenance
        </h1>
        <p className="text-gray-300 text-lg mb-6">
          We’re currently working hard to improve your experience.  
          Please check back soon!
        </p>
        {/* <Link href="/login">
          <button className="px-6 py-3 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-medium transition">
            Already a User? Login
          </button>
        </Link> */}
      </div>
    </div>
  );
}
