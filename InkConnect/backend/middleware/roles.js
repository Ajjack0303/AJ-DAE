// roles.js
const roleMap = {
  '/artists': { GET: ['admin','viewer'], POST: ['admin'] },
  '/artists/:id': { GET: ['admin','viewer'], PUT: ['admin'], DELETE: ['admin'] },
  '/auth/login': { POST: ['public'] },
  '/auth/register': { POST: ['public'] },
  '/auth/me': { GET: ['admin','viewer'] },
  '/bookings': { GET: ['admin','viewer'], POST: ['viewer'] },
  '/bookings/:id': { GET: ['admin','viewer'], PUT: ['admin'], DELETE: ['admin'] },
  '/portfolio': { GET: ['admin','viewer'], POST: ['admin','artist'] },
  '/portfolio/:id': { GET: ['admin','viewer'], PUT: ['admin','artist'], DELETE: ['admin','artist'] }
};

function requireSafeRole(route, method) {
  return (req, res, next) => {
    const allowedRoles = roleMap[route]?.[method];
    if (!allowedRoles || allowedRoles.includes('public')) return next();
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
}

module.exports = { roleMap, requireSafeRole };
