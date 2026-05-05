import cookieParser from "cookie-parser"
import express from 'express'
import cors from 'cors'

export const configApp = (app)=>{
    app.use(express.json())
    app.use(cors())
    app.use(cookieParser())
}