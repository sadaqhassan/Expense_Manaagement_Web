import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const Appcontext = createContext();

export const AppcontextProvider = ({children})=>{


const [data,setData] = useState([])
const [users, setUsers] = useState([]);
const [dashboard,setDashboard] = useState([])
const [userData,setUserData] = useState(null);
const [currentUser,setCurrentUser] = useState(()=>{
    let user = localStorage.getItem("user")
    if(user){
        return JSON.parse(user)
    }else{
        return null
    }
})

useEffect(()=>{
    const fetchUser = async () => {
            if(userData){
            const res =  await fetch(`http://localhost:4000/api/user/get-user`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });
        const data  = await res.json();
        if(data.success){
            setCurrentUser(data.userData);
        }else{
            toast.error(data.message)
        }}
        }

    fetchUser();    
},[userData]);



useEffect(()=>{
    if(currentUser){
        localStorage.setItem("user",JSON.stringify(currentUser))
    }
},[currentUser]);

    useEffect(()=>{
        const now = new Date()

        const day = data.filter(d=>new Date(d.date).toDateString() === now.toDateString());

        //week
        let weekAgo = new Date()
        weekAgo.setDate(now.getDate()-7);
        
        const week = data.filter((d)=>{
            return new Date(d.date)  >= weekAgo ;
        });

        const month = data.filter((d)=>{
            return new Date(d.date).getMonth() === new Date().getMonth();
        });

        setDashboard([
        {Short : "Day" , total:"$ "+day.length ,data:day,color:"#008f7a"},
        {Short : "Week" , total:"$ "+week.length ,color:"#d65db1"},
        {Short : "month" , total:"$ "+month.length ,color:"#2c73d2"},
    ])
    },[data])

    

    const value = {
        dashboard,setDashboard,
        data,setData,
        currentUser,setCurrentUser
        ,users, setUsers,
        userData,setUserData
    }

    return <Appcontext.Provider value={value}>
        {children}
    </Appcontext.Provider>
}

export const useAppContext = () => useContext(Appcontext); 