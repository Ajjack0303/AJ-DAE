const express = require('express');
const router = express.Router();
const { authenticateToken, requireSafeRole } = require('../middleware/auth');
const { getClients, createClient, updateClient, deleteClient } = require('../controllers/clientsController');

router.get('/', authenticateToken, requireSafeRole(['admin', 'editor', 'viewer']), getClients);
router.post('/', authenticateToken, requireSafeRole(['admin', 'editor']), createClient);
router.put('/:id', authenticateToken, requireSafeRole(['admin', 'editor']), updateClient);
router.delete('/:id', authenticateToken, requireSafeRole(['admin']), deleteClient);

module.exports = router;
