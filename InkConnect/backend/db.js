const { Pool } = require('pg');

// --- Configure PostgreSQL connection ---
const pool = new Pool({
  user: process.env.DB_USER || 'inkconnect_user',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'inkconnect_db',
  password: process.env.DB_PASSWORD || 'august0916',
  port: process.env.DB_PORT || 5432,
});

// --- Test connection on startup ---
(async () => {
  try {
    const client = await pool.connect();
    console.log('✅ Connected to PostgreSQL successfully!');
    client.release();
  } catch (err) {
    console.error('❌ Error connecting to PostgreSQL:', err);
    process.exit(1);
  }
})();

module.exports = pool;
