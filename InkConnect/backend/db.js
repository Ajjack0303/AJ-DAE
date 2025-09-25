// db.js
const { Pool } = require('pg');

// --- Configure PostgreSQL connection ---
const pool = new Pool({
  user: 'inkconnect_user',        // PostgreSQL username
  host: 'localhost',              // Host
  database: 'inkconnect_db',      // Database name
  password: 'august0916',         // Replace with your actual password
  port: 5432,                     // Default Postgres port
});

// --- Test connection on startup ---
(async () => {
  try {
    const client = await pool.connect();
    console.log('✅ Connected to PostgreSQL successfully!');
    client.release();
  } catch (err) {
    console.error('❌ Error connecting to PostgreSQL:', err);
    process.exit(1); // Exit the app if DB connection fails
  }
})();

module.exports = pool;
