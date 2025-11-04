// backend/controllers/artistsController.js
const { pool } = require('../db');

async function getArtists(req, res) {
  try {
    const result = await pool.query('SELECT * FROM artists ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch artists' });
  }
}

async function getArtistById(req, res) {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM artists WHERE id=$1', [id]);
    if (!result.rows.length) return res.status(404).json({ error: 'Artist not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch artist' });
  }
}

async function createArtist(req, res) {
  const { name, bio } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO artists (name, bio) VALUES ($1, $2) RETURNING *',
      [name, bio]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create artist' });
  }
}

async function updateArtist(req, res) {
  const { id } = req.params;
  const { name, bio } = req.body;
  try {
    const result = await pool.query(
      'UPDATE artists SET name=$1, bio=$2 WHERE id=$3 RETURNING *',
      [name, bio, id]
    );
    if (!result.rows.length) return res.status(404).json({ error: 'Artist not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update artist' });
  }
}

async function deleteArtist(req, res) {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM artists WHERE id=$1 RETURNING *', [id]);
    if (!result.rows.length) return res.status(404).json({ error: 'Artist not found' });
    res.json({ message: 'Artist deleted successfully', artist: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete artist' });
  }
}

module.exports = { getArtists, getArtistById, createArtist, updateArtist, deleteArtist };
