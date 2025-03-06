import CompanyProfile from '@/components/company/Profile'
import Navbar from '@/components/navBar/Navbar'
import React from 'react'

export const page = () => {
  return (
    <div>
      <Navbar/>
      <CompanyProfile/>
    </div>
  )
}

