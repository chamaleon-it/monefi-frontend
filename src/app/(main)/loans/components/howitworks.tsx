"use client";
import React from "react";
import Image from "next/image";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";


const content = [
  {
    title: "Apply online in minutes",
    description:
      "",
    content: (
     <Image
          src="/loan-type/5.jpeg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
    ),
  },
  {
    title: "Get matched with suitable lenders",
    description:
      "",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white">
        <Image
          src="/loan-type/6.jpeg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Choose your offer ",
    description:
      "  Choose your offer and complete your application",
    content: (
      <Image
          src="/loan-type/7.jpeg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
    ),
  },
  {
    title: "Funds transferred ",
    description:
      " Funds transferred directly to your account once approved",
    content: (
     <Image
          src="/loan-type/8.jpeg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
    ),
  },
];
export function Howitwork() {
  return (
    <div className="w-full bg-monefi-black py-[120px] space-y-10 font-poppins" data-lenis-prevent>
      <div className="py-10 text-center text-4xl">
      <h1 className="text-white">Why Choose Monefi for Your Life Cover</h1>
      </div>
      <StickyScroll  content={content} />
    </div>
  );
}
