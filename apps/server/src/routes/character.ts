import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, AuthRequest } from '../middleware/authMiddleware';

const prisma = new PrismaClient();
const router = Router();


router.get('/me', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.userId;
    const character = await prisma.character.findUnique({
      where: { userId },
    });

    if (!character) {
      return res.status(404).json({ error: 'Character not found' });
    }

    res.json(character);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Train endpoint
router.post('/train', authenticateToken, async (req: AuthRequest, res) => {
  const userId = req.user!.userId;
  const { stat } = req.body;
  const validStats = [
    'attack', 'defense', 'evasion', 'accuracy'
  ];
  if (!validStats.includes(stat)) {
    return res.status(400).json({ error: 'You can only train attack, defense, evasion, or accuracy.' });
  }
  try {
    const character = await prisma.character.findUnique({ where: { userId } });
    if (!character) return res.status(404).json({ error: 'Character not found' });
    if (character.stamina < 10) {
      return res.status(400).json({ error: 'Not enough stamina to train.' });
    }
    // Increase stat by 1, decrease stamina by 10
    const updated = await prisma.character.update({
      where: { userId },
      data: {
        [stat]: { increment: 1 },
        stamina: { decrement: 10 },
      },
    });
    res.json({ message: `Trained ${stat}!`, character: updated });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

export default router;
