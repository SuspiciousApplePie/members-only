import { Router } from "express";
import {
  displayMessages,
  displayMessageForm,
  sendMessage,
  displayDeleteForm,
  deleteMessage,
} from "../controllers/messagesController.js";
const messageApp = Router();

messageApp.get("/messages", displayMessages);
messageApp.get("/messages/new", displayMessageForm);
messageApp.post("/messages/new", sendMessage);
messageApp.get("/messages/delete/:msgId", displayDeleteForm);
messageApp.post("/messages/delete/:msgId", deleteMessage);

export default messageApp;
