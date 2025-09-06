import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const location = useLocation();

  // Check for token in URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    if (token) {
      localStorage.setItem('token', token);
      setMsg('Email verified and logged in!');
    }
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('https://gmail-backend-la2t.onrender.com/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      setMsg('Logged in');
    } else {
      setMsg(data.message || 'Login failed');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '50px auto' }}>
      <h2>Login</h2>
      {msg && <p>{msg}</p>}
      <form onSubmit={handleSubmit}>
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} /><br />
        <button type="submit">Login</button>
      </form>
      <p>Don't have account? <a href="/">Signup</a></p>
    </div>
  );
}
