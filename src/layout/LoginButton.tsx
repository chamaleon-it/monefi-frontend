"use client"

import { useAuth } from '@/auth/useAuth'
import usePaths from '@/hooks/usePaths'
import Link from 'next/link'
import React from 'react'

export default function LoginButton({isDashboard=false}:{isDashboard:boolean}) {
    const paths = usePaths()
    const {isAuthenticated,logout} = useAuth()

    if(isAuthenticated) return <button onClick={logout} className={`px-6 py-3 rounded-full font-poppins  mac:text-lg ${isDashboard ?  "text-monefi-off-white bg-monefi-black" : "bg-monefi-off-white text-monefi-black"}`}>Logout</button>

    return <Link
          href={ paths.auth.login}
          className="px-6 py-3 rounded-full font-poppins bg-monefi-off-white text-monefi-black mac:text-lg"
          >
          Login
        </Link>

 
}
