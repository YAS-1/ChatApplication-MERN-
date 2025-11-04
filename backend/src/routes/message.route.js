import express from "express";
import { protectRoute } from "../middleware/protectRoute.middleware.js";
import { getUsersForSidebar, getMessages } from "../controllers/message.controller.js";


const messageRoutes = express.Router();

messageRoutes.get("/users", protectRoute, getUsersForSidebar) // get users for sidebar route
messageRoutes.get("/:id", protectRoute, getMessages) // get messages route

export default messageRoutes;