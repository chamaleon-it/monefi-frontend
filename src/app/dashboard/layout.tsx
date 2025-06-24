"use client"

import { useAuth } from '@/auth/useAuth'
import { UserRoles } from '@/enum/user.enum'
import usePaths from '@/hooks/usePaths'
import Header from '@/layout/Header'
import { CircleUser, LayoutDashboard, Settings } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import React, { useEffect } from 'react'

export default function DashboardLayout({children}:{children:React.ReactNode}) {
  const {isAuthenticated,loading,user} = useAuth()
  const router = useRouter()
  const paths = usePaths()

  useEffect(() => {
    if(!isAuthenticated && !loading){
      router.replace(paths.home)
    }
  }, [isAuthenticated,loading])
  
  if(!isAuthenticated || loading) return null

  return (
   <>
   <Header/>
   <main className='min-h-[calc(100vh-150px)] max-w-[95%] lg:max-w-[83%] mx-auto'>
    <div className="flex flex-col lg:flex-row items-start gap-10 w-full">
    <aside className='max-w-[400px] w-full p-5 bg-monefi-off-pink rounded-4xl lg:sticky lg:top-[150px]'>
      <div className="flex gap-5 items-center">
      <div className="">
        <CircleUser width={40} height={40} />
      </div>
      <h2 className='capitalize font-poppins font-medium text-2xl'>Hi, {user?.email.split("@")[0]}</h2>
      </div>
      <div className="mt-8">
        <ul className='flex lg:flex-col gap-2.5'>
          <li className='flex flex-col lg:flex-row gap-5 items-center w-1/2 lg:w-auto'>
            <div className="">
              <LayoutDashboard width={30} height={30} />
            </div>
            <p className='font-poppins text-lg font-medium'>Dashboard</p>
          </li>
          <li >
            <Link href={user?.role === UserRoles.ADMIN ? paths.dashboard.admin.users : "#"} className='flex flex-col lg:flex-row gap-5 items-center w-1/2 lg:w-auto'>
              <CircleUser width={30} height={30} />
            <p className='font-poppins text-lg font-medium'>Profile</p>
            </Link>
          </li>
          <li className='flex flex-col lg:flex-row gap-5 items-center w-1/2 lg:w-auto'>
            <div className="">
              <Settings  width={30} height={30} />
            </div>
            <p className='font-poppins text-lg font-medium'>Settings</p>
          </li>
        </ul>
      </div>
    </aside>
    <div className="max-w-full lg:max-w-[calc(100%-400px-40px)] w-full py-2.5">
   {children}
    </div>
    
    </div>
   </main>
   </>
  )
}
