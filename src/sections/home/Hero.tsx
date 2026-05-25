import usePaths from "@/hooks/usePaths";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Hero() {
  const paths = usePaths();
  return (
    <>
      <section className="bg-bakerjonesholdings-black text-bakerjonesholdings-off-white h-[calc(100vh-50px-80px)] 2xl:h-[calc(100vh-50px-129px)] pt-[70px] lg:pt-0 relative bg-[url(/home/hero/m.jpeg)] lg:bg-[url(/home/hero/d.jpg)] bg-top bg-cover bg-no-repeat relative">
      <div className="bg-black/30 absolute inset-0 m-auto h-full w-full"></div>
        <div className="px-2.5 lg:px-0 container mx-auto h-full relative z-10">
          
            <div className=" w-full lg:w-1/2 h-full flex  flex-col justify-between lg:justify-center pb-5">
              <h1 className="font-poppins font-semibold text-4xl md:text-[40px] mac:text-[60px]">
                The{" "}
                <span className="text-bakerjonesholdings-pink">
                  smar
                  <span className="relative inline-block">
                    t
                   
                  </span>{" "}
                  choic
                  <span className="relative inline-block">
                    e
                   
                  </span>
                </span>{" "}
                for <br className="hidden lg:block" /> your finances.
              </h1>
              <div className="mt-7 bg-black/50 lg:bg-transparent text-bakerjonesholdings-off-white lg:text-bakerjonesholdings-off-white rounded-xl lg:rounded-none p-2.5 lg:p-0">
                <p className="text-xl md:text-2xl mac:text-3xl font-poppins">
                  Empower your financial journey with{" "}
                  <span className="font-bold">Expert</span> <br /> guidance and{" "}
                  <span className="font-bold">Tailored</span> solutions.
                </p>
                <Link
                  href={paths.contactUs}
                  className="mt-7 px-6 py-4 rounded-full border font-poppins hover:scale-110 duration-400 hover:bg-bakerjonesholdings-pink hover:text-bakerjonesholdings-black mac:text-lg inline-block"
                >
                  Join Today
                </Link>
              </div>
            </div>
        </div>

        {/* <div className="max-w-[81%] mx-auto absolute bottom-0 inset-x-0 hidden lg:flex items-end justify-center">
          <div className="relative w-[360px] mac:w-1/4 h-[463px] mac:h-[643px] rounded-t-full  bg-bakerjonesholdings-off-white flex shrink-0 flex-col justify-end items-center cursor-pointer duration-300 hover:border-x-4 hover:border-t-4 border-white">
            <h2 className="absolute text-2xl mac:text-3xl text-bakerjonesholdings-black font-poppins font-bold bottom-[380px] mac:bottom-[500px] ">
              Life Insurance
            </h2>
            <Image
              src={"/home/hero/p1.png"}
              width={295}
              height={330}
              alt="Life Insurance"
              className="object-cover mac:hidden"
              priority
              loading="eager"
            />
            <Image
              src={"/home/hero/p1.png"}
              width={378}
              height={330}
              alt="Life Insurance"
              className="object-cover hidden mac:block"
              priority
              loading="eager"
            />
          </div>

          <div className="relative w-[360px] mac:w-1/4 h-[380px] mac:h-[559px] rounded-t-full  bg-bakerjonesholdings-blue flex shrink-0 flex-col justify-end items-center cursor-pointer duration-300 hover:border-x-4 hover:border-t-4 border-white">
            <h2 className="absolute text-2xl mac:text-3xl text-bakerjonesholdings-black font-poppins font-bold bottom-[300px] mac:bottom-[440px]">
              Mortgage
            </h2>
            <Image
              src={"/home/hero/p2.png"}
              width={192}
              height={200}
              alt="Mortgage"
              className="object-cover mac:hidden"
              priority
              loading="eager"
            />
            <Image
              src={"/home/hero/p2.png"}
              width={288}
              height={200}
              alt="Mortgage"
              className="object-cover hidden mac:block"
              priority
              loading="eager"
            />
          </div>

          <div className="relative w-[360px] mac:w-1/4 h-[541px] mac:h-[720px] rounded-t-full  bg-bakerjonesholdings-pink flex shrink-0 flex-col justify-end items-center cursor-pointer duration-300 hover:border-x-4 hover:border-t-4 border-white">
            <h2 className="absolute text-2xl mac:text-3xl text-bakerjonesholdings-black font-poppins font-bold bottom-[430px] mac:bottom-[550px]">
              Business Insurance
            </h2>
            <Image
              src={"/home/hero/p3.png"}
              width={225}
              height={330}
              alt="Business Insurance"
              className="object-cover mac:hidden"
              priority
              loading="eager"
            />
            <Image
              src={"/home/hero/p3.png"}
              width={288}
              height={330}
              alt="Business Insurance"
              className="object-cover hidden mac:block"
              priority
              loading="eager"
            />
          </div>

          <div className="relative w-[360px] mac:w-1/4 h-[450px] mac:h-[630px] rounded-t-full  bg-bakerjonesholdings-yellow flex shrink-0 flex-col justify-end items-center cursor-pointer duration-300 hover:border-x-4 hover:border-t-4 border-white">
            <h2 className="absolute text-2xl mac:text-3xl text-bakerjonesholdings-black font-poppins font-bold bottom-[370px] mac:bottom-[490px]">
              Personal Loans
            </h2>
            <Image
              src={"/home/hero/p4.png"}
              width={225}
              height={220}
              alt="Personal Loans"
              className="object-cover mac:hidden"
              priority
              loading="eager"
            />
            <Image
              src={"/home/hero/p4.png"}
              width={288}
              height={220}
              alt="Personal Loans"
              className="object-cover hidden mac:block"
              priority
              loading="eager"
            />
          </div>
        </div> */}
      </section>
      <section className="h-[50px] flex justify-center items-end">
        <Link href={"#section_services"} aria-label="Services" title="Services">
          {/* <Image  src={'/home/hero/down-arrow.svg'} width={40} height={40} alt="Baker Jones Holdings. Down Arrow" className="animate-bounce"/> */}
          <div className="w-[40px] h-[40px] rounded-full bg-bakerjonesholdings-pink animate-bounce flex justify-center items-center">
            <ArrowDown strokeWidth={2.25} className="text-white" />
          </div>
        </Link>
      </section>
    </>
  );
}
