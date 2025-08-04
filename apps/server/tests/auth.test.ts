import request from 'supertest';
import { PrismaClient } from '@prisma/client';
import app from '../src/app';

const prisma = new PrismaClient();

beforeAll(async () => {
  // Reset DB before tests
  await prisma.user.deleteMany();
  await prisma.character.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('Auth API', () => {
  const testEmail = 'test@example.com';
  const testPassword = '123456';

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({ email: testEmail, password: testPassword, name: 'TestChar' });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe('User registered successfully');
  });

  it('should not allow duplicate registration', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({ email: testEmail, password: testPassword, name: 'TestChar2' });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Email already exists');
  });

  it('should login and return tokens', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: testEmail, password: testPassword });

    expect(res.status).toBe(200);
    expect(res.body.accessToken).toBeDefined();
    expect(res.body.refreshToken).toBeDefined();
  });

  it('should reject login with wrong password', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: testEmail, password: 'wrongpass' });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Invalid credentials');
  });
});
