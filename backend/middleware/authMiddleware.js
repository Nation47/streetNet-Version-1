// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/user.js'

export const protect = async (req, res, next) => {
  let token = null;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) return res.status(401).json({ ok: false, message: 'Not authorized, token missing' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(401).json({ ok: false, message: 'Not authorized' });
    req.user = user;
    next();
  } catch (err) {
    console.error('Auth err', err);
    res.status(401).json({ ok: false, message: 'Token invalid' });
  }
};

// role-check middleware generator
export const permit = (...allowedRoles) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ ok: false, message: 'Not authorized' });
  if (!allowedRoles.includes(req.user.role)) {
    return res.status(403).json({ ok: false, message: 'Forbidden: insufficient role' });
  }
  next();
};
