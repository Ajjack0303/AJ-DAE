# NodeJS Core Course Submission (nodejs_1)

## Overview
This folder contains a pure Node.js project (no Express) demonstrating course requirements:
- `http` server
- Basic routing
- Use of built-in modules (`http`, `fs`, `path`)
- File writing to `logs/activity.log`
- Custom module usage

## How to run
1. Install (no deps):
   ```bash
   cd nodejs_1
   npm install
Start:

bash
Copy code
npm start
Default server port: 6001 (uses NODE_BASIC_PORT env var if set)

Endpoints to test
GET / → JSON { message: 'Hello from Node server' }

GET /text → plain text response

php
Copy code

---

## File: `nodejs_1/basicServer.js`
```js
const http = require('http');
const url = require('url');
const { writeLog, ensureLogsDir } = require('./fileWriter');

const PORT = process.env.NODE_BASIC_PORT || 6001;
ensureLogsDir();

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url, true);
  const pathname = parsed.pathname;

  // Simple routing
  if (req.method === 'GET' && pathname === '/') {
    const payload = JSON.stringify({ status: 'ok', message: 'Hello from Node server', timestamp: new Date().toISOString() });
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(payload);
    writeLog('Node basicServer: Responded to / with JSON');
    return;
  }

  if (req.method === 'GET' && pathname === '/text') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello (plain text) from Node basic server.');
    writeLog('Node basicServer: Responded to /text with plain text');
    return;
  }

  // Not found
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not Found' }));
  writeLog(`Node basicServer: 404 for ${pathname}`);
});

server.listen(PORT, () => {
  const msg = `Node basicServer listening on port ${PORT}`;
  console.log(msg);
  writeLog(msg);
});
