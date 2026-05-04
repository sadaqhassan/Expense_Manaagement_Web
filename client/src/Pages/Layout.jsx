import React from 'react'
import Sidebar from '../Components/SideBar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='flex space-x-5'>
        <Sidebar/>
        <div className='mt-10'>
            <Outlet/>
        </div>
    </div>
  )
}

export default Layout