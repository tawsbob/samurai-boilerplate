import { Response } from 'express';
import { AuthenticationService, RegistrationData } from '@/application/auth/AuthenticationService';
import logger from '@/lib/logger';
import { CustomRequest } from '@/types/express';

export class AuthController {
  constructor(private authService: AuthenticationService) {}

  public async register(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { email, password, name } = req.body;

      if (!email) {
        logger.warn('Registration attempt without email', { requestId: req.id });
        res.status(400).json({ error: 'Email is required' });
        return;
      }

      if (!password) {
        logger.warn('Registration attempt without password', { requestId: req.id });
        res.status(400).json({ error: 'Password is required' });
        return;
      }

      const registrationData: RegistrationData = {
        email,
        password,
        name
      };

      logger.debug('Attempting user registration', { 
        requestId: req.id,
        email,
        name
      });

      const result = await this.authService.register(registrationData);
      
      logger.info('User registered successfully', {
        requestId: req.id,
        userId: result.user.id,
        email: result.user.email
      });

      res.status(201).json(result);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Invalid email format') {
          logger.warn('Invalid email format in registration', {
            requestId: req.id,
            email: req.body.email
          });
          res.status(400).json({ error: error.message });
          return;
        }
        if (error.message === 'Invalid password format') {
          logger.warn('Invalid password format in registration', {
            requestId: req.id,
            email: req.body.email
          });
          res.status(400).json({ 
            error: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'
          });
          return;
        }
        if (error.message === 'Email already registered') {
          logger.warn('Duplicate email registration attempt', {
            requestId: req.id,
            email: req.body.email
          });
          res.status(400).json({ error: error.message });
          return;
        }
      }

      logger.error('Registration error', {
        requestId: req.id,
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });

      res.status(500).json({
        error: 'Internal server error',
      });
    }
  }

  public async login(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        logger.warn('Login attempt without credentials', {
          requestId: req.id,
          email: email || 'not provided'
        });
        res.status(400).json({ error: 'Email and password are required' });
        return;
      }

      logger.debug('Attempting user login', {
        requestId: req.id,
        email
      });

      const result = await this.authService.login(email, password);

      logger.info('User logged in successfully', {
        requestId: req.id,
        userId: result.user.id,
        email: result.user.email
      });

      res.status(200).json(result);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Invalid credentials') {
          logger.warn('Invalid credentials in login attempt', {
            requestId: req.id,
            email: req.body.email
          });
          res.status(401).json({ error: error.message });
          return;
        }
      }

      logger.error('Login error', {
        requestId: req.id,
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });

      res.status(500).json({
        error: 'Internal server error',
      });
    }
  }
} 