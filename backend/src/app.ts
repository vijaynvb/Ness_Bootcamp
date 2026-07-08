import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { registerRoutes } from './routes';
import { errorHandler } from './exceptions/global-exception.handler';

export function createApp(): Application {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json());

  registerRoutes(app);

  app.use(errorHandler);

  return app;
}
