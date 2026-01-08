import express from "express";
import { protectRoute } from "../middleware/protectRoute.middleware.js";
import { getUsersForSidebar, getMessages, sendMessage } from "../controllers/message.controller.js";


const messageRoutes = express.Router();

messageRoutes.get("/users", protectRoute, getUsersForSidebar) // get users for sidebar route
messageRoutes.get("/:id", protectRoute, getMessages) // get messages route
messageRoutes.post("/send/:id", protectRoute, sendMessage) // send message route


export default messageRoutes;