import { pool } from "../config/database.js";

const transaction = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS transaction (
    id SERIAL PRIMARY KEY,
    vendorId INTEGER NOT NULL,
    userid INTEGER NOT NULL,
    amount NUMERIC(10, 2),
    image text,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (vendorId) REFERENCES vender(id) ON DELETE CASCADE,
    FOREIGN KEY (userid) REFERENCES users(id) ON DELETE CASCADE
);

  `;

  try {
    await pool.query(query);
    console.log("Transaction table is ready");
  } catch (error) {
    console.error("Error creating users table:", error);
  }
};

export default transaction;
