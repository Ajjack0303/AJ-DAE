// backend/routes/messages.js
import express from 'express';
import {
  getMessages,
  getMessageById,
  createMessage,
  updateMessage,
  deleteMessage,
} from '../controllers/messagesController.js';
import { authenticateToken, requireSafeRole } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticateToken, getMessages);
router.get('/:id', authenticateToken, getMessageById);
router.post('/', authenticateToken, requireSafeRole('admin'), createMessage);
router.put('/:id', authenticateToken, requireSafeRole('admin'), updateMessage);
router.delete('/:id', authenticateToken, requireSafeRole('admin'), deleteMessage);

export default router;
