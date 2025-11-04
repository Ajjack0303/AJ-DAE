const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const {
  getArtists,
  getArtistById,
  createArtist,
  updateArtist,
  deleteArtist
} = require('../controllers/artistsController');

router.get('/', authenticateToken, getArtists);
router.get('/:id', authenticateToken, getArtistById);
router.post('/', authenticateToken, createArtist);
router.put('/:id', authenticateToken, updateArtist);
router.delete('/:id', authenticateToken, deleteArtist);

module.exports = router;
