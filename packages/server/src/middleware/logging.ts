import morgan from 'morgan';
import { Response, NextFunction } from 'express';
import logger from '@/lib/logger';
import { CustomRequest } from '@/types/express';

// Create a custom Morgan token for request ID
morgan.token('reqId', (req: CustomRequest) => req.id);

// Create a custom Morgan format
const morganFormat = ':reqId [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :response-time ms';

// Create a write stream for Morgan that writes to our Winston logger
const stream = {
  write: (message: string) => {
    logger.info(message.trim());
  },
};

// Create the Morgan middleware
export const httpLogger = morgan(morganFormat, { stream });

// Request ID middleware
export const requestId = (req: CustomRequest, _res: Response, next: NextFunction) => {
  req.id = Math.random().toString(36).substring(2, 15);
  next();
};

// Error logging middleware
export const errorLogger = (
  err: Error,
  req: CustomRequest,
  _res: Response,
  next: NextFunction
) => {
  logger.error('Error processing request', {
    error: {
      message: err.message,
      stack: err.stack,
    },
    request: {
      id: req.id,
      method: req.method,
      path: req.path,
      query: req.query,
      body: req.body,
    },
  });
  next(err);
}; 