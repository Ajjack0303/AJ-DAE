const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const { pool } = require('./db'); // Make sure db.js exports { pool }

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Root test route
app.get('/', (req, res) => {
  res.send('InkConnect backend is running!');
});

// Routes
const authRoutes = require('./routes/auth');
const artistRoutes = require('./routes/artists');
const portfolioRoutes = require('./routes/portfolio');

app.use('/api/auth', authRoutes);
app.use('/api/artists', artistRoutes);
app.use('/api/portfolio', portfolioRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
