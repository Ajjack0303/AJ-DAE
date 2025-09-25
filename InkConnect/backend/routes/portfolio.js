const express = require('express');
const router = express.Router();
const pool = require('../db');
const verifyJWT = require('../middleware/verifyJWT'); // middleware to check JWT

// GET all portfolio items for a specific artist
router.get('/', verifyJWT, async (req, res) => {
  const artist_id = req.query.artist_id;

  if (!artist_id) {
    return res.status(400).json({ error: 'artist_id is required' });
  }

  try {
    const result = await pool.query(
      'SELECT * FROM portfolio WHERE artist_id = $1',
      [artist_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching portfolio:', err);
    res.status(500).json({ error: 'Failed to fetch portfolio' });
  }
});

// POST create a new portfolio item
router.post('/', verifyJWT, async (req, res) => {
  const { artist_id, title, description } = req.body;

  if (!artist_id || !title) {
    return res.status(400).json({ error: 'artist_id and title are required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO portfolio (artist_id, title, description) VALUES ($1, $2, $3) RETURNING *',
      [artist_id, title, description || null]
    );
    res.json({ message: 'Portfolio item uploaded successfully!', item: result.rows[0] });
  } catch (err) {
    console.error('Error inserting portfolio item:', err);
    res.status(500).json({ error: 'Failed to upload portfolio item' });
  }
});

module.exports = router;
