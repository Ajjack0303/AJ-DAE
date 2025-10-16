const express = require('express');
const app = express();
const pool = require('./db');
require('dotenv').config();
const cors = require('cors');

// Routes (assuming you have these)
const authRoutes = require('./routes/auth');
const artistRoutes = require('./routes/artists');
const portfolioRoutes = require('./routes/portfolio');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Test route ---
app.get('/', (req, res) => {
  res.send('InkConnect backend is running!');
});

// --- API Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/artists', artistRoutes);
app.use('/api/portfolio', portfolioRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
