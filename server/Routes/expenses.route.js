import { Router } from "express";
import { addExpense } from "../Controllers/expenses.controller.js";
import { isAuth } from "../Middlewares/isAdmin.js";

const expense = Router();

expense.post("/add-expense",isAuth, addExpense);

export const expenseRoute = expense;