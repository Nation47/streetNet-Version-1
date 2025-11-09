// models/Session.js
import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  voucher: { type: mongoose.Schema.Types.ObjectId, ref: 'Voucher', required: true },
  router: { type: mongoose.Schema.Types.ObjectId, ref: 'Router', required: true },
  macAddress: { type: String, required: true }, // device MAC
  ipAddress: { type: String, default: null },
  sessionId: { type: String, unique: true, index: true },
  connectedAt: { type: Date, default: Date.now },
  lastPing: { type: Date, default: Date.now },
  usedMB: { type: Number, default: 0 },
  status: { type: String, enum: ['connected','disconnected','expired'], default: 'connected' }
});

export default mongoose.model('Session', sessionSchema);
