const express = require('express');
const router = express.Router();

/**
 * GET /utils/echo/:word
 * URL param example: /utils/echo/hello
 * Response: { received: "hello" }
 */
router.get('/echo/:word', (req, res) => {
  const { word } = req.params;
  res.json({ received: word });
});

/**
 * GET /utils/math/add?a=1&b=2
 * Query params example: ?a=1&b=2
 * Response: { a: 1, b: 2, result: 3 }
 */
router.get('/math/add', (req, res) => {
  const a = Number(req.query.a);
  const b = Number(req.query.b);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    return res.status(400).json({ error: 'Query parameters a and b must be numbers.' });
  }

  res.json({ a, b, result: a + b });
});

module.exports = router;
