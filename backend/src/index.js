import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"


import {connectDB} from "./libs/db.js"

//ROUTES
import authRoutes from "../src/routes/auth.route.js"
import messageRoutes from "../src/routes/message.route.js"




dotenv.config()

const app =  express();

// 
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(cors())

const PORT = process.env.PORT || 5000

//apis
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});






