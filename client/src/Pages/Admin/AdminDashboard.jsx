import { useEffect } from "react";
import { useAppContext } from "../../Context/AppContext";
import { useState } from "react";

export default function AdminDashboard() {

    const {users} = useAppContext()

    const [AllExpenses,setAllExpenses] = useState([]);
    
        const fetchAllExpenses = async()=>{
            try {
              const res = await fetch("http://localhost:4000/api/expenses/get-all-expenses", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });
            const data = await res.json();
            if (data.success) {
                setAllExpenses(data.AllExpenses);
            } else {
                toast.error(data.message);
                if(data.message === "Internal Server Errorjwt expired"){
                    setCurrentUser(null);
                }
            }
            } catch (error) {
              console.log(error);
            }
        }
    
        useEffect(()=>{
            fetchAllExpenses()
        },[])
    

  const stats = [
    {
      title: 'Total Users',
      value: users && users.length.toLocaleString(),
      growth: '+12%',
    },
    {
      title: 'Expenses',
      value: AllExpenses && AllExpenses.length,
      growth: '-4%',
    },
    {
      title: 'Active Users',
      value: '893',
      growth: '+9%',
    },
  ];

  const user = [
    {
      name: 'Ahmed Ali',
      email: 'ahmed@gmail.com',
      role: 'Admin',
      status: 'Active',
    },
    {
      name: 'Hodan Omar',
      email: 'hodan@gmail.com',
      role: 'User',
      status: 'Blocked',
    },
    {
      name: 'Mohamed Yusuf',
      email: 'mohamed@gmail.com',
      role: 'User',
      status: 'Active',
    },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              Welcome Back 👋
            </h2>
            <p className="text-gray-500 mt-1">
              Here is your admin dashboard overview.
            </p>
          </div>

          <input
            type="text"
            placeholder="Search..."
            className="w-full md:w-80 px-4 py-3 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-8">
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-md transition"
            >
              <p className="text-gray-500 text-sm">{item.title}</p>
              <h3 className="text-3xl font-bold mt-2 text-gray-800">
                {item.value}
              </h3>
              <span className="inline-block mt-3 text-sm px-3 py-1 rounded-full bg-green-100 text-green-600">
                {item.growth}
              </span>
            </div>
          ))}
        </div>

        
        {/* Users Table */}
        <div className="bg-white rounded-3xl shadow-sm p-6 overflow-x-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-800">
              Recent Users
            </h3>

            <button className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm hover:opacity-90">
              View All
            </button>
          </div>

          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b text-left text-gray-500 text-sm">
                <th className="pb-4">Name</th>
                <th className="pb-4">Email</th>
                <th className="pb-4">Role</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {user.map((user, index) => (
                <tr
                  key={index}
                  className="border-b last:border-none hover:bg-gray-50 transition"
                >
                  <td className="py-4 font-medium text-gray-800">
                    {user.name}
                  </td>

                  <td className="py-4 text-gray-500">{user.email}</td>

                  <td className="py-4">
                    <span className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-600">
                      {user.role}
                    </span>
                  </td>

                  <td className="py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        user.status === 'Active'
                          ? 'bg-green-100 text-green-600'
                          : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>

                  <td className="py-4">
                    <button className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition text-sm">
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
