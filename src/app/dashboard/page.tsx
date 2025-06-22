import React from 'react'

export default function DashbaordPage() {
  return (
    <div className='space-y-10'>
        <section className='space-y-5'>
            <h1 className='font-poppins text-xl'>Get a quote</h1>
            <div className="grid grid-cols-6 gap-2.5">
                {[1,2,3,4,5,6].map(e=><div className='bg-[#D9D9D9] aspect-square rounded-lg' key={e}></div>)}
            </div>
        </section>
          <section className='space-y-5'>
            <h1 className='font-poppins text-xl'>Your products</h1>
            <div className="grid grid-cols-3 gap-2.5">
                {[1,2,3].map(e=><div className='bg-[#D9D9D9] aspect-square rounded-lg' key={e}></div>)}
            </div>
        </section>
         <section className='space-y-5'>
            <h1 className='font-poppins text-xl'>For you</h1>
            <div className="grid grid-cols-3 gap-2.5">
                {[1,2,3].map(e=><div className='bg-[#D9D9D9] aspect-square rounded-lg' key={e}></div>)}
            </div>
        </section>

        <section className='space-y-5'>
            <h1 className='font-poppins text-xl'>Widgets</h1>
            <div className="grid grid-cols-3 gap-2.5">
                {[1,2,3].map(e=><div className='bg-[#D9D9D9] aspect-square rounded-lg' key={e}></div>)}
            </div>
        </section>
    </div>
  )
}
