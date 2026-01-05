import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// creating a db connection
export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI); // connecting to the database
        console.log("Connected to database");
    } catch (error) {
        console.log(`Error connecting to database: ${error}`); // logging the error
        process.exit(1);
    }
}

