import Image from 'next/image'
import React from 'react'

interface PropsType{
    stage: number;
}

export default function Left({stage}: PropsType) {
  return (
    <div className='flex flex-col justify-between w-full lg:w-[350px] bg-monefi-pink h-[40vh] lg:h-screen px-2.5 py-10 lg:sticky lg:top-0'>
        <div className="">
            <Image src={"/logo-2.png"} width={200} height={100} alt='Monefi. Logo' className='mx-auto'/>
        </div>
        <div className="text-center lg:text-left px-5 lg:px-0">
            {stage === 1 && <h1 className='text-3xl lg:text-4xl font-semibold text-monefi-black'>Apply for an Online Account in minutes</h1>}
        {stage === 2 && <h1 className='text-3xl lg:text-4xl font-semibold text-monefi-black'>Account Type</h1>}
        {stage === 3 && <h1 className='text-3xl lg:text-4xl font-semibold text-monefi-black'>Personal Information</h1>}
        </div>
            <p className='text-xs text-center text-monefi-black'>&copy; {new Date().getFullYear()} Monefi. All Rights Reserved.</p>
    </div>
  )
}
