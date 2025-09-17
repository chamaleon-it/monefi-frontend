import { Input } from '@/components/ui/input'
import React from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function Step3() {
  return (
    <>
    <h2 className="text-xl font-bold text-monefi-black col-span-full">
          Personal Information (Joint)
        </h2>

        <div className="flex flex-col gap-0.5">
          <label htmlFor="type">Title</label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Title" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="bg-white">
                <SelectLabel>Title</SelectLabel>
                <SelectItem value="Mr">Mr</SelectItem>
                <SelectItem value="Mrs">Mrs</SelectItem>
                <SelectItem value="Miss">Miss</SelectItem>
                <SelectItem value="Ms">Ms</SelectItem>
                <SelectItem value="Dr">Dr</SelectItem>
                <SelectItem value="Prof">Prof</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-0.5">
          <label htmlFor="">First Name</label>
          <Input placeholder="First Name" />
        </div>

        <div className="flex flex-col gap-0.5">
          <label htmlFor="">Last Name</label>
          <Input placeholder="Last Name" />
        </div>

        <div className="flex flex-col gap-0.5">
          <label htmlFor="">Date Of Birth</label>
          <Input type="date" placeholder="Date Of  Birth" />
        </div>

        <div className="flex flex-col gap-0.5">
          <label htmlFor="">Occupation</label>
          <Input placeholder="Occupation" />
        </div>

        <div className="flex flex-col gap-0.5">
          <label htmlFor="">Occupation Category</label>
          <Input placeholder="Occupation Category" />
        </div>

        <div className="flex flex-col gap-0.5">
          <label htmlFor="">Home Phone</label>
          <Input placeholder="Home Phone" />
        </div>

        <div className="flex flex-col gap-0.5">
          <label htmlFor="">Mobile Phone</label>
          <Input placeholder="Mobile Phone" />
        </div>
    </>
  )
}
