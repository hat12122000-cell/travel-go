// src/modules/drinks/drink.model.js
const { getPool, sql } = require('../../config/database');

const DrinkModel = {

  async findAll() {
    const pool   = getPool();
    const result = await pool.request()
      .query('SELECT * FROM drinks WHERE is_active = 1 ORDER BY created_at DESC');
    return result.recordset;
  },

  async findById(id) {
    const pool   = getPool();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM drinks WHERE id = @id AND is_active = 1');
    return result.recordset[0];
  },

  async create({ name, icon, description, image_url, price_range }) {
    const pool   = getPool();
    const result = await pool.request()
      .input('name',        sql.NVarChar, name)
      .input('icon',        sql.NVarChar, icon        || null)
      .input('description', sql.NVarChar, description || null)
      .input('image_url',   sql.NVarChar, image_url   || null)
      .input('price_range', sql.NVarChar, price_range || null)
      .query(`
        INSERT INTO drinks (name, icon, description, image_url, price_range)
        OUTPUT INSERTED.*
        VALUES (@name, @icon, @description, @image_url, @price_range)
      `);
    return result.recordset[0];
  },

  async update(id, { name, icon, description, image_url, price_range }) {
    const pool   = getPool();
    const result = await pool.request()
      .input('id',          sql.Int,      id)
      .input('name',        sql.NVarChar, name)
      .input('icon',        sql.NVarChar, icon        || null)
      .input('description', sql.NVarChar, description || null)
      .input('image_url',   sql.NVarChar, image_url   || null)
      .input('price_range', sql.NVarChar, price_range || null)
      .query(`
        UPDATE drinks
        SET name = @name, icon = @icon, description = @description,
            image_url = @image_url, price_range = @price_range,
            updated_at = GETDATE()
        OUTPUT INSERTED.*
        WHERE id = @id AND is_active = 1
      `);
    return result.recordset[0];
  },

  async delete(id) {
    const pool   = getPool();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query(`
        UPDATE drinks SET is_active = 0
        OUTPUT INSERTED.id
        WHERE id = @id
      `);
    return result.recordset[0];
  },
};

module.exports = DrinkModel;