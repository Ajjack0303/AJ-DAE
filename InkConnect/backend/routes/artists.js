const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { requireSafeRole } = require('../middleware/roles');
const { getArtists, createArtist, updateArtist, deleteArtist } = require('../controllers/artistsController');

// List all artists
router.get('/', authenticateToken, requireSafeRole('/', 'GET'))', authenticateToken, requireSafeRole('/artists', 'GET'), getArtists);

// Create new artist
router.post('/', authenticateToken, requireSafeRole('/', 'POST'))', authenticateToken, requireSafeRole('/artists', 'POST'), createArtist);

// Get artist by ID
router.get('/', authenticateToken, requireSafeRole('/', 'GET')):id', authenticateToken, requireSafeRole('/artists/:id', 'GET'), getArtists);

// Update artist
router.put('/:id', authenticateToken, requireSafeRole('/:id', 'PUT'))', authenticateToken, requireSafeRole('/artists/:id', 'PUT'), updateArtist);

// Delete artist
router.delete('/:id', authenticateToken, requireSafeRole('/:id', 'DELETE'))', authenticateToken, requireSafeRole('/artists/:id', 'DELETE'), deleteArtist);

module.exports = router;
