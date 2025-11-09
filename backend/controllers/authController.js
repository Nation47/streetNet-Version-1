// controllers/authController.js
import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import generateToken from '../utils/generateTokens.js';

const SALT_ROUNDS = 10;

export const register = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;
    if (!phone) return res.status(400).json({ ok: false, message: 'Phone is required' });

    // check existing by phone
    const existing = await User.findOne({ phone });
    if (existing) return res.status(400).json({ ok: false, message: 'Phone already registered' });

    // For houseUser role, use HOUSE_PASSWORD from env as canonical password
    let hashed;
    if (role === 'houseUser') {
      const housePass = process.env.HOUSE_PASSWORD || 'sharedPassword';
      hashed = await bcrypt.hash(housePass, SALT_ROUNDS);
    } else {
      if (!password) return res.status(400).json({ ok: false, message: 'Password is required' });
      hashed = await bcrypt.hash(password, SALT_ROUNDS);
    }

    const user = new User({
      name: name || '',
      email: email || undefined,
      phone,
      password: hashed,
      role: role || 'user'
    });

    await user.save();

    const token = generateToken(user);
    res.status(201).json({ ok: true, user: user.toJSON(), token });
  } catch (err) {
    console.error('Register err:', err);
    res.status(500).json({ ok: false, message: 'Server error' });
  }
};

export const login = async (req, res) => {
  try {
    const { phone, email, password, role } = req.body;

    // prefer login by phone, fallback to email
    const query = phone ? { phone } : email ? { email } : null;
    if (!query) return res.status(400).json({ ok: false, message: 'Provide phone or email' });

    const user = await User.findOne(query);
    // If user not found and trying to login as houseUser, allow dynamic houseUser creation? 
    if (!user) return res.status(400).json({ ok: false, message: 'Invalid credentials' });

    // For houseUser role login: allow shared password
    if (user.role === 'houseUser') {
      const housePass = process.env.HOUSE_PASSWORD || 'streetnet-house';
      const match = password === housePass || await bcrypt.compare(password, user.password);
      if (!match) return res.status(401).json({ ok: false, message: 'Invalid credentials' });
    } else {
      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(401).json({ ok: false, message: 'Invalid credentials' });
    }

    const token = generateToken(user);
    res.json({ ok: true, user: user.toJSON(), token });
  } catch (err) {
    console.error('Login err:', err);
    res.status(500).json({ ok: false, message: 'Server error' });
  }
};
