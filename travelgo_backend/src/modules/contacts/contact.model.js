// src/modules/contacts/contact.model.js
const { getPool, sql } = require('../../config/database');

const ContactModel = {

  async findAll() {
    const pool   = getPool();
    const result = await pool.request()
      .query('SELECT * FROM contact_messages ORDER BY created_at DESC');
    return result.recordset;
  },

  async findById(id) {
    const pool   = getPool();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM contact_messages WHERE id = @id');
    return result.recordset[0];
  },

  async create({ full_name, email, message }) {
    const pool   = getPool();
    const result = await pool.request()
      .input('full_name', sql.NVarChar, full_name)
      .input('email',     sql.NVarChar, email)
      .input('message',   sql.NVarChar, message)
      .query(`
        INSERT INTO contact_messages (full_name, email, message)
        OUTPUT INSERTED.*
        VALUES (@full_name, @email, @message)
      `);
    return result.recordset[0];
  },

  async updateStatus(id, status) {
    const pool   = getPool();
    const result = await pool.request()
      .input('id',     sql.Int,      id)
      .input('status', sql.NVarChar, status)
      .query(`
        UPDATE contact_messages
        SET status = @status
        OUTPUT INSERTED.*
        WHERE id = @id
      `);
    return result.recordset[0];
  },

  async delete(id) {
    const pool   = getPool();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query(`
        DELETE FROM contact_messages
        OUTPUT DELETED.id
        WHERE id = @id
      `);
    return result.recordset[0];
  },
};

module.exports = ContactModel;