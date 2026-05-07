import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const Appcontext = createContext();

export const AppcontextProvider = ({children})=>{


const [users, setUsers] = useState([]);
const [dashboard,setDashboard] = useState([])
const [userData,setUserData] = useState(null);
const [expenseData, setExpenseData] = useState([]);


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



  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/user/get-users", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        setUsers(data.users);
      } else {
        toast.error(data.message);
        if(data.message === "Internal Server Errorjwt expired"){
          setCurrentUser(null);
        }
      }
    } catch (error) {
      toast.error("Server error");
    }
  };


  useEffect(() => {
    fetchUsers();
  }, []);


const fetchExpenses = async()=>{
    try {
      const res = await fetch("http://localhost:4000/api/expenses/get-expenses",{
        method: "GET",
        headers: {
        "Content-Type": "application/json"
        },
        credentials: "include"
      });
    const result = await res.json();
      setExpenseData(result.ExpensesData);
    } catch (error) {
      console.log(error);
    }
  }

  
useEffect(()=>{
    fetchExpenses()
},[])


useEffect(()=>{
    if(currentUser){
        localStorage.setItem("user",JSON.stringify(currentUser))
    }else{
        localStorage.removeItem("user")
    }
},[currentUser]);

    useEffect(()=>{
        const now = new Date()

        const day = expenseData && expenseData.filter(d=>new Date(d.date).toDateString() === now.toDateString());

        //week
        let weekAgo = new Date()
        weekAgo.setDate(now.getDate()-7);
        
        const week = expenseData && expenseData .filter((d)=>{
            return new Date(d.date)  >= weekAgo ;
        });

        const month = expenseData && expenseData.filter((d)=>{
            return new Date(d.date).getMonth() === new Date().getMonth();
        });

        setDashboard([
        {Short : "Day" , total:"$ "+day ? day.length : 0,data:day,color:"#008f7a"},
        {Short : "Week" , total:"$ "+week ? week.length : 0 ,color:"#d65db1"},
        {Short : "month" , total:"$ "+month ? month.length : 0,color:"#2c73d2"},
    ])
    },[expenseData])

   
    const value = {
        dashboard,setDashboard,
        currentUser,setCurrentUser
        ,users, setUsers,
        userData,setUserData,
        expenseData, setExpenseData,
        fetchUsers,fetchExpenses,
        
    }

    return <Appcontext.Provider value={value}>
        {children}
    </Appcontext.Provider>
}

export const useAppContext = () => useContext(Appcontext); 