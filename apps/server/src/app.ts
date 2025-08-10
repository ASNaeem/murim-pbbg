import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import characterRoutes from './routes/character';
import cors from 'cors';

dotenv.config();

const app = express();

// ✅ CORS: Must come first

// Get allowed origins from .env

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',').map(origin => origin.trim()) || [];


// Manual global OPTIONS handler to guarantee CORS headers
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
  const origin = typeof req.headers.origin === 'string' ? req.headers.origin : '';
  res.header('Access-Control-Allow-Origin', allowedOrigins.includes(origin) ? origin : '');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    return res.sendStatus(200);
  }
  next();
});

// Catch-all OPTIONS handler for CORS preflight (must be first)
app.options('*', cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(cors({
  origin: allowedOrigins,
  credentials: true, // only if you're using cookies
}));


app.use(express.json());

// Public routes
app.use('/api/auth', authRoutes);

// Protected gameplay routes
app.use('/api/character', characterRoutes);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});
export default app;