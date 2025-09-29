const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const pool = require('./db');

// Routes
const artistRoutes = require('./routes/artists');
const portfolioRoutes = require('./routes/portfolio');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/artists', artistRoutes);
app.use('/api/portfolio', portfolioRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
