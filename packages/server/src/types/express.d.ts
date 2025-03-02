import { Request } from 'express';

export interface CustomRequest extends Request {
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      id: string;
    }
  }
} 