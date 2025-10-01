import bcrypt from "bcryptjs";
import User from "../models/user.model.js"
import { generateToken } from "../utils/tokenGenerator.js";


export const signup = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        if(!fullName || !email || !password){
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password.length < 6){
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        const user  = await User.findOne({email})

        if (user){
            return res.status(400).json({ message: "User already exists" });
        }

        //Hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        });

        if(newUser){
            // Generating the jwt token
            generateToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic
            })
        } else {
            return res.status(500).json({ message: "Error creating user" });
        }

    } catch (error) {
        console.log(`Error signing up: ${error}`);
        res.status(500).json({ message: `Error signing up: ${error}` });
    }
}

export const login = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(`Login error: ${error}`);
        res.status(500).json({ message: `Login error: ${error}` });       
    }
}


export const logout = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(`Error logging out: ${error}`);
        res.status(500).json({ message: `Error logging out: ${error}` });
    }
}