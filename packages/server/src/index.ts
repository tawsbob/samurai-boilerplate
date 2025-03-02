import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import { PrismaClient } from '@prisma/client';
import { enhance } from '@zenstackhq/runtime';
import { ZenStackMiddleware } from "@zenstackhq/server/express";
import { createAuthRouter } from '@/interfaces/http/routes/authRoutes';
import { requestId, httpLogger, errorLogger } from '@/middleware/logging';
import logger from '@/lib/logger';
import { CustomRequest } from '@/types/express';

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());

// Logging middleware
app.use(requestId);
app.use(httpLogger);

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
    logger.info('Created temporary user', { userId: user.id });
    return user;
  }
  return existingUser;
}

// Initialize temporary user
createTempUser().catch((error) => {
  logger.error('Failed to create temporary user', { error });
});

// Initialize Prisma Client
const enhancedPrisma = enhance(prisma);

// Routes
app.use('/api/model', 
  ZenStackMiddleware({
    getPrisma: async (/*req: CustomRequest*/) => {
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

// Error logging middleware
app.use(errorLogger);

// Error handling middleware
app.use((_err: Error, _req: CustomRequest, res: express.Response, _next: express.NextFunction) => {
  res.status(500).json({
    error: 'Internal server error',
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
}); 