import cookieParser from "cookie-parser"
import express from 'express'
import cors from 'cors'

export const configApp = (app)=>{
    app.use(express.json())
    app.use(cors({
        origin: "http://localhost:5173",
        credentials: true
    }));
    app.use(cookieParser())
}