require('dotenv').config(); // load .env

const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) console.error('DB connection error', err);
  else console.log('DB connected successfully:', res.rows[0]);
  pool.end();
});


