"use client"

import { useAuth } from '@/auth/useAuth'
import usePaths from '@/hooks/usePaths'
import { useRouter } from 'next/navigation'

import React, { useEffect } from 'react'

export default function AuthLayout({children}:{children:React.ReactNode}) {
  const {isAuthenticated,loading} = useAuth()
  const router = useRouter()
  const paths = usePaths()

  useEffect(() => {
    if(isAuthenticated && !loading){
      router.replace(paths.dashboard.root)
    }
  }, [isAuthenticated,loading])
  
  if(isAuthenticated || loading) return null

  return (
   <>
   {children}
   </>
  )
}
