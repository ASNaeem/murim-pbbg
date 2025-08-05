import dotenv from 'dotenv';
dotenv.config({ path: '.env.test' });  // <-- load env first

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

beforeAll(async () => {
  // Ensure DB schema is migrated before tests or migrations run manually (see next step)
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "characters", "users" RESTART IDENTITY CASCADE;`);
});

afterAll(async () => {
  await prisma.$disconnect();
});
