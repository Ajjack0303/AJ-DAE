// backend/routes/requests.js
import express from 'express';
import {
  getAllRequests,
  getRequestById
} from '../controllers/requestsController.js';

const router = express.Router();

// GET all requests
router.get('/', getAllRequests);

// GET request by ID
router.get('/:id', getRequestById);

export default router;
