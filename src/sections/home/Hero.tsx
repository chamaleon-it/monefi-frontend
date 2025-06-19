import usePaths from '@/hooks/usePaths'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Hero() {
    const paths = usePaths()
  return (
    <section className='bg-monefi-black text-white h-[calc(100vh-150px)] pt-[70px] relative'>
        <div className="max-w-[83%] mx-auto">
            <div className="flex justify-between">
                <h1 className='font-poppins font-semibold text-[40px] mac:text-[60px] w-1/2'>The <span className='text-monefi-pink'>smart choice</span> for <br /> your finances.</h1>
                <div className="w-1/2">
                    <p className='text-2xl mac:text-3xl font-poppins'>Empower your financial journey with <span className='font-bold'>Expert</span> <br /> guidance and <span className='font-bold'>Tailored</span> solutions.</p>
                    <Link href={paths.auth.register} className='mt-7 px-6 py-4 rounded-full border font-poppins hover:scale-110 duration-400 hover:bg-monefi-pink hover:text-monefi-black mac:text-lg inline-block'>Join Today</Link>
                </div>
            </div>
        </div>
        <div className="max-w-[90%] mx-auto absolute bottom-0 inset-x-0 flex items-end justify-center">
            <div className="w-[360px] mac:w-1/4 h-[515px] mac:h-[715px] rounded-t-[250px]  bg-monefi-off-white flex flex-col justify-between items-center">
                <h2 className='text-2xl mac:text-3xl text-monefi-black font-poppins font-bold mt-9 mac:mt-16'>Life Insurance</h2>
                <Image src={'/home/hero/p1.png'} width={328} height={330} alt='Life Insurance' className='object-cover mac:hidden'/>
                <Image src={'/home/hero/p1.png'} width={420} height={330} alt='Life Insurance' className='object-cover hidden mac:block'/>
            </div>
            <div className="w-[360px] mac:w-1/4 h-[422px] mac:h-[622px] rounded-t-[250px]  bg-monefi-blue flex flex-col justify-between items-center">
                <h2 className='text-2xl mac:text-3xl text-monefi-black font-poppins font-bold mt-14'>Mortgage</h2>
                <Image src={'/home/hero/p2.png'} width={220} height={200} alt='Mortgage' className='object-cover mac:hidden'/>
                 <Image src={'/home/hero/p2.png'} width={320} height={200} alt='Mortgage' className='object-cover hidden mac:block'/>
            </div>
            <div className="w-[360px] mac:w-1/4 h-[602px] mac:h-[802px] rounded-t-[250px]  bg-monefi-pink flex flex-col justify-between items-center">
                <h2 className='text-2xl mac:text-3xl text-monefi-black font-poppins font-bold mt-30'>Business Insurance</h2>
                <Image src={'/home/hero/p3.png'} width={250} height={330} alt='Business Insurance' className='object-cover mac:hidden'/>
                <Image src={'/home/hero/p3.png'} width={320} height={330} alt='Business Insurance' className='object-cover hidden mac:block'/>
            </div>
            <div className="w-[360px] mac:w-1/4 h-[501px] mac:h-[701px] rounded-t-[250px]  bg-monefi-yellow flex flex-col justify-between items-center">
                <h2 className='text-2xl mac:text-3xl text-monefi-black font-poppins font-bold mt-16'>Personal Loans</h2>
                <Image src={'/home/hero/p4.png'} width={250} height={220} alt='Personal Loans' className='object-cover mac:hidden'/>
                  <Image src={'/home/hero/p4.png'} width={320} height={220} alt='Personal Loans' className='object-cover hidden mac:block'/>
            </div>
        </div>
    </section>
  )
}
