// routes/artists.js
const express = require('express');
const router = express.Router();
const { authenticateToken, requireSafeRole } = require('../middleware/auth');
const { getArtists } = require('../controllers/artistsController');

router.get('/', authenticateToken, requireSafeRole(['admin','editor','viewer']), getArtists);

module.exports = router;
