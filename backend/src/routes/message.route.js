import express from "express";
import { protectRoute } from "../middleware/protectRoute.middleware.js";
import { getUsersForSidebar, getMessages } from "../controllers/message.controller.js";


const messageRoutes = express.Router();

messageRoutes.get("/users", protectRoute, getUsersForSidebar)
messageRoutes.get("/:id", protectRoute, getMessages)

export default messageRoutes;