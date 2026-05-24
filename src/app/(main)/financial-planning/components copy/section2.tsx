"use client";

import { Box, Search, Settings, Sparkles } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

export function Section2() {
  return (
    <div className="bg-bakerjonesholdings-black py-[25px] lg:py-[100px] font-poppins">
      <h1 className="text-white text-4xl text-center py-10">Our Financial Planning Services</h1>
    <ul className="grid container mx-auto py-10 grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-2 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
      <GridItem
        area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
        icon={<Box className="h-4 w-4 text-white dark:text-neutral-400" />}
        title="Investment & Retirement Strategy"
        description="Grow your wealth and prepare for life after work. We’ll design a tailored plan that balances your investment goals with your retirement needs—so you can build and enjoy your future with confidence."
      />

      <GridItem
        area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
        icon={<Settings className="h-4 w-4 text-white dark:text-neutral-400" />}
        title="Estate & Legacy Planning"
        description="Leave a lasting impact. Our team helps you protect your assets, minimise inheritance tax, and pass on your wealth in line with your wishes—securely and clearly."
      />

      
      <GridItem
        area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
        icon={<Sparkles className="h-4 w-4 text-white dark:text-neutral-400" />}
        title="Tax Efficiency & Smart Structuring"
        description="Make every pound work harder. We’ll help you legally reduce tax liabilities by making the most of your allowances, savings vehicles, and income strategies."
      />

      <GridItem
        area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
        icon={<Search className="h-4 w-4 text-white dark:text-neutral-400" />}
        title="Life Goals & Financial Problem Solving"
        description="From buying a home to launching a business or managing debt, we create practical, flexible plans that turn real-life goals into financial success stories."
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
              <h3 className="-tracking-4 pt-0.5 font-sans text-xl/[1.375rem] font-semibold text-balance text-bakerjonesholdings-pink md:text-2xl/[1.875rem]">
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
