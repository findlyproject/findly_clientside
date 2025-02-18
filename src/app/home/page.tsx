import HomePage from '@/components/homePage/HomePage'
import React from 'react'
import Navbar from "@/components/navBar/Navbar";
import LandingPage from '@/components/common/landingPage/LandingPage';

function page() {
  return (
    <div>
      <Navbar/>
      <HomePage/>
      {/* <HomePage/> */}
    </div>
  )
}

export default page
