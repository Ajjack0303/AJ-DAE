// backend/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import prisma from '../prismaClient.js';

// Protect routes (authenticated users only)
export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user info to request
      req.user = await prisma.user.findUnique({ where: { id: decoded.id } });
      if (!req.user) return res.status(401).json({ error: 'User not found' });

      next();
    } catch (err) {
      console.error(err);
      res.status(401).json({ error: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ error: 'No token, authorization denied' });
  }
};

// Admin-only access
export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Admin access only' });
  }
};
