import React from "react";

export default function Section3() {
  return (
    <section>
      <div className="max-w-[95%] lg:max-w-[83%] mx-auto py-[25px] lg:py-[50px] border-b border-monefi-off-white">
        <h2 className="font-poppins font-semibold text-4xl lg:text-6xl mt-6 mb-8 whitespace-nowrap text-center">
          Why Work with Monefi?<span className="text-monefi-pink">:</span>
        </h2>
        <div className="flex flex-wrap lg:flex-row justify-center items-center gap-2 lg:gap-7 mt-10 lg:mt-20">
          <div className="relative w-[49%] lg:w-[300px] h-[270px] lg:h-[420px] rounded-4xl lg:mb-14 bg-[url(/home/news/1.jpg)] bg-cover overflow-hidden">
            <div className="absolute bottom-0 w-full p-4 lg:p-6 text-white bg-gradient-to-t from-black to-transparent ">
              <h3 className="font-inter font-medium text-3xl">FCA-authorised advice you can trust </h3>
              <p className="font-poppins text-xs mt-2"></p>
            </div>
          </div>
          <div className="relative w-[49%] lg:w-[300px] h-[270px] lg:h-[420px] rounded-4xl lg:mt-14 bg-monefi-green overflow-hidden">
            <div className="absolute bottom-0 w-full p-4 lg:p-6 text-white">
              <h3 className="font-inter font-medium text-3xl">Tailored strategies for every stage of life</h3>
              <p className="font-poppins text-xs mt-2"></p>
              {/* <button className="border px-4 py-2 rounded-3xl mt-4">Explore</button> */}
            </div>
          </div>
          <div className="relative w-[49%] lg:w-[300px] h-[270px] lg:h-[420px] rounded-4xl lg:mb-14 bg-[url(/home/news/2.jpg)] bg-cover overflow-hidden">
            <div className="absolute bottom-0 w-full p-4 lg:p-6 text-white bg-gradient-to-t from-black to-transparent ">
              <h3 className="font-inter font-medium text-3xl">Transparent planning tools and regular progress reviews</h3>
              <p className="font-poppins text-xs mt-2"></p>
            </div>
          </div>
          <div className="relative w-[49%] lg:w-[300px] h-[270px] lg:h-[420px] rounded-4xl lg:mt-14 bg-[url(/home/news/3.jpg)] bg-cover overflow-hidden">
            <div className="absolute bottom-0 w-full p-4 lg:p-6 text-white bg-gradient-to-t from-black to-transparent ">
              <h3 className="font-inter font-medium text-3xl">Friendly, jargon-free advice from qualified professionals</h3>
              <p className="font-poppins text-xs mt-2"></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
