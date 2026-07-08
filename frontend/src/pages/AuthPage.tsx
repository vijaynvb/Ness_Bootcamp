import { FormEvent, useState } from 'react';
import { login, register } from '../api/auth';

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [message, setMessage] = useState('');

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      if (mode === 'login') {
        await login(email, password);
        setMessage('Login request created.');
      } else {
        await register({ firstName, lastName, email, password, role: 'employee' });
        setMessage('Registration request created.');
      }
    } catch (error) {
      setMessage('Request failed. Check the backend server.');
    }
  }

  return (
    <section className="page-grid">
      <div className="card">
        <h2>{mode === 'login' ? 'Sign in' : 'Register'}</h2>
        <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
          Switch to {mode === 'login' ? 'register' : 'login'}
        </button>
        <form onSubmit={handleSubmit}>
          {mode === 'register' ? (
            <>
              <label>
                First name
                <input value={firstName} onChange={(event) => setFirstName(event.target.value)} />
              </label>
              <label>
                Last name
                <input value={lastName} onChange={(event) => setLastName(event.target.value)} />
              </label>
            </>
          ) : null}
          <label>
            Email
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          </label>
          <label>
            Password
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          </label>
          <button type="submit">Submit</button>
        </form>
        {message ? <p>{message}</p> : null}
      </div>
    </section>
  );
}
