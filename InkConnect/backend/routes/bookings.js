const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const {
  getBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking
} = require('../controllers/bookingsController');

router.get('/', authenticateToken, getBookings);
router.get('/:id', authenticateToken, getBookingById);
router.post('/', authenticateToken, createBooking);
router.put('/:id', authenticateToken, updateBooking);
router.delete('/:id', authenticateToken, deleteBooking);

module.exports = router;
