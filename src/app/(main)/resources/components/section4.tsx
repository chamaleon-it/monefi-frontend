"use client";
import React from "react";
import Image from "next/image";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";


const content = [
  {
    title: "Created and reviewed by qualified financial advisers",
    description:
      "",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white">
        Collaborative Editing
      </div>
    ),
  },
  {
    title: "Always free, accessible, and jargon-free",
    description:
      "",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white">
        <Image
          src="/linear.webp"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Focused on your financial empowerment—not product selling",
    description:
      " ",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] text-white">
        Version control
      </div>
    ),
  },
  {
    title: "Updated regularly with fresh insights and tools ",
    description:
      "",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white">
        Running out of content
      </div>
    ),
  },
];
export function Section4() {
  return (
    <div className="w-full bg-bakerjonesholdings-black py-[120px] space-y-10 font-poppins" data-lenis-prevent>
      <div className="py-10 text-center text-4xl">
      <h1 className="text-white">    Why Trust Baker Jones Holdings&apos;s Resources?
</h1>
      </div>
      <StickyScroll  content={content} />
    </div>
  );
}
