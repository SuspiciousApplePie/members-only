import pool from "./pool.js";
import process from "node:process";

const id = process.env.FAKE_USER_ID || 1;
async function getUser() {
  const { rows } = await pool.query(
    `
      SELECT user_id, role FROM users 
      JOIN roles ON users.role_id = roles.role_id 
      WHERE user_id = $1
    `,
    [id],
  );

  return rows[0];
}

async function getMessages() {
  const { rows } = await pool.query(
    `
      SELECT title, first_name, last_name, username, message, sent_at FROM messages 
      JOIN users ON users.user_id = messages.user_id
    `,
  );
  return rows;
}

export { getUser, getMessages };
