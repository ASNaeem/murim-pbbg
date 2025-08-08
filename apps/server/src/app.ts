import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import characterRoutes from './routes/character';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, // only if you're using cookies or sessions
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