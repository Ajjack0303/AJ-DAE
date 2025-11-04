const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient
} = require('../controllers/clientsController');

router.get('/', authenticateToken, getClients);
router.get('/:id', authenticateToken, getClientById);
router.post('/', authenticateToken, createClient);
router.put('/:id', authenticateToken, updateClient);
router.delete('/:id', authenticateToken, deleteClient);

module.exports = router;
