// controllers/routerController.js
import RouterModel from '../models/Router.js'
import Session from '../models/Session.js';
import Voucher from '../models/Voucher.js';
import shortid from 'shortid';

// Agents register router
export const registerRouter = async (req, res) => {
  try {
    const { name, identifier, macAddress, location } = req.body;
    const existing = await RouterModel.findOne({ identifier });
    if (existing) return res.status(400).json({ ok:false, message: 'Router identifier already registered' });

    const router = new RouterModel({
      name, identifier, macAddress, location, agent: req.user._id
    });
    await router.save();
    res.json({ ok:true, router });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok:false, message: 'Server error' });
  }
};

// router heartbeat: routers call this periodically with connected clients list
// body: { identifier, clients: [{mac, ip, rxBytes, txBytes}], uptime }
export const heartbeat = async (req, res) => {
  try {
    const { identifier, clients = [], uptime = 0 } = req.body;
    const router = await RouterModel.findOne({ identifier });
    if (!router) return res.status(404).json({ ok:false, message: 'Router not found' });

    router.lastHeartbeat = new Date();
    router.meta = { uptime, lastClientsCount: clients.length };
    await router.save();

    // update sessions for clients: for each client mac, update session.lastPing or create unknown placeholder
    for (const c of clients) {
      const mac = c.mac?.toLowerCase();
      if (!mac) continue;
      // find active session for this mac and router
      const session = await Session.findOne({ macAddress: mac, router: router._id, status: 'connected' });
      if (session) {
        session.lastPing = new Date();
        // optionally update usedMB from provided rx/tx (not exact conversion here)
        if (c.rxBytes && c.txBytes) {
          const totalBytes = (c.rxBytes + c.txBytes);
          const usedMB = Math.round(totalBytes / (1024*1024));
          session.usedMB = usedMB;
          // also reflect on voucher.usedMB
          const v = await Voucher.findById(session.voucher);
          if (v) { v.usedMB = session.usedMB; if (v.dataMB && v.usedMB >= v.dataMB) { v.status = 'used'; session.status = 'expired'; } await v.save(); }
        }
        await session.save();
      } else {
        // no active session found — ignore or optionally create guest session
      }
    }

    res.json({ ok:true, message: 'heartbeat processed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok:false, message: 'Server error' });
  }
};

// get routers for agent/admin
export const listRouters = async (req, res) => {
  const filter = req.user.role === 'agent' ? { agent: req.user._id } : {};
  const routers = await RouterModel.find(filter).sort({ lastHeartbeat: -1 });
  res.json({ ok:true, routers });
};
