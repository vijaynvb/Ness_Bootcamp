import { Task } from '../types/api';

interface TaskListProps {
  tasks: Task[];
}

export default function TaskList({ tasks }: TaskListProps) {
  return (
    <div className="card">
      <h2>Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks available yet.</p>
      ) : (
        <ul className="list">
          {tasks.map((task) => (
            <li key={task.id}>
              <strong>{task.title}</strong> — {task.priority} / {task.status}
              <div>{task.description}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
