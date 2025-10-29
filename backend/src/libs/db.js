import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// creating a db connection
export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to database");
    } catch (error) {
        console.log(`Error connecting to database: ${error}`);
        process.exit(1);
    }
}

