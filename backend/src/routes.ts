import { Application } from 'express';
import { AuthController } from './controllers/auth.controller';
import { UserController } from './controllers/user.controller';
import { TaskController } from './controllers/task.controller';
import { DashboardController } from './controllers/dashboard.controller';
import { SettingsController } from './controllers/settings.controller';

export function registerRoutes(app: Application): void {
  const authController = new AuthController();
  const userController = new UserController();
  const taskController = new TaskController();
  const dashboardController = new DashboardController();
  const settingsController = new SettingsController();

  app.use('/api/auth', authController.router);
  app.use('/api/users', userController.router);
  app.use('/api/tasks', taskController.router);
  app.use('/api/dashboard', dashboardController.router);
  app.use('/api/settings', settingsController.router);
}
