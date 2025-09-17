import React from 'react'

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function Step6() {
  return (
    <>
    <h2 className="text-xl font-bold text-monefi-black col-span-full">
          Proof of Address
        </h2>

        <div className="flex flex-col gap-0.5">
          <label htmlFor="type">Proof of Address</label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Proof of Address" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="bg-white">
                <SelectLabel>Proof of Address</SelectLabel>
                <SelectItem value="Utility Bill">Utility Bill</SelectItem>
                <SelectItem value="Driving Licence">Driving Licence</SelectItem>
                <SelectItem value="Email Proof of Address">
                  Email Proof of Address
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
    </>
  )
}
