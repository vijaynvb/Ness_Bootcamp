import { FormEvent, useState } from 'react';

interface TaskFormProps {
  onSubmit: (payload: Record<string, unknown>) => void;
}

export default function TaskForm({ onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('high');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('todo');
  const [error, setError] = useState('');

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!title.trim() || !description.trim() || !dueDate) {
      setError('Title, description, and due date are required.');
      return;
    }

    onSubmit({ title, description, priority, dueDate, status });
    setError('');
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>Create task</h2>
      {error ? <p className="error">{error}</p> : null}
      <label>
        Title
        <input value={title} onChange={(event) => setTitle(event.target.value)} />
      </label>
      <label>
        Description
        <textarea value={description} onChange={(event) => setDescription(event.target.value)} />
      </label>
      <label>
        Priority
        <select value={priority} onChange={(event) => setPriority(event.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>
      <label>
        Due date
        <input type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} />
      </label>
      <label>
        Status
        <select value={status} onChange={(event) => setStatus(event.target.value)}>
          <option value="todo">Todo</option>
          <option value="inProgress">In progress</option>
          <option value="review">Review</option>
          <option value="done">Done</option>
        </select>
      </label>
      <button type="submit">Save task</button>
    </form>
  );
}
