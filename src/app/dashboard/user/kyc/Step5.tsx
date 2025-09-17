import React from 'react'

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function Step5() {
  return (
    <>
     <h2 className="text-xl font-bold text-monefi-black col-span-full">
          Identity Verification
        </h2>

        <div className="flex flex-col gap-0.5">
          <label htmlFor="type">Identity Verification</label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Identity Verification" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="bg-white">
                <SelectLabel>Identity Verification</SelectLabel>
                <SelectItem value="International travel document">
                  International travel document
                </SelectItem>
                <SelectItem value="Driving Licence">Driving Licence</SelectItem>
                <SelectItem value="Email Identification">
                  Email Identification
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
    </>
  )
}
