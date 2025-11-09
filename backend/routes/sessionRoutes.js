// routes/sessionRoutes.js
import express from 'express';
import { captiveVerifyAndCreate, endSession } from '../controllers/sessionController.js';
import { protect, permit } from '../middleware/authMiddleware.js';
const router = express.Router();

// Captive portal calls this public endpoint to verify voucher & create session.
// In production, validate router identity with a secret.
router.post('/captive/verify', captiveVerifyAndCreate);

// End session (router or admin)
router.post('/end', protect, permit('agent','admin'), endSession);

export default router;
