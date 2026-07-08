import { apiClient } from './client';

export async function login(email: string, password: string) {
  return apiClient.post('/auth/login', { email, password });
}

export async function register(payload: Record<string, unknown>) {
  return apiClient.post('/auth/register', payload);
}

export async function logout() {
  return apiClient.post('/auth/logout');
}
