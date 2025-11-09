// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  email: { type: String, unique: false, sparse: true }, // allow null/undefined
  phone: { type: String, unique: true, sparse: true },  // prefer phone as unique identity
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['user', 'agent', 'admin', 'houseUser'], 
    default: 'user' 
  },
  balance: { type: Number, default: 0 },          // wallet balance (optional)
  activeRouter: { type: mongoose.Schema.Types.ObjectId, ref: 'Router', default: null },
  createdAt: { type: Date, default: Date.now }
});

userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
}

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
