const express = require('express');
const router = express.Router();
const { authenticateToken, requireSafeRole } = require('../middleware/auth');
const { getProjects, createProject, updateProject, deleteProject } = require('../controllers/projectsController');

router.get('/', authenticateToken, requireSafeRole(['admin', 'editor', 'viewer']), getProjects);
router.post('/', authenticateToken, requireSafeRole(['admin', 'editor']), createProject);
router.put('/:id', authenticateToken, requireSafeRole(['admin', 'editor']), updateProject);
router.delete('/:id', authenticateToken, requireSafeRole(['admin']), deleteProject);

module.exports = router;
