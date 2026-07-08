import { Router, Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/impl/auth.service';

export class AuthController {
  public readonly router = Router();

  constructor(private readonly authService = new AuthService()) {
    this.router.post('/register', this.register.bind(this));
    this.router.post('/login', this.login.bind(this));
    this.router.post('/logout', this.logout.bind(this));
  }

  private async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.authService.register(req.body);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  private async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.authService.login(req.body);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  private async logout(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.authService.logout();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
