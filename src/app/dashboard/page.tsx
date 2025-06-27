"use client"

import { useAuth } from '@/auth/useAuth'
import { UserRoles } from '@/enum/user.enum'
import AdminDashboard from '@/sections/dashboard/App/admin'
import UserDashboard from '@/sections/dashboard/App/user'
import React from 'react'

export default function DashbaordPage() {
    const {user}  = useAuth()
  return (
 <>
 {user?.role === UserRoles.ADMIN && <AdminDashboard/>}
 {user?.role === UserRoles.USER && <UserDashboard/>}
 </>
  )
}
