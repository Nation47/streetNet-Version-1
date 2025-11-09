// controllers/sessionController.js
import Voucher from '../models/Voucher.js';
import RouterModel from '../models/Router.js';
import Session from '../models/Session.js';
import shortid from 'shortid';

// Captive portal calls this to verify voucher & create session
// body: { routerIdentifier, voucherCode, clientMac, clientIp }
export const captiveVerifyAndCreate = async (req, res) => {
  try {
    const { routerIdentifier, voucherCode, clientMac, clientIp } = req.body;
    const router = await RouterModel.findOne({ identifier: routerIdentifier });
    if (!router) return res.status(404).json({ ok:false, message: 'Router not found' });

    const voucher = await Voucher.findOne({ code: voucherCode });
    if (!voucher) return res.status(404).json({ ok:false, message: 'Voucher not found' });

    if (voucher.status === 'available') {
      return res.status(400).json({ ok:false, message: 'Voucher is not sold/assigned' });
    }
    if (voucher.status === 'used' || voucher.status === 'expired') {
      return res.status(400).json({ ok:false, message: 'Voucher is no longer valid' });
    }

    // If voucher has data limit and usedMB >= dataMB -> expire
    if (voucher.dataMB && voucher.usedMB >= voucher.dataMB) {
      voucher.status = 'used';
      await voucher.save();
      return res.status(400).json({ ok:false, message: 'Voucher exhausted' });
    }

    // create session
    const sessionId = `S-${shortid.generate()}`;
    const session = new Session({
      voucher: voucher._id,
      router: router._id,
      macAddress: clientMac.toLowerCase(),
      ipAddress: clientIp || null,
      sessionId,
      status: 'connected'
    });
    await session.save();

    // mark voucher active
    voucher.status = 'active';
    voucher.activatedAt = new Date();
    voucher.router = router._id;
    await voucher.save();

    // return allow signal for router/captive portal
    res.json({ ok:true, action: 'allow', sessionId, expiresInMinutes: voucher.durationMinutes || 1440 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok:false, message: 'Server error' });
  }
};

// router or admin can end session
export const endSession = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const session = await Session.findOne({ sessionId });
    if (!session) return res.status(404).json({ ok:false, message: 'Session not found' });

    session.status = 'disconnected';
    await session.save();

    // mark voucher used/expired if applicable
    const voucher = await Voucher.findById(session.voucher);
    if (voucher) {
      voucher.status = 'used';
      await voucher.save();
    }

    res.json({ ok:true, message: 'Session ended' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok:false, message: 'Server error' });
  }
};
