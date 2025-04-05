import { pool } from "../config/database.js";

class userRepositery {

  constructor(entity) {
    this.entity = entity;
  }

  async create(body) {
    const query = `INSERT INTO ${this.entity} (${Object.keys(body).join(', ')}) VALUES (${Object.keys(body).map((_, i) => `$${i + 1}`).join(', ')}) RETURNING *;`;
    return (await pool.query(query, Object.values(body))).rows[0];
  }

  async findAll() {
    return (await pool.query(`SELECT * FROM ${this.entity}`)).rows;
  }

  async findById(id) {
    return (await pool.query(`SELECT * FROM ${this.entity} WHERE id = $1`, [id])).rows[0];
  }

  async getUserEmail(email) {
    return (await pool.query(`SELECT * FROM ${this.entity} WHERE email = $1`, [email])).rows[0];
  }

  async updateById(id, body) {
    const fields = Object.keys(body);
    const set = fields.map((field, i) => `${field} = $${i + 1}`).join(', ');
    const query = `UPDATE ${this.entity} SET ${set} WHERE id = ${id} RETURNING *`;

    return (await pool.query(query, Object.values(body))).rows[0];
  }

  async updateUserByToken(token, body) {
    const fields = Object.keys(body);
    const values = Object.values(body);

    if (!fields.length) {
      throw new Error("No fields to update");
    }

    const set = fields.map((field, i) => `${field} = $${i + 1}`).join(", ");
    const query = `UPDATE ${this.entity} SET ${set} WHERE token = $${fields.length + 1} RETURNING *`;

    return (await pool.query(query, [...values, token])).rows[0];
  }

  async deleteById(id) {
    return (await pool.query(`DELETE FROM ${this.entity} WHERE id = $1 RETURNING *`, [id])).rows[0];
  }

  async getTransactionsByUserId(userId) {
    const query = `
      SELECT 
        t.id AS transaction_id,
        v.venderName AS vendor_name,
        t.amount,
        t.image,
        v.address,
        v.phone,
        v.email,
        t.created_at
      FROM 
        transaction t
      JOIN 
        vender v ON t.vendorId = v.id
      WHERE 
        t.userid = $1
    `;
    const result = await pool.query(query, [userId]);
    return result.rows;
  }
  

}

export default  userRepositery;
