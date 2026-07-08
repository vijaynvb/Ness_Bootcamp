import { Router, Request, Response, NextFunction } from 'express';
import { UserService } from '../services/impl/user.service';

export class UserController {
  public readonly router = Router();

  constructor(private readonly userService = new UserService()) {
    this.router.get('/', this.listUsers.bind(this));
    this.router.post('/', this.createUser.bind(this));
    this.router.get('/:userId', this.getUserById.bind(this));
    this.router.patch('/:userId', this.updateUser.bind(this));
    this.router.delete('/:userId', this.deleteUser.bind(this));
  }

  private async listUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = Number(req.query.page ?? 1);
      const pageSize = Number(req.query.pageSize ?? 20);
      const result = await this.userService.listUsers(page, pageSize);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  private async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.userService.createUser(req.body);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  private async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.userService.getUserById(req.params.userId);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  private async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.userService.updateUser(req.params.userId, req.body);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  private async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.userService.deleteUser(req.params.userId);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
