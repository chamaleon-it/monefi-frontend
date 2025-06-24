"use client"

import { useAuth } from '@/auth/useAuth'
import { UserRoles } from '@/enum/user.enum'
import React from 'react'

export default function Layout({children}:{children:React.ReactNode}) {

    const {user} = useAuth()

    if(user?.role !== UserRoles.ADMIN) return <p>Unauthorized page</p>

    return <>{children}</>
}
