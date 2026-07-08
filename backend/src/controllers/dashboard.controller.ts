import { Router, Request, Response, NextFunction } from 'express';
import { DashboardService } from '../services/impl/dashboard.service';

export class DashboardController {
  public readonly router = Router();

  constructor(private readonly dashboardService = new DashboardService()) {
    this.router.get('/', this.getSummary.bind(this));
  }

  private async getSummary(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.dashboardService.getSummary();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
