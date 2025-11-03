const { authenticateToken, requireRole } = require('../middleware/auth');
const { requireSafeRole } = require('../middleware/roles');
const fs = require('fs');
const path = require('path');

const routesDir = path.join(__dirname, 'routes');
const report = [];

const roleMap = {
  GET: ['admin', 'editor', 'viewer'],
  POST: ['admin', 'editor'],
  PUT: ['admin', 'editor'],
  DELETE: ['admin']
};

fs.readdirSync(routesDir).forEach(file => {
  if (!file.endsWith('.js')) return;

  const filePath = path.join(routesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  const updatedContent = content.replace(
    /requireSafeRole\([^\)]*\)/g,
    match => {
      // Detect the HTTP method from the line
      const line = content.split('\n').find(l => l.includes(match));
      const methodMatch = line.match(/router\.(get|post|put|delete)/i);
      const method = methodMatch ? methodMatch[1].toUpperCase() : 'GET';

      const roles = roleMap[method] || ['admin', 'editor', 'viewer'];
      report.push({
        file: filePath,
        line: line.trim(),
        updated: `requireSafeRole([${roles.map(r => `'${r}'`).join(', ')}])`
      });

      return `requireSafeRole([${roles.map(r => `'${r}'`).join(', ')}])`;
    }
  );

  fs.writeFileSync(filePath, updatedContent, 'utf8');
});

const reportPath = path.join(__dirname, 'route-auth-report.txt');
let reportText = 'Route Auth Update Report\n\n';
report.forEach(r => {
  reportText += `File: ${r.file}\nOriginal: ${r.line}\nUpdated: ${r.updated}\n\n`;
});
fs.writeFileSync(reportPath, reportText, 'utf8');

console.log(`🎉 All routes updated and audited!`);
console.log(`📄 Report generated at ${reportPath}`);
