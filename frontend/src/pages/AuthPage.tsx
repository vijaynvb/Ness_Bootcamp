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
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-left">
          <div className="logo">
            <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <defs>
                <linearGradient id="g" x1="0" x2="1">
                  <stop offset="0" stopColor="#ff8a00" />
                  <stop offset="1" stopColor="#ff3f81" />
                </linearGradient>
              </defs>
              <path fill="url(#g)" d="M32 6c6 0 11 6 11 6s5-6 11-6c0 7-11 12-11 26 0-14-11-19-11-26z" />
              <path fill="#7b2fa6" d="M32 58s-9-12-26-12c0-8 7-12 7-12s0 8 19 12c19-4 19-12 19-12s7 4 7 12C41 46 32 58 32 58z" opacity="0.9"/>
            </svg>
            <h1>We are The Lotus Team</h1>
          </div>

          <p className="lead">Please login to your account</p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <input
              className="input-ghost"
              placeholder="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />
            <input
              className="input-ghost"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
            />

            <button className="btn-gradient" type="submit">LOG IN</button>

            <a className="muted-link" href="#">Forgot password?</a>

            <div className="signup-row">
              <span style={{color:'#d9d9d9'}}>Don't have an account?</span>
              <button type="button" onClick={() => setMode('register')} style={{background:'transparent',border:'1px solid rgba(255,255,255,0.2)',color:'#ffb6c1',padding:'8px 12px',borderRadius:6}}>CREATE NEW</button>
            </div>
          </form>

          {message ? <p>{message}</p> : null}
        </div>

        <aside className="auth-right">
          <h2>We are more than just a company</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </aside>
      </div>
    </main>
  );
}
