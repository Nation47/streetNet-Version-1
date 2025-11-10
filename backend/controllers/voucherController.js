// controllers/voucherController.js
import Voucher from '../models/Voucher.js'
import User from '../models/User.js'
import shortid from 'shortid';

// Admin: create voucher plan(s) or single voucher
export const createVoucher = async (req, res) => {
  try {
    const { plan, price, dataMB, durationMinutes, qty } = req.body;
    const created = [];
    for (let i = 0; i < (qty || 1); i++) {
      const code = `ST-${shortid.generate().toUpperCase()}`;
      const v = new Voucher({
        code,
        plan,
        price,
        dataMB,
        durationMinutes,
        status: 'available'
      });
      await v.save();
      created.push(v);
    }
    res.json({ ok: true, created });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, message: 'Server error' });
  }
};

// list vouchers (admin)
export const listVouchers = async (req, res) => {
  const vouchers = await Voucher.find().sort({ createdAt: -1 }).limit(200);
  res.json({ ok: true, vouchers });
};

// user buys voucher (usually via payment webhook flow). Here we offer an endpoint to "buy" if payment confirmed.
export const assignVoucherToUser = async (req, res) => {
  try {
    const { voucherId, userId } = req.body;
    const voucher = await Voucher.findById(voucherId);
    if (!voucher) return res.status(404).json({ ok: false, message: 'Voucher not found' });
    if (voucher.status !== 'available') return res.status(400).json({ ok: false, message: 'Voucher not available' });

    voucher.buyer = userId;
    voucher.status = 'sold';
    voucher.expiresAt = null;
    await voucher.save();
    res.json({ ok: true, voucher });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, message: 'Server error' });
  }
};

// get voucher by code (used by captive portal)
export const getVoucherByCode = async (req, res) => {
  const { code } = req.params;
  const v = await Voucher.findOne({ code });
  if (!v) return res.status(404).json({ ok: false, message: 'Voucher not found' });
  res.json({ ok: true, voucher: v });
};
