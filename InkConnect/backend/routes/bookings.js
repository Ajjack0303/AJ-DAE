// routes/bookings.js
const express = require('express');
const router = express.Router();
const { authenticateToken, requireSafeRole } = require('../middleware/auth');
const { getBookings, createBooking, updateBooking, deleteBooking } = require('../controllers/bookingsController');

router.get('/', authenticateToken, requireSafeRole(['admin','editor','viewer']), getBookings);
router.post('/', authenticateToken, requireSafeRole(['admin','editor']), createBooking);
router.put('/:id', authenticateToken, requireSafeRole(['admin','editor']), updateBooking);
router.delete('/:id', authenticateToken, requireSafeRole(['admin']), deleteBooking);

module.exports = router;
