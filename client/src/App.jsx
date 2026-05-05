import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './Pages/Layout'
import Dashboard from './Pages/Dashboard'
import AddExpense from './Pages/AddExpense'
import Expenses from './Pages/Expenses'
import Auth from './Pages/Auth'
import {Toaster} from 'react-hot-toast'
import { useAppContext } from './Context/AppContext'

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
      </Routes>
    </div>
  )
}

export default App