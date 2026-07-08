import { FormEvent, useState } from 'react';

interface UserFormProps {
  onSubmit: (payload: Record<string, unknown>) => void;
}

export default function UserForm({ onSubmit }: UserFormProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('employee');
  const [error, setError] = useState('');

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !email || !password) {
      setError('All fields are required.');
      return;
    }

    onSubmit({ firstName, lastName, email, password, role });
    setError('');
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>Create user</h2>
      {error ? <p className="error">{error}</p> : null}
      <label>
        First name
        <input value={firstName} onChange={(event) => setFirstName(event.target.value)} />
      </label>
      <label>
        Last name
        <input value={lastName} onChange={(event) => setLastName(event.target.value)} />
      </label>
      <label>
        Email
        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
      </label>
      <label>
        Password
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      </label>
      <label>
        Role
        <select value={role} onChange={(event) => setRole(event.target.value)}>
          <option value="employee">Employee</option>
          <option value="administrator">Administrator</option>
        </select>
      </label>
      <button type="submit">Save user</button>
    </form>
  );
}
