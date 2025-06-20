import React from "react";
import FAQLeftSection from "./FAQLeftSection";

export default function FAQ() {
  return (
    <section>
      <div className="max-w-[95%] lg:max-w-[83%] mx-auto py-[50px] flex flex-col lg:flex-row items-center gap-10">
        <div className="w-full lg:w-1/2">
            <h2 className="font-poppins font-semibold text-4xl lg:text-6xl mt-6 mb-8">Frequently <br /> Asked Questions</h2>
            <div className="bg-monefi-pink w-full lg:w-[497px] rounded-4xl mt-8 p-6 lg:p-12 text-white">
                <p className="font-poppins font-semibold text-2xl">Couldn’t find what <br /> you’re looking for?</p>
                    <div className="space-y-3 lg:space-y-6 mt-5 lg:mt-10">
                        <div className="flex gap-3 items-center">
                            <div className="w-[50px] h-[50px] rounded-full bg-white/10"></div>
                            <p className="font-poppins font-bold text-xl">+1-613-555-157</p>
                        </div>
                        <div className="flex gap-3 items-center">
                            <div className="w-[50px] h-[50px] rounded-full bg-white/10"></div>
                            <p className="font-inter font-medium text-xl">info@domain.com</p>
                        </div>
                    </div>
            </div>
        </div>
        
    <FAQLeftSection/>
        
      </div>
    </section>
  );
}

