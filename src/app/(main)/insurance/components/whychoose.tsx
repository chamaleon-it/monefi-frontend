"use client";
import React from "react";
import { StickyScroll } from "../components/ui/sticky-scroll-reveal";
import Image from "next/image";


const content = [
  {
    title: "Tailored Advice",
    description:
      "   Our specialists take time to understand your financial goals and recommend the right policy structure.",
    content: (
       <Image
          src="/insurance/4.jpeg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
    ),
  },
  {
    title: "Competitive Rates",
    description:
      "We leverage our network of top insurers to secure you market-leading premiums.",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white">
        <Image
          src="/insurance/5.jpeg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Hassle-Free Application",
    description:
      "   Simplified underwriting and digital policy management make it easy to apply and review your cover.",
    content: (
       <Image
          src="/insurance/6.jpeg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
    ),
  },
  {
    title: "Ongoing Support",
    description:
      "   From policy questions to claim assistance, our dedicated team stands by you every step of the way.",
    content: (
       <Image
          src="/insurance/7.jpeg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
    ),
  },
];
export function Whychoose() {
  return (
    <div className="w-full bg-bakerjonesholdings-black py-[120px] space-y-10 font-poppins" data-lenis-prevent>
      <div className="py-10 text-center text-4xl">
      <h1 className="text-white">Why Choose Baker Jones Holding for Your Life Cover</h1>
      </div>
      <StickyScroll  content={content} />
    </div>
  );
}
