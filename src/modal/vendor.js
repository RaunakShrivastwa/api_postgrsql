import { pool } from "../config/database.js";

const vendorTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS vender (
        id SERIAL PRIMARY KEY,
        venderName VARCHAR(100) NOT NULL,
        address VARCHAR(100),
        email VARCHAR(100),
        phone VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(query);
    console.log("Vendor table is ready");
  } catch (error) {
    console.error("Error creating users table:", error);
  }
};

export default vendorTable;
