import pool from '../db.js';

export const getArtists = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM artists');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
