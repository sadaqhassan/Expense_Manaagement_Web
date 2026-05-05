import express from 'express'
import dotenv from 'dotenv'
import { configApp } from './configs/config';
dotenv.config()

const app = express();

configApp(app);

const port = process.env.PORT

app.listen(port,()=>console.log("server is running on http://localhost:"+port));



