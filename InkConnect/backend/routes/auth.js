const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { requireSafeRole } = require('../middleware/roles');
const { loginUser, registerUser, getMe } = require('../controllers/authController');

// Public routes
router.post('/login', authenticateToken, requireSafeRole('/login', 'POST'))', loginUser);
router.post('/register', authenticateToken, requireSafeRole('/register', 'POST'))', registerUser);

// Protected route
router.get('/me', authenticateToken, requireSafeRole('/me', 'GET'))', authenticateToken, requireSafeRole('/auth/me', 'GET'), getMe);

module.exports = router;
