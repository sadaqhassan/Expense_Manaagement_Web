import { Router } from "express";
import { loginUser, registerUser } from "../Controllers/user.controller.js";

const user = Router()

user.post("/register", registerUser);
user.post("/login", loginUser);

export const userRoute = user;