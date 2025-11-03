// backend/middleware/auth.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const tokenHeader = req.header('x-auth-token');
  const token = authHeader?.split(' ')[1] || tokenHeader;

  if (!token) {
    return res.status(401).json({ error: 'Access token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

// Middleware to enforce role-based access
const requireRole = (role) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
  if (req.user.role !== role) return res.status(403).json({ error: 'Forbidden' });
  next();
};

module.exports = { authenticateToken, requireRole };
