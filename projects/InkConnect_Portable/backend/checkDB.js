const pool = require('./db');

(async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('DB connected:', res.rows[0]);
  } catch (err) {
    console.error('DB connection failed:', err);
  } finally {
    await pool.end();
  }
})();
