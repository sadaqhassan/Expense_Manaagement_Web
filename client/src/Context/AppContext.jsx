import { createContext, useContext, useEffect, useState } from "react";

export const Appcontext = createContext();

export const AppcontextProvider = ({children})=>{


const [data,setData] = useState([])
const [dashboard,setDashboard] = useState([])


    useEffect(()=>{
        const now = new Date()

        const day = data.filter(d=>new Date(d.date).toDateString() === now.toDateString());

        //week
        let weekAgo = new Date()
        weekAgo.setDate(now.getDate() -7);
        
        const week = data.filter((d)=>{
            return new Date(d.date >= weekAgo);
        });

        const month = data.filter((d)=>{
            let monthAgo = now.getMonth();
            return new Date(d.data >= monthAgo);
        });

        setDashboard([
        {Short : "Day" , total:"$ "+day.length ,data:day,color:"#008f7a"},
        {Short : "Week" , total:"$ "+week.length ,color:"#d65db1"},
        {Short : "month" , total:"$ "+month.length ,color:"#2c73d2"},
    ])
    },[data])

    

    const value = {
        dashboard,setDashboard,
        data,setData
    }

    return <Appcontext.Provider value={value}>
        {children}
    </Appcontext.Provider>
}

export const useAppContext = () => useContext(Appcontext); 