import express from "express"
import { protectRoute } from "../middleware/protectRoute.middleware.js";
import { signup, login, logout, updateProfilex, checkAuth } from "../controllers/auth.controller.js";

const authRoutes = express.Router()

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.post("/logout", logout);
authRoutes.put("/update-profile", protectRoute, updateProfile);
authRoutes.get("/check", protectRoute, checkAuth);

export default authRoutes;
