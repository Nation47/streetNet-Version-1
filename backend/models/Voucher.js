// models/Voucher.js
import mongoose from 'mongoose';

const voucherSchema = new mongoose.Schema({
  code: { type: String, unique: true, index: true },
  plan: { type: String },                 // e.g., '1GB', '5GB', 'daily'
  price: { type: Number, default: 0 },
  dataMB: { type: Number, default: 0 },   // MB included
  durationMinutes: { type: Number, default: 1440 }, // fallback
  status: { type: String, enum: ['available','sold','active','used','expired'], default: 'available' },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  router: { type: mongoose.Schema.Types.ObjectId, ref: 'Router', default: null }, // optional preassign
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, default: null },
  activatedAt: { type: Date, default: null },
  usedMB: { type: Number, default: 0 }
});

export default mongoose.model('Voucher', voucherSchema);
