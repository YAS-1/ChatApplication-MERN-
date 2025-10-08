import express from "express"
import dotenv from "dotenv"
import cors from "cors"

import {connectDB} from "./libs/db.js"

//ROUTES
import authRoutes from "../src/routes/auth.route.js"



dotenv.config()

const app =  express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

const PORT = process.env.PORT || 5000

//apis
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});






