import React from 'react'
import Investment from './Investment'

export default function InvestmentsPage() {
  return (
    <div className="">
         <div className="mb-8">
                <h1 className="text-3xl font-bold text-[#232323] mb-2">
                  Investment
                </h1>
                <p className="text-bakerjonesholdings-black">Add new investment details to your platform</p>
              </div>
              <div className="space-y-8">
                <Investment />
              </div>
    </div>
  )
}
