import usePaths from '@/hooks/usePaths'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Header() {
  const paths = usePaths()
  return (
    <header className='bg-monefi-black  pb-7 pt-[74px] sticky -top-11 z-50'>
        <div className="max-w-[83%] mx-auto flex justify-between items-center">
          <Link href={paths.home} aria-label='Home Page' title='Monefi. Home Page'>
            <Image src={"/logo.png"} width={164} height={40} alt='Monefi logo' className='hidden lg:block'/>
            <Image src={"/logo.png"} width={134} height={40} alt='Monefi logo' className='lg:hidden'/>
          </Link>
            <ul className='hidden lg:flex gap-8 font-inter text-white mac:text-lg'>
                <li><Link href={paths.insurance}>Insurance</Link></li>
                <li><Link href={paths.loans}>Loans</Link></li>
                <li><Link href={paths.mortgages}>Mortgages</Link></li>
                <li><Link href={paths.utilities}>Utilities</Link></li>
                <li><Link href={paths.estatePlanning}>Estate Planning</Link></li>
            </ul>
            <Link href={paths.auth.login} className='px-6 py-3 rounded-full font-poppins bg-white text-monefi-black mac:text-lg'>Login</Link>
        </div>
    </header>
  )
}
