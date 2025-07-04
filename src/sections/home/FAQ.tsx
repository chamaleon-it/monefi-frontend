import React from "react";
import FAQLeftSection from "./FAQLeftSection";
import { AtSign, Phone } from "lucide-react";
import Image from "next/image";

export default function FAQ() {
  return (
    <section>
      <div className="max-w-[95%] lg:max-w-[83%] mx-auto py-[50px] flex flex-col lg:flex-row items-center gap-10">
        <div className="w-full lg:w-1/2">
          <h2 className="font-poppins font-semibold text-4xl lg:text-6xl mt-6 mb-8">
            Frequently <br /> Asked Questions
          </h2>
          <div className="bg-monefi-pink w-full lg:w-[497px] rounded-4xl mt-8 p-6 lg:p-12 text-white relative">
            <p className="font-poppins font-semibold text-2xl">
              Couldn’t find what <br /> you’re looking for?
            </p>
            <div className="space-y-3 lg:space-y-6 mt-5 lg:mt-10">
              <div className="flex gap-3 items-center">
                <div className="w-[50px] h-[50px] rounded-full bg-white/10 flex justify-center items-center">
                  <Phone fill="#fff" strokeWidth={0.75} />
                </div>
                <p className="font-poppins font-bold text-xl">02080028761</p>
              </div>
              <div className="flex gap-3 items-center">
                <div className="w-[50px] h-[50px] rounded-full bg-white/10 flex justify-center items-center">
                  <AtSign />
                </div>
                <p className="font-inter font-medium text-xl">
                  info@monefi.co.uk
                </p>
              </div>
            </div>
            <Image src={'/home/circle.png'} width={144} height={144} alt="Circle" className="absolute bottom-0 right-0" />
          </div>
        </div>

        <FAQLeftSection />
      </div>
      <div className="grid grid-cols-1 border-t  container mx-auto p-5 gap-10 py-5">
        <div className="space-y-5">
          <p className="text-lg">Copyright © {new Date().getFullYear()}Monefi Limited</p>
          <p className="text-lg leading-8">Monefi Limited is authorised and regulated by the Financial Conduct Authority, with firm reference no. 938387. Registered in england and Wales with company no. 12857853 and with registered offices at Burton Varley Ltd Suite 3, 2nd Floor, Didsbury House, 748-754 Wilmslow Road, Manchester, England, M20 2DW</p>
        
        </div>
        {/* <div className="flex items-end justify-end">
          <p className="text-lg">Copyright © {new Date().getFullYear()}Monefi Limited</p>
        </div> */}
      </div>
    </section>
  );
}
