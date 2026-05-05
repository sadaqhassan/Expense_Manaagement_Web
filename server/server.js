import express from 'express'
import dotenv from 'dotenv'
import { configApp } from './configs/config.js';
import { dbConfig } from './configs/db.js';
import { userRoute } from './Routes/user.route.js';
dotenv.config()

const app = express();

configApp(app);

app.use("/api/user",userRoute);

const port = process.env.PORT

dbConfig()
app.listen(port,()=>console.log("server is running on http://localhost:"+port));



