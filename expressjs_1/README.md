# ExpressJS Course Submission (expressjs_1)

## Overview
This folder contains a complete Express project demonstrating the course requirements:
- Express app initialization
- At least two routes
- Custom middleware
- Static asset serving
- URL & query param usage
- JSON responses
- Use of Node built-in modules (fs, path)
- File writing to `logs/activity.log`
- Clear, modular structure

## How to run
1. Install:
   ```bash
   cd expressjs_1
   npm install
Run (development):

bash
Copy code
npm run dev
Run (production):

bash
Copy code
npm start
Endpoints to test
GET / → JSON welcome

GET /text → plain text

GET /utils/echo/:word → JSON { received: "<word>" }

GET /utils/math/add?a=1&b=2 → JSON { a, b, result }

Static: GET /index.html or GET / serves public/index.html

Files mapping to requirements
server.js — Express app, route mounting, static, middleware, startup write to logs.

routes/utils.js — echo & math routes (URL + query params).

middleware/logRequest.js — custom request logging middleware.

utils/fileWriter.js — demonstrates fs/path, writes logs/activity.log.

public/index.html — static asset served by express.

php
Copy code

---

## File: `expressjs_1/server.js`
```js
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const logRequest = require('./middleware/logRequest');
const { writeLog, ensureLogsDir } = require('./utils/fileWriter');
const utilsRouter = require('./routes/utils');

const PORT = process.env.PORT || 3000;
const app = express();

// Ensure logs directory exists
ensureLogsDir(path.join(__dirname, 'logs'));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logRequest);

// Serve static files from public
app.use(express.static(path.join(__dirname, 'public')));

// Basic routes
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Express server running', timestamp: new Date().toISOString() });
});

app.get('/text', (req, res) => {
  res.type('text/plain').send('This is a plain text endpoint from Express.');
});

// Mount utils router under /utils
app.use('/utils', utilsRouter);

// Error handler (simple)
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
app.listen(PORT, () => {
  const msg = `Express server started on port ${PORT} at ${new Date().toISOString()}`;
  console.log(msg);
  writeLog(msg);
});
