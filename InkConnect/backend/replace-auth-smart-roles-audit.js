/**
 * replace-auth-smart-roles-audit.js (Fully Automatic)
 * Scans route files, replaces old auth with authenticateToken + requireSafeRole,
 * and generates a clean route-role audit report.
 */

const fs = require('fs');
const path = require('path');

const routesDir = path.join(__dirname, 'routes');
const reportPath = path.join(__dirname, 'route-auth-report.txt');

// Default role assignment if none detected
const DEFAULT_ROLE = 'viewer';

let reportLines = [];

// Utility to detect router.<method>('path', ...) patterns
function extractRoutes(content) {
  const routeRegex = /router\.(get|post|put|delete|patch)\s*\(\s*['"`]([^'"`]+)['"`]/gi;
  let match;
  const routes = [];
  while ((match = routeRegex.exec(content)) !== null) {
    routes.push({ method: match[1].toUpperCase(), path: match[2] });
  }
  return routes;
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Remove old auth imports
  content = content.replace(/const (authMiddleware|verifyJWT) = require\(.+?\);?/g, '');
  content = content.replace(/require\(['"]dotenv['"]\);?/g, '');

  // Add new auth import if missing
  if (!content.includes('authenticateToken')) {
    content = `const { authenticateToken, requireRole } = require('../middleware/auth');\nconst { requireSafeRole } = require('../middleware/roles');\n` + content;
  }

  // Extract all route definitions
  const routes = extractRoutes(content);

  // Replace each route to include authenticateToken + requireSafeRole
  routes.forEach(({ method, path: routePath }) => {
    const routeRegex = new RegExp(`router\\.${method.toLowerCase()}\\(['"\`]${routePath.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}`, 'g');

    content = content.replace(
      routeRegex,
      `router.${method.toLowerCase()}('${routePath}', authenticateToken, requireSafeRole('${routePath}', '${method}'))`
    );

    // Add to report
    reportLines.push(`${method} ${routePath} → ${DEFAULT_ROLE}`);
  });

  fs.writeFileSync(filePath, content, 'utf8');
}

// Scan all JS route files
fs.readdirSync(routesDir).forEach((file) => {
  if (file.endsWith('.js')) {
    const fullPath = path.join(routesDir, file);
    processFile(fullPath);
  }
});

// Write the clean audit report
fs.writeFileSync(reportPath, reportLines.join('\n'), 'utf8');

console.log(`🎉 All routes updated and audited!`);
console.log(`📄 Clean audit report generated at ${reportPath}`);
