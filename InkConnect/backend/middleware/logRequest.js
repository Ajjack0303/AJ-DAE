// backend/middleware/logRequest.js
// Logs every incoming request

const logRequest = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
};

export default logRequest;
