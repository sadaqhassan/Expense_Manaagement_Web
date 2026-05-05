import { useState } from "react";
import { useAppContext } from "../Context/AppContext";

export default function AddExpense() {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  const {setData,data} = useAppContext();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setData([...data,form]);
  };

  return (
    <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Add Expense
        </h2>

<h1 className='text-xl text-gray-900 font-medium'>Expense Management </h1>
    <p className='text-sm text-gray-600 mt-1 mb-5'>Feel Free to Manage Your expense Add , update , and delete</p>

    
    <div className=" md:w-[750px] flex items-center justify-center p-4">
    <div className="w-full  bg-white rounded-2xl shadow-xl p-6">
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 shadow-xl">

          {/* Title */}
        <div>
            <label className="text-sm text-gray-600">Title</label>
            <input
                type="text"
                name="title"
                placeholder="e.g. Food"
                value={form.title}
                onChange={handleChange}
                className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                required
            />
        </div>

          {/* Amount */}
          <div>
            <label className="text-sm text-gray-600">Amount</label>
            <input
              type="number"
              name="amount"
              placeholder="$0.00"
              value={form.amount}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-sm text-gray-600">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              required
            >
              <option  value="">Select category</option>
              <option >Food</option>
              <option >Transport</option>
              <option>Shopping</option>
              <option>Bills</option>
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="text-sm text-gray-600">Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Save Expense
          </button>

        </form>
      </div>
      </div>
    </div>
  );
}