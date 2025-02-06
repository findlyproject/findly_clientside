import HomePage from '@/components/homePage/HomePage'
import React from 'react'
import Navbar from "@/components/navBar/Navbar";

function page() {
  return (
    <div className='bg-slate-500'>
      <Navbar/>
      <HomePage/>
    </div>
  )
}

export default page
