import express from "express"
import { protectRoute } from "../middleware/protectRoute.middleware.js";
import { signup, login, logout, updateProfile, checkAuth } from "../controllers/auth.controller.js";

const authRoutes = express.Router()

authRoutes.post("/signup", signup); // signup
authRoutes.post("/login", login); // login
authRoutes.post("/logout", logout); // logout
authRoutes.put("/update-profile", protectRoute, updateProfile); // update profile
authRoutes.get("/check", protectRoute, checkAuth); // check auth


export default authRoutes;
