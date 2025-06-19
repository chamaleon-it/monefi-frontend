import Image from 'next/image'
import React from 'react'

export default function OurPromise() {
  return (
    <section>
        <div className="max-w-[83%] mx-auto grid grid-cols-2 py-[50px]">
                <div className="py-[100px] px-[50px]">
                     <p className='text-monefi-green font-poppins font-semibold'>OUR PROMISE</p>
                     <h2 className='font-poppins  text-6xl mt-[100px] font-medium'>We’re planting a tree with <span className='font-bold'>every mortgage<span className='text-monefi-pink'>.</span></span></h2>
                     <p className='font-poppins font-medium text-2xl mt-[40px]'>in partnership with:</p>
                    <Image src={'/home/more-tree.png'} width={250} height={250} alt='More tree logo - Monefi Our Promise'  />
                     </div>
                <div className="">
                    <Image src={'/home/our-promise.jpg'} width={620} height={1000} alt='Monefi Our Promise' className='rounded-tr-[96px]' priority/>
                </div>
        </div>
    </section>
  )
}
