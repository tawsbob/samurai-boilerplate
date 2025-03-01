import { Router } from 'express';
import { AuthController } from '@/interfaces/http/controllers/AuthController';
import { AuthenticationService } from '@/application/auth/AuthenticationService';
import { PrismaUserRepository } from '@/infrastructure/persistence/PrismaUserRepository';
import { JwtTokenService } from '@/infrastructure/security/TokenService';
import { PrismaClient } from '@prisma/client';

export function createAuthRouter(): Router {
  const router = Router();
  const prisma = new PrismaClient();
  const userRepository = new PrismaUserRepository(prisma);
  const tokenService = new JwtTokenService(process.env.JWT_SECRET || 'your-secret-key');
  const authService = new AuthenticationService(userRepository, tokenService);
  const authController = new AuthController(authService);

  router.post('/register', (req, res) => authController.register(req, res));
  router.post('/login', (req, res) => authController.login(req, res));

  return router;
} 