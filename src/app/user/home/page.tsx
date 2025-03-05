import HomePage from '@/components/homePage/HomePage'
import Navbar from '@/components/navBar/Navbar'
import React from 'react'

const page = () => {
  return (
    <div>
      <div className='sticky top-0 left-0 right-0'><Navbar /></div>
       
       <HomePage/>
    </div>
  )
}

export default page
