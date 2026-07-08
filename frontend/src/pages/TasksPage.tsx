import { useEffect, useState } from 'react';
import { createTask, fetchTasks } from '../api/tasks';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { Task, TaskListResponse } from '../types/api';

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    void loadTasks();
  }, []);

  async function loadTasks() {
    const response = await fetchTasks();
    const payload = response.data as TaskListResponse;
    setTasks(payload.items);
  }

  async function handleCreateTask(payload: Record<string, unknown>) {
    await createTask(payload);
    await loadTasks();
  }

  return (
    <section className="page-grid">
      <TaskForm onSubmit={handleCreateTask} />
      <TaskList tasks={tasks} />
    </section>
  );
}
