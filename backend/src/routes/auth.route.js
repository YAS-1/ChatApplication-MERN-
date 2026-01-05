import express from "express"
import { protectRoute } from "../middleware/protectRoute.middleware.js";
import { signup, login, logout, updateProfile, checkAuth } from "../controllers/auth.controller.js";

const authRoutes = express.Router()

authRoutes.post("/signup", signup); // signup route
authRoutes.post("/login", login); // login route
authRoutes.post("/logout", logout); // logout route
authRoutes.put("/update-profile", protectRoute, updateProfile); // update profile route
authRoutes.get("/check", protectRoute, checkAuth); // check auth route


export default authRoutes;
