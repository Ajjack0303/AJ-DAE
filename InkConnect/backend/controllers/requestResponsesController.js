import pool from '../db.js';

export const getResponses = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM request_responses');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const getResponseByRequestId = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM request_responses WHERE request_id = $1',
      [id]
    );
    if (result.rows.length === 0) return res.status(404).json({ msg: 'Response not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
