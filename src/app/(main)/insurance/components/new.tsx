import React from "react";

export default function WhyYouNeedSection() {
  return (
    <section>
      <div className="max-w-[95%] lg:max-w-[83%] mx-auto py-[25px] lg:py-[50px] border-b border-monefi-off-white">
        <h2 className="font-poppins font-semibold text-4xl lg:text-6xl mt-6 mb-8  text-center">
           Our Life Insurance Solutions<span className="text-monefi-pink">:</span>
        </h2>
        <div className="flex flex-wrap lg:flex-row justify-center items-center gap-2 lg:gap-7 mt-10 lg:mt-20">
          <div className="relative w-[49%] lg:w-[300px] h-[270px] lg:h-[420px] rounded-4xl lg:mb-14 bg-[url(/home/news/1.jpg)] bg-cover overflow-hidden">
            <div className="absolute bottom-0 w-full p-4 lg:p-6 text-white bg-gradient-to-t from-black to-transparent ">
              <h3 className="font-inter font-medium text-3xl">Term Life</h3>
              <p className="font-poppins text-xs mt-2">Affordable fixed premiums for 10–30 years Lump-sum death benefit Option to convert to permanent cover Young families, mortgage payers </p>
            </div>
          </div>
          <div className="relative w-[49%] lg:w-[300px] h-[270px] lg:h-[420px] rounded-4xl lg:mt-14 bg-monefi-green overflow-hidden">
            <div className="absolute bottom-0 w-full p-4 lg:p-6 text-white">
              <h3 className="font-inter font-medium text-3xl">Whole Life</h3>
              <p className="font-poppins text-xs mt-2">Coverage for life with fixed premiums Tax-deferred cash value growth  Guaranteed death benefit Those seeking lifelong protection</p>
              {/* <button className="border px-4 py-2 rounded-3xl mt-4">Explore</button> */}
            </div>
          </div>
          <div className="relative w-[49%] lg:w-[300px] h-[270px] lg:h-[420px] rounded-4xl lg:mb-14 bg-[url(/home/news/2.jpg)] bg-cover overflow-hidden">
            <div className="absolute bottom-0 w-full p-4 lg:p-6 text-white bg-gradient-to-t from-black to-transparent ">
              <h3 className="font-inter font-medium text-3xl">Universal Life</h3>
              <p className="font-poppins text-xs mt-2">Flexible premiums and adjustable benefit amounts Cash value accounts linked to interest rates Potential to borrow against policy  Savers who want policy flexibility</p>
            </div>
          </div>
          <div className="relative w-[49%] lg:w-[300px] h-[270px] lg:h-[420px] rounded-4xl lg:mt-14 bg-[url(/home/news/3.jpg)] bg-cover overflow-hidden">
            <div className="absolute bottom-0 w-full p-4 lg:p-6 text-white bg-gradient-to-t from-black to-transparent ">
              <h3 className="font-inter font-medium text-3xl">Iterate</h3>
              <p className="font-poppins text-xs mt-2">Introducing our revolutionary developer matchmaking services.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
