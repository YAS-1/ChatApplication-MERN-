import express from "express";
import { protectRoute } from "../middleware/protectRoute.middleware.js";
import { getUsersForSidebar } from "../controllers/message.controller.js";


const messageRoutes = express.Router();

messageRoutes.get("/users", protectRoute, getUsersForSidebar)

export default messageRoutes;