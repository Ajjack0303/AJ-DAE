// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./db');

app.use(cors());
app.use(express.json());

// --- Test route ---
app.get('/', (req, res) => {
  res.send('InkConnect API is running!');
});

// --- GET /artists with optional filters and enhanced error handling ---
app.get('/artists', async (req, res) => {
  const { style, location } = req.query;

  try {
    let query = `
      SELECT user_id, username, email, style, location, created_at
      FROM users
      WHERE role = 'artist'
    `;
    const params = [];

    if (style) {
      params.push(`%${style}%`);
      query += ` AND style ILIKE $${params.length}`;
    }

    if (location) {
      params.push(`%${location}%`);
      query += ` AND location ILIKE $${params.length}`;
    }

    const { rows } = await pool.query(query, params);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'No artists found matching the given criteria.' });
    }

    res.json(rows);

  } catch (err) {
    console.error('Error fetching artists:', err);

    // Custom error messages based on Postgres error codes
    if (err.code === '42703') {
      return res.status(400).json({ error: 'Invalid column specified in query.' });
    }

    res.status(500).json({ error: 'Internal server error. Please try again later.' });
  }
});

// --- Start server ---
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
