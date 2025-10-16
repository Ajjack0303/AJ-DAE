const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // Neon requires SSL
});

pool.on('connect', () => {
  console.log('Connected to Neon DB');
});

module.exports = pool;
