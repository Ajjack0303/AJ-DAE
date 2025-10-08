const express = require('express');
<<<<<<< HEAD
const auth = require('../middleware/auth');
const parser = require('../middleware/cloudinaryStorage');
const db = require('../db');

const router = express.Router();

// Upload portfolio image
router.post('/upload', auth, parser.single('image'), async (req, res) => {
  try {
    const { title, description } = req.body;
    const imageUrl = req.file.path;

    const result = await db.query(
      'INSERT INTO portfolio (user_id, title, description, image_url) VALUES ($1, $2, $3, $4) RETURNING *',
      [req.user.user_id, title, description, imageUrl]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all portfolio items
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM portfolio');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
=======
const router = express.Router();
const pool = require('../db');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to check JWT
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'Access token missing' });

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

// GET all portfolio items
router.get('/', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM portfolio');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch portfolio' });
>>>>>>> c1f25136619a4b6136049667263e8145880fbe2a
  }
});

module.exports = router;
