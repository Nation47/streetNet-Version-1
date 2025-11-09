// routes/routerRoutes.js
import express from 'express';
import { registerRouter, heartbeat, listRouters } from '../controllers/routerController.js';
import { protect, permit } from '../middleware/authMiddleware.js';
const router = express.Router();

// Agents register routers
router.post('/register', protect, permit('agent'), registerRouter);

// Router heartbeat (should be secured with a shared secret in prod). For now allow basic auth or token.
// We'll allow public for testing but you should secure in production:
router.post('/heartbeat', heartbeat);

router.get('/', protect, permit('agent','admin'), listRouters);

export default router;
