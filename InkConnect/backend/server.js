// =====================
// SERVER.JS — INKCONNECT
// =====================

require('dotenv').config();          // Load environment variables from .env
const express = require('express');  // Express web framework
const bcrypt = require('bcryptjs');  // Hash passwords securely
const pool = require('./db');        // Database connection
const { generateAccessToken, authenticateToken } = require('./auth'); // JWT utils

const app = express();
app.use(express.json());             // Parse JSON bodies

// =====================
// ROUTES
// =====================

// --- Registration ---
app.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query(
      'INSERT INTO users (username, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING user_id, username, email, role',
      [username, email, hashedPassword, role || 'client']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// --- Login ---
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
    const user = result.rows[0];

    if (!user) return res.status(400).json({ message: 'User not found' });

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(400).json({ message: 'Incorrect password' });

    const token = generateAccessToken(user);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Get all users (protected) ---
app.get('/users', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT user_id, username, email, role, created_at FROM users');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Create new user (protected, example for admin role) ---
app.post('/users', authenticateToken, async (req, res) => {
  // Optional: check role
  // if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });

  const { username, email, password, role } = req.body;
  if (!username || !email || !password) return res.status(400).json({ message: 'Missing fields' });

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const result = await pool.query(
      'INSERT INTO users (username, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING user_id, username, email, role',
      [username, email, hashedPassword, role || 'client']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// --- Example CRUD for portfolios (protected) ---
app.get('/portfolios', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM portfolios');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/portfolios', authenticateToken, async (req, res) => {
  const { artist_id, title, description } = req.body;
  if (!artist_id || !title) return res.status(400).json({ message: 'Missing required fields' });

  try {
    const result = await pool.query(
      'INSERT INTO portfolios (artist_id, title, description) VALUES ($1, $2, $3) RETURNING *',
      [artist_id, title, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// =====================
// START SERVER
// =====================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
