import pool from "./pool.js";
import process from "node:process";
import { BadRequest } from "../errors.js";

const id = process.env.FAKE_USER_ID || 1;
async function getUser() {
  try {
    const { rows } = await pool.query(
      `
      SELECT user_id, role FROM users 
      JOIN roles ON users.role_id = roles.role_id 
      WHERE user_id = $1
    `,
      [id],
    );

    return rows[0];
  } catch {
    throw new BadRequest("Failed to get user");
  }
}

async function getMessages() {
  try {
    const { rows } = await pool.query(
      `
      SELECT message_id, title, first_name, last_name, username, message, sent_at FROM messages 
      JOIN users ON users.user_id = messages.user_id
    `,
    );
    return rows;
  } catch {
    throw new BadRequest("Failed to get messages");
  }
}

async function insertMessage(newMessage) {
  try {
    await pool.query(
      "INSERT INTO messages (user_id, title, message) VALUES ($1, $2, $3)",
      [id, newMessage.title, newMessage.newMessage],
    );
  } catch {
    throw new BadRequest("Failed to send message");
  }
}

async function getMessageById(msgId) {
  try {
    const { rows } = await pool.query(
      "SELECT title FROM messages WHERE message_id = $1 LIMIT 1",
      [msgId],
    );
    return rows[0];
  } catch {
    throw new BadRequest("Failed to get message");
  }
}

async function deleteMessageDB(msgId) {
  try {
    await pool.query("DELETE FROM messages WHERE message_id = $1", [msgId]);
  } catch {}
}

export { getUser, getMessages, insertMessage, getMessageById, deleteMessageDB };
