// backend/controllers/artistRequestsController.js
import pool from '../db.js';

export const getRequests = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM artist_requests');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM artist_requests WHERE request_id = $1', [id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createRequest = async (req, res) => {
  try {
    const { client_id, artist_id, title, description, status } = req.body;
    const result = await pool.query(
      'INSERT INTO artist_requests (client_id, artist_id, title, description, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [client_id, artist_id, title, description, status || 'pending']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
