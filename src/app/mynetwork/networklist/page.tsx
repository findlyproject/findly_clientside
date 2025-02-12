import React from 'react'
import ConnectionsList from '@/components/common/network/ConnectionsList'
import Navbar from '@/components/navBar/Navbar'
export default function page() {
  return (
    <div>
        <Navbar/>
      <ConnectionsList/>
    </div>
  )
}
