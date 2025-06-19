import usePaths from '@/hooks/usePaths'
import Link from 'next/link'
import React from 'react'

export default function ServiceWeOffers() {

    const paths = usePaths()
  return (
    <section className='bg-white'>
        <div className="max-w-[83%] mx-auto mb-24">
            <div className="text-center mt-24">
            <p className='text-monefi-green font-poppins font-bold uppercase mac:text-lg'>Our Services</p>
            <h2 className='font-poppins font-bold text-6xl mac:text-8xl'>Service we offer</h2>
            </div>
            <div className="grid grid-cols-4 gap-8 max-w-[1360px] mac:max-w-full mx-auto mt-16">
               <Card bg='pink' title='Life Insurance' href={paths.insurance}/>
               <Card bg='black' title='Mortgages' href={paths.mortgages}/>
               <Card bg='black' title='Personal Loans' href={paths.loans}/>
               <Card bg='black' title='Car Insurace' href={paths.insurance}/>
               <Card bg='black' title='Business Insurance' href={paths.insurance}/>
               <Card bg='black' title='Secured Loans' href={paths.loans}/>
               <Card bg='black' title='Business Loans' href={paths.loans}/>
               <Card bg='black' title='Home Insurance' href={paths.insurance}/>
            </div>
        </div>
        </section>
  )
}


const Card = ({bg="black",title,href}:{bg:string,title:string,href:string}) =>{
    return (
        <div className={`aspect-[79/67] bg-monefi-${bg} rounded-4xl relative`}>
            <div className="absolute bottom-5 left-5 text-white space-y-5">
                <p className='font-poppins font-bold text-2xl mac:text-4xl'>{title}</p>
                <Link href={href} className='px-4 py-2 rounded-full border border-white text-xs mac:text-lg bg-black/20'>Learn more</Link>
            </div>
            <div className="absolute h-full w-full bg-[url(/home/bg-waves.png)] bg-cover bg-center"></div>
        </div>
    )
}