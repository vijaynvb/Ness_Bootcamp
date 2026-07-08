import { apiClient } from './client';

export async function fetchTasks(page = 1, pageSize = 20, filters?: Record<string, string | undefined>) {
  const params = new URLSearchParams({ page: String(page), pageSize: String(pageSize) });

  Object.entries(filters ?? {}).forEach(([key, value]) => {
    if (value) {
      params.set(key, value);
    }
  });

  return apiClient.get(`/tasks?${params.toString()}`);
}

export async function createTask(payload: Record<string, unknown>) {
  return apiClient.post('/tasks', payload);
}

export async function updateTask(taskId: string, payload: Record<string, unknown>) {
  return apiClient.patch(`/tasks/${taskId}`, payload);
}

export async function completeTask(taskId: string) {
  return apiClient.patch(`/tasks/${taskId}/complete`);
}

export async function deleteTask(taskId: string) {
  return apiClient.delete(`/tasks/${taskId}`);
}
