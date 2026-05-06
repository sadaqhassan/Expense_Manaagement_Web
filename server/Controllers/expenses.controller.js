//add expense

export const addExpense = async (req, res) => {
    try {
        const { title, amount, category, description, date } = req.body;
        const newExpense = new Expenses({
            title,
            amount,
            category,
            description,
            date
        });
        await newExpense.save();
        res.status(201).json({ success: true, message: "Expense added successfully", expense: newExpense });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
        console.log("Error adding expense:", error);
    }
};