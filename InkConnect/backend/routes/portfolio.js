const express = require('express');
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
  }
});

module.exports = router;
