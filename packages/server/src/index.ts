import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import { PrismaClient } from '@prisma/client';
import { enhance } from '@zenstackhq/runtime';
import { ZenStackMiddleware } from "@zenstackhq/server/express";
import type { Request } from 'express';
import { createAuthRouter } from '@/interfaces/http/routes/authRoutes';

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());

// Create a temporary user if it doesn't exist
async function createTempUser() {
  const existingUser = await prisma.user.findFirst({
    where: { email: 'temp@example.com' }
  });

  if (!existingUser) {
    const user = await prisma.user.create({
      data: {
        email: 'temp@example.com',
        password: 'temp123',
        name: 'Temporary User'
      }
    });
    console.log('Created temporary user:', user.id);
    return user;
  }
  return existingUser;
}

// Initialize temporary user
createTempUser().catch(console.error);

// Initialize Prisma Client
const enhancedPrisma = enhance(prisma);

// Routes
app.use('/api/model', 
  ZenStackMiddleware({
    getPrisma: async (req: Request) => {
      const user = await prisma.user.findFirst({
        where: { email: 'temp@example.com' }
      });
      
      if (!user) {
        throw new Error('User not found');
      }
      
      return enhancedPrisma;
    }
  })
);

app.use('/api/auth', createAuthRouter());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}); 