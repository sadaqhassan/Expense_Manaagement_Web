import React from 'react'
import Sidebar from '../Components/SideBar'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAppContext } from '../Context/AppContext';

const Layout = () => {

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
    <div className='flex space-x-5'>
        <Sidebar/>
        <div className='mt-10'>
            <Outlet/>
        </div>
    </div>
  )
}

export default Layout