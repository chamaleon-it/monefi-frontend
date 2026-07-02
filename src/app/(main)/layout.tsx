"use client"

import PublicFooter from '@/layout/PublicFooter'
import PublicHeader from '@/layout/PublicHeader'
import React from 'react'
import { usePathname } from 'next/navigation'

export default function Layout({children}:{children:React.ReactNode}) {
  const pathname = usePathname();
  const isHome2 = pathname === '/home-2';
  return (
    <div className="bg-corporate-white min-h-screen text-corporate-black selection:bg-corporate-gold selection:text-white">
      {!isHome2 && <PublicHeader />}
      <main className={!isHome2 ? "pt-24" : ""}>
        {children}
      </main>
      {!isHome2 && <PublicFooter />}
    </div>
  )
}
