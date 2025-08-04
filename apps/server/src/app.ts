import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import characterRoutes from './routes/character';

dotenv.config();

const app = express();
app.use(express.json());

// Public routes
app.use('/auth', authRoutes);

// Protected gameplay routes
app.use('/character', characterRoutes);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});
export default app;