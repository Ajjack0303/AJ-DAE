const express = require('express');
<<<<<<< HEAD
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

// Load environment variables
dotenv.config();

=======
>>>>>>> c1f25136619a4b6136049667263e8145880fbe2a
const app = express();
const cors = require('cors');
require('dotenv').config();

<<<<<<< HEAD
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const authRoutes = require('./routes/auth');
const artistRoutes = require('./routes/artists');
const portfolioRoutes = require('./routes/portfolio');

app.use('/api/auth', authRoutes);
app.use('/api/artists', artistRoutes);
app.use('/api/portfolio', portfolioRoutes);

// Start server
=======
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

>>>>>>> c1f25136619a4b6136049667263e8145880fbe2a
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
