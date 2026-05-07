import { Router } from "express";
import { deleteUser, getAllUsers, getUser, loginUser, logoutUser, registerUser } from "../Controllers/user.controller.js";
import { isAdmin, isAuth } from "../Middlewares/isAdmin.js";

const user = Router()

user.post("/register", registerUser);
user.post("/login", loginUser);
user.get("/get-users",isAuth,isAdmin,getAllUsers);
user.delete("/delete-user/:id",isAuth,isAdmin,deleteUser);
user.get("/get-user",isAuth,getUser);
user.get("/logout",isAuth,logoutUser);

export const userRoute = user;