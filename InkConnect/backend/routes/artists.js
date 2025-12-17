import express from 'express';
import { getArtists } from '../controllers/artistsController.js';

const router = express.Router();
router.get('/', getArtists);

export default router;
