import pool from '../db.js';

export const getRequests = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM artist_requests');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const getRequestById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM artist_requests WHERE request_id = $1',
      [id]
    );
    if (result.rows.length === 0) return res.status(404).json({ msg: 'Request not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
