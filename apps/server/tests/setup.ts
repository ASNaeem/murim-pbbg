import { PrismaClient } from '@prisma/client';

process.env.DATABASE_URL = 'postgresql://postgres:root@localhost:5432/murimdbtest?schema=public';
process.env.JWT_SECRET = 'testsecret';
process.env.PORT = '4000';

// Reset DB before all tests
const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "characters", "users" RESTART IDENTITY CASCADE;`);
});

afterAll(async () => {
  await prisma.$disconnect();
});
