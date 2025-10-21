const express = require('express');
const router = express.Router();
const { pool } = require('../db');

// --------------------
// GET all portfolio projects
// --------------------
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM portfolio ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to fetch portfolio' });
  }
});

// --------------------
// GET single project by ID
// --------------------
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM portfolio WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Project not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

// --------------------
// CREATE new project
// --------------------
router.post('/', async (req, res) => {
  const { title, description, artist_id } = req.body;
  if (!title || !description || !artist_id)
    return res.status(400).json({ error: 'Title, description, and artist_id are required' });

  try {
    const result = await pool.query(
      'INSERT INTO portfolio (title, description, artist_id) VALUES ($1, $2, $3) RETURNING *',
      [title, description, artist_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// --------------------
// UPDATE project by ID
// --------------------
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, artist_id } = req.body;

  try {
    const result = await pool.query(
      'UPDATE portfolio SET title = $1, description = $2, artist_id = $3 WHERE id = $4 RETURNING *',
      [title, description, artist_id, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Project not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// --------------------
// DELETE project by ID
// --------------------
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM portfolio WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Project not found' });
    res.json({ message: 'Project deleted successfully', project: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

module.exports = router;
