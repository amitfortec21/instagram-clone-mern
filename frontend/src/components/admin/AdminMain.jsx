import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './partials/Header'
import Sidebar from './partials/Sidebar'
import SettingsPanel from './partials/SettingsPanel'
import Footer from './partials/Footer'

export default function AdminMain() {
  return (
    <>
    <div className='container-scroller start'>
      <Header />
      <div className='container-fluid page-body-wrapper'>
        <Sidebar />
        <SettingsPanel />
        <Outlet />
      </div>
    </div>
    <Footer />
    </>
  )
}
