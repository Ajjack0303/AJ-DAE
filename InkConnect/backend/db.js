// backend/db.js
const { Pool } = require('pg');

// PostgreSQL credentials (copied directly from your .env)
const pool = new Pool({
  user: 'inkconnect_user',
  host: 'localhost',
  database: 'inkconnect_db',
  password: 'INK123',
  port: 5432
});

pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL successfully!');
});

pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = { pool };
