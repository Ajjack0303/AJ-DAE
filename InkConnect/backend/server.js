// backend/server.js
const express = require('express');
const jwt = require('jsonwebtoken');
const pool = require('./db');
require('dotenv').config();

const app = express();
app.use(express.json());

// ===== JWT Authentication Middleware =====
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token missing' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
}

// ===== Users CRUD =====
app.get('/users', authenticateToken, async (req, res) => {
  const { rows } = await pool.query('SELECT user_id, username, email, role, style, location, created_at FROM users');
  res.json(rows);
});

app.get('/users/:id', authenticateToken, async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM users WHERE user_id=$1', [req.params.id]);
  res.json(rows[0]);
});

app.post('/users', async (req, res) => {
  const { username, email, password_hash, role, style, location } = req.body;
  const { rows } = await pool.query(
    `INSERT INTO users (username, email, password_hash, role, style, location)
     VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [username, email, password_hash, role, style, location]
  );
  res.json(rows[0]);
});

app.put('/users/:id', authenticateToken, async (req, res) => {
  const { username, email, role, style, location } = req.body;
  const { rows } = await pool.query(
    `UPDATE users SET username=$1,email=$2,role=$3,style=$4,location=$5 WHERE user_id=$6 RETURNING *`,
    [username, email, role, style, location, req.params.id]
  );
  res.json(rows[0]);
});

app.delete('/users/:id', authenticateToken, async (req, res) => {
  await pool.query('DELETE FROM users WHERE user_id=$1', [req.params.id]);
  res.json({ message: 'User deleted' });
});

// ===== Portfolios CRUD =====
app.get('/portfolios', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM portfolios');
  res.json(rows);
});

app.get('/portfolios/:id', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM portfolios WHERE portfolio_id=$1', [req.params.id]);
  res.json(rows[0]);
});

app.post('/portfolios', authenticateToken, async (req, res) => {
  const { artist_id, title, description } = req.body;
  const { rows } = await pool.query(
    `INSERT INTO portfolios (artist_id, title, description) VALUES ($1,$2,$3) RETURNING *`,
    [artist_id, title, description]
  );
  res.json(rows[0]);
});

app.put('/portfolios/:id', authenticateToken, async (req, res) => {
  const { title, description } = req.body;
  const { rows } = await pool.query(
    'UPDATE portfolios SET title=$1, description=$2 WHERE portfolio_id=$3 RETURNING *',
    [title, description, req.params.id]
  );
  res.json(rows[0]);
});

app.delete('/portfolios/:id', authenticateToken, async (req, res) => {
  await pool.query('DELETE FROM portfolios WHERE portfolio_id=$1', [req.params.id]);
  res.json({ message: 'Portfolio deleted' });
});

// ===== Artist Requests CRUD =====
app.get('/requests', authenticateToken, async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM artist_requests');
  res.json(rows);
});

app.get('/requests/:id', authenticateToken, async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM artist_requests WHERE request_id=$1', [req.params.id]);
  res.json(rows[0]);
});

app.post('/requests', authenticateToken, async (req, res) => {
  const { client_id, artist_id, title, description, status } = req.body;
  const { rows } = await pool.query(
    `INSERT INTO artist_requests (client_id, artist_id, title, description, status)
     VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    [client_id, artist_id, title, description, status || 'pending']
  );
  res.json(rows[0]);
});

app.put('/requests/:id', authenticateToken, async (req, res) => {
  const { title, description, status } = req.body;
  const { rows } = await pool.query(
    'UPDATE artist_requests SET title=$1, description=$2, status=$3 WHERE request_id=$4 RETURNING *',
    [title, description, status, req.params.id]
  );
  res.json(rows[0]);
});

app.delete('/requests/:id', authenticateToken, async (req, res) => {
  await pool.query('DELETE FROM artist_requests WHERE request_id=$1', [req.params.id]);
  res.json({ message: 'Request deleted' });
});

// ===== Messaging Endpoints (request_responses) =====
app.get('/messages', authenticateToken, async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM request_responses');
  res.json(rows);
});

app.post('/messages', authenticateToken, async (req, res) => {
  const { request_id, message } = req.body;
  const artist_id = req.user.user_id; // sender
  const { rows } = await pool.query(
    'INSERT INTO request_responses (request_id, artist_id, message) VALUES ($1,$2,$3) RETURNING *',
    [request_id, artist_id, message]
  );
  res.json(rows[0]);
});

// ===== Search / Filter Artists by style/location =====
app.get('/artists', async (req, res) => {
  const { style, location } = req.query;

  try {
    let query = 'SELECT user_id, username, style, location FROM users WHERE role = $1';
    const values = ['artist'];

    if (style) {
      query += ' AND style ILIKE $2';
      values.push(`%${style}%`);
    }

    if (location) {
      query += style ? ' AND location ILIKE $3' : ' AND location ILIKE $2';
      values.push(`%${location}%`);
    }

    const { rows } = await pool.query(query, values);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch artists' });
  }
});

// ===== Server Start =====
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
