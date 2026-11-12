import { Router } from "express";
import {
  displayMessages,
  displayMessageForm,
  sendMessage,
} from "../controllers/messagesController.js";
const messageApp = Router();

messageApp.get("/messages", displayMessages);
messageApp.get("/messages/new", displayMessageForm);
messageApp.post("/messages/new", sendMessage);

export default messageApp;
