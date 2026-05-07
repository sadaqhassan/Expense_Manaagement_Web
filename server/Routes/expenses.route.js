import { Router } from "express";
import { addExpense, deleteExpense, getExpenses } from "../Controllers/expenses.controller.js";
import { isAuth } from "../Middlewares/isAdmin.js";

const expense = Router();

expense.post("/add-expense",isAuth, addExpense);
expense.get("/get-expenses",isAuth, getExpenses);
expense.delete("/delete-expense/:id",isAuth, deleteExpense);

export const expenseRoute = expense;