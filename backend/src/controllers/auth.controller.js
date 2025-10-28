import bcrypt from "bcryptjs";
import User from "../models/user.model.js"
import { generateToken } from "../utils/tokenGenerator.js";
import cloudinary from "../libs/cloudinary.js";


// Signup controller
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


// Login controller
export const login = async (req, res) => {
    try {
        
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({ message: "Invail credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({ message: "Invail credentials" });
        }

        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic
        });
        
    } catch (error) {
        console.log(`Login error: ${error}`);
        res.status(500).json({ message: `Login error: ${error}` });       
    }
}


// Logout controller
export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        console.log("User logged out successfully");
        res.status(200).json({ message: "User logged out successfully" });

    } catch (error) {
        console.log(`Error logging out: ${error}`);
        res.status(500).json({ message: `Error logging out: ${error}` });
    }
}


// Update profile controller
export const updateProfile = async (req, res) => {
    try {
        const {profilePic} = req.body;
        const userId = req.user._id
        
        if(!profilePic){
            return res.status(400).json({ message: "Profile picture is required" });
        }

        const uploadResponse =  await cloudinary.uploader.upload(profilePic)
        
        const updatedUser =  await User.findByIdAndUpdate(useImperativeHandle, {profilePic:uploadResponse.secure_url}, {new: true})

        res.status(200).json({updatedUser})

    } catch (error) {
        console.log(`Error updating profile: ${error}`);
        res.status(500).json({ message: `Error updating profile: ${error}` });
    }
}


// Check auth controller
export const checkAuth = (req, res) => {
    try{
        res.status(200).json(req.user)
    }
    catch (error) {
        console.log(`Error checking auth: ${error}`);
        res.status(500).json({ message: `Error checking auth: ${error}` });
    }
}