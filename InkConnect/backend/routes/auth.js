// routes/auth.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const { authenticateToken, requireSafeRole } = require('../middleware/auth');

// Public route
router.post('/login', loginUser);

// Protected route: only admin can register new users
router.post('/register', authenticateToken, requireSafeRole(['admin']), registerUser);

module.exports = router;
