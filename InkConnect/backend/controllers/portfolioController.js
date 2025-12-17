import pool from '../db.js';

export const getPortfolios = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM portfolios');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
