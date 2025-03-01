import { PrismaClient } from '@prisma/client';

// Mock environment variables
process.env.JWT_SECRET = 'test-secret';
process.env.DATABASE_URL = 'postgresql://postgres:postgres@localhost:5432/samurai_db';

// Global test timeout
jest.setTimeout(10000);

// Create a single PrismaClient instance
export const prisma = new PrismaClient();

// Global beforeAll hook
beforeAll(async () => {
  // Clean database before all tests
  await prisma.user.deleteMany();
});

// Global afterAll hook
afterAll(async () => {
  // Clean database after all tests
  await prisma.user.deleteMany();
  await prisma.$disconnect();
}); 