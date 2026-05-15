// src/modules/foods/food.model.js
const { getPool, sql } = require('../../config/database');

const FoodModel = {

  async findAll() {
    const pool   = getPool();
    const result = await pool.request()
      .query('SELECT * FROM foods WHERE is_active = 1 ORDER BY created_at DESC');
    return result.recordset;
  },

  async findById(id) {
    const pool   = getPool();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM foods WHERE id = @id AND is_active = 1');
    return result.recordset[0];
  },

  async create({ name, origin, description, image_url, price_range, category }) {
    const pool   = getPool();
    const result = await pool.request()
      .input('name',        sql.NVarChar, name)
      .input('origin',      sql.NVarChar, origin      || null)
      .input('description', sql.NVarChar, description || null)
      .input('image_url',   sql.NVarChar, image_url   || null)
      .input('price_range', sql.NVarChar, price_range || null)
      .input('category',    sql.NVarChar, category    || null)
      .query(`
        INSERT INTO foods (name, origin, description, image_url, price_range, category)
        OUTPUT INSERTED.*
        VALUES (@name, @origin, @description, @image_url, @price_range, @category)
      `);
    return result.recordset[0];
  },

  async update(id, { name, origin, description, image_url, price_range, category }) {
    const pool   = getPool();
    const result = await pool.request()
      .input('id',          sql.Int,      id)
      .input('name',        sql.NVarChar, name)
      .input('origin',      sql.NVarChar, origin      || null)
      .input('description', sql.NVarChar, description || null)
      .input('image_url',   sql.NVarChar, image_url   || null)
      .input('price_range', sql.NVarChar, price_range || null)
      .input('category',    sql.NVarChar, category    || null)
      .query(`
        UPDATE foods
        SET name = @name, origin = @origin, description = @description,
            image_url = @image_url, price_range = @price_range,
            category = @category, updated_at = GETDATE()
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
        UPDATE foods SET is_active = 0
        OUTPUT INSERTED.id
        WHERE id = @id
      `);
    return result.recordset[0];
  },
};

module.exports = FoodModel;