import { Input } from '@/components/ui/input'
import React from 'react'

export default function Step2() {
  return (
    <>
     <h2 className="text-xl font-bold text-monefi-black col-span-full">
          Residential address information
        </h2>

        <div className="flex flex-col gap-0.5">
          <label htmlFor="">Country</label>
          <Input placeholder="Country" />
        </div>

        <div className="flex flex-col gap-0.5">
          <label htmlFor=""> House number or name:</label>
          <Input placeholder=" House number or name:" />
        </div>

        <div className="flex flex-col gap-0.5">
          <label htmlFor=""> Street Name</label>
          <Input placeholder=" Street Name" />
        </div>

        <div className="flex flex-col gap-0.5">
          <label htmlFor=""> Town</label>
          <Input placeholder=" Town" />
        </div>

        <div className="flex flex-col gap-0.5">
          <label htmlFor=""> County/Region</label>
          <Input placeholder=" County/Region" />
        </div>

        <div className="flex flex-col gap-0.5">
          <label htmlFor=""> Postcode</label>
          <Input placeholder=" Postcode" />
        </div>
    </>
  )
}
