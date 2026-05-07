import React, { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useAppContext } from "../../Context/AppContext";

const ManageUsers = () => {
const {users,setUsers} =  useAppContext()

  const [search, setSearch] = useState("");
  const {currentUser, setCurrentUser,fetchUsers} = useAppContext();


  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );


  //delete user
  const deleteUser = async (userId) => {
    try {
      const res = await fetch(`http://localhost:4000/api/user/delete-user/${userId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        toast.success(data.message);
        if(currentUser._id === userId){
          setCurrentUser(null);
          window.location.href = "/auth"; // Redirect to home page after logout
        }
        fetchUsers(); // Refresh the user list
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Server error");
    }
  };

  return (
    <div className="p-4 md:p-8 md:w-[800px] min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-4 md:p-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">
            Manage Users
          </h2>

          <input
            type="text"
            placeholder="Search users..."
            className="w-full md:w-72 border px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-500 text-sm border-b">
                <th className="p-3">User</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-3 font-medium">{user.name}</td>

                  <td className="p-3 text-gray-500">{user.email}</td>

                  <td className="p-3">
                    <span className={`px-3 py-1 text-xs rounded-full ${
                        user.role === "user"
                          ? "bg-gray-100 text-green-600"
                          : "bg-green-100 text-gray-600"
                      }`}>
                      {user.role}
                    </span>
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-3 py-1 text-xs rounded-full ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {user.status || "Active"}
                    </span>
                  </td>

                  <td className="p-3 flex justify-center gap-3">
                    <button className="p-2 rounded-lg hover:bg-blue-100 text-blue-600">
                      <Pencil size={18} />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-red-100 text-red-600" onClick={() => deleteUser(user._id)}>
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="grid gap-4 md:hidden">
          {filteredUsers.map((user) => (
            <div
              key={user._id}
              className="border rounded-xl p-4 shadow-sm bg-gray-50"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">{user.name}</h3>

                <div className="flex gap-2">
                  <button className="p-2 rounded-lg bg-blue-100 text-blue-600">
                    <Pencil size={16} />
                  </button>
                  <button className="p-2 rounded-lg bg-red-100 text-red-600">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <p className="text-sm text-gray-500">{user.email}</p>

              <div className="flex justify-between mt-3">
                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                  {user.role}
                </span>

                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    user.status === "Active"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {user.status}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ManageUsers;