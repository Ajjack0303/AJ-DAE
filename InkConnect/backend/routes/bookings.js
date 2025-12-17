// backend/routes/bookings.js
import express from 'express';
import {
  getBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
} from '../controllers/bookingsController.js';
import { authenticateJWT } from '../middleware/auth.js';

const router = express.Router();

// Authenticated users can view bookings
router.get('/', authenticateJWT, getBookings);
router.get('/:id', authenticateJWT, getBookingById);

// Authenticated users can create/update/delete their bookings
router.post('/', authenticateJWT, createBooking);
router.put('/:id', authenticateJWT, updateBooking);
router.delete('/:id', authenticateJWT, deleteBooking);

export default router;
