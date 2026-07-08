import { useEffect, useState } from 'react';
import { fetchDashboardSummary } from '../api/dashboard';
import StatCard from '../components/StatCard';
import { DashboardSummary } from '../types/api';

export default function DashboardPage() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);

  useEffect(() => {
    fetchDashboardSummary()
      .then((response) => setSummary(response.data))
      .catch(() => setSummary(null));
  }, []);

  if (!summary) {
    return <p>Loading dashboard…</p>;
  }

  return (
    <section className="page-grid">
      <StatCard title="Total tasks" value={summary.totalTasks} />
      <StatCard title="Todo" value={summary.todoTasks} />
      <StatCard title="In progress" value={summary.inProgressTasks} />
      <StatCard title="Review" value={summary.reviewTasks} />
      <StatCard title="Done" value={summary.doneTasks} />
      <StatCard title="Overdue" value={summary.overdueTasks} />
      <StatCard title="Assigned" value={summary.assignedTasks} />
    </section>
  );
}
