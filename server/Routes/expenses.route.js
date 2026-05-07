import { Router } from "express";
import { addExpense, deleteExpense, getAllExpenses, getExpenses } from "../Controllers/expenses.controller.js";
import { isAdmin, isAuth } from "../Middlewares/isAdmin.js";

const expense = Router();

expense.post("/add-expense",isAuth, addExpense);
expense.get("/get-expenses",isAuth, getExpenses);
expense.delete("/delete-expense/:id",isAuth, deleteExpense);
expense.get("/get-all-expenses",isAuth,isAdmin, getAllExpenses);

export const expenseRoute = expense;