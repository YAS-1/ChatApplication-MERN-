
import jwt, { decode } from "jsonwebtoken";
import User from "../models/user.model.js";


// Middleware to protect routes
export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt; // assign the token the value of the jwt cookie provived when creating the account

        // Check if token exists
        if(!token){
            return res.status(401).json({ message: "Unauthorized - No token provided" });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if token is valid
        if(!decoded){
            return res.status(401).json({ message: "Unauthorized - Invalid token" });
        }

        const user = await User.findById(decode.userId).select("-password") // assign the user Id to the user variable

        // Check if user exists
        if(!user){
            return res.status(401).json({ message: "Unauthorized - User not found" });
        }

        req.user = user; // assign the user variable to the req.user variable
        next();

    } catch (error) {
        console.log(`Error in protectRoute middleware: ${error}`);
        res.status(500).json({ message: `Error in protectRoute middleware: ${error}` });
    }
}