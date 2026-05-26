"use client"

import { useAuth } from '@/auth/useAuth'
import usePaths from '@/hooks/usePaths'
import Link from 'next/link'
import React from 'react'

export default function LoginButton({isDashboard=false}:{isDashboard:boolean}) {
    const paths = usePaths()
    const {isAuthenticated,logout} = useAuth()

    if(isAuthenticated) {
        if (isDashboard) {
            return <button onClick={logout} className="py-1.5 px-3 lg:px-6 lg:py-3 rounded-full font-poppins text-bakerjonesholdings-off-white bg-bakerjonesholdings-black mac:text-lg">Logout</button>
        } else {
            return <Link href={paths.dashboard.root} className="py-1.5 px-3 lg:px-6 lg:py-3 rounded-full font-poppins bg-bakerjonesholdings-off-white text-bakerjonesholdings-black mac:text-lg">Dashboard</Link>
        }
    }

    return <Link
          href={ paths.auth.login}
          className="py-1.5 px-3 lg:px-6 lg:py-3 rounded-full font-poppins text-bakerjonesholdings-off-white bg-bakerjonesholdings-black mac:text-lg"
          >
          Login
        </Link>

 
}
