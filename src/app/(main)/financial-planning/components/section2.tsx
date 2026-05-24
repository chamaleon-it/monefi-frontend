"use client";

// import { Box, Search, Settings, Sparkles } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

export function Section2() {
  return (
    <div className="bg-bakerjonesholdings-black py-[25px] lg:py-[100px] font-poppins">
      <h1 className="text-white text-4xl text-center py-10">Investment & Retirement Strategy</h1>
    <ul className="grid container mx-auto py-10 grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-2 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
      <GridItem
        area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
        icon={<></>}
        title=""
        description="We believe your financial journey should lead to a secure and fulfilling future. Our Investment and Retirement Strategy service is designed to help you grow your wealth while preparing for life after work with confidence."
      />

       <GridItem
        area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
        icon={<></>}
        title=""
        description="Whether you're just starting to build your portfolio or nearing retirement, our strategic approach ensures that your assets are working efficiently and sustainably."
      />


<GridItem
        area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
        icon={<></>}
        title=""
        
        description="We take the time to understand your unique circumstances, ambitions, and risk tolerance to craft a personalised plan that aligns your investment objectives with your long-term retirement needs."
      />

     

      
      

      <GridItem
        area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
        icon={<></>}
        title=""
        description="From diversifying investments to managing risk and planning income streams for retirement, we provide clear, expert guidance every step of the way—so you can enjoy peace of mind today and financial freedom tomorrow."
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
