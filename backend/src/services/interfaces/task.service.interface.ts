export interface TaskServiceInterface {
  listTasks(page: number, pageSize: number, filters?: Record<string, unknown>): Promise<unknown>;
  getTaskById(taskId: string): Promise<unknown>;
  createTask(input: unknown): Promise<unknown>;
  updateTask(taskId: string, input: unknown): Promise<unknown>;
  deleteTask(taskId: string): Promise<unknown>;
  completeTask(taskId: string): Promise<unknown>;
}
