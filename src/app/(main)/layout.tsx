"use client"

import PublicFooter from '@/layout/PublicFooter'
import PublicHeader from '@/layout/PublicHeader'
import React from 'react'

export default function Layout({children}:{children:React.ReactNode}) {
  return (
    <div className="bg-corporate-white min-h-screen text-corporate-black selection:bg-corporate-gold selection:text-white">
      <PublicHeader />
      <main className="pt-24">{/* pt-24 to offset the fixed header on non-home pages if needed, though home will handle it its own way */}
        {children}
      </main>
      <PublicFooter />
    </div>
  )
}
