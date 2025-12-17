// backend/routes/payments.js
import express from 'express';
import {
  getPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
} from '../controllers/paymentsController.js';
import { authenticateJWT } from '../middleware/auth.js';

const router = express.Router();

// Authenticated users can view payments
router.get('/', authenticateJWT, getPayments);
router.get('/:id', authenticateJWT, getPaymentById);

// Authenticated users can create/update/delete payments
router.post('/', authenticateJWT, createPayment);
router.put('/:id', authenticateJWT, updatePayment);
router.delete('/:id', authenticateJWT, deletePayment);

export default router;
