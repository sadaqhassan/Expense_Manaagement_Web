import { Router } from "express";
import { getAllUsers, loginUser, registerUser } from "../Controllers/user.controller.js";
import { isAdmin, isAuth } from "../Middlewares/isAdmin.js";

const user = Router()

user.post("/register", registerUser);
user.post("/login", loginUser);
user.get("/get-users",isAuth,isAdmin,getAllUsers);

export const userRoute = user;