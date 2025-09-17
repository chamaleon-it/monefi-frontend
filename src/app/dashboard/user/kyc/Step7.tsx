import React from 'react'

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function Step7() {
  return (
    <>
    <h2 className="text-xl font-bold text-monefi-black col-span-full">
          Purpose of Account
        </h2>

        <div className="flex flex-col gap-0.5">
          <label htmlFor="type">Purpose of Account</label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Purpose of Account" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="bg-white">
                <SelectLabel>Purpose of Account</SelectLabel>
                <SelectItem value="Savings">Savings</SelectItem>
                <SelectItem value="Growth">Growth</SelectItem>
                <SelectItem value="Income">Income</SelectItem>
                <SelectItem value="Retirement">Retirement</SelectItem>
                <SelectItem value="Business account">Business account</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
    </>
  )
}
