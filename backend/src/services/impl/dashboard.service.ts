import { DashboardServiceInterface } from '../interfaces/dashboard.service.interface';
import { TaskRepository } from '../../repositories/task.repository';
import { TaskStatus } from '../../domain/task.entity';

export class DashboardService implements DashboardServiceInterface {
  constructor(private readonly taskRepository = new TaskRepository()) {}

  async getSummary(): Promise<unknown> {
    const tasks = this.taskRepository.findAll();
    const now = new Date();

    return {
      totalTasks: tasks.length,
      todoTasks: tasks.filter((task) => task.status === TaskStatus.Todo).length,
      inProgressTasks: tasks.filter((task) => task.status === TaskStatus.InProgress).length,
      reviewTasks: tasks.filter((task) => task.status === TaskStatus.Review).length,
      doneTasks: tasks.filter((task) => task.status === TaskStatus.Done).length,
      overdueTasks: tasks.filter((task) => new Date(task.dueDate) < now).length,
      assignedTasks: tasks.filter((task) => Boolean(task.assigneeId)).length,
    };
  }
}
