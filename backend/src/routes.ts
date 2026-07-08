import { Application } from 'express';
import { AuthController } from './controllers/auth.controller';
import { UserController } from './controllers/user.controller';
import { TaskController } from './controllers/task.controller';
import { DashboardController } from './controllers/dashboard.controller';

export function registerRoutes(app: Application): void {
  const authController = new AuthController();
  const userController = new UserController();
  const taskController = new TaskController();
  const dashboardController = new DashboardController();

  app.use('/api/auth', authController.router);
  app.use('/api/users', userController.router);
  app.use('/api/tasks', taskController.router);
  app.use('/api/dashboard', dashboardController.router);
}
