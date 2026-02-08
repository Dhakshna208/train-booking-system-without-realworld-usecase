import express from 'express';
import { addTrain, searchTrains } from '../controllers/trainController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';
import asyncHandler from '../middleware/asyncHandler.js';

const router = express.Router();

router.get('/search', asyncHandler(searchTrains));
router.post('/', authMiddleware, adminMiddleware, asyncHandler(addTrain));

export default router;
