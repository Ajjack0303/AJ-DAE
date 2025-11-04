// backend/test-db.js
require('dotenv').config();
const { pool } = require('./db');

(async () => {
  try {
    // Test connection and get timestamp
    const nowRes = await pool.query('SELECT NOW()');
    console.log('✅ PostgreSQL connected at:', nowRes.rows[0].now);

    // Get PostgreSQL version
    const versionRes = await pool.query('SHOW server_version;');
    console.log('🛠 PostgreSQL version:', versionRes.rows[0].server_version);

    // Get current user
    const userRes = await pool.query('SELECT current_user;');
    console.log('👤 Connected as user:', userRes.rows[0].current_user);

    process.exit(0);
  } catch (err) {
    console.error('❌ PostgreSQL connection failed:', err);
    process.exit(1);
  }
})();
