import { Client } from "pg";
import process from "node:process";

const SQL = `
CREATE TABLE IF NOT EXISTS roles (
    role_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    role VARCHAR ( 255 ) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR ( 255 ) NOT NULL UNIQUE,
    first_name VARCHAR ( 255 ) NOT NULL,
    last_name VARCHAR ( 255 ) NOT NULL,
    role_id INTEGER NOT NULL,
    password_hash VARCHAR ( 255 ) NOT NULL,
    FOREIGN KEY(role_id) REFERENCES roles (role_id)
);

CREATE TABLE IF NOT EXISTS messages (
    message_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id INTEGER NOT NULL,
    title VARCHAR ( 255 ) NOT NULL,
    message TEXT NOT NULL,
    sent_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users (user_id)
);
`;
async function main() {
  const client = new Client({
    connectionString: process.argv[2],
  });

  await client.connect();
  await client.query(SQL);
  await client.end();

  console.log("Done.");
}

main();
