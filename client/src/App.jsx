import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './Pages/Layout'
import Dashboard from './Pages/Dashboard'
import AddExpense from './Pages/AddExpense'
import Expenses from './Pages/Expenses'
import Auth from './Pages/Auth'
import {Toaster} from 'react-hot-toast'
import { useAppContext } from './Context/AppContext'
import AdminDashboard from './Pages/Admin/AdminDashboard'
import AdminLayout from './Pages/Admin/AdminLayout'
import ManageUsers from './Pages/Admin/ManageUsers'

const App = () => {
  const {currentUser} = useAppContext();
  return (
    <div>
      <Toaster/>
      <Routes>
        <Route path='/' element={currentUser != null ? <Layout/> : <Auth/>}>
        <Route index element={<Dashboard/>}/>
        <Route path='add-expense' element={<AddExpense/>}/>
        <Route path='expenses' element={<Expenses/>}/>
        </Route>

        {/* //admin#routees */}
        <Route path='/admin' element={currentUser &&
          currentUser.role === 'admin' ? <AdminLayout/> : <Auth/>}>
        <Route index element={<AdminDashboard/>}/>
        <Route path='manage-users' element={<ManageUsers/>}/>
        <Route path='add-user' element={<AddUser/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App