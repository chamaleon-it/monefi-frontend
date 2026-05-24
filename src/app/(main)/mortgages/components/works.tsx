"use client";
import React from "react";
import Image from "next/image";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";


const content = [
  {
    title: "Tell us about your goals",
    description:
      "",
    content: (
       <div className="flex h-full w-full items-center justify-center text-white">
        <Image
          src="/mortgage/5.jpeg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
        </div>
    ),
  },
  {
    title: "Get matched with the right lender and product",
    description:
      "",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white">
        <Image
          src="/mortgage/6.jpeg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Receive your personalised quote ",
    description:
      " ",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white">
        <Image
          src="/mortgage/7.jpeg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "We support you through to approval and completion ",
    description:
      "",
    content: (
     <div className="flex h-full w-full items-center justify-center text-white">
        <Image
          src="/mortgage/8.jpeg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
];
export function Works() {
  return (
    <div className="w-full bg-bakerjonesholdings-black py-[120px] space-y-10 font-poppins" data-lenis-prevent>
      <div className="py-10 text-center text-4xl">
      <h1 className="text-white">How It Works</h1>
      </div>
      <StickyScroll  content={content} />
    </div>
  );
}
