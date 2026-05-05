import React, { useEffect, useState } from 'react'
import { BanknoteArrowDown, CalendarCheck2Icon, DollarSignIcon } from 'lucide-react'
import Table from '../Components/Table'
import { useAppContext } from '../Context/AppContext'
import ResentExpense from '../Components/ResentExpense'

const Dashboard = () => {
    const [Resent,setResent] = useState([])
    const { dashboard ,data} = useAppContext()

    useEffect(()=>{
    const now = new Date()
    const day = data.filter((d)=>new Date(d.date).toDateString() === now.toDateString());
    setResent(day)
    },[dashboard])

    
  return (
    <div className='flex flex-col  space-y-40'>
    <div className='grid grid-cols-2 md:grid-cols-4 gap-6 top-10 sticky bg-white'>
        {
            dashboard.length > 0 && dashboard.map((data)=>(
                <div style={{backgroundColor:data.color}} className={`shadow-xl rounded text-white w-56 h-20`}>  
                <div className='flex justify-between px-2 py-2'>
                    <p className='text-sm '>Last {data.Short}</p>
                    <BanknoteArrowDown/>
                </div>
                <p className='text-center mb-3 font-medium'>{data.total ? data.total : "0"}</p>
                </div>
            ))
        }
    </div>

    {/* <ResentExpense dashboard={Resent}/> */}
    </div>
  )
}

export default Dashboard