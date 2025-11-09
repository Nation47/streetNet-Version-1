// routes/voucherRoutes.js
import express from 'express';
import { createVoucher, listVouchers, assignVoucherToUser, getVoucherByCode } from '../controllers/voucherController.js';
import { protect, permit } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/', protect, permit('admin'), createVoucher);          // admin creates vouchers
router.get('/', protect, permit('admin','agent'), listVouchers);
router.post('/assign', protect, permit('admin'), assignVoucherToUser);
router.get('/code/:code', getVoucherByCode);                        // public (used by captive portal)

export default router;
