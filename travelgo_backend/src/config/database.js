// src/config/database.js
const sql = require('mssql');

const dbConfig = {
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server:   process.env.DB_SERVER,
  database: process.env.DB_NAME,
  port:     1433,              // ← thêm dòng này
  options: {
    encrypt:                false,
    trustServerCertificate: true,
    enableArithAbort:       true,
  },
  pool: {
    max:               10,
    min:               0,
    idleTimeoutMillis: 30000,
  },
};

let pool;

async function connectDB() {
  pool = await sql.connect(dbConfig);
  return pool;
}

function getPool() {
  if (!pool) throw new Error('Database chưa kết nối!');
  return pool;
}

module.exports = { connectDB, getPool, sql };