import React, { useState } from 'react'
import { BanknoteArrowDown, CalendarCheck2Icon, DollarSignIcon } from 'lucide-react'
import Table from '../Components/Table'
import { useAppContext } from '../Context/AppContext'

const Dashboard = () => {
    const { dashboard } = useAppContext()
  return (
    <div className='flex flex-col justify-between sticky '>
    <div className='grid grid-cols-2 md:grid-cols-4 gap-6 top-10'>
        {
            dashboard.map((data)=>(
                <div style={{backgroundColor:data.color}} className={`shadow-xl rounded text-white w-46 h-20`}>  
                <div className='flex justify-between px-2 py-2'>
                    <p className='text-sm '>Last {data.Short}</p>
                    <BanknoteArrowDown/>
                </div>
                <p className='text-center mb-3 font-medium'>{data.total}</p>
                </div>
            ))
        }
    </div>
    </div>
  )
}

export default Dashboard