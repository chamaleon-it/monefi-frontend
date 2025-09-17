import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import React from 'react'

export default function Step1() {
  return (
    <>
      <div className="flex flex-col gap-0.5">
          <label htmlFor="email">Email</label>
          <Input placeholder="Email Addrees" />
        </div>
        <div className="flex flex-col gap-0.5">
          <label htmlFor="type">Account Type</label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Account Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="bg-white">
                <SelectLabel>Account Type</SelectLabel>
                <SelectItem value="Individual">Individual</SelectItem>
                <SelectItem value="Joint">Joint</SelectItem>
                <SelectItem value="Company">Company</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <h2 className="text-xl font-bold text-monefi-black col-span-full">
          Personal Information
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
