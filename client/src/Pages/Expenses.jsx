import React from 'react'
import Table from '../Components/Table'

const Expenses = () => {
  return (
    <div>
        <h1 className='text-xl text-gray-900 font-medium'>Expense Management </h1>
        <p className='text-sm text-gray-600 mt-1'>Feel Free to Manage Your expense Add , update , and delete</p>

        <div className='mt-6'>
            <Table/>
        </div>
    </div>
  )
}

export default Expenses