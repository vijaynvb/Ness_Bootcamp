import { apiClient } from './client';

export async function fetchDashboardSummary() {
  return apiClient.get('/dashboard');
}
