import { Router, Request, Response, NextFunction } from 'express';
import { TaskService } from '../services/impl/task.service';

export class TaskController {
  public readonly router = Router();

  constructor(private readonly taskService = new TaskService()) {
    this.router.get('/', this.listTasks.bind(this));
    this.router.post('/', this.createTask.bind(this));
    this.router.get('/:taskId', this.getTaskById.bind(this));
    this.router.patch('/:taskId', this.updateTask.bind(this));
    this.router.delete('/:taskId', this.deleteTask.bind(this));
    this.router.patch('/:taskId/complete', this.completeTask.bind(this));
  }

  private async listTasks(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = Number(req.query.page ?? 1);
      const pageSize = Number(req.query.pageSize ?? 20);
      const filters = {
        status: req.query.status,
        priority: req.query.priority,
        assigneeId: req.query.assigneeId,
      };
      const result = await this.taskService.listTasks(page, pageSize, filters);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  private async createTask(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.taskService.createTask(req.body);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  private async getTaskById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.taskService.getTaskById(req.params.taskId);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  private async updateTask(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.taskService.updateTask(req.params.taskId, req.body);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  private async deleteTask(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.taskService.deleteTask(req.params.taskId);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  private async completeTask(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.taskService.completeTask(req.params.taskId);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
