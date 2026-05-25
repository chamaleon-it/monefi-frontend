import usePaths from '@/hooks/usePaths'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Mission() {

  const paths = usePaths()

  return (
    <section className='bg-[url(/home/off-white-bg.png)] bg-cover bg-no-repeat py-[50px]'>
        <div className="max-w-[95%] lg:max-w-[83%] mx-auto">
        <h2 className='font-poppins font-bold text-6xl lg:text-8xl text-bakerjonesholdings-black'>Mission</h2>
        <p className='font-inter text-xl lg:text-3xl mac:text-4xl text-bakerjonesholdings-black mt-8'>To empower smart financial choices for your secured future. </p>
        <div className="grid grid-cols-4 gap-4 lg:gap-8 mt-14">
            <div className="col-span-full lg:col-span-2 h-[270px] rounded-4xl relative overflow-hidden">
              <Image src={"/home/mission/m1.jpg"} width={776} height={270} alt='Baker Jones Holdings Mission photos' className='w-full h-full absolute object-cover inset-0 m-auto object-center'/>
              <div className="bg-gradient-to-t from-black to-transparent w-full h-3/4 absolute bottom-0 z-10"></div>
              <Link href={paths.aboutUs} className="absolute bottom-7 w-full px-5 flex justify-between items-center z-20">
                <h3 className='font-poppins font-semibold text-3xl text-white'>About us</h3>
                <Image src={'/home/mission/plus.png'} width={43} height={43} alt='Plus Sign' />
              </Link>
            </div>
            <div className="col-span-2 lg:col-span-1 h-[200px] lg:h-[260px] rounded-4xl relative overflow-hidden bg-bakerjonesholdings-black">
              <Image src={"/home/mission/m2.png"} width={228} height={228} alt='Baker Jones Holdings Mission photos' className='absolute object-cover inset-0 m-auto'/>
            </div>
            <div className="col-span-2 lg:col-span-1 h-[200px] lg:h-[260px] rounded-4xl relative overflow-hidden bg-bakerjonesholdings-black">
              <Image src={"/home/mission/m3.png"} width={258} height={222} alt='Baker Jones Holdings Mission photos' className='absolute object-cover inset-0 m-auto'/>
            </div>
            <div className="col-span-2 lg:col-span-1 h-[200px] lg:h-[260px] rounded-4xl relative overflow-hidden bg-bakerjonesholdings-black">
              <Image src={"/home/mission/m4.png"} width={265} height={156} alt='Baker Jones Holdings Mission photos' className='absolute object-cover inset-0 m-auto'/>
            </div>
            <div className="col-span-2 lg:col-span-1 h-[200px] lg:h-[260px] rounded-4xl relative overflow-hidden bg-bakerjonesholdings-black">
              <Image src={"/home/mission/m5.png"} width={269} height={236} alt='Baker Jones Holdings Mission photos' className='absolute object-cover inset-0 m-auto'/>
            </div>
            <div className="col-span-full lg:col-span-2 h-[270px] rounded-4xl relative overflow-hidden">
              <Image src={"/home/mission/m6.jpg"} width={776} height={270} alt='Baker Jones Holdings Mission photos' className='absolute object-cover inset-0 m-auto'/>
              <div className="bg-gradient-to-t from-black to-transparent w-full h-3/4 absolute bottom-0 z-10"></div>
              <div className="absolute bottom-7 w-full px-5 flex justify-between items-center z-20">
                <h3 className='font-poppins font-semibold text-3xl text-white'>Welcome to the smart side</h3>
              
              </div>
            </div>
        </div>
        </div>
        </section>
  )
}
