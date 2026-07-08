import { TaskServiceInterface } from '../interfaces/task.service.interface';
import { CreateTaskRequestDto, UpdateTaskRequestDto } from '../../dto/task.dto';
import { validateBody } from '../../dto/validation';
import { AppError } from '../../exceptions/app-error';
import { TaskRepository } from '../../repositories/task.repository';
import { TaskEntity, TaskStatus } from '../../domain/task.entity';
import { v4 as uuidv4 } from 'uuid';

export class TaskService implements TaskServiceInterface {
  constructor(private readonly taskRepository = new TaskRepository()) {}

  async listTasks(page: number, pageSize: number, filters?: Record<string, unknown>): Promise<unknown> {
    const tasks = this.taskRepository.findAll();
    const filtered = tasks.filter((task) => {
      return Object.entries(filters || {}).every(([key, value]) => task[key as keyof TaskEntity] === value);
    });

    return {
      items: filtered.slice((page - 1) * pageSize, page * pageSize),
      pagination: {
        page,
        pageSize,
        totalItems: filtered.length,
        totalPages: Math.ceil(filtered.length / pageSize),
      },
    };
  }

  async getTaskById(taskId: string): Promise<unknown> {
    const task = this.taskRepository.findById(taskId);
    if (!task) {
      throw new AppError('TASK_NOT_FOUND', 'Task not found.', 404);
    }
    return task;
  }

  async createTask(input: unknown): Promise<unknown> {
    const dto = await validateBody(CreateTaskRequestDto, input);
    const task = new TaskEntity(uuidv4(), dto.title, dto.description, dto.priority, dto.dueDate, dto.status, dto.assigneeId ?? null);
    this.taskRepository.create(task);
    return task;
  }

  async updateTask(taskId: string, input: unknown): Promise<unknown> {
    const dto = await validateBody(UpdateTaskRequestDto, input);
    const updatedTask = this.taskRepository.update(taskId, dto);
    if (!updatedTask) {
      throw new AppError('TASK_NOT_FOUND', 'Task not found.', 404);
    }
    return updatedTask;
  }

  async deleteTask(taskId: string): Promise<unknown> {
    const deleted = this.taskRepository.delete(taskId);
    if (!deleted) {
      throw new AppError('TASK_NOT_FOUND', 'Task not found.', 404);
    }
    return { success: true };
  }

  async completeTask(taskId: string): Promise<unknown> {
    const updatedTask = this.taskRepository.update(taskId, { status: TaskStatus.Done });
    if (!updatedTask) {
      throw new AppError('TASK_NOT_FOUND', 'Task not found.', 404);
    }
    return updatedTask;
  }
}
