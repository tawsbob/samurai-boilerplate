import { Request, Response } from 'express';
import { AuthenticationService, RegistrationData } from '@/application/auth/AuthenticationService';
import { UserRepository } from '@/domain/user/UserRepository';

export class AuthController {
  constructor(private authService: AuthenticationService) {}

  public async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, password, name } = req.body;

      if (!email) {
        res.status(400).json({ error: 'Email is required' });
        return;
      }

      if (!password) {
        res.status(400).json({ error: 'Password is required' });
        return;
      }

      const registrationData: RegistrationData = {
        email,
        password,
        name
      };

      const result = await this.authService.register(registrationData);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Invalid email format') {
          res.status(400).json({ error: error.message });
          return;
        }
        if (error.message === 'Invalid password format') {
          res.status(400).json({ 
            error: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'
          });
          return;
        }
        if (error.message === 'Email already registered') {
          res.status(400).json({ error: error.message });
          return;
        }
      }

      console.error('Registration error:', error);
      res.status(500).json({
        error: 'Internal server error',
      });
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ error: 'Email and password are required' });
        return;
      }

      const result = await this.authService.login(email, password);
      res.status(200).json(result);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Invalid credentials') {
          res.status(401).json({ error: error.message });
          return;
        }
      }

      console.error('Login error:', error);
      res.status(500).json({
        error: 'Internal server error',
      });
    }
  }
} 