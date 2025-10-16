const express = require('express');
const router = express.Router();
const pool = require('../db');
const auth = require('../middleware/auth');
const parser = require('../middleware/cloudinaryStorage');

// Upload portfolio image (protected)
router.post('/upload', auth, parser.single('image'), async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!req.file) return res.status(400).json({ error: 'Image file is required' });

    const imageUrl = req.file.path;

    const result = await pool.query(
      'INSERT INTO portfolio (user_id, title, description, image_url, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *',
      [req.user.userId, title, description, imageUrl]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to upload portfolio item' });
  }
});

// Get all portfolio items (public)
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM portfolio ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch portfolio' });
  }
});

module.exports = router;
