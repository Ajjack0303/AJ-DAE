const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = function (req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'Access token missing' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access token missing' });

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload; // { userId, username }
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};
