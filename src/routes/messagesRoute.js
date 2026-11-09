import { Router } from "express";
import { displayMessages } from "../controllers/messagesController.js";
const messageApp = Router();

messageApp.get("/messages", displayMessages);

export default messageApp;
