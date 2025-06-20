import usePaths from "@/hooks/usePaths";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Hero() {
  const paths = usePaths();
  return (
    <>
    <section className="bg-monefi-black text-white h-[calc(100vh-150px-50px)] pt-[70px] relative">
      <div className="max-w-[83%] mx-auto">
        <div className="flex justify-between flex-col lg:flex-row gap-20 lg:gap-0">
          <h1 className="font-poppins font-semibold text-[40px] mac:text-[60px] w-full lg:w-1/2">
            The <span className="text-monefi-pink">smar
              <span className="relative inline-block">
                t
                <img src="/home/hero/text-decoration.png" className="absolute rotate-[30deg] -top-0 -right-4 mac:-right-5 min-w-[40px] mac:min-w-[55px] block" alt="" />
                </span> choic
                <span className="relative inline-block">e
                                  <img src="/home/hero/text-decoration.png" className="absolute rotate-[160deg] bottom-1 mac:bottom-3 -right-3.5 min-w-[35px] block" alt="" />

                  </span></span> for{" "}
            <br className="hidden lg:block" /> your finances.
          </h1>
          <div className="w-full lg:w-1/2">
            <p className="text-2xl mac:text-3xl font-poppins">
              Empower your financial journey with{" "}
              <span className="font-bold">Expert</span> <br /> guidance and{" "}
              <span className="font-bold">Tailored</span> solutions.
            </p>
            <Link
              href={paths.auth.register}
              className="mt-7 px-6 py-4 rounded-full border font-poppins hover:scale-110 duration-400 hover:bg-monefi-pink hover:text-monefi-black mac:text-lg inline-block"
              >
              Join Today
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-[81%] mx-auto absolute bottom-0 inset-x-0 hidden lg:flex items-end justify-center">
        <div className="relative w-[360px] mac:w-1/4 h-[463px] mac:h-[643px] rounded-t-full  bg-monefi-off-white flex shrink-0 flex-col justify-end items-center cursor-pointer duration-300 hover:border-x-4 hover:border-t-4 border-white">
          <h2 className="absolute text-2xl mac:text-3xl text-monefi-black font-poppins font-bold bottom-[380px] mac:bottom-[500px] ">
            Life Insurance
          </h2>
          <Image
            src={"/home/hero/p1.png"}
            width={295}
            height={330}
            alt="Life Insurance"
            className="object-cover mac:hidden"
            />
          <Image
            src={"/home/hero/p1.png"}
            width={378}
            height={330}
            alt="Life Insurance"
            className="object-cover hidden mac:block"
          />
        </div>

        <div className="relative w-[360px] mac:w-1/4 h-[380px] mac:h-[559px] rounded-t-full  bg-monefi-blue flex shrink-0 flex-col justify-end items-center cursor-pointer duration-300 hover:border-x-4 hover:border-t-4 border-white">
          <h2 className="absolute text-2xl mac:text-3xl text-monefi-black font-poppins font-bold bottom-[300px] mac:bottom-[440px]">
            Mortgage
          </h2>
          <Image
            src={"/home/hero/p2.png"}
            width={192}
            height={200}
            alt="Mortgage"
            className="object-cover mac:hidden"
            />
          <Image
            src={"/home/hero/p2.png"}
            width={288}
            height={200}
            alt="Mortgage"
            className="object-cover hidden mac:block"
            />
        </div>

        <div className="relative w-[360px] mac:w-1/4 h-[541px] mac:h-[720px] rounded-t-full  bg-monefi-pink flex shrink-0 flex-col justify-end items-center cursor-pointer duration-300 hover:border-x-4 hover:border-t-4 border-white">
          <h2 className="absolute text-2xl mac:text-3xl text-monefi-black font-poppins font-bold bottom-[430px] mac:bottom-[550px]">
            Business Insurance
          </h2>
          <Image
            src={"/home/hero/p3.png"}
            width={225}
            height={330}
            alt="Business Insurance"
            className="object-cover mac:hidden"
            />
          <Image
            src={"/home/hero/p3.png"}
            width={288}
            height={330}
            alt="Business Insurance"
            className="object-cover hidden mac:block"
            />
        </div>

        <div className="relative w-[360px] mac:w-1/4 h-[450px] mac:h-[630px] rounded-t-full  bg-monefi-yellow flex shrink-0 flex-col justify-end items-center cursor-pointer duration-300 hover:border-x-4 hover:border-t-4 border-white">
          <h2 className="absolute text-2xl mac:text-3xl text-monefi-black font-poppins font-bold bottom-[370px] mac:bottom-[490px]">
            Personal Loans
          </h2>
          <Image
            src={"/home/hero/p4.png"}
            width={225}
            height={220}
            alt="Personal Loans"
            className="object-cover mac:hidden"
            />
          <Image
            src={"/home/hero/p4.png"}
            width={288}
            height={220}
            alt="Personal Loans"
            className="object-cover hidden mac:block"
            />
        </div>
      </div>
    </section>
    <section className="h-[50px] flex justify-center items-end">
        <Link href={'#section_services'} className="">
        {/* <Image  src={'/home/hero/down-arrow.svg'} width={40} height={40} alt="Monefi. Down Arrow" className="animate-bounce"/> */}
        <div className="w-[40px] h-[40px] rounded-full bg-monefi-pink animate-bounce flex justify-center items-center">
            <ArrowDown strokeWidth={2.25} className="text-white"/>
        </div>
        </Link>
    </section>
            </>
  );
}
