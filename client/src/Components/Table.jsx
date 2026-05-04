import { Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../Context/AppContext";
import { useEffect, useState } from "react";

export default function Table() {
  const navigate = useNavigate();
  const { data } = useAppContext();

  const getStatusStyle = (status) => {
    return status === "Paid"
      ? "bg-green-100 text-green-600"
      : "bg-yellow-100 text-yellow-600";
  };

  return (
    <div className="p-4 md:p-6 md:w-[800px] min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 p-5 border-b">
          <h2 className="text-lg md:text-xl font-semibold text-gray-700">
            Expenses
          </h2>
          <button
            onClick={() => navigate("/add-expense")}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 w-full md:w-auto"
          >
            + Add Expense
          </button>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="p-4">Category</th>
                <th className="p-4">Title</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {data.length > 0 ? (
                data.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">{item.category}</td>
                    <td className="p-4 font-medium">{item.title}</td>
                    <td className="p-4 text-green-600 font-semibold">
                      ${item.amount}
                    </td>
                    <td className="p-4 text-gray-500">{item.date}</td>
                    <td className="p-4 flex justify-end gap-3">
                      <Edit className="text-blue-500 cursor-pointer" size={18} />
                      <Trash2 className="text-red-500 cursor-pointer" size={18} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="p-4 text-center text-gray-400" colSpan="6">
                    No Data Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile */}
        <div className="md:hidden p-4 space-y-4">
          {data.length > 0 ? (
            data.map((item) => (
              <div key={item.id} className="bg-gray-50 rounded-xl p-4 shadow-sm">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">{item.title}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusStyle(item.status)}`}>
                    {item.status}
                  </span>
                </div>

                <p className="text-sm text-gray-500">{item.category}</p>
                <p className="text-green-600 font-semibold">${item.amount}</p>
                <p className="text-gray-400 text-sm">{item.date}</p>

                <div className="flex gap-4 mt-2">
                  <Edit className="text-blue-500 cursor-pointer" size={18} />
                  <Trash2 className="text-red-500 cursor-pointer" size={18} />
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">No Data</p>
          )}
        </div>

      </div>
    </div>
  );
}