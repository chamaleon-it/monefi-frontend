// import Footer from '@/layout/Footer'
import Header from '@/layout/Header'
import React from 'react'

export default function Layout({children}:{children:React.ReactNode}) {
  return (
    <>
      <Header />
            {children}
            {/* <Footer /> */}
    </>
  )
}
