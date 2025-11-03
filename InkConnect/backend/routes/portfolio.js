const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { requireSafeRole } = require('../middleware/roles');
const { getPortfolios, createPortfolio, updatePortfolio, deletePortfolio } = require('../controllers/portfolioController');

// List all portfolios
router.get('/', authenticateToken, requireSafeRole('/', 'GET'))', authenticateToken, requireSafeRole('/portfolio', 'GET'), getPortfolios);

// Create new portfolio
router.post('/', authenticateToken, requireSafeRole('/', 'POST'))', authenticateToken, requireSafeRole('/portfolio', 'POST'), createPortfolio);

// Get portfolio by ID
router.get('/', authenticateToken, requireSafeRole('/', 'GET')):id', authenticateToken, requireSafeRole('/portfolio/:id', 'GET'), getPortfolios);

// Update portfolio
router.put('/:id', authenticateToken, requireSafeRole('/:id', 'PUT'))', authenticateToken, requireSafeRole('/portfolio/:id', 'PUT'), updatePortfolio);

// Delete portfolio
router.delete('/:id', authenticateToken, requireSafeRole('/:id', 'DELETE'))', authenticateToken, requireSafeRole('/portfolio/:id', 'DELETE'), deletePortfolio);

module.exports = router;
