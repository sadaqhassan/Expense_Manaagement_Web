import React, { useEffect } from 'react'
import Sidebar from '../../Components/SideBar'
import AdminSidebar from '../../Components/AdminSidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAppContext } from '../../Context/AppContext'

const AdminLayout = () => {
    const navigate = useNavigate();
    const {currentUser} = useAppContext();
      useEffect(()=>{
        if(currentUser.role === 'admin'){
          navigate('/admin')
        }else{
          navigate('/')
        }
      }, [currentUser])


  return (
    <div className='flex'>
        <AdminSidebar/>
        <div className='mt-10'>
            <Outlet/>
        </div>
    </div>
  )
}

export default AdminLayout