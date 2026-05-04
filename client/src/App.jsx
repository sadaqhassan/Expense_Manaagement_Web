import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './Pages/Layout'
import Dashboard from './Pages/Dashboard'
import AddExpense from './Pages/AddExpense'
import Expenses from './Pages/Expenses'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Layout/>}>
        <Route index element={<Dashboard/>}/>
        <Route path='add-expense' element={<AddExpense/>}/>
        <Route path='expenses' element={<Expenses/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App