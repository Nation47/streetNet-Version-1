// controllers/paymentController.js
import Payment from '../models/Payment.js';
import Voucher from '../models/Voucher.js';
import User from '../models/user.js';
import shortid from 'shortid';

/**
 * Simulate starting a payment: creates a pending Payment and returns a payment reference.
 * In real life you'd call M-Pesa API and wait for callback (webhook).
 */
export const startPayment = async (req, res) => {
  try {
    const { userId, amount } = req.body;
    const ref = `PMT-${shortid.generate().toUpperCase()}`;
    const p = new Payment({ user: userId || null, amount, reference: ref, status: 'pending' });
    await p.save();
    // Return reference that the client can "simulate" paying and webhook will confirm
    res.json({ ok:true, reference: ref, paymentId: p._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok:false, message: 'Server error' });
  }
};

/**
 * Mock webhook that M-Pesa would call when payment succeeds.
 * In our simulation, POST to /api/payments/webhook with body { reference, status: 'confirmed', metadata: {...} }
 * This will mark Payment confirmed and (optionally) create a voucher or credit user.
 */
export const paymentWebhook = async (req, res) => {
  try {
    const { reference, status, metadata } = req.body;
    const payment = await Payment.findOne({ reference });
    if (!payment) return res.status(404).json({ ok:false, message: 'Payment not found' });

    payment.status = status === 'confirmed' ? 'confirmed' : 'failed';
    payment.metadata = metadata || {};
    await payment.save();

    // Business logic when payment is confirmed:
    if (payment.status === 'confirmed') {
      // Example: create a voucher and assign to user (client used payment to buy voucher)
      // metadata can contain plan details: { plan:'1GB', price:1000, dataMB:1024 }
      const plan = metadata?.plan || 'custom';
      const price = metadata?.price || payment.amount || 1000;
      const dataMB = metadata?.dataMB || 1024;
      // create voucher
      const code = `ST-${shortid.generate().toUpperCase()}`;
      const voucher = new Voucher({
        code, plan, price, dataMB, status: 'sold', buyer: payment.user || null
      });
      await voucher.save();
      // Optionally notify user via response
      return res.json({ ok:true, message: 'Payment confirmed', voucherCode: voucher.code });
    }

    res.json({ ok:true, message: 'Payment processed', status: payment.status });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok:false, message: 'Server error' });
  }
};
