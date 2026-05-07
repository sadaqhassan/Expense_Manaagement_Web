import { Home, Wallet, PlusCircle, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppContext } from "../Context/AppContext";

export default function Sidebar() {

  const {setCurrentUser} = useAppContext()

  const logout = async () => {
    const res = await fetch("http://localhost:4000/api/user/logout",{
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    });
    const result = await res.json();
    setCurrentUser(null);
    toast.success(result.message);
  }

  return (
    <div className="h-screen sticky top-0 w-64 bg-gray-900 text-white flex flex-col justify-between shadow-lg">
      
      {/* Logo */}
      <div>
        <div className="p-5 text-sm font-medium border-b border-gray-700">
          Expense_Management
        </div>

        {/* Menu */}
        <ul className="mt-6 space-y-2 px-3">
          
          <Link to={'/'} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 cursor-pointer">
            <Home size={20} />
            Dashboard
          </Link>

          <Link to={'expenses'} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 cursor-pointer">
            <Wallet size={20} />
            Expenses
          </Link>

          <Link to={'add-expense'} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 cursor-pointer">
            <PlusCircle size={20} />
            Add Expense
          </Link>

        </ul>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-gray-700">
        <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-red-600 transition" onClick={logout}>
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
}