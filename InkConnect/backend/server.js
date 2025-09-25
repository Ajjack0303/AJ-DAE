// server.js
require('dotenv').config();
const express = require('express');
const pool = require('./db');
const jwt = require('jsonwebtoken');
const cloudinary = require('./config/cloudinary');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const app = express();

app.use(express.json());

// --- Multer setup for file uploads ---
const storage = multer.memoryStorage();
const upload = multer({ storage });

// --- Middleware: Verify token and user role ---
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access token missing' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });
    req.user = user;
    next();
  });
};

const authorizeRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ error: 'Forbidden: insufficient permissions' });
    }
    next();
  };
};

// --- Test route ---
app.get('/', (req, res) => {
  res.send('InkConnect API is running!');
});

// --- GET /artists with optional filters ---
app.get('/artists', async (req, res) => {
  const { style, location } = req.query;
  try {
    let query = `
      SELECT user_id, username, style, location, created_at
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
    res.json(rows);
  } catch (err) {
    console.error('Error fetching artists:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// --- POST /login ---
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );
    const user = rows[0];
    if (!user || user.password_hash !== password) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign(
      { user_id: user.user_id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({ token, user: { user_id: user.user_id, username: user.username, role: user.role } });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// --- POST /portfolio (artist-only) ---
app.post(
  '/portfolio',
  authenticateToken,
  authorizeRole('artist'),
  upload.single('image'),
  async (req, res) => {
    const { title } = req.body;
    if (!title || !req.file) {
      return res.status(400).json({ error: 'Title and image are required' });
    }

    try {
      const uploadResult = await cloudinary.uploader.upload_stream(
        { folder: 'portfolios', public_id: uuidv4() },
        async (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            return res.status(500).json({ error: 'Image upload failed' });
          }

          const { rows } = await pool.query(
            'INSERT INTO portfolios (artist_id, title, description) VALUES ($1, $2, $3) RETURNING *',
            [req.user.user_id, title, result.secure_url]
          );

          res.json({ portfolio: rows[0], image_url: result.secure_url });
        }
      );

      uploadResult.end(req.file.buffer);
    } catch (err) {
      console.error('Portfolio creation error:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

// --- Start server ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
