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
    throw new Error();
    const { rows } = await pool.query(
      `
      SELECT title, first_name, last_name, username, message, sent_at FROM messages 
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

export { getUser, getMessages, insertMessage };
