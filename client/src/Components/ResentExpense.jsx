import React from "react";

const ResentExpense = ({ dashboard = [] }) => {
return (
    <div className="sticky top-6 h-[85vh] overflow-y-auto pr-2">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800">
          Today's Expenses
        </h2>

        <span className="text-xs text-gray-500">
        {dashboard.length} records
        </span>
      </div>

      {/* Table Wrapper */}
      <div className="overflow-x-auto rounded-xl shadow-md border border-gray-100 bg-white">
        <table className="max-w-6xl text-sm">

          {/* Table Head */}
          <thead className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider">
            <tr>
            <th className="px-6 py-3 text-right">Category</th>
            <th className="px-6 py-3 text-right">Title</th>
            <th className="px-6 py-3 text-right">Amount</th>
            <th className="px-6 py-3 text-right">Date</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {dashboard.length > 0 ? (
              dashboard.map((d, i) => (
                <tr
                  key={i}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-3 text-right font-medium text-gray-700">
                    {d.category}
                  </td>

                  <td className="px-6 py-3 text-right text-gray-600">
                    {d.title}
                  </td>

                  <td className="px-6 py-3 text-right font-semibold text-green-600">
                    ${d.amount}
                  </td>

                  <td className="px-6 py-3 text-right text-gray-400 text-xs">
                    Now
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-10 text-gray-400"
                >
                  No expenses found 🚀
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default ResentExpense;