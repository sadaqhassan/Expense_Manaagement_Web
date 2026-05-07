//add expense

import { Expenses } from "../Models/expenses.model.js";

export const addExpense = async (req, res) => {
    const user = req.userId
    try {
        const { title, amount, category, description, date } = req.body;
        const newExpense = new Expenses({
            title,
            amount,
            category,
            description,
            date,
            assignedTo: user
        });
        await newExpense.save();
        res.status(201).json({ success: true, message: "Expense added successfully", expense: newExpense });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
        console.log("Error adding expense:", error);
    }
};

// get userExpenses

export const getExpenses = async (req, res) => {
    const user = req.userId;
    try{
        const expenses = await Expenses.find({ assignedTo: user }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, ExpensesData: expenses });
    }catch(error){
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
        console.log("Error getting expenses:", error);
    }
}
export const deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedExpense = await Expenses.findByIdAndDelete(id);
        if (!deletedExpense) {
            return res.status(404).json({ success: false, message: "Expense not found" });
        }
        res.status(200).json({ success: true, message: "Expense deleted successfully", expense: deletedExpense });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
        console.log("Error deleting expense:", error);
    }
}