import { NextFunction, Request, Response } from 'express';
import { AppError } from './app-error';

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      code: err.code,
      message: err.message,
      timestamp: new Date().toISOString(),
      details: err.details,
    });
    return;
  }

  console.error(err);
  res.status(500).json({
    code: 'INTERNAL_SERVER_ERROR',
    message: 'An unexpected error occurred.',
    timestamp: new Date().toISOString(),
  });
}
