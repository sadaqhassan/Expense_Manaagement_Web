import { createContext, useContext, useState } from "react";

export const Appcontext = createContext();

export const AppcontextProvider = ({children})=>{

    const [dashboard,setDashboard] = useState([
        {Short : "Day" , total:"" ,color:"#008f7a"},
        {Short : "Week" , total:"" ,color:"#d65db1"},
        {Short : "month" , total:"" ,color:"#2c73d2"},
        {Short : "Year" , total:"" ,color:"#845ec2"},
    ])

    const [data,setData] = useState([])


    const value = {
        dashboard,setDashboard,
        data,setData
    }

    return <Appcontext.Provider value={value}>
        {children}
    </Appcontext.Provider>
}

export const useAppContext = () => useContext(Appcontext); 