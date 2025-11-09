// models/Router.js
import mongoose from 'mongoose';

const routerSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  identifier: { type: String, unique: true }, // e.g., router serial or generated id
  macAddress: { type: String, default: '' },
  location: { type: String, default: '' },
  agent: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }, // agent who owns this router
  status: { type: String, enum: ['active','inactive'], default: 'active' },
  lastHeartbeat: { type: Date, default: Date.now },
  meta: { type: Object, default: {} }
});

export default mongoose.model('Router', routerSchema);
