// server.js
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';

// routes
import voucherRoutes from './routes/voucherRoutes.js';
import authRoutes from './routes/authRoutes.js';
import routerRoutes from './routes/routerRoutes.js';
import sessionRoutes from './routes/sessionRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(morgan('dev'));

app.get('/', (req, res) => res.send('StreetNet API Running'));

// routes
app.use('/api/auth', authRoutes);
app.use('/api/vouchers', voucherRoutes);
app.use('/api/routers', routerRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/payments', paymentRoutes);

// protected route
import { protect, permit } from './middleware/authMiddleware.js';
app.get('/api/protected', protect, (req, res) => {
  res.json({ ok: true, message: 'Authenticated', user: req.user });
});

// admin-only route
app.get('/api/admin-only', protect, permit('admin'), (req, res) => {
  res.json({ ok: true, message: 'Welcome admin' });
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
