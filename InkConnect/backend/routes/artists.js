const express = require('express');
const router = express.Router();
const { pool } = require('../db');

// --------------------
// GET all artists
// --------------------
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM artists ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to fetch artists' });
  }
});

// --------------------
// GET single artist by ID
// --------------------
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM artists WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Artist not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to fetch artist' });
  }
});

// --------------------
// CREATE new artist
// --------------------
router.post('/', async (req, res) => {
  const { name, style } = req.body;
  if (!name || !style) return res.status(400).json({ error: 'Name and style are required' });

  try {
    const result = await pool.query(
      'INSERT INTO artists (name, style) VALUES ($1, $2) RETURNING *',
      [name, style]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to create artist' });
  }
});

// --------------------
// UPDATE artist by ID
// --------------------
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, style } = req.body;

  try {
    const result = await pool.query(
      'UPDATE artists SET name = $1, style = $2 WHERE id = $3 RETURNING *',
      [name, style, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Artist not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to update artist' });
  }
});

// --------------------
// DELETE artist by ID
// --------------------
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM artists WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Artist not found' });
    res.json({ message: 'Artist deleted successfully', artist: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to delete artist' });
  }
});

module.exports = router;
