import { apiClient } from './client';

export async function fetchUsers(page = 1, pageSize = 20) {
  return apiClient.get(`/users?page=${page}&pageSize=${pageSize}`);
}

export async function createUser(payload: Record<string, unknown>) {
  return apiClient.post('/users', payload);
}

export async function updateUser(userId: string, payload: Record<string, unknown>) {
  return apiClient.patch(`/users/${userId}`, payload);
}

export async function deleteUser(userId: string) {
  return apiClient.delete(`/users/${userId}`);
}
