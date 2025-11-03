// routes/portfolio.js
const express = require('express');
const router = express.Router();
const { authenticateToken, requireSafeRole } = require('../middleware/auth');
const { getPortfolios, createPortfolio, updatePortfolio, deletePortfolio } = require('../controllers/portfolioController');

// Get all portfolios — all roles allowed
router.get('/', authenticateToken, requireSafeRole(['admin', 'editor', 'viewer']), getPortfolios);

// Create portfolio — admin/editor only
router.post('/', authenticateToken, requireSafeRole(['admin', 'editor']), createPortfolio);

// Update portfolio — admin/editor only
router.put('/:id', authenticateToken, requireSafeRole(['admin', 'editor']), updatePortfolio);

// Delete portfolio — admin only
router.delete('/:id', authenticateToken, requireSafeRole(['admin']), deletePortfolio);

module.exports = router;
