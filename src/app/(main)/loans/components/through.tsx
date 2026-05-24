import React from "react";

export default function Through() {
  return (
    <section>
      <div className="max-w-[95%]  lg:max-w-[83%] mx-auto py-[25px] lg:py-[50px] border-b border-bakerjonesholdings-off-white">
        <h2 className="font-poppins font-semibold text-4xl lg:text-6xl mt-6 mb-8  text-center">
           Why Borrow Through Baker Jones Holding?<span className="text-bakerjonesholdings-pink">:</span>
        </h2>
        <div className="flex flex-wrap lg:flex-row justify-center items-center gap-2 lg:gap-7 mt-10 lg:mt-20">
          <div className="relative w-[49%]  lg:w-[300px] h-[270px] lg:h-[420px] rounded-4xl lg:mb-14 bg-[url(/loan-type/1.jpeg)] bg-cover overflow-hidden">
            <div className="absolute  bottom-0 w-full p-4 lg:p-6 text-white bg-gradient-to-t from-black to-transparent ">
              <h3 className="font-inter font-medium text-xl lg:text-3xl">Tailored Offers</h3>
              <p className="font-poppins text-xs mt-2">We match you with loan options suited to your circumstances</p>
            </div>
          </div>
          <div className="relative w-[49%] lg:w-[300px] h-[270px] lg:h-[420px] rounded-4xl lg:mt-14 bg-[url(/loan-type/2.jpeg)] bg-cover overflow-hidden">
            <div className="absolute bottom-0 w-full p-4 lg:p-6 text-white bg-gradient-to-t from-black to-transparent">
              <h3 className="font-inter font-medium text-xl lg:text-3xl">No Upfront Fees</h3>
              <p className="font-poppins text-xs mt-2">We don&apos;t charge you for quotes or comparisons</p>
              {/* <button className="border px-4 py-2 rounded-3xl mt-4">Explore</button> */}
            </div>
          </div>
          <div className="relative w-[49%] lg:w-[300px] h-[270px] lg:h-[420px] rounded-4xl lg:mb-14 bg-[url(/loan-type/3.jpeg)] bg-cover overflow-hidden">
            <div className="absolute bottom-0 w-full p-4 lg:p-6 text-white bg-gradient-to-t from-black to-transparent ">
              <h3 className="font-inter font-medium text-xl lg:text-3xl">Soft Credit Checks</h3>
              <p className="font-poppins text-xs mt-2">Initial checks won&apos;t affect your credit score</p>
            </div>
          </div>
          <div className="relative w-[49%] lg:w-[300px] h-[270px] lg:h-[420px] rounded-4xl lg:mt-14 bg-[url(/loan-type/4.jpeg)] bg-cover overflow-hidden">
            <div className="absolute bottom-0 w-full p-4 lg:p-6 text-white bg-gradient-to-t from-black to-transparent ">
              <h3 className="font-inter font-medium text-xl lg:text-3xl">UK-Based Support</h3>
              <p className="font-poppins text-xs mt-2">Our friendly team is here every step of the way</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
