const fs = require('fs');
const path = require('path');

const LOG_DIR = path.join(__dirname, '..', 'logs');
const LOG_PATH = path.join(LOG_DIR, 'activity.log');

function ensureLogsDir(customPath) {
  const dir = customPath || LOG_DIR;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function writeLog(message) {
  try {
    ensureLogsDir();
    const line = `${new Date().toISOString()} - ${message}\n`;
    // append synchronously for demonstration (course requirement). In production, use async write.
    fs.appendFileSync(LOG_PATH, line, { encoding: 'utf8' });
  } catch (err) {
    console.error('Failed to write log:', err);
  }
}

module.exports = {
  ensureLogsDir,
  writeLog
};
