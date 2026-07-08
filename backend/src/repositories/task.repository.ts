import { TaskEntity, TaskPriority, TaskStatus } from '../domain/task.entity';

export class TaskRepository {
  private readonly tasks: TaskEntity[] = [
    new TaskEntity('task_001', 'Prepare sprint demo', 'Finalize slides', TaskPriority.High, '2026-07-15', TaskStatus.Todo, 'usr_002'),
    new TaskEntity('task_002', 'Review PRs', 'Check open pull requests', TaskPriority.Medium, '2026-07-10', TaskStatus.InProgress, 'usr_001'),
  ];

  findAll(): TaskEntity[] {
    return this.tasks;
  }

  findById(id: string): TaskEntity | undefined {
    return this.tasks.find((task) => task.id === id);
  }

  create(task: TaskEntity): TaskEntity {
    this.tasks.push(task);
    return task;
  }

  update(id: string, updates: Partial<TaskEntity>): TaskEntity | undefined {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index === -1) {
      return undefined;
    }

    this.tasks[index] = { ...this.tasks[index], ...updates, updatedAt: new Date().toISOString() };
    return this.tasks[index];
  }

  delete(id: string): boolean {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index === -1) {
      return false;
    }

    this.tasks.splice(index, 1);
    return true;
  }
}
