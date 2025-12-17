// backend/routes/requests.js
import express from 'express';
import { getRequests, getRequestById } from '../controllers/requestsController.js';

const router = express.Router();

router.get('/', getRequests);
router.get('/:id', getRequestById);

export default router;
