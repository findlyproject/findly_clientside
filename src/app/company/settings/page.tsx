import Navbar from '@/components/navBar/Navbar'
import SettingsPage from '@/components/user/settings/SettingsPage'
import React from 'react'

export default function page() {
  return (
    <div>
      <Navbar/>
      <SettingsPage/>
    </div>
  )
}
