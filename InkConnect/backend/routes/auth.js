// backend/routes/auth.js
import express from 'express';
import { register, login } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Register new user
router.post('/register', register);

// Login existing user
router.post('/login', login);

// Get current logged-in user
router.get('/me', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

export default router;
