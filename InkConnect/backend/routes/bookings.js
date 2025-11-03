const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { requireSafeRole } = require('../middleware/roles');
const { getBookings, createBooking, updateBooking, deleteBooking } = require('../controllers/bookingsController');

// List all bookings
router.get('/', authenticateToken, requireSafeRole('/', 'GET'))', authenticateToken, requireSafeRole('/bookings', 'GET'), getBookings);

// Create a booking
router.post('/', authenticateToken, requireSafeRole('/', 'POST'))', authenticateToken, requireSafeRole('/bookings', 'POST'), createBooking);

// Get booking by ID
router.get('/', authenticateToken, requireSafeRole('/', 'GET')):id', authenticateToken, requireSafeRole('/bookings/:id', 'GET'), getBookings);

// Update booking
router.put('/:id', authenticateToken, requireSafeRole('/:id', 'PUT'))', authenticateToken, requireSafeRole('/bookings/:id', 'PUT'), updateBooking);

// Delete booking
router.delete('/:id', authenticateToken, requireSafeRole('/:id', 'DELETE'))', authenticateToken, requireSafeRole('/bookings/:id', 'DELETE'), deleteBooking);

module.exports = router;
