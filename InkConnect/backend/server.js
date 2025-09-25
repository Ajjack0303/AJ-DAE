// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./db');

// Import route files
const authRoutes = require('./routes/auth');
const artistRoutes = require('./routes/artists');
const portfolioRoutes = require('./routes/portfolio');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount routes
app.use('/auth', authRoutes);
app.use('/artists', artistRoutes);
app.use('/portfolio', portfolioRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('InkConnect API is running!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  try {
    // Test PostgreSQL connection
    await pool.query('SELECT 1');
    console.log('✅ Connected to PostgreSQL successfully!');
  } catch (err) {
    console.error('❌ Error connecting to PostgreSQL:', err);
  }
  console.log(`Server running on port ${PORT}`);
});
