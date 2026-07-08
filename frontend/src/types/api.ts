export type UserRole = 'employee' | 'administrator';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  isActive: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  status: 'todo' | 'inProgress' | 'review' | 'done';
  assigneeId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface UserListResponse {
  items: User[];
  pagination: Pagination;
}

export interface TaskListResponse {
  items: Task[];
  pagination: Pagination;
}

export interface DashboardSummary {
  totalTasks: number;
  todoTasks: number;
  inProgressTasks: number;
  reviewTasks: number;
  doneTasks: number;
  overdueTasks: number;
  assignedTasks: number;
}
