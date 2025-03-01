import request from 'supertest';
import express from 'express';
import { createAuthRouter } from '@/interfaces/http/routes/authRoutes';
import { prisma } from '../../setup';

describe('Registration API', () => {
  const app = express();
  app.use(express.json());
  app.use('/auth', createAuthRouter());

  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  it('should successfully register a new user', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'StrongPass123!'
      });

    expect(response.status).toBe(201);
    expect(response.body.user).toHaveProperty('id');
    expect(response.body.user.name).toBe('Test User');
    expect(response.body.user.email).toBe('test@example.com');
    expect(response.body).toHaveProperty('token');
  });

  it('should register a user without a name', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({
        email: 'noname@example.com',
        password: 'StrongPass123!'
      });

    expect(response.status).toBe(201);
    expect(response.body.user).toHaveProperty('id');
    expect(response.body.user.email).toBe('noname@example.com');
    expect(response.body.user.name).toBeNull();
    expect(response.body).toHaveProperty('token');
  });

  it('should return 400 for missing email', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({
        name: 'Test User',
        password: 'StrongPass123!'
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Email is required');
  });

  it('should return 400 for missing password', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com'
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Password is required');
  });

  it('should return 400 for invalid email format', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({
        name: 'Test User',
        email: 'invalid-email',
        password: 'StrongPass123!'
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Invalid email format');
  });

  it('should return 400 for weak password', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'weak'
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character');
  });

  it('should prevent duplicate email registration', async () => {
    // First registration
    await request(app)
      .post('/auth/register')
      .send({
        name: 'Test User',
        email: 'duplicate@example.com',
        password: 'StrongPass123!'
      });

    // Second registration with same email
    const response = await request(app)
      .post('/auth/register')
      .send({
        name: 'Another User',
        email: 'duplicate@example.com',
        password: 'StrongPass123!'
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Email already registered');
  });
}); 