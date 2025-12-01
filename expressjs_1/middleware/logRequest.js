/**
 * Simple request logging middleware
 * Logs to console and lets next middleware/process handle persistence via fileWriter
 */
module.exports = function logRequest(req, res, next) {
  const timestamp = new Date().toISOString();
  const msg = `[${timestamp}] ${req.method} ${req.originalUrl} - IP: ${req.ip}`;
  console.log(msg);
  // do not write file here synchronously (file writing via utils/fileWriter when needed)
  next();
};
