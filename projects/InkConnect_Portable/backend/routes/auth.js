const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const pool = require('../db'); // Ensure db.js exports a Pool connected to Neon
const jwt = require('jsonwebtoken');
require('dotenv').config();

// --- Signup ---
router.post(
  '/signup',
  body('username').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 chars'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { username, email, password } = req.body;

    try {
      // Check for existing user
      const existing = await pool.query(
        'SELECT 1 FROM users WHERE username=$1 OR email=$2',
        [username, email]
      );

      if (existing.rowCount > 0) {
        return res.status(400).json({ error: 'Username or email already exists' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert user
      const result = await pool.query(
        `INSERT INTO users (username, email, password_hash) 
         VALUES ($1, $2, $3) 
         RETURNING user_id, username, email`,
        [username, email, hashedPassword]
      );

      // Generate JWT
      const token = jwt.sign({ userId: result.rows[0].user_id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      res.json({ user: result.rows[0], token });
    } catch (err) {
      console.error('Signup error:', err); // <-- Detailed error logging
      res.status(500).json({ error: 'Signup failed', details: err.message });
    }
  }
);

// --- Login ---
router.post(
  '/login',
  body('email').isEmail().withMessage('Valid email required'),
  body('password').exists().withMessage('Password required'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;

    try {
      const userRes = await pool.query(
        'SELECT user_id, username, email, password_hash FROM users WHERE email=$1',
        [email]
      );

      if (userRes.rowCount === 0) return res.status(400).json({ error: 'Invalid credentials' });

      const user = userRes.rows[0];
      const valid = await bcrypt.compare(password, user.password_hash);

      if (!valid) return res.status(400).json({ error: 'Invalid credentials' });

      const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      res.json({ user: { user_id: user.user_id, username: user.username, email: user.email }, token });
    } catch (err) {
      console.error('Login error:', err); // <-- Detailed error logging
      res.status(500).json({ error: 'Login failed', details: err.message });
    }
  }
);

module.exports = router;
