import express from 'express';
import { getResponses, getResponseByRequestId } from '../controllers/requestResponsesController.js';

const router = express.Router();

router.get('/', getResponses);
router.get('/:id', getResponseByRequestId);

export default router;
