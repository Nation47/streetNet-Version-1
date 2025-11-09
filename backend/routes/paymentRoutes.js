// routes/paymentRoutes.js
import express from 'express';
import { startPayment, paymentWebhook } from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

// Start a mock payment (client)
router.post('/start', protect, startPayment);

// Webhook - public; MPesa would call here
router.post('/webhook', paymentWebhook);

export default router;
