import MyPosts from '@/components/company/MyPosts'
import {Posts} from '@/components/homePage/Posts'
import Navbar from '@/components/navBar/Navbar'
import React from 'react'
export default function page() {
  return (
    <div>
      <Navbar/>  
      <Posts/>

    </div>
  )
}
