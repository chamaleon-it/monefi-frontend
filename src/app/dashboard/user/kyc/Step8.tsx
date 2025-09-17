import { Input } from '@/components/ui/input'
import React from 'react'

export default function Step8() {
  return (
   <>
    <h2 className="text-xl font-bold text-monefi-black col-span-full">
          Next Of Kin
        </h2>
         <div className="flex flex-col gap-0.5">
          <label htmlFor=""> Contact Name:</label>
          <Input placeholder=" Contact Name:" />
        </div>

         <div className="flex flex-col gap-0.5">
          <label htmlFor=""> Home Phone:</label>
          <Input placeholder=" Home Phone:" />
        </div>

         <div className="flex flex-col gap-0.5">
          <label htmlFor=""> Mobile Phone:</label>
          <Input placeholder=" Mobile Phone:" />
        </div>

         <div className="flex flex-col gap-0.5">
          <label htmlFor=""> Email address:</label>
          <Input placeholder=" Email address:" />
        </div>
   </>
  )
}
