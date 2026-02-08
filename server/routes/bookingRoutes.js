import express from 'express';
import { cancelBooking, createBooking, myBookings } from '../controllers/bookingController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import asyncHandler from '../middleware/asyncHandler.js';

const router = express.Router();

router.use(authMiddleware);
router.post('/', asyncHandler(createBooking));
router.get('/my', asyncHandler(myBookings));
router.delete('/:id', asyncHandler(cancelBooking));

export default router;
