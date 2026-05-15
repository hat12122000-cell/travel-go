// src/modules/destinations/destination.model.js
const { getPool, sql } = require('../../config/database');

const DestinationModel = {

  async findAll({ search, limit = 9, offset = 0 } = {}) {
    const pool    = getPool();
    const request = pool.request();

    let query = `
      SELECT id, name, location, description, image_url, badge, rating, created_at
      FROM destinations
      WHERE is_active = 1
    `;

    if (search) {
      query += ` AND (name LIKE @search OR location LIKE @search)`;
      request.input('search', sql.NVarChar, `%${search}%`);
    }

    query += ` ORDER BY created_at DESC
               OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY`;
    request.input('offset', sql.Int, offset);
    request.input('limit',  sql.Int, limit);

    const result = await request.query(query);
    return result.recordset;
  },

  async findById(id) {
    const pool   = getPool();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM destinations WHERE id = @id AND is_active = 1');
    return result.recordset[0];
  },

  async create({ name, location, description, image_url, badge, rating }) {
    const pool   = getPool();
    const result = await pool.request()
      .input('name',        sql.NVarChar, name)
      .input('location',    sql.NVarChar, location)
      .input('description', sql.NVarChar, description || null)
      .input('image_url',   sql.NVarChar, image_url   || null)
      .input('badge',       sql.NVarChar, badge        || null)
      .input('rating',      sql.Decimal,  rating       || 0)
      .query(`
        INSERT INTO destinations (name, location, description, image_url, badge, rating)
        OUTPUT INSERTED.*
        VALUES (@name, @location, @description, @image_url, @badge, @rating)
      `);
    return result.recordset[0];
  },

  async update(id, { name, location, description, image_url, badge, rating }) {
    const pool   = getPool();
    const result = await pool.request()
      .input('id',          sql.Int,      id)
      .input('name',        sql.NVarChar, name)
      .input('location',    sql.NVarChar, location)
      .input('description', sql.NVarChar, description || null)
      .input('image_url',   sql.NVarChar, image_url   || null)
      .input('badge',       sql.NVarChar, badge        || null)
      .input('rating',      sql.Decimal,  rating       || 0)
      .query(`
        UPDATE destinations
        SET name = @name, location = @location, description = @description,
            image_url = @image_url, badge = @badge, rating = @rating,
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
        UPDATE destinations SET is_active = 0
        OUTPUT INSERTED.id
        WHERE id = @id
      `);
    return result.recordset[0];
  },
};

module.exports = DestinationModel;