// models/Payment.js
import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  amount: { type: Number, required: true },
  method: { type: String, default: 'mpesa' },
  reference: { type: String, unique: true },
  status: { type: String, enum: ['pending','confirmed','failed'], default: 'pending' },
  metadata: { type: Object, default: {} },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Payment', paymentSchema);
