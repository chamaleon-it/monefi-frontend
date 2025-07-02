"use client";

import { Box, Lock, Search, Settings, Sparkles } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

export function Loan_Solutions() {
  return (
    <div className="bg-monefi-black py-[25px] lg:py-[100px] font-poppins">
      <h1 className="text-white text-4xl text-center py-10">Explore Our Loan Solutions</h1>
      <p className="text-white font-poppins text-lg text-center ">We offer a wide range of loans, each designed to suit different needs and lifestyles. Our  application process is quick, <br /> our guidance is clear, and our support is personal.</p>
    <ul className="grid container mx-auto py-10 grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
      <GridItem
        area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
        icon={<Box className="h-4 w-4 text-white dark:text-neutral-400" />}
        title="Personal Loans"
        description="Flexible loans for almost any purpose—whether it's a dream holiday, a home upgrade, or a financial reset."
      />

      <GridItem
        area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
        icon={<Settings className="h-4 w-4 text-white dark:text-neutral-400" />}
        title="Car Finance"
        description=" Drive away with confidence. Choose from Hire Purchase (HP), Personal Contract Purchase (PCP), or personal car loans—all with competitive rates and clear terms."
      />

      <GridItem
        area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
        icon={<Lock className="h-4 w-4 text-white dark:text-neutral-400" />}
        title="Debt Consolidation Loans"
        description="Combine multiple debts into one manageable monthly payment. Simplify your finances and potentially reduce your interest burden."
      />

      <GridItem
        area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
        icon={<Sparkles className="h-4 w-4 text-white dark:text-neutral-400" />}
        title="Home Improvement Loans"
        description=" Transform your home with funding that fits your budget. No equity needed."
      />

      <GridItem
        area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
        icon={<Search className="h-4 w-4 text-white dark:text-neutral-400" />}
        title="Bad Credit Loans (subject to availability)"
        description="Life happens—we’re here to help. We work with lenders who consider a range of credit histories."
      />
    </ul>
    </div>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const GridItem = ({area,icon,title,description}: GridItemProps) => {
  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
      <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="border-0.75 relative flex h-full text-white flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-gray-600 p-2">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="-tracking-4 pt-0.5 font-sans text-xl/[1.375rem] font-semibold text-balance text-white md:text-2xl/[1.875rem] dark:text-white">
                {title}
              </h3>
              <h2 className="font-sans text-sm/[1.125rem] text-white md:text-base/[1.375rem] dark:text-neutral-400 [&_b]:md:font-semibold [&_strong]:md:font-semibold">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
