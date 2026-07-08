export enum TaskPriority {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
}

export enum TaskStatus {
  Todo = 'todo',
  InProgress = 'inProgress',
  Review = 'review',
  Done = 'done',
}

export class TaskEntity {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public priority: TaskPriority,
    public dueDate: string,
    public status: TaskStatus,
    public assigneeId: string | null = null,
    public createdAt: string = new Date().toISOString(),
    public updatedAt: string = new Date().toISOString(),
  ) {}
}
