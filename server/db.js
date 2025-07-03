// Database connection file
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: { rejectUnauthorized: false } // Needed for many cloud Postgres providers
});

pool.connect(err => {
  if (err) throw err;
  console.log("✅ Connected to PostgreSQL database.");
});

module.exports = pool;
