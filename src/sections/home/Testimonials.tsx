import Image from "next/image";
import React from "react";
import TestimonialsSwiper from "./TestimonialsSwiper";

export default function Testimonials() {
  return (
    <section className="bg-monefi-off-pink w-screen overflow-hidden">
      <div className="pl-[8%] mx-auto flex py-[50px] gap-12 items-center shrink-0">
       <div className="">
        <p className="uppercase text-lg font-poppins">Testimonials</p>
        <h2 className="font-poppins font-semibold text-6xl mt-6 mb-8 whitespace-nowrap">What our <br /> customers say</h2>
        <Image src={'/home/review.svg'} width={400} height={40} alt="Monefi Review Status"/>
       </div>

       <TestimonialsSwiper />
      </div>
    </section>
  );
}
