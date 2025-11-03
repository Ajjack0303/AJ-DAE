const fs = require('fs');
const path = require('path');

const ROUTES_DIR = path.join(__dirname, 'routes'); // adjust if your routes folder is elsewhere

// Recursively get all .js files in routes folder
function getJsFiles(dir) {
  let results = [];
  fs.readdirSync(dir).forEach(file => {
    const filepath = path.join(dir, file);
    const stat = fs.statSync(filepath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getJsFiles(filepath));
    } else if (file.endsWith('.js')) {
      results.push(filepath);
    }
  });
  return results;
}

function replaceAuth(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace old middleware imports
  content = content.replace(
    /const (verifyJWT|authMiddleware) = require\(['"].*['"]\);?/g,
    "const { authenticateToken, requireRole } = require('../middleware/auth');"
  );

  // Replace usage in routes
  content = content.replace(/\bverifyJWT\b/g, 'authenticateToken');
  content = content.replace(/\bauthMiddleware\b/g, 'authenticateToken');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Updated auth in ${filePath}`);
}

// Run on all route files
const routeFiles = getJsFiles(ROUTES_DIR);
routeFiles.forEach(replaceAuth);

console.log('🎉 All routes updated to use auth.js');
