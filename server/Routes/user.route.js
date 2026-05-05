import { Router } from "express";
import { registerUser } from "../Controllers/user.controller.js";

const user = Router()

user.post("/register", registerUser);

export const userRoute = user;