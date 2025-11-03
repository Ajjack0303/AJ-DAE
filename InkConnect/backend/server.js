// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Load env variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/artists', require('./routes/artists'));
app.use('/api/bookings', require('./routes/bookings'));
// Add clients/projects routes later as needed

// Root
app.get('/', (req, res) => res.send('InkConnect API running'));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
